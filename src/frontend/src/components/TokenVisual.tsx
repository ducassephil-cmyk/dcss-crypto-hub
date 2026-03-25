import { useEffect, useRef, useState } from "react";

interface TokenVisualProps {
  symbol: string;
}

// Pyth live ticker sub-component
function PythTicker() {
  const BASE_PRICES: Record<string, number> = {
    BTC: 67800,
    ETH: 3420,
    SOL: 185.3,
    ICP: 12.45,
    ATOM: 11.2,
  };
  const [prices, setPrices] = useState(BASE_PRICES);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setPrices((prev) => {
        const next = { ...prev };
        for (const key of Object.keys(next)) {
          const change = (Math.random() - 0.5) * 0.004;
          next[key] = next[key] * (1 + change);
        }
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const prevPricesRef = useRef(BASE_PRICES);

  return (
    <div
      style={{
        background: "#000",
        border: "1px solid #00D4B844",
        borderRadius: "8px",
        padding: "12px 16px",
        fontFamily: "JetBrains Mono, monospace",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          color: "#00D4B8",
          letterSpacing: "0.15em",
          marginBottom: "10px",
          opacity: 0.7,
        }}
      >
        PYTH PRICE FEED — SIMULATED
      </div>
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
        {Object.entries(prices).map(([sym, price]) => {
          const prev = prevPricesRef.current[sym];
          const isUp = price >= prev;
          return (
            <div key={sym} style={{ minWidth: "90px" }}>
              <div
                style={{ fontSize: "10px", color: "#888", marginBottom: "2px" }}
              >
                {sym}/USD
              </div>
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: isUp ? "#00D4B8" : "#ef4444",
                }}
              >
                {isUp ? "▲" : "▼"}{" "}
                {price >= 1000
                  ? `$${price.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
                  : `$${price.toFixed(3)}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TokenVisual({ symbol }: TokenVisualProps) {
  const [btcTab, setBtcTab] = useState<"user" | "investor" | "developer">(
    "user",
  );

  switch (symbol) {
    case "ICP":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(41,171,226,0.06)",
            border: "1px solid rgba(41,171,226,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "24px",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {["Tamperproof.", "Unstoppable.", "Sovereign."].map((word) => (
              <div
                key={word}
                style={{
                  fontSize: "clamp(20px, 4vw, 32px)",
                  fontWeight: "800",
                  color: "#00D4B8",
                  textShadow: "0 0 20px rgba(0,212,184,0.5)",
                  lineHeight: 1.3,
                }}
              >
                {word}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#29ABE2",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            Apps corriendo 100% on-chain en ICP
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {[
              {
                emoji: "☕",
                name: "Caffeine",
                desc: "Build apps on-chain directly",
              },
              {
                emoji: "👛",
                name: "OISY Wallet",
                desc: "Self-custody wallet on-chain",
              },
              {
                emoji: "💬",
                name: "OpenChat",
                desc: "Decentralized messaging dapp",
              },
              {
                emoji: "💧",
                name: "WaterNeuron",
                desc: "Liquid staking for ICP",
              },
            ].map((app) => (
              <div
                key={app.name}
                style={{
                  background: "rgba(41,171,226,0.08)",
                  border: "1px solid rgba(41,171,226,0.2)",
                  borderRadius: "8px",
                  padding: "12px",
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ fontSize: "22px" }}>{app.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: "#E8ECEB",
                    }}
                  >
                    {app.name}
                  </div>
                  <div style={{ fontSize: "11px", color: "#A9B3AF" }}>
                    {app.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "BTC":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(247,147,26,0.06)",
            border: "1px solid rgba(247,147,26,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "24px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                emoji: "₿",
                label: "21M máximo",
                sub: "Supply fijo para siempre",
              },
              {
                emoji: "⏰",
                label: "Halving cada 4 años",
                sub: "Deflación programada",
              },
              {
                emoji: "🚫",
                label: "Sin banco central",
                sub: "Descentralizado total",
              },
            ].map((prop) => (
              <div
                key={prop.label}
                style={{ textAlign: "center", minWidth: "100px" }}
              >
                <div style={{ fontSize: "28px", marginBottom: "6px" }}>
                  {prop.emoji}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#F7931A",
                  }}
                >
                  {prop.label}
                </div>
                <div style={{ fontSize: "11px", color: "#A9B3AF" }}>
                  {prop.sub}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "8px",
              marginBottom: "16px",
              justifyContent: "center",
            }}
          >
            {(["user", "investor", "developer"] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setBtcTab(tab)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                  border:
                    btcTab === tab
                      ? "1px solid #F7931A"
                      : "1px solid rgba(247,147,26,0.25)",
                  background:
                    btcTab === tab ? "rgba(247,147,26,0.15)" : "transparent",
                  color: btcTab === tab ? "#F7931A" : "#A9B3AF",
                  transition: "all 0.2s",
                }}
              >
                {tab === "user"
                  ? "Para el Usuario"
                  : tab === "investor"
                    ? "Para el Inversor"
                    : "Para el Desarrollador"}
              </button>
            ))}
          </div>

          <div
            style={{
              padding: "16px",
              borderRadius: "8px",
              background: "rgba(247,147,26,0.06)",
              border: "1px solid rgba(247,147,26,0.15)",
              fontSize: "14px",
              color: "#A9B3AF",
              lineHeight: 1.7,
              minHeight: "70px",
            }}
          >
            {btcTab === "user" &&
              "Bitcoin es dinero digital que puedes enviar a cualquier persona del mundo sin necesitar un banco. Instala una wallet, recibe tu primera fracción de BTC, y eres parte de la red financiera más grande del mundo."}
            {btcTab === "investor" &&
              "Con suministro máximo de 21 millones y halvings cada 4 años, Bitcoin tiene la política monetaria más predecible de la historia. Cada halving reduce la emisión a la mitad, históricamente impulsando el precio."}
            {btcTab === "developer" &&
              "Lightning Network permite pagos instantáneos sobre Bitcoin. Taproot habilitó smart contracts simples. Con Ordinals y BRC-20, Bitcoin ahora soporta NFTs y tokens nativos directamente en L1."}
          </div>
        </div>
      );

    case "ETH":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(98,126,234,0.06)",
            border: "1px solid rgba(98,126,234,0.2)",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span
              style={{
                fontSize: "12px",
                color: "#627EEA",
                letterSpacing: "0.1em",
              }}
            >
              ECOSISTEMA ETHEREUM + L2s
            </span>
          </div>
          <div
            style={{
              position: "relative",
              height: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {/* ETH center */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(98,126,234,0.25)",
                border: "3px solid #627EEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                boxShadow: "0 0 24px rgba(98,126,234,0.5)",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#627EEA",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                ETH
                <br />
                L1
              </span>
            </div>
            {/* Orbit rings */}
            <div
              style={{
                position: "absolute",
                width: "150px",
                height: "80px",
                border: "1px dashed rgba(98,126,234,0.3)",
                borderRadius: "50%",
                animation: "orbit-rotate 12s linear infinite",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: "230px",
                height: "110px",
                border: "1px dashed rgba(0,82,255,0.25)",
                borderRadius: "50%",
                animation: "orbit-rotate2 18s linear infinite",
              }}
            />
            {/* Arbitrum node */}
            <div
              style={{
                position: "absolute",
                top: "24px",
                left: "calc(50% - 90px)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(18,170,255,0.18)",
                border: "2px solid #12AAFF",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 14px rgba(18,170,255,0.4)",
              }}
            >
              <span
                style={{ fontSize: "9px", fontWeight: "700", color: "#12AAFF" }}
              >
                ARB
              </span>
              <span style={{ fontSize: "7px", color: "#12AAFF", opacity: 0.7 }}>
                SHELL·ATH
              </span>
            </div>
            {/* Base node */}
            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "calc(50% - 100px)",
                width: "52px",
                height: "52px",
                borderRadius: "50%",
                background: "rgba(0,82,255,0.18)",
                border: "2px solid #0052FF",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 14px rgba(0,82,255,0.4)",
              }}
            >
              <span
                style={{ fontSize: "9px", fontWeight: "700", color: "#0052FF" }}
              >
                BASE
              </span>
              <span style={{ fontSize: "7px", color: "#0052FF", opacity: 0.7 }}>
                KAITO·VRT
              </span>
            </div>
          </div>
          <style>{`
            @keyframes orbit-rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            @keyframes orbit-rotate2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
            @media (prefers-reduced-motion: reduce) {
              [style*="orbit-rotate"] { animation: none !important; }
            }
          `}</style>
        </div>
      );

    case "DOT":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(230,0,122,0.06)",
            border: "1px solid rgba(230,0,122,0.2)",
            padding: "24px",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "8px" }}>
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                borderRadius: "999px",
                background: "rgba(230,0,122,0.15)",
                border: "1px solid rgba(230,0,122,0.4)",
                fontSize: "11px",
                fontWeight: "700",
                color: "#E6007A",
                letterSpacing: "0.1em",
                marginBottom: "20px",
              }}
            >
              Shared Security
            </span>
          </div>
          <div
            style={{
              position: "relative",
              height: "160px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Relay chain */}
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                background: "rgba(230,0,122,0.2)",
                border: "3px solid #E6007A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 24px rgba(230,0,122,0.4)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#E6007A",
                  textAlign: "center",
                  lineHeight: 1.2,
                }}
              >
                DOT
                <br />
                <span style={{ fontSize: "9px", opacity: 0.7 }}>Relay</span>
              </span>
            </div>
            {/* Ellipse orbit */}
            <div
              style={{
                position: "absolute",
                width: "220px",
                height: "90px",
                border: "1px dashed rgba(62,175,221,0.4)",
                borderRadius: "50%",
              }}
            />
            {/* TRAC parachain */}
            <div
              style={{
                position: "absolute",
                right: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "rgba(62,175,221,0.18)",
                border: "2px solid #3EAFDD",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 14px rgba(62,175,221,0.4)",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#3EAFDD",
                }}
              >
                TRAC
              </span>
              <span style={{ fontSize: "8px", color: "#3EAFDD", opacity: 0.7 }}>
                Parachain
              </span>
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#A9B3AF",
              marginTop: "8px",
            }}
          >
            Cada parachain es soberana pero comparte la seguridad del Relay
            Chain DOT
          </p>
        </div>
      );

    case "ATOM":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(111,115,144,0.06)",
            border: "1px solid rgba(111,115,144,0.2)",
            padding: "24px",
          }}
        >
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                fontSize: "12px",
                color: "#6F7390",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              TPS COMPARATIVO (IBC vs competidores)
            </div>
            {[
              { label: "IBC / Cosmos", tps: 10000, color: "#6F7390", pct: 100 },
              { label: "Ethereum", tps: 15, color: "#627EEA", pct: 0.15 },
              { label: "Bitcoin", tps: 7, color: "#F7931A", pct: 0.07 },
            ].map((item) => (
              <div key={item.label} style={{ marginBottom: "12px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: "#E8ECEB" }}>{item.label}</span>
                  <span
                    style={{
                      color: item.color,
                      fontFamily: "JetBrains Mono, monospace",
                      fontWeight: "700",
                    }}
                  >
                    {item.tps.toLocaleString()} TPS
                  </span>
                </div>
                <div
                  style={{
                    height: "8px",
                    borderRadius: "4px",
                    background: "rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      borderRadius: "4px",
                      background: item.color,
                      width: `${item.pct}%`,
                      minWidth: "4px",
                      boxShadow: `0 0 8px ${item.color}66`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#6F7390",
              letterSpacing: "0.08em",
              marginBottom: "10px",
            }}
          >
            ECOSISTEMA IBC
          </div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { sym: "ATOM", color: "#6F7390" },
              { sym: "ASI", color: "#1B2B4B" },
              { sym: "AKT", color: "#FF414C" },
              { sym: "DVPN", color: "#4AB44A" },
              { sym: "INJ", color: "#00F2FE" },
            ].map((t) => (
              <div
                key={t.sym}
                style={{
                  padding: "4px 10px",
                  borderRadius: "999px",
                  background: `${t.color}18`,
                  border: `1px solid ${t.color}55`,
                  fontSize: "11px",
                  fontWeight: "700",
                  color: t.color,
                }}
              >
                {t.sym}
              </div>
            ))}
          </div>
        </div>
      );

    case "TIA":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(123,47,190,0.06)",
            border: "1px solid rgba(123,47,190,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#7B2FBE",
              letterSpacing: "0.1em",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            ARQUITECTURA MODULAR CELESTIA
          </div>
          {[
            {
              label: "DA Layer",
              desc: "Disponibilidad de datos — verifica sin ejecutar",
              color: "#7B2FBE",
            },
            {
              label: "Consensus Layer",
              desc: "Ordena bloques sin procesar transacciones",
              color: "#00D4FF",
            },
            {
              label: "Execution Layer",
              desc: "Las apps deciden su propio entorno de ejecución",
              color: "#888",
            },
          ].map((layer, i) => (
            <div
              key={layer.label}
              style={{
                padding: "14px 16px",
                borderRadius: "8px",
                background: `${layer.color}12`,
                border: `1px solid ${layer.color}44`,
                marginBottom: i < 2 ? "8px" : 0,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: "700",
                  color: layer.color,
                }}
              >
                {layer.label}
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "#A9B3AF",
                  maxWidth: "55%",
                  textAlign: "right",
                }}
              >
                {layer.desc}
              </span>
            </div>
          ))}
        </div>
      );

    case "AKT":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(255,65,76,0.06)",
            border: "1px solid rgba(255,65,76,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#FF414C",
              letterSpacing: "0.1em",
              marginBottom: "16px",
            }}
          >
            AKASH VS AWS — NVIDIA H100 GPU/hr
          </div>
          {[
            { label: "AWS", price: "$3.93/hr", pct: 100, color: "#ef4444" },
            {
              label: "Akash Network",
              price: "$1.33/hr",
              pct: 34,
              color: "#FF414C",
            },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#E8ECEB", fontWeight: "600" }}>
                  {item.label}
                </span>
                <span
                  style={{
                    color: item.color,
                    fontFamily: "JetBrains Mono, monospace",
                    fontWeight: "800",
                  }}
                >
                  {item.price}
                </span>
              </div>
              <div
                style={{
                  height: "12px",
                  borderRadius: "6px",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "6px",
                    background: item.color,
                    width: `${item.pct}%`,
                    boxShadow: `0 0 8px ${item.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(255,65,76,0.1)",
              border: "1px solid rgba(255,65,76,0.3)",
              fontSize: "14px",
              fontWeight: "700",
              color: "#FF414C",
              textAlign: "center",
            }}
          >
            💡 66% de ahorro vs AWS
          </div>
        </div>
      );

    case "SOL":
      return (
        <div
          style={{
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(153,69,255,0.08) 0%, rgba(0,255,163,0.04) 100%)",
            border: "1px solid rgba(153,69,255,0.25)",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              textAlign: "center",
            }}
          >
            {[
              { value: "65,000", label: "TPS", unit: "transacciones/s" },
              { value: "$0.00025", label: "Fee avg", unit: "por transacción" },
              {
                value: "<400ms",
                label: "Finalidad",
                unit: "tiempo confirmación",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "16px 8px",
                  borderRadius: "10px",
                  background: "rgba(153,69,255,0.1)",
                  border: "1px solid rgba(153,69,255,0.25)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(18px, 3vw, 24px)",
                    fontWeight: "800",
                    color: "#9945FF",
                    fontFamily: "JetBrains Mono, monospace",
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#00FFA3",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#A9B3AF",
                    marginTop: "2px",
                  }}
                >
                  {stat.unit}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "PYTH":
      return <PythTicker />;

    case "INJ":
      return (
        <div
          style={{
            borderRadius: "12px",
            background:
              "linear-gradient(135deg, rgba(0,242,254,0.06) 0%, rgba(7,11,10,0.95) 100%)",
            border: "1px solid rgba(0,242,254,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "12px",
              textAlign: "center",
            }}
          >
            {[
              { value: "0.64s", label: "Block Time" },
              { value: "~$0.001", label: "Fee/TX" },
              { value: "25,000+", label: "TPS" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "16px 8px",
                  borderRadius: "10px",
                  background: "rgba(0,242,254,0.08)",
                  border: "1px solid rgba(0,242,254,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(18px, 3vw, 24px)",
                    fontWeight: "800",
                    color: "#00F2FE",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#A9B3AF",
                    marginTop: "4px",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#A9B3AF",
              marginTop: "16px",
            }}
          >
            Order book completamente on-chain, sin gas fees para trading de
            derivados
          </p>
        </div>
      );

    case "MINA":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(231,172,87,0.06)",
            border: "1px solid rgba(231,172,87,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "13px",
              fontWeight: "700",
              color: "#E7AC57",
              marginBottom: "20px",
            }}
          >
            La blockchain más liviana del mundo
          </div>
          {[
            { label: "Bitcoin", size: "500GB", pct: 100, color: "#F7931A" },
            { label: "Mina", size: "22KB", pct: 0.5, color: "#E7AC57" },
          ].map((item) => (
            <div key={item.label} style={{ marginBottom: "14px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "13px",
                  marginBottom: "6px",
                }}
              >
                <span style={{ color: "#E8ECEB", fontWeight: "600" }}>
                  {item.label}
                </span>
                <span
                  style={{
                    fontFamily: "JetBrains Mono, monospace",
                    color: item.color,
                    fontWeight: "700",
                  }}
                >
                  {item.size}
                </span>
              </div>
              <div
                style={{
                  height: "14px",
                  borderRadius: "7px",
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "7px",
                    background: item.color,
                    width: `${item.pct}%`,
                    minWidth: "6px",
                    boxShadow: `0 0 8px ${item.color}66`,
                  }}
                />
              </div>
            </div>
          ))}
          <p
            style={{
              fontSize: "12px",
              color: "#A9B3AF",
              marginTop: "12px",
              textAlign: "center",
            }}
          >
            zk-SNARKs permiten verificar toda la cadena en solo 22KB — corre en
            un celular
          </p>
        </div>
      );

    case "TAO":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(54,161,139,0.06)",
            border: "1px solid rgba(54,161,139,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#36A18B",
              letterSpacing: "0.1em",
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            SUBNET NETWORK — RED DE IA DESCENTRALIZADA
          </div>
          <svg
            viewBox="0 0 280 160"
            style={{ width: "100%", height: "160px" }}
            aria-hidden="true"
          >
            {(
              [
                { x: 140, y: 80, id: "c0" },
                { x: 60, y: 30, id: "n1" },
                { x: 220, y: 30, id: "n2" },
                { x: 30, y: 100, id: "n3" },
                { x: 250, y: 100, id: "n4" },
                { x: 90, y: 140, id: "n5" },
                { x: 190, y: 140, id: "n6" },
                { x: 140, y: 20, id: "n7" },
                { x: 70, y: 80, id: "n8" },
                { x: 210, y: 80, id: "n9" },
                { x: 120, y: 115, id: "n10" },
                { x: 160, y: 115, id: "n11" },
                { x: 50, y: 55, id: "n12" },
                { x: 230, y: 55, id: "n13" },
                { x: 140, y: 145, id: "n14" },
              ] as Array<{ x: number; y: number; id: string }>
            ).map(({ x, y, id }) => (
              <g key={id}>
                {id !== "c0" && (
                  <line
                    x1={140}
                    y1={80}
                    x2={x}
                    y2={y}
                    stroke="rgba(54,161,139,0.2)"
                    strokeWidth="1"
                  />
                )}
                <circle
                  cx={x}
                  cy={y}
                  r={id === "c0" ? 10 : 5}
                  fill={id === "c0" ? "#36A18B" : "rgba(54,161,139,0.5)"}
                  stroke="#36A18B"
                  strokeWidth="1"
                />
                {id === "c0" && (
                  <text
                    x={x}
                    y={y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#000"
                    fontSize="7"
                    fontWeight="bold"
                  >
                    TAO
                  </text>
                )}
              </g>
            ))}
          </svg>
        </div>
      );

    case "GRT":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(103,71,237,0.06)",
            border: "1px solid rgba(103,71,237,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#6747ED",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            FLUJO DE DATOS — THE GRAPH
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Tu App", color: "#00D4B8" },
              { label: "Query", color: "#6747ED" },
              { label: "Subgraph", color: "#F5A623" },
              { label: "Blockchain", color: "#627EEA" },
            ].map((box, i) => (
              <div
                key={box.label}
                style={{ display: "flex", alignItems: "center", gap: "4px" }}
              >
                <div
                  style={{
                    padding: "10px 14px",
                    borderRadius: "8px",
                    background: `${box.color}14`,
                    border: `1px solid ${box.color}55`,
                    fontSize: "12px",
                    fontWeight: "700",
                    color: box.color,
                    whiteSpace: "nowrap" as const,
                  }}
                >
                  {box.label}
                </div>
                {i < 3 && (
                  <span
                    style={{
                      color: "#A9B3AF",
                      fontSize: "18px",
                      lineHeight: 1,
                    }}
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#A9B3AF",
              marginTop: "14px",
            }}
          >
            DCSS usará The Graph para el activity feed on-chain en Fase 3
          </p>
        </div>
      );

    case "RENDER":
    case "IO":
    case "GRASS":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(0,212,184,0.04)",
            border: "1px solid rgba(0,212,184,0.15)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#00D4B8",
              letterSpacing: "0.1em",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            RED DISTRIBUIDA DE NODOS
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
            }}
          >
            {[
              {
                label: "GPU Node 1",
                cat:
                  symbol === "RENDER"
                    ? "Rendering"
                    : symbol === "IO"
                      ? "ML Compute"
                      : "Web Data",
                color: "#00D4B8",
              },
              {
                label: "GPU Node 2",
                cat: "High Performance",
                color: "#36A18B",
              },
              { label: "GPU Node 3", cat: "Data Center", color: "#29ABE2" },
              { label: "GPU Node 4", cat: "Individual", color: "#9945FF" },
              {
                label: "HUB",
                cat:
                  symbol === "RENDER"
                    ? "RENDER"
                    : symbol === "IO"
                      ? "IO"
                      : "GRASS",
                color: "#FFD700",
                center: true,
              },
              { label: "GPU Node 5", cat: "Mining Rig", color: "#E6007A" },
              { label: "GPU Node 6", cat: "Cloud Node", color: "#F7931A" },
              { label: "GPU Node 7", cat: "Edge Server", color: "#00D4FF" },
              { label: "GPU Node 8", cat: "Enterprise", color: "#6747ED" },
            ].map((node) => (
              <div
                key={node.label}
                style={{
                  padding: "10px 6px",
                  borderRadius: "8px",
                  background: `${node.color}10`,
                  border: `1px solid ${node.color}44`,
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    fontWeight: "700",
                    color: node.color,
                  }}
                >
                  {node.center ? `● ${node.cat}` : node.label}
                </div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#A9B3AF",
                    marginTop: "2px",
                  }}
                >
                  {node.center ? "Protocol Hub" : node.cat}
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "NEAR":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(0,192,139,0.06)",
            border: "1px solid rgba(0,192,139,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#00C08B",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            CHAIN ABSTRACTION
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {[
              {
                label: "Tu Intent",
                sub: "Lo que quieres hacer",
                color: "#E8ECEB",
              },
              {
                label: "NEAR resuelve",
                sub: "Encuentra el mejor camino",
                color: "#00C08B",
              },
              {
                label: "Cualquier chain",
                sub: "ETH · SOL · BTC · COSMOS",
                color: "#A9B3AF",
              },
            ].map((box, i) => (
              <div
                key={box.label}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div
                  style={{
                    padding: "14px 16px",
                    borderRadius: "10px",
                    background:
                      i === 1
                        ? "rgba(0,192,139,0.12)"
                        : "rgba(255,255,255,0.04)",
                    border:
                      i === 1
                        ? "2px solid #00C08B"
                        : "1px solid rgba(255,255,255,0.1)",
                    textAlign: "center",
                    minWidth: "110px",
                    boxShadow:
                      i === 1 ? "0 0 18px rgba(0,192,139,0.3)" : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "700",
                      color: box.color,
                    }}
                  >
                    {box.label}
                  </div>
                  <div
                    style={{
                      fontSize: "10px",
                      color: "#A9B3AF",
                      marginTop: "4px",
                    }}
                  >
                    {box.sub}
                  </div>
                </div>
                {i < 2 && (
                  <span style={{ fontSize: "20px", color: "#00C08B" }}>→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      );

    case "0G":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(0,212,255,0.04)",
            border: "1px solid rgba(0,212,255,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#00D4FF",
              letterSpacing: "0.1em",
              marginBottom: "14px",
              textAlign: "center",
            }}
          >
            ARQUITECTURA MODULAR 0G
          </div>
          {[
            "Storage Network",
            "DA Network (Data Availability)",
            "Compute Network",
            "Settlement Layer",
            "Execution Layer",
            "Consensus Layer",
            "P2P Network Layer",
          ].map((layer, i) => (
            <div
              key={layer}
              style={{
                padding: "9px 14px",
                borderRadius: "6px",
                background: `rgba(0,212,255,${0.04 + i * 0.015})`,
                border: "1px solid rgba(0,212,255,0.18)",
                fontSize: "12px",
                fontWeight: "600",
                color: `rgba(0,212,255,${0.6 + i * 0.06})`,
                marginBottom: i < 6 ? "6px" : 0,
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  background: "rgba(0,212,255,0.15)",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  flexShrink: 0,
                }}
              >
                {7 - i}
              </span>
              {layer}
            </div>
          ))}
        </div>
      );

    case "CLP":
      return (
        <div
          style={{
            borderRadius: "12px",
            border: "1px solid rgba(213,43,30,0.3)",
            overflow: "hidden",
          }}
        >
          {/* Reserve bar */}
          <div style={{ padding: "20px", background: "rgba(213,43,30,0.06)" }}>
            <div
              style={{
                fontSize: "11px",
                color: "#A9B3AF",
                letterSpacing: "0.1em",
                marginBottom: "10px",
              }}
            >
              RESERVAS CLP TOKEN
            </div>
            <div
              style={{
                height: "24px",
                borderRadius: "12px",
                overflow: "hidden",
                display: "flex",
              }}
            >
              <div
                style={{
                  width: "35%",
                  background: "#D52B1E",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                35% Líquido
              </div>
              <div
                style={{
                  width: "65%",
                  background: "#003DA5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "#fff",
                }}
              >
                65% Staking
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "10px",
                color: "#A9B3AF",
                marginTop: "6px",
              }}
            >
              <span>Para traders y liquidez</span>
              <span>Bloqueado en staking largo plazo</span>
            </div>
          </div>

          {/* Comparativa */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(0,61,165,0.06)",
              borderTop: "1px solid rgba(213,43,30,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#A9B3AF",
                letterSpacing: "0.1em",
                marginBottom: "10px",
              }}
            >
              COMPARATIVA DE STABLECOINS
            </div>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "11px",
                  minWidth: "300px",
                }}
              >
                <thead>
                  <tr>
                    {["Aspecto", "DAI", "USDC", "CLP Token", "Terra"].map(
                      (h) => (
                        <th
                          key={h}
                          style={{
                            padding: "6px 8px",
                            textAlign: "left" as const,
                            color: h === "CLP Token" ? "#D52B1E" : "#A9B3AF",
                            fontWeight: "700",
                            borderBottom:
                              h === "CLP Token"
                                ? "2px solid #D52B1E"
                                : "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {[
                    [
                      "Respaldo",
                      "ETH/USDC",
                      "Fiat 1:1",
                      "USDT/USDC",
                      "LUNA (volátil)",
                    ],
                    [
                      "Gobernanza",
                      "DAO",
                      "Centralizada",
                      "Comité+Quórum",
                      "Algoritmo",
                    ],
                    [
                      "Auditorías",
                      "On-chain",
                      "Mensuales",
                      "Planificadas",
                      "Ninguna",
                    ],
                    ["Riesgo", "Medio", "Bajo", "Bajo", "🔴 Colapsó"],
                  ].map((row) => (
                    <tr key={row[0]}>
                      {row.map((cell, i) => (
                        <td
                          key={`${row[0]}-${i}`}
                          style={{
                            padding: "6px 8px",
                            color:
                              i === 3
                                ? "#E8ECEB"
                                : i === 4
                                  ? "#ef4444"
                                  : "#A9B3AF",
                            borderBottom: "1px solid rgba(255,255,255,0.05)",
                            fontWeight: i === 3 ? "600" : "400",
                            background:
                              i === 3 ? "rgba(213,43,30,0.06)" : "transparent",
                          }}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Why not Terra */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(7,11,10,0.6)",
              borderTop: "1px solid rgba(213,43,30,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#D52B1E",
                letterSpacing: "0.1em",
                marginBottom: "10px",
              }}
            >
              ¿POR QUÉ NO COLAPSARÁ COMO TERRA?
            </div>
            {[
              {
                icon: "✅",
                text: "Reservas reales en USDT/USDC — sin algoritmo ni colateral volátil",
              },
              {
                icon: "✅",
                text: "Liquidez garantizada 30-40% — elimina riesgo de bank run",
              },
              {
                icon: "✅",
                text: "Gobernanza filtrada con guardianes de emergencia anti-ataques",
              },
            ].map((point) => (
              <div
                key={point.text}
                style={{
                  display: "flex",
                  gap: "8px",
                  fontSize: "12px",
                  color: "#A9B3AF",
                  marginBottom: "8px",
                  alignItems: "flex-start",
                }}
              >
                <span style={{ flexShrink: 0 }}>{point.icon}</span>
                {point.text}
              </div>
            ))}
          </div>

          {/* Roadmap CLP */}
          <div
            style={{
              padding: "16px 20px",
              background: "rgba(0,61,165,0.04)",
              borderTop: "1px solid rgba(213,43,30,0.15)",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                color: "#003DA5",
                letterSpacing: "0.1em",
                marginBottom: "12px",
              }}
            >
              ROADMAP CLP
            </div>
            {[
              {
                phase: "Fase 1",
                desc: "Emisión inicial respaldada en USDT/USDC",
                done: false,
              },
              {
                phase: "Fase 2",
                desc: "OPCIONAL (gov comunidad) — Integración bancaria CLP fiat",
                done: false,
              },
              {
                phase: "Fase 3",
                desc: "Expansión vía puentes Wormhole/LayerZero a EVM/Solana",
                done: false,
              },
              {
                phase: "Fase 4",
                desc: "Gobernanza descentralizada con comité y guardianes",
                done: false,
              },
              {
                phase: "Fase 5",
                desc: "OPCIONAL (gov comunidad) — Auditorías externas y adopción masiva",
                done: false,
              },
            ].map((phase, i) => (
              <div
                key={phase.phase}
                style={{
                  display: "flex",
                  gap: "12px",
                  marginBottom: i < 4 ? "12px" : 0,
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column" as const,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      background: "rgba(0,61,165,0.3)",
                      border: "2px solid #003DA5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "9px",
                      fontWeight: "700",
                      color: "#003DA5",
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </div>
                  {i < 4 && (
                    <div
                      style={{
                        width: "1px",
                        height: "20px",
                        background: "rgba(0,61,165,0.3)",
                        marginTop: "2px",
                      }}
                    />
                  )}
                </div>
                <div style={{ paddingTop: "2px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#003DA5",
                    }}
                  >
                    {phase.phase}
                  </div>
                  <div style={{ fontSize: "11px", color: "#A9B3AF" }}>
                    {phase.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "LINK":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(55,91,210,0.06)",
            border: "1px solid rgba(55,91,210,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#375BD2",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            CHAINLINK — EL ORÁCULO DE DEFI
          </div>
          <svg
            viewBox="0 0 280 180"
            style={{ width: "100%", height: "180px" }}
            aria-hidden="true"
          >
            <circle
              cx="140"
              cy="90"
              r="22"
              fill="rgba(55,91,210,0.3)"
              stroke="#375BD2"
              strokeWidth="2"
            />
            <text
              x="140"
              y="87"
              textAnchor="middle"
              fill="#375BD2"
              fontSize="9"
              fontWeight="bold"
            >
              LINK
            </text>
            <text
              x="140"
              y="98"
              textAnchor="middle"
              fill="#375BD2"
              fontSize="7"
            >
              Oracle
            </text>
            {(
              [
                { x: 60, y: 35, name: "Aave" },
                { x: 220, y: 35, name: "Compound" },
                { x: 30, y: 110, name: "Uniswap" },
                { x: 250, y: 110, name: "GMX" },
                { x: 80, y: 160, name: "Synthetix" },
                { x: 200, y: 160, name: "Venus" },
              ] as Array<{ x: number; y: number; name: string }>
            ).map(({ x, y, name }) => (
              <g key={name}>
                <line
                  x1="140"
                  y1="90"
                  x2={x}
                  y2={y}
                  stroke="rgba(55,91,210,0.35)"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="14"
                  fill="rgba(55,91,210,0.15)"
                  stroke="#375BD2"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#375BD2"
                  fontSize="8"
                  fontWeight="600"
                >
                  {name}
                </text>
              </g>
            ))}
          </svg>
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#A9B3AF",
              marginTop: "8px",
            }}
          >
            Sin Chainlink, la mayoría del DeFi no podría funcionar
          </p>
        </div>
      );

    case "API3":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(54,67,217,0.06)",
            border: "1px solid rgba(54,67,217,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#3643D9",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            API3 — ORÁCULOS DE PRIMERA PARTE
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(255,100,100,0.08)",
                border: "1px solid rgba(255,100,100,0.3)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#ef4444",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                Tradicional (Chainlink)
              </div>
              {(["API", "Nodo Chainlink", "Smart Contract"] as string[]).map(
                (s, i) => (
                  <div
                    key={s}
                    style={{
                      textAlign: "center",
                      marginBottom: i < 2 ? "4px" : 0,
                    }}
                  >
                    <div
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        fontSize: "11px",
                        color: "#A9B3AF",
                      }}
                    >
                      {s}
                    </div>
                    {i < 2 && (
                      <div
                        style={{
                          color: "#ef4444",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ),
              )}
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#ef4444",
                }}
              >
                3 saltos — riesgo extra
              </div>
            </div>
            <div
              style={{
                padding: "16px",
                borderRadius: "10px",
                background: "rgba(54,67,217,0.1)",
                border: "1px solid rgba(54,67,217,0.4)",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#3643D9",
                  marginBottom: "12px",
                  textAlign: "center",
                }}
              >
                API3 (1st Party)
              </div>
              {(["API (con Airnode)", "Smart Contract"] as string[]).map(
                (s, i) => (
                  <div
                    key={s}
                    style={{
                      textAlign: "center",
                      marginBottom: i < 1 ? "4px" : 0,
                    }}
                  >
                    <div
                      style={{
                        padding: "8px",
                        borderRadius: "6px",
                        background: "rgba(54,67,217,0.15)",
                        border: "1px solid rgba(54,67,217,0.3)",
                        fontSize: "11px",
                        color: "#8B9FFF",
                      }}
                    >
                      {s}
                    </div>
                    {i < 1 && (
                      <div
                        style={{
                          color: "#3643D9",
                          fontSize: "14px",
                          lineHeight: "16px",
                        }}
                      >
                        ↓
                      </div>
                    )}
                  </div>
                ),
              )}
              <div
                style={{
                  marginTop: "8px",
                  textAlign: "center",
                  fontSize: "10px",
                  color: "#00D4B8",
                }}
              >
                2 saltos — sin intermediario
              </div>
            </div>
          </div>
        </div>
      );

    case "NMR":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(0,212,196,0.06)",
            border: "1px solid rgba(0,212,196,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#00D4C4",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            NUMERAI — TORNEO GLOBAL DE PREDICCIÓN
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "16px",
            }}
          >
            {(
              [
                {
                  rank: "#1",
                  name: "model_alpha",
                  score: "0.0842",
                  nmr: "+234 NMR",
                  color: "#FFD700",
                },
                {
                  rank: "#2",
                  name: "quant_x",
                  score: "0.0791",
                  nmr: "+189 NMR",
                  color: "#C0C0C0",
                },
                {
                  rank: "#3",
                  name: "deep_v3",
                  score: "0.0734",
                  nmr: "+145 NMR",
                  color: "#CD7F32",
                },
              ] as Array<{
                rank: string;
                name: string;
                score: string;
                nmr: string;
                color: string;
              }>
            ).map(({ rank, name, score, nmr, color }) => (
              <div
                key={rank}
                style={{
                  padding: "12px 8px",
                  borderRadius: "8px",
                  background: `${color}10`,
                  border: `1px solid ${color}40`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "16px", fontWeight: "800", color }}>
                  {rank}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#E8ECEB",
                    marginTop: "4px",
                    fontFamily: "JetBrains Mono, monospace",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "#00D4C4",
                    marginTop: "4px",
                  }}
                >
                  {score}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#00D4B8",
                    marginTop: "2px",
                  }}
                >
                  {nmr}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(0,212,196,0.08)",
              border: "1px solid rgba(0,212,196,0.2)",
              fontSize: "12px",
              color: "#A9B3AF",
              textAlign: "center",
            }}
          >
            12,000+ data scientists compiten. Los mejores ganan NMR. Los peores
            pierden su stake.
          </div>
        </div>
      );

    case "SAHARA":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(255,107,53,0.06)",
            border: "1px solid rgba(255,107,53,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#FF6B35",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            SAHARA AI — ECOSISTEMA DE DATOS
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            {(
              [
                {
                  icon: "👤",
                  label: "Usuario",
                  sub: "Contribuye datos",
                },
                { icon: "🤖", label: "Modelo IA", sub: "Usa los datos" },
                { icon: "💰", label: "Sahara", sub: "Distribuye fees" },
                { icon: "👤", label: "Usuario-recibe", sub: "Recibe tokens" },
              ] as Array<{ icon: string; label: string; sub: string }>
            ).map(({ icon, label, sub }, i) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <div style={{ textAlign: "center", minWidth: "70px" }}>
                  <div style={{ fontSize: "24px", marginBottom: "4px" }}>
                    {String(icon)}
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color: "#FF6B35",
                    }}
                  >
                    {label}
                  </div>
                  <div style={{ fontSize: "10px", color: "#A9B3AF" }}>
                    {sub}
                  </div>
                </div>
                {i < 3 && (
                  <span style={{ color: "#FF6B35", fontSize: "18px" }}>→</span>
                )}
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#A9B3AF",
              marginTop: "16px",
            }}
          >
            Tus datos entrenaron modelos de Google y OpenAI sin pagarte. Sahara
            AI lo cambia.
          </p>
        </div>
      );

    case "IP":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(139,92,246,0.06)",
            border: "1px solid rgba(139,92,246,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#8B5CF6",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            STORY PROTOCOL — PROPIEDAD INTELECTUAL ON-CHAIN
          </div>
          <svg
            viewBox="0 0 280 180"
            style={{ width: "100%", height: "180px" }}
            aria-hidden="true"
          >
            <rect
              x="110"
              y="10"
              width="60"
              height="28"
              rx="5"
              fill="rgba(139,92,246,0.25)"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <text
              x="140"
              y="28"
              textAnchor="middle"
              fill="#8B5CF6"
              fontSize="9"
              fontWeight="bold"
            >
              IP Original
            </text>
            {(
              [
                { x: 60, y: 68 },
                { x: 140, y: 68 },
                { x: 220, y: 68 },
              ] as Array<{ x: number; y: number }>
            ).map(({ x, y }, i) => (
              <g key={x}>
                <line
                  x1="140"
                  y1="38"
                  x2={x}
                  y2={y}
                  stroke="rgba(139,92,246,0.4)"
                  strokeWidth="1.5"
                />
                <rect
                  x={x - 28}
                  y={y}
                  width="56"
                  height="24"
                  rx="4"
                  fill="rgba(139,92,246,0.15)"
                  stroke="#8B5CF6"
                  strokeWidth="1.5"
                />
                <text
                  x={x}
                  y={y + 14}
                  textAnchor="middle"
                  fill="#C4B5FD"
                  fontSize="8"
                >
                  Remix {i + 1}
                </text>
                {([{ dx: -18 }, { dx: 18 }] as Array<{ dx: number }>).map(
                  ({ dx }) => (
                    <g key={dx}>
                      <line
                        x1={x}
                        y1={y + 24}
                        x2={x + dx}
                        y2={y + 46}
                        stroke="rgba(139,92,246,0.3)"
                        strokeWidth="1"
                      />
                      <rect
                        x={x + dx - 18}
                        y={y + 46}
                        width="36"
                        height="18"
                        rx="3"
                        fill="rgba(139,92,246,0.08)"
                        stroke="rgba(139,92,246,0.35)"
                        strokeWidth="1"
                      />
                      <text
                        x={x + dx}
                        y={y + 57}
                        textAnchor="middle"
                        fill="#A78BFA"
                        fontSize="7"
                      >
                        Sub-remix
                      </text>
                      <text
                        x={x + dx}
                        y={y + 78}
                        textAnchor="middle"
                        fill="#00D4B8"
                        fontSize="7"
                      >
                        Royalties
                      </text>
                    </g>
                  ),
                )}
              </g>
            ))}
          </svg>
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#A9B3AF",
              marginTop: "4px",
            }}
          >
            Royalties automáticos en cada derivado — forever
          </p>
        </div>
      );

    case "TRAC":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(62,175,221,0.06)",
            border: "1px solid rgba(62,175,221,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#3EAFDD",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            ORIGINTRAIL — GRAFO DE CONOCIMIENTO DESCENTRALIZADO
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "10px",
              marginBottom: "14px",
            }}
          >
            {(
              [
                {
                  icon: "🏥",
                  name: "AstraZeneca",
                  use: "Trazabilidad farmacéutica",
                },
                {
                  icon: "🏛",
                  name: "FDA",
                  use: "Suministro médico",
                },
                {
                  icon: "🛒",
                  name: "Walmart",
                  use: "Trazabilidad alimentos",
                },
              ] as Array<{ icon: string; name: string; use: string }>
            ).map(({ icon, name, use }) => (
              <div
                key={name}
                style={{
                  padding: "12px 8px",
                  borderRadius: "8px",
                  background: "rgba(62,175,221,0.08)",
                  border: "1px solid rgba(62,175,221,0.25)",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "22px", marginBottom: "4px" }}>
                  {String(icon)}
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    fontWeight: "700",
                    color: "#3EAFDD",
                  }}
                >
                  {name}
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#A9B3AF",
                    marginTop: "2px",
                  }}
                >
                  {String(use)}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(62,175,221,0.08)",
              border: "1px solid rgba(62,175,221,0.2)",
              fontSize: "12px",
              color: "#A9B3AF",
              textAlign: "center",
            }}
          >
            1 billón de activos en el grafo de conocimiento descentralizado de
            TRAC
          </div>
        </div>
      );

    case "ASI":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(27,43,75,0.15)",
            border: "1px solid rgba(100,130,200,0.3)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#7A9FE0",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            ASI ALLIANCE — FUSIÓN 2024
          </div>
          <div
            style={{
              position: "relative",
              height: "130px",
              overflow: "hidden",
            }}
          >
            {(
              [
                {
                  label: "FET",
                  sub: "Fetch.ai Agentes IA",
                  color: "#1B6FE0",
                  left: "8%",
                  top: "8%",
                },
                {
                  label: "AGIX",
                  sub: "SingularityNET IA",
                  color: "#8B2FC9",
                  left: "54%",
                  top: "8%",
                },
                {
                  label: "OCEAN",
                  sub: "Ocean Protocol Datos",
                  color: "#005F73",
                  left: "28%",
                  top: "42%",
                },
              ] as Array<{
                label: string;
                sub: string;
                color: string;
                left: string;
                top: string;
              }>
            ).map(({ label, sub, color, left, top }) => (
              <div
                key={label}
                style={{
                  position: "absolute",
                  left,
                  top,
                  width: "78px",
                  height: "78px",
                  borderRadius: "50%",
                  background: `${color}30`,
                  border: `2px solid ${color}`,
                  display: "flex",
                  flexDirection: "column" as const,
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px ${color}40`,
                }}
              >
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "800",
                    color,
                    lineHeight: 1,
                  }}
                >
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "8px",
                    color: "#A9B3AF",
                    textAlign: "center",
                    lineHeight: 1.2,
                    marginTop: "3px",
                  }}
                >
                  {sub}
                </span>
              </div>
            ))}
            <div
              style={{
                position: "absolute",
                left: "36%",
                top: "24%",
                width: "46px",
                height: "46px",
                borderRadius: "50%",
                background: "rgba(255,215,0,0.25)",
                border: "2px solid #FFD700",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 18px rgba(255,215,0,0.5)",
                zIndex: 2,
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "800",
                  color: "#FFD700",
                }}
              >
                ASI
              </span>
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#A9B3AF",
              marginTop: "4px",
            }}
          >
            La mayor alianza de IA descentralizada del mundo — fusión 2024
          </p>
        </div>
      );

    case "KERNEL":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(245,166,35,0.06)",
            border: "1px solid rgba(245,166,35,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#F5A623",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            KERNEL RESTAKING — MAXIMIZA TU APY
          </div>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "12px 20px",
                borderRadius: "10px",
                background: "rgba(245,166,35,0.15)",
                border: "2px solid #F5A623",
              }}
            >
              <div style={{ fontSize: "11px", color: "#A9B3AF" }}>
                Tu stake base
              </div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#F5A623",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                1 ETH
              </div>
              <div style={{ fontSize: "11px", color: "#00D4B8" }}>
                +4% APY base
              </div>
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              marginBottom: "16px",
            }}
          >
            {(
              [
                { name: "Protocolo A", apy: "+2.5%", color: "#00D4B8" },
                { name: "Protocolo B", apy: "+1.8%", color: "#29ABE2" },
                { name: "Protocolo C", apy: "+1.2%", color: "#9945FF" },
              ] as Array<{ name: string; apy: string; color: string }>
            ).map(({ name, apy, color }) => (
              <div
                key={name}
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  background: `${color}10`,
                  border: `1px solid ${color}40`,
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: "10px", color: "#E8ECEB" }}>{name}</div>
                <div
                  style={{
                    fontSize: "14px",
                    fontWeight: "700",
                    color,
                    marginTop: "4px",
                  }}
                >
                  {apy}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(245,166,35,0.12)",
              border: "1px solid rgba(245,166,35,0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "13px", color: "#A9B3AF" }}>
              APY Total Restaking
            </div>
            <div
              style={{
                fontSize: "22px",
                fontWeight: "800",
                color: "#F5A623",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              ~9.5%
            </div>
            <div style={{ fontSize: "11px", color: "#00D4B8" }}>
              vs 4% staking simple
            </div>
          </div>
        </div>
      );

    case "KAITO":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(0,82,255,0.06)",
            border: "1px solid rgba(0,82,255,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#0052FF",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            KAITO — MINDSHARE CRIPTO EN TIEMPO REAL
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column" as const,
              gap: "8px",
            }}
          >
            {(
              [
                { rank: 1, token: "SOL", share: 18.4, trend: "+2.1%" },
                { rank: 2, token: "ETH", share: 16.2, trend: "+0.8%" },
                { rank: 3, token: "BTC", share: 15.1, trend: "-0.5%" },
                { rank: 4, token: "ICP", share: 8.7, trend: "+3.2%" },
                { rank: 5, token: "NEAR", share: 6.3, trend: "+1.1%" },
              ] as Array<{
                rank: number;
                token: string;
                share: number;
                trend: string;
              }>
            ).map(({ rank, token, share, trend }) => (
              <div
                key={token}
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "18px",
                    fontSize: "11px",
                    color: "#A9B3AF",
                    fontWeight: "700",
                    flexShrink: 0,
                  }}
                >
                  #{rank}
                </div>
                <div
                  style={{
                    width: "36px",
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#E8ECEB",
                  }}
                >
                  {token}
                </div>
                <div
                  style={{
                    flex: 1,
                    height: "10px",
                    borderRadius: "5px",
                    background: "rgba(255,255,255,0.06)",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${(share / 20) * 100}%`,
                      borderRadius: "5px",
                      background: "linear-gradient(90deg, #0052FF, #7EB3FF)",
                      boxShadow: "0 0 6px rgba(0,82,255,0.5)",
                    }}
                  />
                </div>
                <div
                  style={{
                    width: "36px",
                    fontSize: "11px",
                    color: "#E8ECEB",
                    fontFamily: "JetBrains Mono, monospace",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {share}%
                </div>
                <div
                  style={{
                    width: "42px",
                    fontSize: "10px",
                    color: trend.startsWith("+") ? "#00D4B8" : "#ef4444",
                    textAlign: "right",
                    flexShrink: 0,
                  }}
                >
                  {trend}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "10px",
              color: "#A9B3AF",
              marginTop: "12px",
            }}
          >
            Mindshare = % de conversaciones cripto informadas sobre este token
          </p>
        </div>
      );

    case "VIRTUAL":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(155,89,182,0.06)",
            border: "1px solid rgba(155,89,182,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#9B59B6",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            VIRTUALS — AGENTES DE IA CON TOKEN PROPIO
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
            }}
          >
            {(
              [
                {
                  emoji: "📈",
                  name: "Trading Bot Alpha",
                  income: "+$1,240/mes",
                  badge: "DeFi",
                },
                {
                  emoji: "🎨",
                  name: "ArtGen Studio",
                  income: "+$680/mes",
                  badge: "Creativo",
                },
                {
                  emoji: "📊",
                  name: "Market Analyst",
                  income: "+$920/mes",
                  badge: "Research",
                },
                {
                  emoji: "🎮",
                  name: "Game Master AI",
                  income: "+$450/mes",
                  badge: "Gaming",
                },
              ] as Array<{
                emoji: string;
                name: string;
                income: string;
                badge: string;
              }>
            ).map(({ emoji, name, income, badge }) => (
              <div
                key={name}
                style={{
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(155,89,182,0.1)",
                  border: "1px solid rgba(155,89,182,0.3)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "6px",
                  }}
                >
                  <span style={{ fontSize: "18px" }}>{String(emoji)}</span>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "#E8ECEB",
                      }}
                    >
                      {name}
                    </div>
                    <div
                      style={{
                        fontSize: "9px",
                        padding: "1px 6px",
                        borderRadius: "4px",
                        background: "rgba(155,89,182,0.3)",
                        color: "#C39BD3",
                        display: "inline-block",
                      }}
                    >
                      {badge}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: "700",
                    color: "#00D4B8",
                  }}
                >
                  {income}
                </div>
                <div style={{ fontSize: "10px", color: "#A9B3AF" }}>
                  autónomo 24/7
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case "USDT":
    case "USDC":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(38,161,123,0.06)",
            border: "1px solid rgba(38,161,123,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#26A17B",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            STABLECOINS — COMPARATIVA
          </div>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "12px",
                minWidth: "300px",
              }}
            >
              <thead>
                <tr>
                  {(["Aspecto", "USDT", "USDC"] as string[]).map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "8px 10px",
                        textAlign: "left" as const,
                        color:
                          h === "USDT"
                            ? "#26A17B"
                            : h === "USDC"
                              ? "#2775CA"
                              : "#A9B3AF",
                        fontWeight: "700",
                        borderBottom: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(
                  [
                    ["Emisor", "Tether Limited", "Circle / Coinbase"],
                    ["Supply", "$110B+", "$42B+"],
                    ["Respaldo", "Bonos + cash", "Cash regulado USA"],
                    ["Auditorías", "Trimestrales", "Mensuales"],
                    ["Regulación", "Offshore", "USA regulated"],
                  ] as string[][]
                ).map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell, i) => (
                      <td
                        key={`${row[0]}-${i}`}
                        style={{
                          padding: "7px 10px",
                          color: i === 0 ? "#E8ECEB" : "#A9B3AF",
                          borderBottom: "1px solid rgba(255,255,255,0.05)",
                          fontWeight: i === 0 ? "600" : "400",
                        }}
                      >
                        {String(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(38,161,123,0.1)",
              border: "1px solid rgba(38,161,123,0.3)",
            }}
          >
            {/* Flujo actual */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#A9B3AF",
                marginBottom: "6px",
              }}
            >
              Flujo actual desde Chile
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "14px",
              }}
            >
              {(
                [
                  "Peso CLP",
                  "Buda / Cryptomkt",
                  "USDT / USDC",
                  "Exchange",
                  "DeFi",
                ] as string[]
              ).map((step, i) => (
                <div
                  key={step}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background: "rgba(169,179,175,0.12)",
                      color: "#A9B3AF",
                    }}
                  >
                    {step}
                  </span>
                  {i < 4 && (
                    <span style={{ color: "#A9B3AF", fontSize: "12px" }}>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            {/* Divider */}
            <div
              style={{
                borderTop: "1px solid rgba(0,212,184,0.15)",
                marginBottom: "14px",
              }}
            />
            {/* Flujo con DCSS */}
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#00D4B8",
                marginBottom: "6px",
              }}
            >
              Flujo con DCSS (futuro)
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexWrap: "wrap",
                marginBottom: "6px",
              }}
            >
              {(
                [
                  "Peso CLP",
                  "Buda → USDT",
                  "Mint CLP Token (ICP)",
                  "DeFi directo",
                ] as string[]
              ).map((step, i) => (
                <div
                  key={step}
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <span
                    style={{
                      fontSize: "10px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      background:
                        i === 2
                          ? "rgba(213,43,30,0.18)"
                          : "rgba(0,212,184,0.12)",
                      color: i === 2 ? "#D52B1E" : "#00D4B8",
                      fontWeight: i === 2 ? "700" : "400",
                    }}
                  >
                    {step}
                  </span>
                  {i < 3 && (
                    <span style={{ color: "#00D4B8", fontSize: "12px" }}>
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "#A9B3AF",
                fontStyle: "italic",
              }}
            >
              DCSS elimina el Exchange intermediario — vas de USDT directo a
              DeFi vía CLP Token en ICP.
            </div>
          </div>
        </div>
      );

    case "DVPN":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(74,180,74,0.06)",
            border: "1px solid rgba(74,180,74,0.2)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#4AB44A",
              letterSpacing: "0.1em",
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            SENTINEL dVPN — RED GLOBAL DE PRIVACIDAD
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            {(["🌎", "🌍", "🌏", "🌐"] as string[]).map((globe, i) => (
              <div
                key={globe}
                style={{
                  textAlign: "center",
                  padding: "12px 6px",
                  borderRadius: "8px",
                  background: "rgba(74,180,74,0.08)",
                  border: "1px solid rgba(74,180,74,0.25)",
                }}
              >
                <div style={{ fontSize: "22px" }}>{String(globe)}</div>
                <div
                  style={{
                    fontSize: "9px",
                    color: "#4AB44A",
                    marginTop: "4px",
                  }}
                >
                  Nodo {["USA", "EU", "Asia", "LATAM"][i]}
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              padding: "12px 16px",
              borderRadius: "8px",
              background: "rgba(74,180,74,0.08)",
              border: "1px solid rgba(74,180,74,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#E8ECEB" }}>
                Nodos activos
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#4AB44A",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                8,000+
              </span>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "8px",
              }}
            >
              <span style={{ fontSize: "12px", color: "#E8ECEB" }}>
                Países cubiertos
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#4AB44A",
                  fontFamily: "JetBrains Mono, monospace",
                }}
              >
                100+
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "12px", color: "#E8ECEB" }}>
                Punto central de fallo
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "700",
                  color: "#00D4B8",
                }}
              >
                Ninguno
              </span>
            </div>
          </div>
        </div>
      );

    case "AR":
      return (
        <div
          style={{
            borderRadius: "12px",
            background: "rgba(34,35,38,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "24px",
          }}
        >
          <div
            style={{
              fontSize: "11px",
              color: "#A9B3AF",
              letterSpacing: "0.1em",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            ARWEAVE — ALMACENAMIENTO PERMANENTE
          </div>
          <div style={{ position: "relative", paddingTop: "20px" }}>
            <div
              style={{
                height: "2px",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.05), rgba(255,255,255,0.6), rgba(255,255,255,0.05))",
                marginBottom: "30px",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                position: "absolute",
                top: "12px",
                left: 0,
                right: 0,
              }}
            >
              {(
                [
                  { year: "2024", label: "Guardas datos", color: "#00D4B8" },
                  { year: "2074", label: "+50 años", color: "#A9B3AF" },
                  { year: "2124", label: "+100 años", color: "#A9B3AF" },
                  { year: "2224", label: "Still here", color: "#FFD700" },
                ] as Array<{ year: string; label: string; color: string }>
              ).map(({ year, label, color }) => (
                <div key={year} style={{ textAlign: "center" }}>
                  <div
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      background: color,
                      margin: "0 auto",
                      boxShadow: `0 0 8px ${color}66`,
                    }}
                  />
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color,
                      marginTop: "8px",
                      whiteSpace: "nowrap" as const,
                    }}
                  >
                    {year}
                  </div>
                  <div
                    style={{
                      fontSize: "9px",
                      color: "#A9B3AF",
                      marginTop: "2px",
                    }}
                  >
                    {String(label)}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#A9B3AF",
              marginTop: "40px",
            }}
          >
            Pagas una vez. Tus datos persisten para siempre — matemáticamente
            garantizado.
          </p>
        </div>
      );

    default:
      return null;
  }
}
