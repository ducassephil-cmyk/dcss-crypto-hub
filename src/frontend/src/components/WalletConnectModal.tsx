import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  SUPPORTED_WALLETS,
  detectBrowser,
  useWallet,
} from "../contexts/WalletContext";

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
  preselectedNetwork?: string;
}

const WALLET_ICONS: Record<string, string> = {
  "Internet Identity": "II",
  Oisy: "OI",
  Keplr: "KP",
};

const WALLET_DESC: Record<string, string> = {
  "Internet Identity": "Login con Internet Computer — sin seed phrase",
  Oisy: "Wallet multi-chain nativa de ICP — Abre oisy.com",
  Keplr: "Wallet del ecosistema Cosmos — ATOM, OSMO y más",
};

const WALLET_NETWORK_BADGE: Record<string, string> = {
  "Internet Identity": "ICP",
  Oisy: "ICP",
  Keplr: "Cosmos",
};

function KeplrInstallInstructions() {
  const browser = detectBrowser();
  if (browser === "edge") {
    return (
      <div
        className="text-[11px] p-3 rounded-lg mt-1"
        style={{
          background: "rgba(118,90,226,0.06)",
          border: "1px solid rgba(118,90,226,0.25)",
          color: "var(--text-muted)",
        }}
      >
        <p className="font-semibold mb-1" style={{ color: "#765AE2" }}>
          Keplr en Edge
        </p>
        <ol className="list-decimal ml-3 space-y-0.5">
          <li>Se abrirá la tienda de Edge Add-ons</li>
          <li>Haz clic en &ldquo;Obtener&rdquo; para instalar Keplr</li>
          <li>Crea o importa tu wallet Cosmos en Keplr</li>
          <li>Regresa aquí y conecta</li>
        </ol>
      </div>
    );
  }
  return (
    <div
      className="text-[11px] p-3 rounded-lg mt-1"
      style={{
        background: "rgba(118,90,226,0.06)",
        border: "1px solid rgba(118,90,226,0.25)",
        color: "var(--text-muted)",
      }}
    >
      Instala Keplr desde{" "}
      <a
        href="https://www.keplr.app/download"
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#765AE2" }}
      >
        keplr.app/download
      </a>{" "}
      y vuelve a conectar.
    </div>
  );
}

export default function WalletConnectModal({
  open,
  onClose,
}: WalletConnectModalProps) {
  const { connectWallet, connectedWallets } = useWallet();
  const [connecting, setConnecting] = useState<string | null>(null);
  const [showKeplrInstall, setShowKeplrInstall] = useState(false);
  const [oisyOpened, setOisyOpened] = useState(false);

  async function handleConnect(walletId: string) {
    // Oisy: just open the site
    if (walletId === "Oisy") {
      window.open("https://oisy.com", "_blank");
      setOisyOpened(true);
      toast.info("Abriendo Oisy Wallet...", {
        description:
          "Conéctate en oisy.com y vuelve cuando tengas tu wallet lista",
        duration: 6000,
      });
      return;
    }

    setConnecting(walletId);
    const wallet = await connectWallet("ICP", walletId);
    setConnecting(null);

    const r = wallet as { redirected?: boolean; installNote?: string };

    if (r.redirected) {
      if (walletId === "Keplr") {
        setShowKeplrInstall(true);
      } else {
        toast.info(`Instalar ${walletId}`, {
          description:
            r.installNote ?? "Instala la extensión y vuelve a conectar",
          duration: 8000,
        });
      }
      return;
    }

    if (!wallet.address || !wallet.isReal) {
      toast.error(`No se pudo conectar ${walletId}`, {
        description:
          "Verifica que la extensión esté instalada y activa, luego intenta de nuevo",
      });
      return;
    }

    toast.success(`Conectado: ${wallet.address.slice(0, 20)}...`);
    onClose();
  }

  const activeAddrs = new Set(connectedWallets.map((w) => w.walletType));
  const browser = detectBrowser();

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-sm"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
        }}
        data-ocid="wallet.modal"
      >
        <DialogHeader>
          <DialogTitle
            className="text-base font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Conectar Wallet
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2 mt-1">
          {SUPPORTED_WALLETS.map((adapter) => {
            const isConnected = activeAddrs.has(adapter.id);
            const isConnecting = connecting === adapter.id;
            const isOisy = adapter.id === "Oisy";
            const isKeplr = adapter.id === "Keplr";
            const notInstalled = !adapter.isAvailable();
            const keplrNotInstalled = isKeplr && notInstalled;

            return (
              <div key={adapter.id}>
                <button
                  type="button"
                  onClick={() => handleConnect(adapter.id)}
                  disabled={!!connecting}
                  className="w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left"
                  style={{
                    background: isConnected
                      ? "var(--accent-dim)"
                      : "var(--bg-elevated)",
                    border: isConnected
                      ? "1px solid rgba(0,212,184,0.4)"
                      : isKeplr
                        ? "1px solid rgba(118,90,226,0.25)"
                        : isOisy
                          ? "1px solid rgba(0,212,184,0.35)"
                          : "1px solid var(--border-subtle)",
                    opacity: connecting && !isConnecting ? 0.5 : 1,
                    cursor: connecting ? "not-allowed" : "pointer",
                  }}
                  data-ocid={`wallet.${adapter.id.toLowerCase().replace(/\s+/g, "_")}.button`}
                >
                  {/* Icon */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 font-mono"
                    style={{
                      background: isKeplr
                        ? "rgba(118,90,226,0.12)"
                        : isOisy
                          ? "rgba(0,212,184,0.08)"
                          : "var(--bg-base)",
                      border: isKeplr
                        ? "1px solid rgba(118,90,226,0.35)"
                        : isOisy
                          ? "1px solid rgba(0,212,184,0.3)"
                          : "1px solid var(--border-subtle)",
                      color: isKeplr ? "#765AE2" : "var(--accent-color)",
                    }}
                  >
                    {WALLET_ICONS[adapter.id] ??
                      adapter.id.slice(0, 2).toUpperCase()}
                  </div>

                  {/* Labels */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {adapter.label}
                      </span>

                      {/* Network badge */}
                      {WALLET_NETWORK_BADGE[adapter.id] && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold tracking-wide"
                          style={{
                            background: isKeplr
                              ? "rgba(118,90,226,0.12)"
                              : "rgba(0,212,184,0.08)",
                            color: isKeplr ? "#765AE2" : "var(--accent-color)",
                          }}
                        >
                          {WALLET_NETWORK_BADGE[adapter.id]}
                        </span>
                      )}

                      {isOisy && (
                        <span
                          className="text-[9px] px-1.5 py-0.5 rounded-full font-semibold tracking-wide flex items-center gap-1"
                          style={{
                            background: "rgba(0,212,184,0.08)",
                            color: "var(--accent-color)",
                          }}
                        >
                          <ExternalLink size={8} />
                          oisy.com
                        </span>
                      )}

                      {isConnected && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{
                            background: "rgba(0,212,184,0.15)",
                            color: "var(--accent-color)",
                          }}
                        >
                          Conectado
                        </span>
                      )}

                      {keplrNotInstalled && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{
                            background: "rgba(255,180,0,0.12)",
                            color: "#ffb400",
                          }}
                        >
                          {browser === "edge"
                            ? "Disponible en Edge"
                            : "No instalado"}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {isOisy && oisyOpened
                        ? "Abriendo Oisy Wallet..."
                        : keplrNotInstalled && browser === "edge"
                          ? "Click para abrir Edge Add-ons e instalar Keplr"
                          : WALLET_DESC[adapter.id]}
                    </p>
                  </div>

                  {/* Spinner or external icon */}
                  {isConnecting && (
                    <Loader2
                      size={16}
                      className="animate-spin shrink-0"
                      style={{
                        color: isKeplr ? "#765AE2" : "var(--accent-color)",
                      }}
                    />
                  )}
                  {isOisy && !isConnecting && (
                    <ExternalLink
                      size={14}
                      className="shrink-0"
                      style={{ color: "var(--text-muted)" }}
                    />
                  )}
                </button>

                {isKeplr && (keplrNotInstalled || showKeplrInstall) && (
                  <KeplrInstallInstructions />
                )}
              </div>
            );
          })}
        </div>

        <p
          className="text-[11px] text-center mt-3"
          style={{ color: "var(--text-muted)" }}
        >
          Más wallets disponibles próximamente
        </p>
      </DialogContent>
    </Dialog>
  );
}
