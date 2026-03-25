import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  Globe,
  RefreshCw,
  TrendingDown,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useTransactions } from "../contexts/TransactionContext";
import type { LocalTransaction } from "../contexts/TransactionContext";
import { formatRelativeTime, truncateAddr } from "../data/tokens";

const FILTERS = [
  "All",
  "Buy",
  "Sell",
  "Swap",
  "Send",
  "Receive",
  "Bridge",
] as const;
type FilterType = (typeof FILTERS)[number];

function getTxIcon(txType: string) {
  switch (txType) {
    case "Buy":
    case "Receive":
      return { icon: ArrowDownLeft, color: "#1DE9B6" };
    case "Sell":
      return { icon: TrendingDown, color: "#ef4444" };
    case "Swap":
      return { icon: ArrowLeftRight, color: "#12AAFF" };
    case "Send":
      return { icon: ArrowUpRight, color: "#C9A24A" };
    case "Bridge":
      return { icon: Globe, color: "#8247E5" };
    default:
      return { icon: RefreshCw, color: "#A9B3AF" };
  }
}

function statusStyle(status: LocalTransaction["status"]) {
  switch (status) {
    case "confirmed":
      return { bg: "rgba(0,212,184,0.12)", color: "#00D4B8" };
    case "pending":
      return { bg: "rgba(201,162,74,0.12)", color: "#C9A24A" };
    case "failed":
      return { bg: "rgba(239,68,68,0.12)", color: "#ef4444" };
  }
}

function TxRow({ tx, index }: { tx: LocalTransaction; index: number }) {
  const { icon: Icon, color } = getTxIcon(tx.txType);
  const st = statusStyle(tx.status);
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: "#0F1513",
        border: "1px solid rgba(0,212,184,0.1)",
      }}
      data-ocid={`activity.item.${index + 1}`}
    >
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}40` }}
      >
        <Icon size={15} style={{ color }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "#E8ECEB" }}>
            {tx.txType}
          </span>
          <span
            className="text-xs font-bold font-mono px-1.5 py-0.5 rounded"
            style={{ background: "rgba(0,212,184,0.08)", color: "#00D4B8" }}
          >
            {tx.tokenSymbol}
          </span>
        </div>
        <div
          className="flex items-center gap-2 text-[10px] mt-0.5"
          style={{ color: "#A9B3AF" }}
        >
          <span className="font-mono">{truncateAddr(tx.fromAddr)}</span>
          <ArrowUpRight size={9} />
          <span className="font-mono">{truncateAddr(tx.toAddr)}</span>
        </div>
      </div>

      <div className="text-right shrink-0">
        <div className="text-sm font-bold font-mono" style={{ color }}>
          {tx.txType === "Send" || tx.txType === "Bridge" ? "-" : "+"}
          {tx.amount.toFixed(4)}
        </div>
        <div className="text-[10px]" style={{ color: "#A9B3AF" }}>
          {formatRelativeTime(tx.timestamp)}
        </div>
        <span
          className="inline-block text-[9px] font-semibold px-1.5 py-0.5 rounded-full mt-0.5 uppercase tracking-wide"
          style={{ background: st.bg, color: st.color }}
        >
          {tx.status}
        </span>
      </div>
    </div>
  );
}

export default function ActivityFeed() {
  const { transactions } = useTransactions();
  const [filter, setFilter] = useState<FilterType>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return transactions;
    return transactions.filter((t) => t.txType === filter);
  }, [transactions, filter]);

  return (
    <div className="max-w-[720px] mx-auto space-y-5">
      <div className="text-center">
        <h2 className="text-2xl font-bold" style={{ color: "#E8ECEB" }}>
          Activity
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A9B3AF" }}>
          Your cross-chain transaction history
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={{
              background:
                filter === f ? "rgba(0,212,184,0.18)" : "rgba(15,21,19,0.8)",
              border:
                filter === f
                  ? "1px solid rgba(0,212,184,0.5)"
                  : "1px solid rgba(0,212,184,0.1)",
              color: filter === f ? "#00D4B8" : "#A9B3AF",
            }}
            data-ocid={`activity.${f.toLowerCase()}.tab`}
          >
            {f}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div
          className="py-16 text-center rounded-xl"
          style={{
            background: "#0F1513",
            border: "1px solid rgba(0,212,184,0.1)",
          }}
          data-ocid="activity.empty_state"
        >
          <Globe
            size={32}
            className="mx-auto mb-3"
            style={{ color: "rgba(0,212,184,0.3)" }}
          />
          <p className="font-medium" style={{ color: "#E8ECEB" }}>
            No {filter === "All" ? "" : filter} transactions yet
          </p>
          <p className="text-sm mt-1" style={{ color: "#A9B3AF" }}>
            Start by connecting a wallet and trading tokens.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((tx, i) => (
            <TxRow key={tx.id} tx={tx} index={i} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <p className="text-xs text-center" style={{ color: "#A9B3AF" }}>
          {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
