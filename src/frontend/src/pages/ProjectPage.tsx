import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookOpen, Eye, MapPin, Shield } from "lucide-react";
import type { ReactNode } from "react";
import type { Tab } from "../components/Navbar";
import { NETWORK_CONTENT } from "../data/networkContent";
import {
  BLOCKCHAIN_EDUCATION,
  CHILE_SECTION,
  DCSS_MANIFESTO,
  DCSS_TOKEN_INFO,
  DIFFERENTIATORS,
  ROADMAP,
} from "../data/projectContent";
import { TOKEN_LIST } from "../data/tokens";

const ICON_MAP: Record<string, ReactNode> = {
  Shield: <Shield size={22} />,
  BookOpen: <BookOpen size={22} />,
  MapPin: <MapPin size={22} />,
  Eye: <Eye size={22} />,
};

interface ProjectPageProps {
  onNavigateToTab: (tab: Tab) => void;
}

export default function ProjectPage({ onNavigateToTab }: ProjectPageProps) {
  const tokensPerNetwork = NETWORK_CONTENT.map((n) => ({
    ...n,
    count: TOKEN_LIST.filter((t) => t.network === n.id).length,
  }));

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "48px 16px" }}>
      {/* Hero */}
      <section style={{ textAlign: "center", marginBottom: "64px" }}>
        <div
          style={{
            width: "90px",
            height: "90px",
            margin: "0 auto 24px",
            borderRadius: "50%",
            overflow: "hidden",
            boxShadow: "0 0 40px rgba(0,212,184,0.35)",
            animation: "project-pulse 3s ease-in-out infinite",
          }}
        >
          <img
            src="/assets/generated/dcss-logo-transparent.dim_200x200.png"
            alt="DCSS Logo"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: "800",
            color: "#1C1C1C",
            lineHeight: 1.2,
            marginBottom: "16px",
          }}
        >
          {DCSS_MANIFESTO.title}
        </h1>
        <p
          style={{
            fontSize: "18px",
            color: "#00D4B8",
            maxWidth: "600px",
            margin: "0 auto",
            lineHeight: 1.6,
          }}
        >
          {DCSS_MANIFESTO.subtitle}
        </p>
      </section>

      {/* Manifesto body */}
      <section style={{ marginBottom: "64px" }}>
        {DCSS_MANIFESTO.body.map((para, i) => (
          <p
            key={para.slice(0, 20)}
            style={
              {
                fontSize: "17px",
                color: i === 0 ? "#E8ECEB" : "#A9B3AF",
                lineHeight: 1.8,
                marginBottom: "24px",
                borderLeft: i === 3 ? "3px solid #00D4B8" : "none",
                paddingLeft: i === 3 ? "16px" : "0",
              } as React.CSSProperties
            }
          >
            {para}
          </p>
        ))}
      </section>

      {/* Differentiators */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1C1C1C",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          ¿Por qué DCSS?
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="diff-grid"
        >
          {DIFFERENTIATORS.map((d) => (
            <div
              key={d.title}
              style={{
                padding: "24px",
                borderRadius: "12px",
                background: "#FFF8F5",
                border: "1px solid rgba(0,212,184,0.12)",
                display: "flex",
                gap: "16px",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "rgba(0,212,184,0.1)",
                  border: "1px solid rgba(0,212,184,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#00D4B8",
                  flexShrink: 0,
                }}
              >
                {ICON_MAP[d.icon]}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "15px",
                    fontWeight: "700",
                    color: "#1C1C1C",
                    marginBottom: "6px",
                  }}
                >
                  {d.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#5A4A47",
                    lineHeight: 1.5,
                  }}
                >
                  {d.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ecosystem */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1C1C1C",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          El Ecosistema
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
          }}
          className="eco-grid"
        >
          {tokensPerNetwork.map((n) => (
            <div
              key={n.id}
              style={{
                padding: "20px",
                borderRadius: "12px",
                background: "#FFF8F5",
                borderLeft: `4px solid ${n.color}`,
                border: `1px solid ${n.color}22`,
                borderLeftWidth: "4px",
                borderLeftColor: n.color,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: n.color,
                  }}
                >
                  {n.name}
                </div>
                <span
                  style={{
                    padding: "2px 8px",
                    borderRadius: "999px",
                    background: `${n.color}18`,
                    fontSize: "11px",
                    color: n.color,
                    fontWeight: "600",
                  }}
                >
                  {n.count} tokens
                </span>
              </div>
              <p
                style={{
                  fontSize: "12px",
                  color: "#5A4A47",
                  lineHeight: 1.5,
                  marginBottom: "12px",
                }}
              >
                {n.intro25words}
              </p>
              <button
                type="button"
                onClick={() => onNavigateToTab("dashboard" as Tab)}
                style={{
                  padding: "6px 14px",
                  borderRadius: "6px",
                  background: `${n.color}18`,
                  border: `1px solid ${n.color}44`,
                  color: n.color,
                  fontSize: "12px",
                  fontWeight: "600",
                  cursor: "pointer",
                }}
                data-ocid="project.ecosystem.button"
              >
                Explorar →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Roadmap */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1C1C1C",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Roadmap
        </h2>
        <div style={{ position: "relative", paddingLeft: "32px" }}>
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "11px",
              top: "0",
              bottom: "0",
              width: "2px",
              background: "rgba(0,212,184,0.15)",
            }}
          />
          {ROADMAP.map((phase) => (
            <div
              key={phase.phase}
              style={{
                display: "flex",
                gap: "16px",
                marginBottom: "28px",
                position: "relative",
              }}
            >
              {/* Dot */}
              <div
                style={{
                  position: "absolute",
                  left: "-25px",
                  top: "4px",
                  width: "16px",
                  height: "16px",
                  borderRadius: "50%",
                  background:
                    phase.status === "completed"
                      ? "#00D4B8"
                      : phase.status === "current"
                        ? "#FFD700"
                        : "#0F1513",
                  border: `2px solid ${
                    phase.status === "completed"
                      ? "#00D4B8"
                      : phase.status === "current"
                        ? "#FFD700"
                        : "rgba(169,179,175,0.3)"
                  }`,
                  boxShadow:
                    phase.status === "current"
                      ? "0 0 12px rgba(255,215,0,0.4)"
                      : phase.status === "completed"
                        ? "0 0 8px rgba(0,212,184,0.3)"
                        : "none",
                }}
              />
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "4px",
                  }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "700",
                      color:
                        phase.status === "completed"
                          ? "#00D4B8"
                          : phase.status === "current"
                            ? "#FFD700"
                            : "#A9B3AF",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {phase.phase.toUpperCase()}
                  </span>
                  {phase.status === "current" && (
                    <span
                      style={{
                        padding: "1px 6px",
                        borderRadius: "4px",
                        background: "rgba(255,215,0,0.12)",
                        color: "#FFD700",
                        fontSize: "9px",
                        fontWeight: "700",
                        letterSpacing: "0.08em",
                      }}
                    >
                      EN CURSO
                    </span>
                  )}
                </div>
                <h3
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: phase.status === "upcoming" ? "#A9B3AF" : "#E8ECEB",
                    marginBottom: "4px",
                  }}
                >
                  {phase.title}
                </h3>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(169,179,175,0.7)",
                    lineHeight: 1.4,
                  }}
                >
                  {phase.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DCSS Token */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1C1C1C",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          El Token DCSS
        </h2>
        <div
          style={{
            padding: "28px",
            borderRadius: "12px",
            background: "#FFF8F5",
            border: "1px solid rgba(255,215,0,0.2)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#FFD700",
                }}
              >
                DCSS
              </div>
              <div style={{ fontSize: "12px", color: "#5A4A47" }}>
                {DCSS_TOKEN_INFO.network}
              </div>
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: "999px",
                background: "rgba(255,215,0,0.12)",
                border: "1px solid rgba(255,215,0,0.3)",
                fontSize: "14px",
                fontWeight: "700",
                color: "#FFD700",
              }}
            >
              🚀 Coming Soon
            </div>
          </div>

          <div style={{ marginBottom: "24px" }}>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#5A4A47",
                marginBottom: "10px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Utilidad del Token
            </h4>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px",
              }}
            >
              {DCSS_TOKEN_INFO.utility.map((item) => (
                <li
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "13px",
                    color: "#5A4A47",
                  }}
                >
                  <span
                    style={{
                      color: "#00D4B8",
                      marginTop: "1px",
                      flexShrink: 0,
                    }}
                  >
                    ✦
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontSize: "13px",
                fontWeight: "700",
                color: "#5A4A47",
                marginBottom: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Distribución del Supply
            </h4>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              {DCSS_TOKEN_INFO.distribution.map((item) => (
                <div key={item.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "4px",
                    }}
                  >
                    <span style={{ fontSize: "12px", color: "#5A4A47" }}>
                      {item.label}
                    </span>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "700",
                        color: item.color,
                      }}
                    >
                      {item.pct}%
                    </span>
                  </div>
                  <div
                    style={{
                      height: "6px",
                      borderRadius: "3px",
                      background: "rgba(255,255,255,0.06)",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "3px",
                        background: item.color,
                        width: `${item.pct}%`,
                        boxShadow: `0 0 8px ${item.color}44`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Chile section */}
      <section style={{ marginBottom: "64px" }}>
        <div
          style={{
            padding: "32px",
            borderRadius: "12px",
            background: "#FFF8F5",
            border: "1px solid rgba(213,43,30,0.25)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Subtle chile flag bg */}
          <div
            style={{
              position: "absolute",
              right: "-40px",
              top: "-20px",
              fontSize: "120px",
              opacity: 0.04,
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            🇨🇱
          </div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#1C1C1C",
              marginBottom: "16px",
            }}
          >
            {CHILE_SECTION.title}
          </h2>
          {CHILE_SECTION.paragraphs.map((p) => (
            <p
              key={p.slice(0, 20)}
              style={{
                fontSize: "14px",
                color: "#5A4A47",
                lineHeight: 1.7,
                marginBottom: "14px",
              }}
            >
              {p}
            </p>
          ))}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "16px",
            }}
          >
            {CHILE_SECTION.highlights.map((h) => (
              <span
                key={h}
                style={{
                  padding: "5px 12px",
                  borderRadius: "999px",
                  background: "rgba(213,43,30,0.12)",
                  border: "1px solid rgba(213,43,30,0.3)",
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#D52B1E",
                }}
              >
                {h}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section style={{ marginBottom: "64px" }}>
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#1C1C1C",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          {BLOCKCHAIN_EDUCATION.title}
        </h2>
        <Accordion
          type="single"
          collapsible
          style={{ display: "flex", flexDirection: "column", gap: "8px" }}
        >
          {BLOCKCHAIN_EDUCATION.sections.map((section, i) => (
            <AccordionItem
              key={section.title}
              value={`edu-${i}`}
              style={{
                borderRadius: "10px",
                background: "#FFF8F5",
                border: "1px solid rgba(0,212,184,0.12)",
                paddingLeft: "0",
                overflow: "hidden",
              }}
              data-ocid={`education.item.${i + 1}`}
            >
              <AccordionTrigger
                style={{
                  padding: "16px 20px",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#1C1C1C",
                  textDecoration: "none",
                }}
              >
                {section.title}
              </AccordionTrigger>
              <AccordionContent
                style={{
                  padding: "0 20px 16px",
                  fontSize: "14px",
                  color: "#5A4A47",
                  lineHeight: 1.7,
                }}
              >
                {section.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* DePIN Universe Section */}
      <section style={{ marginBottom: "64px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div
            style={{
              fontSize: "12px",
              color: "#00D4B8",
              letterSpacing: "0.15em",
              marginBottom: "8px",
            }}
          >
            DECENTRALIZED PHYSICAL INFRASTRUCTURE
          </div>
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: "800",
              color: "#1C1C1C",
              marginBottom: "12px",
            }}
          >
            DePIN Universe
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "#5A4A47",
              maxWidth: "580px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            Infraestructura física del mundo real controlada por sus usuarios.
            DCSS integra los principales proyectos DePIN: GPU, almacenamiento,
            ancho de banda y datos descentralizados.
          </p>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "14px",
          }}
          className="depin-grid"
        >
          {[
            {
              symbol: "RENDER",
              cat: "GPU Rendering",
              emoji: "🖥️",
              color: "#FF4500",
              desc: "Renders 3D descentralizados",
            },
            {
              symbol: "IO",
              cat: "GPU / AI Compute",
              emoji: "🤖",
              color: "#00D4FF",
              desc: "Mercado GPUs para ML",
            },
            {
              symbol: "GRASS",
              cat: "Web Data",
              emoji: "🌐",
              color: "#4CAF50",
              desc: "Datos de entrenamiento IA",
            },
            {
              symbol: "AKT",
              cat: "Cloud Compute",
              emoji: "☁️",
              color: "#FF414C",
              desc: "AWS descentralizado",
            },
            {
              symbol: "TRAC",
              cat: "Data Intelligence",
              emoji: "🔗",
              color: "#3EAFDD",
              desc: "Grafos conocimiento on-chain",
            },
            {
              symbol: "ATH",
              cat: "GPU / Gaming",
              emoji: "🎮",
              color: "#6EFF6E",
              desc: "Infraestructura GPU gaming",
            },
            {
              symbol: "GRT",
              cat: "Data Indexing",
              emoji: "📊",
              color: "#6747ED",
              desc: "Indexación datos blockchain",
            },
            {
              symbol: "TAO",
              cat: "AI Networks",
              emoji: "🧠",
              color: "#36A18B",
              desc: "Red descentralizada de IA",
            },
            {
              symbol: "AR",
              cat: "Permanent Storage",
              emoji: "💾",
              color: "#888888",
              desc: "Almacenamiento permanente",
            },
            {
              symbol: "DVPN",
              cat: "Bandwidth / VPN",
              emoji: "🛡️",
              color: "#4AB44A",
              desc: "VPN descentralizada",
            },
            {
              symbol: "ASI",
              cat: "AI Agents",
              emoji: "⚡",
              color: "#1B2B4B",
              desc: "Agentes autónomos de IA",
            },
          ].map((token) => (
            <div
              key={token.symbol}
              style={{
                padding: "16px",
                borderRadius: "12px",
                background: "#FFF8F5",
                border: `1px solid ${token.color}22`,
                borderTop: `3px solid ${token.color}`,
                display: "flex",
                flexDirection: "column" as const,
                gap: "8px",
              }}
              data-ocid={"depin.token.card"}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <span style={{ fontSize: "22px" }}>{token.emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "700",
                      color: "#1C1C1C",
                    }}
                  >
                    {token.symbol}
                  </div>
                  <div style={{ fontSize: "11px", color: "#5A4A47" }}>
                    {token.desc}
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "3px 8px",
                  borderRadius: "999px",
                  background: `${token.color}14`,
                  border: `1px solid ${token.color}44`,
                  fontSize: "10px",
                  fontWeight: "700",
                  color: token.color,
                  alignSelf: "flex-start" as const,
                }}
              >
                {token.cat}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          textAlign: "center",
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <button
          type="button"
          onClick={() => onNavigateToTab("dashboard" as Tab)}
          style={{
            padding: "14px 32px",
            borderRadius: "10px",
            background: "#00D4B8",
            border: "none",
            color: "#070B0A",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,212,184,0.3)",
          }}
          data-ocid="project.dashboard.primary_button"
        >
          Ir al Dashboard →
        </button>
        <button
          type="button"
          onClick={() => onNavigateToTab("staking" as Tab)}
          style={{
            padding: "14px 32px",
            borderRadius: "10px",
            background: "transparent",
            border: "1px solid rgba(255,215,0,0.4)",
            color: "#FFD700",
            fontSize: "15px",
            fontWeight: "700",
            cursor: "pointer",
          }}
          data-ocid="project.staking.secondary_button"
        >
          Ver Staking
        </button>
      </section>

      <style>{`
        @keyframes project-pulse {
          0%, 100% { box-shadow: 0 0 30px rgba(0,212,184,0.3); }
          50% { box-shadow: 0 0 50px rgba(0,212,184,0.5), 0 0 80px rgba(0,212,184,0.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="project-pulse"] { animation: none !important; }
        }
        @media (max-width: 640px) {
          .diff-grid, .eco-grid, .depin-grid, .clp-arch-grid, .clp-terra-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
