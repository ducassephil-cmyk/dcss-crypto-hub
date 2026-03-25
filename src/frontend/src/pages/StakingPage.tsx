import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Clock, ExternalLink, Info, Lock, TrendingUp } from "lucide-react";

const NATIVE_STAKING_LINKS = [
  {
    token: "ICP",
    platform: "NNS Dashboard",
    url: "https://nns.ic0.app",
    description:
      "Stake ICP en neuronas del Network Nervous System. APY 8–15%. Dissolve delay mínimo 6 meses.",
    color: "#29ABE2",
    network: "ICP",
  },
  {
    token: "SOL",
    platform: "Marinade Finance",
    url: "https://marinade.finance",
    description:
      "Liquid staking de SOL. Recibe mSOL manteniendo liquidez. APY ~7%. Sin lockup.",
    color: "#9945FF",
    network: "Solana",
  },
  {
    token: "SOL",
    platform: "Jito",
    url: "https://www.jito.network",
    description:
      "Liquid staking con MEV rewards. jitoSOL. APY ~8%. Uno de los más grandes en Solana.",
    color: "#9945FF",
    network: "Solana",
  },
  {
    token: "ATOM",
    platform: "Keplr Dashboard",
    url: "https://wallet.keplr.app/chains/cosmoshub",
    description:
      "Delega ATOM a validadores del Cosmos Hub. APY 14–20%. Unbonding period 21 días.",
    color: "#6F7390",
    network: "Cosmos",
  },
  {
    token: "ATOM",
    platform: "Stride",
    url: "https://app.stride.zone",
    description:
      "Liquid staking de ATOM. Recibe stATOM. APY ~12%. Mantén liquidez en el ecosistema IBC.",
    color: "#6F7390",
    network: "Cosmos",
  },
  {
    token: "DOT",
    platform: "Polkadot Staking Dashboard",
    url: "https://staking.polkadot.network",
    description:
      "Stake DOT directamente en la relay chain. APY ~14%. Nomination pools disponibles.",
    color: "#E6007A",
    network: "Polkadot",
  },
  {
    token: "ETH",
    platform: "Lido",
    url: "https://lido.fi",
    description:
      "Liquid staking de ETH. Recibe stETH. APY ~4%. El protocolo de staking más grande de Ethereum.",
    color: "#627EEA",
    network: "Ethereum",
  },
  {
    token: "ETH",
    platform: "Rocket Pool",
    url: "https://rocketpool.net",
    description:
      "Staking descentralizado de ETH. Recibe rETH. APY ~3.5%. Sin mínimo de 32 ETH.",
    color: "#627EEA",
    network: "Ethereum",
  },
  {
    token: "INJ",
    platform: "Injective Hub",
    url: "https://hub.injective.network/staking",
    description:
      "Delega INJ a validadores de Injective. APY ~15%. Red de alta velocidad DeFi-native.",
    color: "#00B3EF",
    network: "Cosmos",
  },
  {
    token: "TIA",
    platform: "Celestia Staking",
    url: "https://celestia.org/stake",
    description:
      "Stake TIA para asegurar la red de disponibilidad de datos. APY ~15%. Unbonding 21 días.",
    color: "#7B2FBE",
    network: "Celestia",
  },
];

const TIMELINE = [
  { label: "Investigación de pools", done: true },
  { label: "Links nativos integrados", done: true },
  { label: "Staking backend Motoko", done: false },
  { label: "Staking DCSS en la app", done: false },
];

export default function StakingPage() {
  return (
    <TooltipProvider>
      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 16px" }}
      >
        {/* Hero */}
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "4px 14px",
              borderRadius: "999px",
              background: "rgba(129,140,248,0.1)",
              border: "1px solid rgba(129,140,248,0.3)",
              fontSize: "11px",
              color: "#818CF8",
              fontWeight: "600",
              letterSpacing: "0.1em",
              marginBottom: "20px",
            }}
          >
            <Clock size={12} />
            COMING SOON — FASE 4
          </div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 64px)",
              fontWeight: "800",
              color: "#E8ECEB",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Staking DCSS
          </h1>
          <p
            style={{
              fontSize: "16px",
              color: "#A9B3AF",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            El staking nativo en la app DCSS estará disponible en Fase 4.
            Mientras tanto, puedes stakear directamente en las plataformas de
            cada red.
          </p>
        </div>

        {/* Info card */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "12px",
            background: "rgba(0,212,184,0.05)",
            border: "1px solid rgba(0,212,184,0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            marginBottom: "40px",
          }}
        >
          <Info
            size={20}
            style={{ color: "#00D4B8", flexShrink: 0, marginTop: "1px" }}
          />
          <p
            style={{
              fontSize: "14px",
              color: "#A9B3AF",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Esta página es una{" "}
            <strong style={{ color: "#E8ECEB" }}>referencia de staking</strong>.
            Conecta tu wallet directamente en las plataformas nativas de cada
            red para generar yield real ahora mismo.
          </p>
        </div>

        {/* Native Staking Links */}
        <div style={{ marginBottom: "48px" }}>
          <div style={{ marginBottom: "20px" }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#E8ECEB",
                marginBottom: "6px",
              }}
            >
              Staking Nativo — Plataformas Reales
            </h2>
            <p style={{ fontSize: "13px", color: "#A9B3AF", margin: 0 }}>
              Conecta tu wallet en estas plataformas para stakear directamente
              en la blockchain.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "14px",
            }}
            className="native-staking-grid"
          >
            {NATIVE_STAKING_LINKS.map((item) => (
              <div
                key={`${item.token}-${item.platform}`}
                style={{
                  padding: "20px",
                  borderRadius: "12px",
                  background: "#0F1513",
                  border: `1px solid ${item.color}18`,
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
                data-ocid="staking.native.card"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: `${item.color}18`,
                      border: `1px solid ${item.color}44`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "10px",
                      fontWeight: "700",
                      color: item.color,
                      fontFamily: "JetBrains Mono, monospace",
                      flexShrink: 0,
                    }}
                  >
                    {item.token}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        color: "#E8ECEB",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.platform}
                    </div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#A9B3AF",
                        marginTop: "1px",
                      }}
                    >
                      {item.network}
                    </div>
                  </div>
                </div>

                <p
                  style={{
                    fontSize: "12px",
                    color: "#A9B3AF",
                    lineHeight: 1.5,
                    margin: 0,
                    flex: 1,
                  }}
                >
                  {item.description}
                </p>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "7px 14px",
                        borderRadius: "8px",
                        background: "transparent",
                        border: `1px solid ${item.color}44`,
                        color: item.color,
                        fontSize: "12px",
                        fontWeight: "600",
                        textDecoration: "none",
                        alignSelf: "flex-start",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = `${item.color}15`;
                      }}
                      onMouseLeave={(e) => {
                        (
                          e.currentTarget as HTMLAnchorElement
                        ).style.background = "transparent";
                      }}
                      data-ocid="staking.native.link"
                    >
                      Ir a {item.platform}
                      <ExternalLink size={11} />
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Abre {item.platform} en una nueva pestaña</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </div>
        </div>

        {/* Roadmap Timeline */}
        <h2
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#E8ECEB",
            marginBottom: "20px",
          }}
        >
          Roadmap de Staking
        </h2>
        <div
          style={{
            display: "flex",
            gap: "0",
            justifyContent: "space-between",
            position: "relative",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "20px",
              left: "10%",
              right: "10%",
              height: "2px",
              background: "rgba(0,212,184,0.12)",
            }}
          />
          {TIMELINE.map((item, i) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "12px",
                flex: 1,
                position: "relative",
                zIndex: 1,
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: item.done ? "rgba(0,212,184,0.2)" : "#0F1513",
                  border: `2px solid ${
                    item.done ? "#00D4B8" : "rgba(169,179,175,0.2)"
                  }`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: item.done ? "#00D4B8" : "#A9B3AF",
                  fontSize: "14px",
                  fontWeight: "700",
                }}
              >
                {item.done ? "✓" : i + 1}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: item.done ? "#00D4B8" : "#A9B3AF",
                  textAlign: "center",
                  maxWidth: "120px",
                  lineHeight: 1.4,
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* Coming soon bottom card */}
        <div
          style={{
            padding: "20px 24px",
            borderRadius: "12px",
            background: "rgba(129,140,248,0.05)",
            border: "1px solid rgba(129,140,248,0.2)",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <TrendingUp size={20} style={{ color: "#818CF8", flexShrink: 0 }} />
          <p
            style={{
              fontSize: "14px",
              color: "#A9B3AF",
              lineHeight: 1.5,
              margin: 0,
            }}
          >
            El staking nativo DCSS llegará en{" "}
            <strong style={{ color: "#818CF8" }}>Fase 4</strong> con backend
            Motoko, neuronas on-chain y APY real del protocolo.
          </p>
        </div>

        {/* Unused icon reference to satisfy imports */}
        <span style={{ display: "none" }}>
          <Lock size={0} />
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .native-staking-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </TooltipProvider>
  );
}
