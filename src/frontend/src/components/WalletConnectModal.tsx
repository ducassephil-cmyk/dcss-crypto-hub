import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";
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
  Oisy: "Wallet multi-chain nativa de ICP",
  Keplr: "Wallet del ecosistema Cosmos — ATOM, OSMO y más",
};

const WALLET_NETWORK_BADGE: Record<string, string> = {
  "Internet Identity": "ICP",
  Oisy: "ICP",
  Keplr: "Cosmos",
};

function OisyInstallInstructions() {
  const browser = detectBrowser();
  if (browser === "edge") {
    return (
      <div
        className="text-[11px] p-3 rounded-lg mt-1"
        style={{
          background: "rgba(0,212,184,0.06)",
          border: "1px solid rgba(0,212,184,0.2)",
          color: "var(--text-muted)",
        }}
      >
        <p
          className="font-semibold mb-1"
          style={{ color: "var(--accent-color)" }}
        >
          Instalación en Edge
        </p>
        <ol className="list-decimal ml-3 space-y-0.5">
          <li>Ve a Chrome Web Store (se abrirá automáticamente)</li>
          <li>
            En Edge, activa{" "}
            <span style={{ color: "var(--text-primary)" }}>
              &ldquo;Permitir extensiones de otras tiendas&rdquo;
            </span>{" "}
            en la barra inferior
          </li>
          <li>
            Haz clic en &ldquo;Agregar a Chrome&rdquo; — funciona en Edge
            también
          </li>
          <li>Regresa aquí y conecta</li>
        </ol>
      </div>
    );
  }
  if (browser === "firefox" || browser === "safari") {
    return (
      <div
        className="text-[11px] p-3 rounded-lg mt-1"
        style={{
          background: "rgba(255,100,100,0.06)",
          border: "1px solid rgba(255,100,100,0.2)",
          color: "var(--text-muted)",
        }}
      >
        Oisy no tiene extensión para{" "}
        {browser === "firefox" ? "Firefox" : "Safari"} aún. Usa la versión web
        en{" "}
        <a
          href="https://oisy.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--accent-color)" }}
        >
          oisy.com
        </a>
      </div>
    );
  }
  return null;
}

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

  async function handleConnect(walletId: string) {
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
        data-ocid="wallet.dialog"
      >
        <DialogHeader>
          <DialogTitle style={{ color: "var(--text-primary)" }}>
            Conectar Wallet
          </DialogTitle>
          <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
            Selecciona tu wallet para ver balances y operar en tu red.
          </p>
        </DialogHeader>

        <div className="space-y-3 mt-2">
          {SUPPORTED_WALLETS.map((adapter) => {
            const isConnected = activeAddrs.has(adapter.id);
            const isConnecting = connecting === adapter.id;
            const isOisy = adapter.id === "Oisy";
            const isKeplr = adapter.id === "Keplr";
            const notInstalled = !adapter.isAvailable();
            const oisyNotInstalled = isOisy && notInstalled;
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
                        : "var(--bg-base)",
                      border: isKeplr
                        ? "1px solid rgba(118,90,226,0.35)"
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

                      {oisyNotInstalled && (
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold"
                          style={{
                            background: "rgba(255,180,0,0.12)",
                            color: "#ffb400",
                          }}
                        >
                          {browser === "edge"
                            ? "Instalar en Edge"
                            : browser === "firefox"
                              ? "Sin extensión"
                              : browser === "safari"
                                ? "Sin extensión"
                                : "No instalado"}
                        </span>
                      )}
                    </div>
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {keplrNotInstalled && browser === "edge"
                        ? "Click para abrir Edge Add-ons e instalar Keplr"
                        : oisyNotInstalled && browser === "edge"
                          ? "Click para abrir Chrome Web Store (compatible con Edge)"
                          : WALLET_DESC[adapter.id]}
                    </p>
                  </div>

                  {/* Spinner */}
                  {isConnecting && (
                    <Loader2
                      size={16}
                      className="animate-spin shrink-0"
                      style={{
                        color: isKeplr ? "#765AE2" : "var(--accent-color)",
                      }}
                    />
                  )}
                </button>

                {isOisy && oisyNotInstalled && <OisyInstallInstructions />}
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
