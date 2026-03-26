import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { Network } from "../data/tokens";
import { connectInternetIdentity } from "../hooks/useRealWallet";

// ── WalletAdapter interface — add new wallets by implementing this ──
export interface WalletAdapter {
  id: string;
  label: string;
  isAvailable: () => boolean;
  connect: () => Promise<{ address: string; isReal: boolean }>;
  installUrl: string;
  edgeInstallUrl?: string;
  firefoxInstallUrl?: string;
  network?: Network;
}

// ── Browser detection ──
export type BrowserType =
  | "chrome"
  | "edge"
  | "firefox"
  | "safari"
  | "opera"
  | "brave"
  | "other";

export function detectBrowser(): BrowserType {
  if (typeof window === "undefined") return "other";
  const ua = navigator.userAgent;
  if (ua.includes("Edg/")) return "edge";
  if (ua.includes("OPR/") || ua.includes("Opera")) return "opera";
  if (ua.includes("Firefox/")) return "firefox";
  if (ua.includes("Safari/") && !ua.includes("Chrome")) return "safari";
  if ((navigator as unknown as Record<string, unknown>).brave) return "brave";
  if (ua.includes("Chrome/")) return "chrome";
  return "other";
}

export function getOisyInstallUrl(): {
  url: string;
  browser: BrowserType;
  note?: string;
} {
  const browser = detectBrowser();
  const chromeUrl =
    "https://chromewebstore.google.com/detail/oisy-wallet/pockendbbajckdfkpbejbjgeobgblbfb";

  switch (browser) {
    case "edge":
      return {
        url: chromeUrl,
        browser,
        note: "En Edge: abre Chrome Web Store → habilita 'Permitir extensiones de otras tiendas' → Instalar",
      };
    case "firefox":
      return {
        url: "https://oisy.com",
        browser,
        note: "Oisy no tiene extensión para Firefox aún. Usa la versión web en oisy.com",
      };
    case "safari":
      return {
        url: "https://oisy.com",
        browser,
        note: "Oisy no tiene extensión para Safari. Usa la versión web en oisy.com",
      };
    default:
      return { url: chromeUrl, browser };
  }
}

// ── Keplr types ──
interface KeplrKey {
  bech32Address: string;
  name: string;
}
interface KeplrWindow {
  enable: (chainId: string) => Promise<void>;
  getKey: (chainId: string) => Promise<KeplrKey>;
}

// Internet Identity adapter
const iiAdapter: WalletAdapter = {
  id: "Internet Identity",
  label: "Internet Identity",
  network: "ICP",
  isAvailable: () => true,
  connect: () => connectInternetIdentity(),
  installUrl: "https://identity.ic0.app",
};

// Oisy adapter
const oisyAdapter: WalletAdapter = {
  id: "Oisy",
  label: "Oisy",
  network: "ICP",
  isAvailable: () =>
    typeof window !== "undefined" &&
    !!(window as unknown as Record<string, unknown>).oisy,
  connect: async () => {
    try {
      const oisy = (window as unknown as Record<string, unknown>).oisy as
        | { connect: () => Promise<{ address: string }> | { address: string } }
        | undefined;
      if (!oisy) return { address: "", isReal: false };
      const result = await oisy.connect();
      const address =
        typeof result === "object" && "address" in result
          ? (result as { address: string }).address
          : "";
      if (!address) return { address: "", isReal: false };
      return { address, isReal: true };
    } catch {
      return { address: "", isReal: false };
    }
  },
  installUrl:
    "https://chromewebstore.google.com/detail/oisy-wallet/pockendbbajckdfkpbejbjgeobgblbfb",
};

// Keplr adapter — Cosmos ecosystem wallet (Chrome + Edge)
const COSMOS_CHAIN_ID = "cosmoshub-4";

const keplrAdapter: WalletAdapter = {
  id: "Keplr",
  label: "Keplr",
  network: "Cosmos",
  isAvailable: () =>
    typeof window !== "undefined" &&
    !!(window as unknown as Record<string, unknown>).keplr,
  connect: async () => {
    try {
      const keplr = (window as unknown as Record<string, unknown>).keplr as
        | KeplrWindow
        | undefined;
      if (!keplr) return { address: "", isReal: false };

      // Request permission to access the chain
      await keplr.enable(COSMOS_CHAIN_ID);

      // Get the user's key/address for Cosmos Hub
      const key = await keplr.getKey(COSMOS_CHAIN_ID);
      if (!key?.bech32Address) return { address: "", isReal: false };

      return { address: key.bech32Address, isReal: true };
    } catch {
      return { address: "", isReal: false };
    }
  },
  // Available on Edge Add-ons store natively
  installUrl:
    "https://microsoftedge.microsoft.com/addons/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
  edgeInstallUrl:
    "https://microsoftedge.microsoft.com/addons/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap",
};

export const SUPPORTED_WALLETS: WalletAdapter[] = [
  iiAdapter,
  oisyAdapter,
  keplrAdapter,
];

export interface ConnectedWallet {
  network: Network;
  walletType: string;
  address: string;
  isReal: boolean;
}

export interface WalletContextType {
  connectedWallets: ConnectedWallet[];
  activeWallet: ConnectedWallet | null;
  setActiveWallet: Dispatch<SetStateAction<ConnectedWallet | null>>;
  connectWallet: (
    network: Network,
    walletType: string,
  ) => Promise<
    ConnectedWallet & { redirected?: boolean; installNote?: string }
  >;
  disconnectWallet: (address: string) => void;
  getBalance: (network: Network, address: string, symbol: string) => number;
  setBalance: (
    network: Network,
    address: string,
    symbol: string,
    amount: number,
  ) => void;
  balanceTick: number;
  isEVMAvailable: () => boolean;
  isSolanaAvailable: () => boolean;
  isKeplrAvailable: () => boolean;
}

const WalletCtx = createContext<WalletContextType | null>(null);

// ── Keplr balance fetch (ATOM on Cosmos Hub) ──
async function tryFetchATOM(
  url: string,
): Promise<{ denom: string; amount: string }[] | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as {
      balances?: { denom: string; amount: string }[];
    };
    return data.balances ?? null;
  } catch {
    return null;
  }
}

async function fetchKeplrATOMBalance(
  address: string,
  onBalance: (amount: number) => void,
) {
  const endpoints = [
    `https://api.cosmos.network/cosmos/bank/v1beta1/balances/${address}`,
    `https://rest.cosmos.directory/cosmoshub/cosmos/bank/v1beta1/balances/${address}`,
    `https://cosmoshub-api.lavenderfive.com/cosmos/bank/v1beta1/balances/${address}`,
  ];

  for (const url of endpoints) {
    const balances = await tryFetchATOM(url);
    if (!balances) continue;
    const uatom = balances.find((b) => b.denom === "uatom");
    if (uatom) {
      const atom = Number(uatom.amount) / 1_000_000;
      if (atom > 0) onBalance(atom);
    }
    return;
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connectedWallets, setConnectedWallets] = useState<ConnectedWallet[]>(
    [],
  );
  const [activeWallet, setActiveWallet] = useState<ConnectedWallet | null>(
    null,
  );
  const [balanceTick, setBalanceTick] = useState(0);

  const bumpTick = useCallback(() => setBalanceTick((t) => t + 1), []);

  const getBalance = useCallback(
    (network: Network, address: string, symbol: string): number => {
      return Number.parseFloat(
        localStorage.getItem(`dcss_${network}_${address}_${symbol}`) ?? "0",
      );
    },
    [],
  );

  const setBalance = useCallback(
    (
      network: Network,
      address: string,
      symbol: string,
      amount: number,
    ): void => {
      const key = `dcss_${network}_${address}_${symbol}`;
      if (amount <= 0) localStorage.removeItem(key);
      else localStorage.setItem(key, amount.toString());
      bumpTick();
    },
    [bumpTick],
  );

  const connectWallet = useCallback(
    async (
      network: Network,
      walletType: string,
    ): Promise<
      ConnectedWallet & { redirected?: boolean; installNote?: string }
    > => {
      const adapter = SUPPORTED_WALLETS.find((w) => w.id === walletType);

      if (!adapter) {
        return { network, walletType, address: "", isReal: false };
      }

      // Oisy: if not installed, redirect to install page
      if (walletType === "Oisy" && !adapter.isAvailable()) {
        const { url, note } = getOisyInstallUrl();
        window.open(url, "_blank", "noopener,noreferrer");
        return {
          network,
          walletType,
          address: "",
          isReal: false,
          redirected: true,
          installNote: note,
        };
      }

      // Keplr: if not installed, open Edge Add-ons store
      if (walletType === "Keplr" && !adapter.isAvailable()) {
        const browser = detectBrowser();
        const url =
          browser === "edge"
            ? "https://microsoftedge.microsoft.com/addons/detail/keplr/dmkamcknogkgcdfhhbddcghachkejeap"
            : "https://www.keplr.app/download";
        window.open(url, "_blank", "noopener,noreferrer");
        return {
          network,
          walletType,
          address: "",
          isReal: false,
          redirected: true,
          installNote:
            browser === "edge"
              ? "Instala Keplr desde Microsoft Edge Add-ons, luego vuelve aquí y conecta."
              : "Instala la extensión de Keplr y vuelve a conectar.",
        };
      }

      const result = await adapter.connect();

      if (!result.address || !result.isReal) {
        return { network, walletType, address: "", isReal: false };
      }

      // Determine the network from the adapter definition
      const walletNetwork: Network = adapter.network ?? network;

      const wallet: ConnectedWallet = {
        network: walletNetwork,
        walletType,
        address: result.address,
        isReal: true,
      };

      setConnectedWallets((prev) => {
        const filtered = prev.filter((w) => w.walletType !== walletType);
        return [...filtered, wallet];
      });
      setActiveWallet(wallet);
      bumpTick();

      // Fetch Keplr ATOM balance in background
      if (walletType === "Keplr") {
        fetchKeplrATOMBalance(result.address, (amount) => {
          localStorage.setItem(
            `dcss_Cosmos_${result.address}_ATOM`,
            amount.toString(),
          );
          setBalanceTick((t) => t + 1);
        });
      }

      return wallet;
    },
    [bumpTick],
  );

  const disconnectWallet = useCallback(
    (address: string): void => {
      setConnectedWallets((prev) => {
        const wallet = prev.find((w) => w.address === address);
        if (wallet) {
          const keysToRemove: string[] = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith(`dcss_${wallet.network}_${address}_`))
              keysToRemove.push(key);
          }
          for (const k of keysToRemove) localStorage.removeItem(k);
        }
        return prev.filter((w) => w.address !== address);
      });
      setActiveWallet((prev) => (prev?.address === address ? null : prev));
      bumpTick();
    },
    [bumpTick],
  );

  const value = useMemo(
    () => ({
      connectedWallets,
      activeWallet,
      setActiveWallet,
      connectWallet,
      disconnectWallet,
      getBalance,
      setBalance,
      balanceTick,
      isEVMAvailable: () => false,
      isSolanaAvailable: () => false,
      isKeplrAvailable: () =>
        typeof window !== "undefined" &&
        !!(window as unknown as Record<string, unknown>).keplr,
    }),
    [
      connectedWallets,
      activeWallet,
      connectWallet,
      disconnectWallet,
      getBalance,
      setBalance,
      balanceTick,
    ],
  );

  return <WalletCtx.Provider value={value}>{children}</WalletCtx.Provider>;
}

export function useWallet(): WalletContextType {
  const ctx = useContext(WalletCtx);
  if (!ctx) throw new Error("useWallet must be used within WalletProvider");
  return ctx;
}
