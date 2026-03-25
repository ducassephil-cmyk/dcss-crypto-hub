// Real wallet connection utilities — per-wallet detection & connection
// No ethers.js or web3.js — raw browser extension APIs

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      selectedAddress?: string;
      isMetaMask?: boolean;
      providers?: EVMProvider[];
    };
    phantom?: {
      solana?: {
        connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
          publicKey: { toString(): string };
        }>;
        disconnect: () => Promise<void>;
        isPhantom?: boolean;
      };
    };
    solana?: {
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
        publicKey: { toString(): string };
      }>;
      disconnect: () => Promise<void>;
      isPhantom?: boolean;
    };
    solflare?: {
      connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<void>;
      disconnect: () => Promise<void>;
      publicKey: { toString(): string };
      isConnected: boolean;
    };
    keplr?: {
      enable: (chainId: string) => Promise<void>;
      getKey: (chainId: string) => Promise<{ bech32Address: string }>;
    };
    leap?: {
      enable: (chainId: string) => Promise<void>;
      getKey: (chainId: string) => Promise<{ bech32Address: string }>;
    };
    backpack?: {
      connect: () => Promise<{ publicKey: { toString(): string } }>;
    };
    trustwallet?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
    };
    injectedWeb3?: Record<
      string,
      {
        enable: (
          appName: string,
        ) => Promise<{ accounts: () => Promise<{ address: string }[]> }>;
      }
    >;
    unisat?: {
      requestAccounts: () => Promise<string[]>;
    };
    XverseProviders?: {
      BitcoinProvider?: {
        connect: (opts: { purposes: string[] }) => Promise<{
          addresses: { address: string }[];
        }>;
      };
    };
    okxwallet?: {
      bitcoin?: { requestAccounts: () => Promise<string[]> };
      request: (args: { method: string }) => Promise<unknown>;
    };
    arweaveWallet?: {
      connect: (permissions: string[]) => Promise<void>;
      getActiveAddress: () => Promise<string>;
    };
    mina?: {
      requestAccounts: () => Promise<string[]>;
    };
    cardano?: Record<
      string,
      {
        enable: () => Promise<{ getUsedAddresses: () => Promise<string[]> }>;
      }
    >;
    BinanceChain?: {
      request: (args: { method: string }) => Promise<unknown>;
    };
    ic?: {
      plug?: {
        requestConnect: (opts: {
          whitelist: string[];
          host: string;
        }) => Promise<boolean>;
        agent: { getPrincipal: () => Promise<{ toText(): string }> };
      };
    };
  }
}

interface EVMProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  isMetaMask?: boolean;
  isBraveWallet?: boolean;
  isKuCoinWallet?: boolean;
  isCoinbaseWallet?: boolean;
  isCoinbaseBrowser?: boolean;
  isBinance?: boolean;
  isBinanceSmartChain?: boolean;
  isAvalanche?: boolean;
  isCoreWallet?: boolean;
  isRabby?: boolean;
  isTrust?: boolean;
  isRainbow?: boolean;
}

// WalletConnect Project ID — register free at https://cloud.walletconnect.com
export const WALLETCONNECT_PROJECT_ID = "dcss_replace_with_your_project_id";

export const WALLET_INSTALL_URLS: Record<string, string> = {
  "Internet Identity": "https://identity.ic0.app",
  Plug: "https://plugwallet.ooo",
  Oisy: "https://oisy.com",
  MetaMask: "https://metamask.io/download",
  "Coinbase Wallet": "https://www.coinbase.com/wallet/downloads",
  WalletConnect: "https://walletconnect.com/explorer",
  Phantom: "https://phantom.app",
  Backpack: "https://backpack.app",
  Keplr: "https://www.keplr.app/download",
  Leap: "https://www.leapwallet.io/download",
  Nova: "https://novawallet.io",
  Talisman: "https://talisman.xyz",
  SubWallet: "https://subwallet.app",
  Unisat: "https://unisat.io",
  Xverse: "https://xverse.app",
  OKX: "https://www.okx.com/web3",
  ArConnect: "https://arconnect.io",
  "Auro Wallet": "https://www.aurowallet.com",
  Nami: "https://namiwallet.io",
  Eternl: "https://eternl.io",
  "NEAR Wallet": "https://wallet.near.org",
  Meteor: "https://meteorwallet.app",
  "Binance Web3": "https://www.binance.com/en/web3wallet",
  "Core Wallet": "https://core.app",
  "KuCoin Web3": "https://www.kucoin.com/web3",
  Rabby: "https://rabby.io",
  "Trust Wallet": "https://trustwallet.com/browser-extension",
  Rainbow: "https://rainbow.me/extension",
  Solflare: "https://solflare.com",
};

// ── EVM multi-provider (EIP-5749 / MetaMask multi-wallet) ─────────────────────
function getEVMProvider(walletName: string): EVMProvider | null {
  if (typeof window === "undefined" || !window.ethereum) return null;
  const providers = (window.ethereum as any).providers as
    | EVMProvider[]
    | undefined;
  if (providers && providers.length > 0) {
    switch (walletName) {
      case "MetaMask":
        return (
          providers.find(
            (p) =>
              p.isMetaMask &&
              !p.isBraveWallet &&
              !p.isKuCoinWallet &&
              !p.isCoinbaseWallet,
          ) ?? null
        );
      case "Coinbase Wallet":
        return (
          providers.find((p) => p.isCoinbaseWallet || p.isCoinbaseBrowser) ??
          null
        );
      case "Binance Web3":
        return (
          providers.find((p) => p.isBinance || p.isBinanceSmartChain) ?? null
        );
      case "Core Wallet":
        return providers.find((p) => p.isAvalanche || p.isCoreWallet) ?? null;
      case "KuCoin Web3":
        return providers.find((p) => p.isKuCoinWallet) ?? null;
      case "Rabby":
        return providers.find((p) => p.isRabby) ?? null;
      case "Trust Wallet":
        return providers.find((p) => p.isTrust) ?? null;
      case "Rainbow":
        return providers.find((p) => p.isRainbow) ?? null;
      default:
        return null;
    }
  }
  // Single provider fallback — check flags
  const p = window.ethereum as unknown as EVMProvider;
  switch (walletName) {
    case "MetaMask":
      return p.isMetaMask && !p.isKuCoinWallet && !p.isCoinbaseWallet
        ? p
        : null;
    case "Coinbase Wallet":
      return p.isCoinbaseWallet ? p : null;
    case "Binance Web3":
      return p.isBinance ? p : null;
    case "Core Wallet":
      return p.isCoreWallet || p.isAvalanche ? p : null;
    case "KuCoin Web3":
      return p.isKuCoinWallet ? p : null;
    case "Rabby":
      return p.isRabby ? p : null;
    case "Trust Wallet":
      return p.isTrust ? p : null;
    case "Rainbow":
      return p.isRainbow ? p : null;
    default:
      return null;
  }
}

export function isEVMAvailable(): boolean {
  return typeof window !== "undefined" && !!window.ethereum;
}

export function isWalletEVMAvailable(walletName: string): boolean {
  return !!getEVMProvider(walletName);
}

export async function connectEVM(
  walletName = "MetaMask",
): Promise<{ address: string; isReal: boolean }> {
  const provider = getEVMProvider(walletName);
  if (!provider) return { address: "", isReal: false };
  try {
    const accounts = (await provider.request({
      method: "eth_requestAccounts",
    })) as string[];
    if (accounts && accounts.length > 0)
      return { address: accounts[0], isReal: true };
    return { address: "", isReal: false };
  } catch {
    return { address: "", isReal: false };
  }
}

export async function getEVMBalance(
  address: string,
  walletName = "MetaMask",
): Promise<number> {
  const provider = getEVMProvider(walletName);
  if (!provider) return 0;
  try {
    const hexBalance = (await provider.request({
      method: "eth_getBalance",
      params: [address, "latest"],
    })) as string;
    return Number(BigInt(hexBalance)) / 1e18;
  } catch {
    return 0;
  }
}

export async function sendEVMTransaction(
  from: string,
  to: string,
  valueEther: string,
): Promise<string> {
  const provider =
    getEVMProvider("MetaMask") ?? (window.ethereum as unknown as EVMProvider);
  if (!provider) throw new Error("No EVM wallet available");
  const weiHex = `0x${Math.round(Number.parseFloat(valueEther) * 1e18).toString(16)}`;
  return (await provider.request({
    method: "eth_sendTransaction",
    params: [{ from, to, value: weiHex }],
  })) as string;
}

// ── ICP ───────────────────────────────────────────────────────────────────────
export function isInternetIdentityAvailable(): boolean {
  return true;
}

export async function connectInternetIdentity(): Promise<{
  address: string;
  isReal: boolean;
}> {
  try {
    const { AuthClient } = await import("@dfinity/auth-client");
    const authClient = await AuthClient.create();
    return new Promise((resolve) => {
      authClient.login({
        identityProvider: "https://identity.ic0.app",
        onSuccess: () => {
          const principal = authClient.getIdentity().getPrincipal().toText();
          resolve({ address: principal, isReal: true });
        },
        onError: (err) => {
          console.error("II login error", err);
          resolve({ address: "", isReal: false });
        },
      });
    });
  } catch {
    return { address: "", isReal: false };
  }
}

export function isPlugAvailable(): boolean {
  return typeof window !== "undefined" && !!window.ic?.plug;
}

export async function connectPlug(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isPlugAvailable()) return { address: "", isReal: false };
  try {
    const connected = await window.ic!.plug!.requestConnect({
      whitelist: [],
      host: "https://icp0.io",
    });
    if (!connected) return { address: "", isReal: false };
    const principal = await window.ic!.plug!.agent.getPrincipal();
    return { address: principal.toText(), isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Solana ────────────────────────────────────────────────────────────────────
export function isPhantomAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    (!!window.phantom?.solana || !!window.solana?.isPhantom)
  );
}

export function isSolanaAvailable(): boolean {
  return isPhantomAvailable();
}

export async function connectSolana(): Promise<{
  address: string;
  isReal: boolean;
}> {
  const provider = window.phantom?.solana ?? window.solana;
  if (!provider) return { address: "", isReal: false };
  try {
    // Disconnect first to always force the permission popup
    try {
      await (provider as any).disconnect();
    } catch {
      /* ignore — provider may not support disconnect or already disconnected */
    }
    const resp = await provider.connect({ onlyIfTrusted: false });
    return { address: resp.publicKey.toString(), isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isBackpackAvailable(): boolean {
  return typeof window !== "undefined" && !!window.backpack;
}

export async function connectBackpack(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isBackpackAvailable()) return { address: "", isReal: false };
  try {
    const resp = await window.backpack!.connect();
    return { address: resp.publicKey.toString(), isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isSolflareAvailable(): boolean {
  return typeof window !== "undefined" && !!window.solflare;
}

export async function connectSolflare(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isSolflareAvailable()) return { address: "", isReal: false };
  try {
    // Disconnect first to force permission popup
    try {
      await window.solflare!.disconnect();
    } catch {
      /* ignore */
    }
    await window.solflare!.connect({ onlyIfTrusted: false });
    return { address: window.solflare!.publicKey.toString(), isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Cosmos ────────────────────────────────────────────────────────────────────
export function isKeplrAvailable(): boolean {
  return typeof window !== "undefined" && !!window.keplr;
}

export async function connectCosmos(
  chainId = "cosmoshub-4",
): Promise<{ address: string; isReal: boolean }> {
  if (!isKeplrAvailable()) return { address: "", isReal: false };
  try {
    await window.keplr!.enable(chainId);
    const key = await window.keplr!.getKey(chainId);
    return { address: key.bech32Address, isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isLeapAvailable(): boolean {
  return typeof window !== "undefined" && !!window.leap;
}

export async function connectLeap(
  chainId = "cosmoshub-4",
): Promise<{ address: string; isReal: boolean }> {
  if (!isLeapAvailable()) return { address: "", isReal: false };
  try {
    await window.leap!.enable(chainId);
    const key = await window.leap!.getKey(chainId);
    return { address: key.bech32Address, isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Polkadot ──────────────────────────────────────────────────────────────────
export function isPolkadotJsAvailable(): boolean {
  return typeof window !== "undefined" && !!window.injectedWeb3;
}

export function isTalismanAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    !!window.injectedWeb3?.["talisman-polkadot"]
  );
}

export function isSubWalletAvailable(): boolean {
  return (
    typeof window !== "undefined" && !!window.injectedWeb3?.["subwallet-js"]
  );
}

export async function connectPolkadotWallet(
  walletKey: string,
): Promise<{ address: string; isReal: boolean }> {
  if (!window.injectedWeb3?.[walletKey]) return { address: "", isReal: false };
  try {
    const ext = await window.injectedWeb3[walletKey].enable("DCSS");
    const accounts = await ext.accounts();
    if (accounts.length === 0) return { address: "", isReal: false };
    return { address: accounts[0].address, isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Bitcoin ───────────────────────────────────────────────────────────────────
export function isUnisatAvailable(): boolean {
  return typeof window !== "undefined" && !!window.unisat;
}

export async function connectUnisat(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isUnisatAvailable()) return { address: "", isReal: false };
  try {
    const accounts = await window.unisat!.requestAccounts();
    return { address: accounts[0], isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isXverseAvailable(): boolean {
  return (
    typeof window !== "undefined" && !!window.XverseProviders?.BitcoinProvider
  );
}

export async function connectXverse(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isXverseAvailable()) return { address: "", isReal: false };
  try {
    const result = await window.XverseProviders!.BitcoinProvider!.connect({
      purposes: ["payment"],
    });
    return { address: result.addresses[0]?.address ?? "", isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isOKXAvailable(): boolean {
  return typeof window !== "undefined" && !!window.okxwallet;
}

export async function connectOKX(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isOKXAvailable()) return { address: "", isReal: false };
  try {
    if (window.okxwallet!.bitcoin) {
      const accounts = await window.okxwallet!.bitcoin.requestAccounts();
      return { address: accounts[0], isReal: true };
    }
    const accounts = (await window.okxwallet!.request({
      method: "eth_requestAccounts",
    })) as string[];
    return { address: accounts[0], isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Arweave ───────────────────────────────────────────────────────────────────
export function isArConnectAvailable(): boolean {
  return typeof window !== "undefined" && !!window.arweaveWallet;
}

export async function connectArConnect(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isArConnectAvailable()) return { address: "", isReal: false };
  try {
    await window.arweaveWallet!.connect(["ACCESS_ADDRESS"]);
    const address = await window.arweaveWallet!.getActiveAddress();
    return { address, isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Mina ──────────────────────────────────────────────────────────────────────
export function isAuroAvailable(): boolean {
  return typeof window !== "undefined" && !!window.mina;
}

export async function connectAuro(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isAuroAvailable()) return { address: "", isReal: false };
  try {
    const accounts = await window.mina!.requestAccounts();
    return { address: accounts[0], isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Cardano ───────────────────────────────────────────────────────────────────
export function isNamiAvailable(): boolean {
  return typeof window !== "undefined" && !!window.cardano?.nami;
}

export async function connectNami(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isNamiAvailable()) return { address: "", isReal: false };
  try {
    const api = await window.cardano!.nami.enable();
    const addrs = await api.getUsedAddresses();
    return { address: addrs[0] ?? "", isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isEternlAvailable(): boolean {
  return typeof window !== "undefined" && !!window.cardano?.eternl;
}

export async function connectEternl(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isEternlAvailable()) return { address: "", isReal: false };
  try {
    const api = await window.cardano!.eternl.enable();
    const addrs = await api.getUsedAddresses();
    return { address: addrs[0] ?? "", isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

// ── Binance Web3 / KuCoin / Rabby / Trust / Rainbow ──────────────────────────
export function isBinanceAvailable(): boolean {
  return typeof window !== "undefined" && !!window.BinanceChain;
}

export async function connectBinance(): Promise<{
  address: string;
  isReal: boolean;
}> {
  if (!isBinanceAvailable()) return { address: "", isReal: false };
  try {
    const accounts = (await window.BinanceChain!.request({
      method: "eth_requestAccounts",
    })) as string[];
    return { address: accounts[0], isReal: true };
  } catch {
    return { address: "", isReal: false };
  }
}

export function isKuCoinAvailable(): boolean {
  return isWalletEVMAvailable("KuCoin Web3");
}

export function isBinanceWeb3Available(): boolean {
  return isBinanceAvailable() || isWalletEVMAvailable("Binance Web3");
}

export function isRabbyAvailable(): boolean {
  return isWalletEVMAvailable("Rabby");
}

export function isTrustWalletAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    (!!window.trustwallet || isWalletEVMAvailable("Trust Wallet"))
  );
}

export function isRainbowAvailable(): boolean {
  return isWalletEVMAvailable("Rainbow");
}

// ── Per-wallet live detection ─────────────────────────────────────────────────
export function isWalletLive(walletType: string): boolean {
  switch (walletType) {
    case "Internet Identity":
      return true;
    case "Plug":
      return isPlugAvailable();
    case "Oisy":
      return false;
    case "MetaMask":
      return isWalletEVMAvailable("MetaMask");
    case "Coinbase Wallet":
      return isWalletEVMAvailable("Coinbase Wallet");
    case "Core Wallet":
      return isWalletEVMAvailable("Core Wallet");
    case "KuCoin Web3":
      return isKuCoinAvailable();
    case "Binance Web3":
      return isBinanceWeb3Available();
    case "Rabby":
      return isRabbyAvailable();
    case "Trust Wallet":
      return isTrustWalletAvailable();
    case "Rainbow":
      return isRainbowAvailable();
    case "WalletConnect":
      return false;
    case "Phantom":
      return isPhantomAvailable();
    case "Solflare":
      return isSolflareAvailable();
    case "Backpack":
      return isBackpackAvailable();
    case "Keplr":
      return isKeplrAvailable();
    case "Leap":
      return isLeapAvailable();
    case "Nova":
      return false;
    case "Talisman":
      return isTalismanAvailable();
    case "SubWallet":
      return isSubWalletAvailable();
    case "Unisat":
      return isUnisatAvailable();
    case "Xverse":
      return isXverseAvailable();
    case "OKX":
      return isOKXAvailable();
    case "ArConnect":
      return isArConnectAvailable();
    case "Auro Wallet":
      return isAuroAvailable();
    case "Nami":
      return isNamiAvailable();
    case "Eternl":
      return isEternlAvailable();
    default:
      return false;
  }
}

// Badge label per wallet
export function getWalletBadge(walletType: string): {
  label: string;
  isLive: boolean;
} {
  if (walletType === "Oisy") return { label: "→ APP WEB", isLive: false };
  if (walletType === "Nova") return { label: "→ MÓVIL", isLive: false };
  if (walletType === "WalletConnect")
    return { label: "→ CONFIGURAR", isLive: false };
  if (walletType === "NEAR Wallet" || walletType === "Meteor")
    return { label: "→ APP WEB", isLive: false };
  if (isWalletLive(walletType)) return { label: "LIVE", isLive: true };
  return { label: "→ INSTALAR", isLive: false };
}
