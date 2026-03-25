import { X } from "lucide-react";
import { useState } from "react";

export default function AnnouncementBanner() {
  const [closed, setClosed] = useState(() => {
    try {
      return !!localStorage.getItem("dcss_announcement_closed");
    } catch {
      return false;
    }
  });

  if (closed) return null;

  function handleClose() {
    setClosed(true);
    try {
      localStorage.setItem("dcss_announcement_closed", "1");
    } catch {
      /* noop */
    }
  }

  return (
    <>
      <style>{`
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .announcement-banner {
          animation: slide-down 0.3s ease-out forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .announcement-banner { animation: none !important; }
        }
      `}</style>
      <div
        className="announcement-banner"
        role="banner"
        aria-label="DCSS Coin announcement"
        style={{
          background:
            "linear-gradient(90deg, #C9A24A 0%, #FFD700 50%, #C9A24A 100%)",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          position: "sticky",
          top: "64px",
          zIndex: 40,
        }}
      >
        <span style={{ fontSize: "16px" }}>🪙</span>
        <p
          style={{
            color: "#070B0A",
            fontSize: "13px",
            fontWeight: "600",
            textAlign: "center",
            flex: 1,
          }}
        >
          DCSS Coin — Coming Soon ·{" "}
          <span style={{ textDecoration: "underline", cursor: "pointer" }}>
            Join the waitlist →
          </span>
        </p>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Cerrar anuncio"
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "#070B0A",
            padding: "2px",
            display: "flex",
            alignItems: "center",
          }}
          data-ocid="announcement.close_button"
        >
          <X size={16} />
        </button>
      </div>
    </>
  );
}
