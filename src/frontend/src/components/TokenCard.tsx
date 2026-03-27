import { Bell, Lock } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import type { TokenWithMeta } from "../contexts/TokenContext";
import { useWallet } from "../contexts/WalletContext";
import {
  NETWORK_COLORS,
  type TokenMeta,
  formatBalance,
  formatPrice,
  getTextColorForBg,
} from "../data/tokens";

interface TokenCardProps {
  token: TokenWithMeta;
  index: number;
  onNavigateToToken?: (symbol: string) => void;
}

function handleComingSoon(action: string) {
  toast("🔒 Coming Soon", {
    description: `${action} — disponible en Fase 4`,
    duration: 2500,
  });
}

function TokenLogo({
  token,
  textColor,
}: { token: TokenWithMeta; textColor: string }) {
  const [imgError, setImgError] = useState(false);
  if (token.logoUrl && !imgError) {
    return (
      <img
        src={token.logoUrl}
        alt={token.symbol}
        className="w-9 h-9 rounded-full object-cover shrink-0 shadow-md"
        onError={() => setImgError(true)}
      />
    );
  }
  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-md"
      style={{ background: token.color, color: textColor }}
    >
      {token.symbol.slice(0, 3)}
    </div>
  );
}

export default function TokenCard({
  token,
  index,
  onNavigateToToken,
}: TokenCardProps) {
  const { activeWallet, getBalance } = useWallet();
  const [hovered, setHovered] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const balance = activeWallet
    ? getBalance(activeWallet.network, activeWallet.address, token.symbol)
    : 0;

  const isPositive = token.change24h >= 0;
  const textColor = getTextColorForBg(token.color);
  const networkColor = NETWORK_COLORS[token.network] ?? "#00D4B8";

  return (
    <article
      className="neon-border rounded-xl p-4 flex flex-col gap-3 transition-all duration-200"
      style={{
        background: "#0F1513",
        boxShadow: hovered
          ? `0 0 20px ${token.color}60, 0 0 0 1px ${token.color}44`
          : `0 0 0px ${token.color}00`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        position: "relative",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setAlertOpen(false);
      }}
      data-ocid={`token.item.${index + 1}`}
    >
      {/* Network badge */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}
        title={token.network}
      >
        <div
          style={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: networkColor,
            boxShadow: `0 0 4px ${networkColor}88`,
          }}
        />
        <span
          style={{
            fontSize: "9px",
            fontWeight: "700",
            color: networkColor,
            letterSpacing: "0.06em",
            opacity: 0.85,
          }}
        >
          {token.network}
        </span>
      </div>

      {/* Price alert bell */}
      {hovered && (
        <div
          style={{
            position: "absolute",
            top: "8px",
            left: "8px",
          }}
        >
          <div style={{ position: "relative" }}>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setAlertOpen((v) => !v);
              }}
              className="flex items-center justify-center transition-colors"
              style={{
                width: "22px",
                height: "22px",
                borderRadius: "50%",
                background: alertOpen
                  ? "rgba(0,212,184,0.2)"
                  : "rgba(0,212,184,0.08)",
                border: "1px solid rgba(0,212,184,0.25)",
                color: "#00D4B8",
              }}
              title="Alertas de precio"
              data-ocid={`token.bell.${index + 1}.button`}
            >
              <Bell size={11} />
            </button>
            {alertOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "28px",
                  left: 0,
                  zIndex: 50,
                  background: "#0B1110",
                  border: "1px solid rgba(0,212,184,0.3)",
                  borderRadius: "8px",
                  padding: "8px 12px",
                  whiteSpace: "nowrap",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  fontSize: "11px",
                  color: "#A9B3AF",
                }}
              >
                <Lock size={10} style={{ color: "#C4837A" }} />
                Alertas de precio · Próximamente
              </div>
            )}
          </div>
        </div>
      )}

      {token.depin && (
        <div
          style={{
            position: "absolute",
            top: "28px",
            right: "10px",
            padding: "1px 6px",
            borderRadius: "4px",
            background: "rgba(0,212,184,0.12)",
            border: "1px solid rgba(0,212,184,0.35)",
            fontSize: "8px",
            fontWeight: "700",
            color: "#00D4B8",
            letterSpacing: "0.06em",
          }}
          title="Decentralized Physical Infrastructure"
        >
          DePIN
        </div>
      )}

      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <TokenLogo token={token} textColor={textColor} />
          <div>
            <button
              type="button"
              className="text-sm font-semibold text-left"
              style={{
                color: "#E8ECEB",
                background: "none",
                border: "none",
                padding: 0,
                cursor: onNavigateToToken ? "pointer" : "default",
                textDecoration:
                  onNavigateToToken && hovered ? "underline" : "none",
                textUnderlineOffset: "2px",
              }}
              onClick={() => onNavigateToToken?.(token.symbol)}
              data-ocid={`token.detail.${index + 1}.button`}
            >
              {token.name}
            </button>
            <div className="text-xs font-mono" style={{ color: "#A9B3AF" }}>
              {token.symbol}
            </div>
          </div>
        </div>
        <div className="text-right" style={{ paddingRight: "4px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "4px",
            }}
          >
            <div
              className="text-sm font-bold font-mono"
              style={{ color: "#00D4B8" }}
            >
              {formatPrice(token.price)}
            </div>
            {token.isLivePrice && (
              <span
                style={{
                  fontSize: "8px",
                  fontWeight: "700",
                  color: "#00D4B8",
                  background: "rgba(0,212,184,0.15)",
                  border: "1px solid rgba(0,212,184,0.3)",
                  borderRadius: "3px",
                  padding: "1px 3px",
                  letterSpacing: "0.05em",
                }}
              >
                LIVE
              </span>
            )}
          </div>
          <div
            className="text-xs font-mono"
            style={{ color: isPositive ? "#1DE9B6" : "#ef4444" }}
          >
            {isPositive ? "+" : ""}
            {token.change24h.toFixed(2)}%
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-between rounded-lg px-3 py-2"
        style={{
          background: "rgba(0,212,184,0.05)",
          border: "1px solid rgba(0,212,184,0.08)",
        }}
      >
        <span className="text-xs" style={{ color: "#A9B3AF" }}>
          Balance
        </span>
        <span
          className="text-xs font-mono font-medium"
          style={{ color: "#E8ECEB" }}
        >
          {formatBalance(balance)} {token.symbol}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => handleComingSoon("BUY")}
          className="flex-1 text-xs font-semibold py-1.5 rounded-lg transition-all relative"
          style={{
            background: "linear-gradient(135deg, #E8A49C, #C4837A, #A65E5E)",
            color: "#FFF",
          }}
          data-ocid={`token.buy_button.${index + 1}`}
          title="Coming Soon — Fase 4"
        >
          🔒 BUY
        </button>
        <button
          type="button"
          onClick={() => handleComingSoon("SWAP")}
          className="flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all"
          style={{
            background: "transparent",
            borderColor: "rgba(196,131,122,0.5)",
            color: "#C4837A",
          }}
          data-ocid={`token.swap_button.${index + 1}`}
          title="Coming Soon — Fase 4"
        >
          🔒 SWAP
        </button>
        <button
          type="button"
          onClick={() => handleComingSoon("SEND")}
          className="flex-1 text-xs font-semibold py-1.5 rounded-lg border transition-all"
          style={{
            background: "transparent",
            borderColor: "rgba(196,131,122,0.5)",
            color: "#C4837A",
          }}
          data-ocid={`token.send_button.${index + 1}`}
          title="Coming Soon — Fase 4"
        >
          🔒 SEND
        </button>
      </div>
    </article>
  );
}
