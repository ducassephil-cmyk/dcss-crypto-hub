import { SiDiscord, SiTelegram, SiX } from "react-icons/si";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer
      className="w-full mt-auto"
      style={{
        background: "#070B0A",
        borderTop: "1px solid rgba(0,212,184,0.1)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/generated/dcss-logo-transparent.dim_200x200.png"
              alt="DCSS"
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <div
                className="text-sm font-bold tracking-widest"
                style={{ color: "#00D4B8" }}
              >
                DCSS
              </div>
              <div
                className="text-[10px] tracking-wider"
                style={{ color: "#A9B3AF" }}
              >
                MULTICHAIN
              </div>
            </div>
          </div>

          <div className="flex gap-6 text-xs">
            {["Resources", "Community", "Legal"].map((link) => (
              <button
                type="button"
                key={link}
                className="transition-colors"
                style={{
                  color: "#A9B3AF",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {link}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {[
              { Icon: SiDiscord, label: "Discord", color: "#5865F2" },
              { Icon: SiX, label: "X", color: "#E8ECEB" },
              { Icon: SiTelegram, label: "Telegram", color: "#29A8EB" },
            ].map(({ Icon, label, color }) => (
              <button
                type="button"
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-full flex items-center justify-center border transition-all"
                style={{
                  background: "rgba(0,212,184,0.05)",
                  borderColor: "rgba(0,212,184,0.12)",
                }}
              >
                <Icon size={14} color={color} />
              </button>
            ))}
          </div>
        </div>

        <div
          className="mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
          style={{
            borderTop: "1px solid rgba(0,212,184,0.06)",
            color: "#A9B3AF",
          }}
        >
          <p>© {year} DCSS Crypto Hub. All rights reserved.</p>
          <p>
            Built with ❤️ using{" "}
            <a
              href={caffeineUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#00D4B8" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
