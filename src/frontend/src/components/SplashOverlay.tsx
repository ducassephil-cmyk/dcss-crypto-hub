import { useEffect, useRef, useState } from "react";

const PARTICLES = Array.from({ length: 8 }, (_, i) => i);

export default function SplashOverlay() {
  const [visible, setVisible] = useState(() => {
    try {
      return !localStorage.getItem("dcss_splash_shown");
    } catch {
      return false;
    }
  });
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const prefersReduced = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );

  useEffect(() => {
    if (!visible) return;

    if (prefersReduced.current) {
      const t = setTimeout(() => {
        setVisible(false);
        try {
          localStorage.setItem("dcss_splash_shown", "1");
        } catch {
          /* noop */
        }
      }, 1500);
      return () => clearTimeout(t);
    }

    // fade-in 800ms → hold 1s → fade-out 600ms
    const t1 = setTimeout(() => setPhase("hold"), 800);
    const t2 = setTimeout(() => setPhase("out"), 1800);
    const t3 = setTimeout(() => {
      setVisible(false);
      try {
        localStorage.setItem("dcss_splash_shown", "1");
      } catch {
        /* noop */
      }
    }, 2400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [visible]);

  if (!visible) return null;

  const opacityStyle = prefersReduced.current
    ? 1
    : phase === "in"
      ? 0
      : phase === "hold"
        ? 1
        : 0;

  const scaleStyle = prefersReduced.current ? 1 : phase === "in" ? 0.88 : 1;

  return (
    <>
      <style>{`
        @keyframes splash-particle {
          0% { transform: translateY(0) scale(1); opacity: 0.7; }
          50% { opacity: 1; }
          100% { transform: translateY(-60px) scale(0.3); opacity: 0; }
        }
        @keyframes splash-glow-pulse {
          0%, 100% { text-shadow: 0 0 20px rgba(0,212,184,0.6), 0 0 40px rgba(0,212,184,0.3); }
          50% { text-shadow: 0 0 30px rgba(0,212,184,0.9), 0 0 60px rgba(0,212,184,0.5); }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-logo { animation: none !important; }
          .splash-particle { animation: none !important; }
          .splash-title { animation: none !important; }
        }
      `}</style>
      <dialog
        aria-modal="true"
        aria-label="DCSS loading screen"
        aria-live="polite"
        open
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#070B0A",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          opacity: prefersReduced.current ? 1 : phase === "out" ? 0 : 1,
          transition: prefersReduced.current
            ? "none"
            : phase === "out"
              ? "opacity 0.6s ease-in-out"
              : phase === "hold"
                ? "none"
                : "opacity 0.8s ease-in-out",
        }}
      >
        {/* Particles */}
        {PARTICLES.map((i) => (
          <div
            key={i}
            className="splash-particle"
            style={{
              position: "absolute",
              width: i % 3 === 0 ? "6px" : "4px",
              height: i % 3 === 0 ? "6px" : "4px",
              borderRadius: "50%",
              background: "#00D4B8",
              left: `${10 + i * 11}%`,
              bottom: `${15 + (i % 4) * 12}%`,
              animation: `splash-particle ${1.5 + i * 0.3}s ease-in-out ${i * 0.2}s infinite`,
              boxShadow: "0 0 8px rgba(0,212,184,0.8)",
            }}
          />
        ))}

        {/* Logo + text */}
        <div
          className="splash-logo"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            opacity: opacityStyle,
            transform: `scale(${scaleStyle})`,
            transition: prefersReduced.current
              ? "none"
              : "opacity 0.8s ease-out, transform 0.8s ease-out",
          }}
        >
          <img
            src="/assets/generated/dcss-logo-transparent.dim_200x200.png"
            alt="DCSS Logo"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              boxShadow:
                "0 0 40px rgba(0,212,184,0.4), 0 0 80px rgba(0,212,184,0.15)",
            }}
          />
          <div style={{ textAlign: "center" }}>
            <div
              className="splash-title"
              style={{
                fontSize: "28px",
                fontWeight: "800",
                letterSpacing: "0.25em",
                color: "#00D4B8",
                fontFamily: "Plus Jakarta Sans, sans-serif",
                animation: "splash-glow-pulse 2s ease-in-out infinite",
              }}
            >
              DCSS CRYPTO HUB
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#A9B3AF",
                letterSpacing: "0.15em",
                marginTop: "8px",
                fontFamily: "JetBrains Mono, monospace",
              }}
            >
              Powered by Internet Computer
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
