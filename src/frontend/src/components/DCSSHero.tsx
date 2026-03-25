import { Skeleton } from "@/components/ui/skeleton";
import { Globe, RefreshCw, TrendingUp, Users, Zap } from "lucide-react";
import { useWallet } from "../contexts/WalletContext";
import { useStats } from "../hooks/useQueries";

function StatPill({
  icon: Icon,
  label,
  value,
  loading,
}: {
  icon: typeof Globe;
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <div
      className="flex flex-col items-center gap-1 px-4 py-3 rounded-xl"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <div
        className="flex items-center gap-1.5 text-xs"
        style={{ color: "var(--text-muted)" }}
      >
        <Icon size={11} style={{ color: "var(--accent-color)" }} />
        {label}
      </div>
      {loading ? (
        <Skeleton
          className="h-5 w-20"
          style={{ background: "var(--bg-elevated)" }}
        />
      ) : (
        <span
          className="text-sm font-bold font-mono"
          style={{ color: "var(--accent-color)" }}
        >
          {value}
        </span>
      )}
    </div>
  );
}

interface DCSSHeroProps {
  onConnectWallet?: () => void;
}

export default function DCSSHero({ onConnectWallet }: DCSSHeroProps) {
  const { data: stats, isLoading } = useStats();
  const { activeWallet } = useWallet();

  const statsItems = [
    {
      icon: TrendingUp,
      label: "Total Supply",
      value: stats ? `${(stats.totalSupply / 1_000_000).toFixed(1)}M` : "-",
    },
    {
      icon: RefreshCw,
      label: "Circulando",
      value: stats
        ? `${(stats.circulatingSupply / 1_000_000).toFixed(1)}M`
        : "-",
    },
    {
      icon: Users,
      label: "Holders",
      value: stats ? Number(stats.holders).toLocaleString() : "-",
    },
    {
      icon: Globe,
      label: "Transacciones",
      value: stats ? Number(stats.txCount).toLocaleString() : "-",
    },
    {
      icon: Zap,
      label: "Precios en vivo",
      value: "~40 tokens",
    },
  ];

  return (
    <section
      className="w-full"
      style={{
        background: "var(--bg-base)",
        borderBottom: "1px solid var(--border-subtle)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 pt-16 pb-12">
        {/* Title */}
        <div className="text-center mb-4">
          <h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 tracking-tight font-display"
            style={{ color: "var(--text-primary)" }}
          >
            DCSS Crypto Hub
          </h1>
          <p
            className="text-base md:text-lg max-w-xl mx-auto"
            style={{ color: "var(--text-muted)" }}
          >
            Infraestructura DeFi nativa para Chile
          </p>
        </div>

        {/* CTA */}
        {!activeWallet && onConnectWallet && (
          <div className="flex justify-center mb-10">
            <button
              type="button"
              onClick={onConnectWallet}
              className="px-8 py-3 rounded-xl font-semibold text-sm transition-all"
              style={{
                background: "var(--accent-color)",
                color: "#0A0A0A",
              }}
              data-ocid="hero.connect.primary_button"
            >
              Conectar Wallet
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {statsItems.map((s) => (
            <StatPill
              key={s.label}
              icon={s.icon}
              label={s.label}
              value={s.value}
              loading={isLoading && s.label !== "Precios en vivo"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
