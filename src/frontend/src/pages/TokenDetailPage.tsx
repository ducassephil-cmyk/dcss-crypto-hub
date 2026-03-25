import { ChevronLeft, ExternalLink, TrendingUp } from "lucide-react";
import { useState } from "react";
import ActionModal from "../components/ActionModal";
import TokenCard from "../components/TokenCard";
import TokenVisual from "../components/TokenVisual";
import type { TokenWithMeta } from "../contexts/TokenContext";
import { useTokens } from "../contexts/TokenContext";
import { TOKEN_DEEP_DATA } from "../data/tokenDeepData";
import { NETWORK_COLORS, formatPrice } from "../data/tokens";

type ActionType = "buy" | "swap" | "send";

interface TokenDetailPageProps {
  symbol: string;
  onBack: () => void;
}

const FAKE_CHART_PATH =
  "M 0 80 C 30 70, 60 90, 90 65 S 150 40, 180 55 S 240 30, 270 45 S 330 20, 360 35 S 420 15, 450 30 S 510 10, 540 25";

export default function TokenDetailPage({
  symbol,
  onBack,
}: TokenDetailPageProps) {
  const { tokens } = useTokens();
  const token = tokens.find((t) => t.symbol === symbol);
  const [action, setAction] = useState<ActionType | null>(null);
  const deepData = TOKEN_DEEP_DATA[symbol];

  if (!token) {
    return (
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "40px 16px",
          textAlign: "center",
        }}
      >
        <p style={{ color: "#5A4A47" }}>Token no encontrado: {symbol}</p>
        <button
          type="button"
          onClick={onBack}
          style={{
            marginTop: "16px",
            color: "#00D4B8",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          ← Volver
        </button>
      </div>
    );
  }

  const networkColor = NETWORK_COLORS[token.network] ?? "#00D4B8";
  const isPositive = token.change24h >= 0;

  const marketCap = token.price * 1_000_000_000;
  const volume24h =
    token.price * (50_000 + Math.floor(token.symbol.charCodeAt(0) * 3000));

  const relatedTokens = tokens
    .filter((t) => t.network === token.network && t.symbol !== token.symbol)
    .slice(0, 3);

  function fmtLarge(n: number): string {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toFixed(2)}`;
  }

  return (
    <>
      <div
        style={{ maxWidth: "900px", margin: "0 auto", padding: "32px 16px" }}
      >
        {/* Breadcrumb */}
        <nav
          aria-label="breadcrumb"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "24px",
          }}
        >
          <button
            type="button"
            onClick={onBack}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              color: "#5A4A47",
              cursor: "pointer",
              fontSize: "13px",
              padding: "4px 8px",
              borderRadius: "6px",
            }}
            data-ocid="token.detail.back_button"
          >
            <ChevronLeft size={14} />
            Hub
          </button>
          <span style={{ color: "rgba(169,179,175,0.4)", fontSize: "13px" }}>
            /
          </span>
          <span style={{ color: networkColor, fontSize: "13px" }}>
            {token.network}
          </span>
          <span style={{ color: "rgba(169,179,175,0.4)", fontSize: "13px" }}>
            /
          </span>
          <span
            style={{ color: "#1C1C1C", fontSize: "13px", fontWeight: "600" }}
          >
            {token.symbol}
          </span>
        </nav>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "32px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: token.color,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "16px",
                fontWeight: "800",
                color: "#fff",
                boxShadow: `0 0 20px ${token.color}55`,
                flexShrink: 0,
              }}
            >
              {token.symbol.slice(0, 3)}
            </div>
            <div>
              <h1
                style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "#1C1C1C",
                  lineHeight: 1.2,
                }}
              >
                {token.name}
              </h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "4px",
                    background: `${networkColor}18`,
                    border: `1px solid ${networkColor}44`,
                    fontSize: "11px",
                    fontWeight: "700",
                    color: networkColor,
                    letterSpacing: "0.06em",
                  }}
                >
                  {token.network}
                </span>
                <span
                  style={{
                    fontSize: "12px",
                    color: "#5A4A47",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {token.symbol}
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontSize: "28px",
                fontWeight: "800",
                color: "#00D4B8",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              {formatPrice(token.price)}
            </div>
            <div
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: isPositive ? "#1DE9B6" : "#ef4444",
                marginTop: "2px",
              }}
            >
              {isPositive ? "+" : ""}
              {token.change24h.toFixed(2)}% (24h)
            </div>
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginTop: "12px",
                justifyContent: "flex-end",
              }}
            >
              {(["buy", "swap", "send"] as ActionType[]).map((a) => (
                <button
                  key={a}
                  type="button"
                  onClick={() => setAction(a)}
                  style={{
                    padding: "8px 16px",
                    borderRadius: "8px",
                    background:
                      a === "buy"
                        ? "linear-gradient(135deg, #E8A49C, #C4837A, #A65E5E)"
                        : "transparent",
                    border:
                      a === "buy" ? "none" : "1px solid rgba(196,131,122,0.5)",
                    color: a === "buy" ? "#FFF" : "#C4837A",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                    textTransform: "uppercase" as const,
                  }}
                  data-ocid={`token.detail.${a}.button`}
                >
                  {a.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tagline */}
        {deepData?.tagline && (
          <div
            style={{
              marginBottom: "24px",
              textAlign: "center",
            }}
            data-ocid="token.detail.section"
          >
            {deepData.tagline
              .split(".")
              .filter(Boolean)
              .map((word, i) => (
                <span
                  key={word}
                  style={{
                    display: "inline-block",
                    fontSize: "clamp(20px, 3vw, 28px)",
                    fontWeight: "900",
                    color: i % 2 === 0 ? networkColor : "#E8ECEB",
                    letterSpacing: "-0.02em",
                    marginRight: "0.4em",
                    fontFamily: "Bricolage Grotesque, sans-serif",
                    textShadow:
                      i % 2 === 0 ? `0 0 30px ${networkColor}55` : "none",
                  }}
                >
                  {word.trim()}.
                </span>
              ))}
          </div>
        )}

        {/* Chart placeholder */}
        <div
          style={{
            borderRadius: "12px",
            background: "#FFF8F5",
            border: "1px solid rgba(0,212,184,0.12)",
            padding: "20px",
            marginBottom: "24px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox="0 0 540 100"
            style={{ width: "100%", height: "120px", display: "block" }}
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(0,212,184,0.2)" />
                <stop offset="100%" stopColor="rgba(0,212,184,0)" />
              </linearGradient>
            </defs>
            <path
              d={`${FAKE_CHART_PATH} L 540 100 L 0 100 Z`}
              fill="url(#chartGrad)"
            />
            <path
              d={FAKE_CHART_PATH}
              fill="none"
              stroke="#00D4B8"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(255,248,245,0.85)",
              backdropFilter: "blur(4px)",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <TrendingUp
                size={24}
                style={{ color: "rgba(0,212,184,0.5)", margin: "0 auto 8px" }}
              />
              <p
                style={{
                  color: "#5A4A47",
                  fontSize: "14px",
                  fontWeight: "600",
                }}
              >
                Live Charts — Coming Soon
              </p>
            </div>
          </div>
        </div>

        {/* Unique Stats from deep data */}
        {deepData?.uniqueStats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${deepData.uniqueStats.length}, 1fr)`,
              gap: "12px",
              marginBottom: "24px",
            }}
            className="token-unique-stats"
          >
            {deepData.uniqueStats.map(({ label, value, sub }) => (
              <div
                key={label}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  background: `${networkColor}0a`,
                  border: `1px solid ${networkColor}22`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "800",
                    color: networkColor,
                    fontFamily: "JetBrains Mono, monospace",
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#1C1C1C",
                    marginTop: "4px",
                    fontWeight: "600",
                  }}
                >
                  {label}
                </div>
                {sub && (
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#5A4A47",
                      marginTop: "2px",
                    }}
                  >
                    {sub}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {!deepData?.uniqueStats && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "24px",
            }}
            className="token-stats-grid"
          >
            {[
              { label: "Market Cap", value: fmtLarge(marketCap) },
              { label: "Vol 24h", value: fmtLarge(volume24h) },
              { label: "Supply Circ.", value: "1B" },
              { label: "Supply Total", value: "1B" },
            ].map(({ label, value }) => (
              <div
                key={label}
                style={{
                  padding: "16px",
                  borderRadius: "10px",
                  background: "#FFF8F5",
                  border: "1px solid rgba(0,212,184,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "11px",
                    color: "#5A4A47",
                    marginBottom: "6px",
                  }}
                >
                  {label}
                </div>
                <div
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#1C1C1C",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Token Visualization */}
        <div className="my-6">
          <TokenVisual symbol={token.symbol} />
        </div>

        {/* Educational Section */}
        {deepData?.educationalSection && (
          <div
            style={{
              padding: "20px 24px",
              borderRadius: "10px",
              background: "#FFF8F5",
              borderLeft: `4px solid ${networkColor}`,
              border: `1px solid ${networkColor}22`,
              borderLeftWidth: "4px",
              borderLeftColor: networkColor,
              marginBottom: "24px",
            }}
            data-ocid="token.detail.panel"
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "800",
                color: networkColor,
                letterSpacing: "0.06em",
                textTransform: "uppercase" as const,
                marginBottom: "12px",
              }}
            >
              {deepData.educationalSection.title}
            </h3>
            <p style={{ fontSize: "14px", color: "#5A4A47", lineHeight: 1.75 }}>
              {deepData.educationalSection.content}
            </p>
          </div>
        )}

        {/* Description */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#FFF8F5",
            borderLeft: `4px solid ${networkColor}`,
            border: `1px solid ${networkColor}22`,
            borderLeftWidth: "4px",
            borderLeftColor: networkColor,
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: networkColor,
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              marginBottom: "10px",
            }}
          >
            Acerca de {token.name}
          </h3>
          <p style={{ fontSize: "14px", color: "#5A4A47", lineHeight: 1.7 }}>
            {token.description}
          </p>
        </div>

        {/* DCSS Integration */}
        <div
          style={{
            padding: "20px",
            borderRadius: "10px",
            background: "#FFF8F5",
            border: "1px solid rgba(0,212,184,0.12)",
            marginBottom: "24px",
          }}
        >
          <h3
            style={{
              fontSize: "13px",
              fontWeight: "700",
              color: "#00D4B8",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              marginBottom: "12px",
            }}
          >
            Integración DCSS
          </h3>
          <p
            style={{ fontSize: "13px", color: "#5A4A47", marginBottom: "12px" }}
          >
            Disponible en DCSS Hub vía{" "}
            <strong style={{ color: networkColor }}>{token.network}</strong>
          </p>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {["Buy", "Swap", "Send", "Bridge"].map((act) => (
              <span
                key={act}
                style={{
                  padding: "3px 10px",
                  borderRadius: "6px",
                  background: "rgba(0,212,184,0.08)",
                  border: "1px solid rgba(0,212,184,0.2)",
                  fontSize: "12px",
                  color: "#00D4B8",
                  fontWeight: "600",
                }}
              >
                {act}
              </span>
            ))}
          </div>
        </div>

        {/* External links */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "32px",
            flexWrap: "wrap",
          }}
        >
          <a
            href={token.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 18px",
              borderRadius: "8px",
              background: "transparent",
              border: "1px solid rgba(169,179,175,0.25)",
              color: "#5A4A47",
              fontSize: "13px",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            <ExternalLink size={13} />
            Sitio Oficial
          </a>
          {token.explorerUrl && (
            <a
              href={token.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 18px",
                borderRadius: "8px",
                background: "transparent",
                border: `1px solid ${networkColor}44`,
                color: networkColor,
                fontSize: "13px",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              <ExternalLink size={13} />
              Explorer
            </a>
          )}
        </div>

        {/* Related tokens */}
        {relatedTokens.length > 0 && (
          <div>
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: "#1C1C1C",
                marginBottom: "16px",
              }}
            >
              Más tokens en {token.network}
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "12px",
                overflowX: "auto" as const,
              }}
              className="related-grid"
            >
              {relatedTokens.map((t, i) => (
                <TokenCard key={t.symbol} token={t} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      {action && (
        <ActionModal
          open={!!action}
          onClose={() => setAction(null)}
          action={action}
          token={
            token as TokenWithMeta & {
              price: number;
              change24h: number;
              id: bigint;
            }
          }
        />
      )}

      <style>{`
        @media (max-width: 640px) {
          .token-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .token-unique-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .related-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
