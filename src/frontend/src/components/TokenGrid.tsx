import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Layers, LayoutGrid, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { SKELETON_KEYS, useTokens } from "../contexts/TokenContext";
import NetworkGroupedView from "./NetworkGroupedView";
import TokenCard from "./TokenCard";

interface TokenGridProps {
  showSearch?: boolean;
  maxItems?: number;
  onNavigateToToken?: (symbol: string) => void;
  onConnectWallet?: (network: string) => void;
  onBridge?: () => void;
}

const NETWORK_FILTERS = [
  "All",
  "Bitcoin",
  "Polkadot",
  "Cosmos",
  "Celestia",
  "0G",
  "Ethereum",
  "Arbitrum",
  "Base",
  "Multichain",
  "Solana",
  "ICP",
  "Near",
  "Avalanche",
  "Cardano",
  "Mina",
  "Bittensor",
  "Arweave",
  "Stablecoins",
] as const;

export default function TokenGrid({
  showSearch = false,
  maxItems,
  onNavigateToToken,
  onConnectWallet,
  onBridge,
}: TokenGridProps) {
  const { tokens } = useTokens();
  const [search, setSearch] = useState("");
  const [networkFilter, setNetworkFilter] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grouped" | "grid">("grouped");

  const filtered = useMemo(() => {
    let list = tokens;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.symbol.toLowerCase().includes(q),
      );
    }
    if (networkFilter !== "All") {
      list = list.filter((t) => t.network === networkFilter);
    }
    return maxItems ? list.slice(0, maxItems) : list;
  }, [tokens, search, networkFilter, maxItems]);

  if (tokens.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SKELETON_KEYS.map((key) => (
          <Skeleton
            key={key}
            className="h-44 rounded-xl"
            style={{ background: "rgba(0,212,184,0.06)" }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {showSearch && (
          <div className="flex flex-col gap-3 flex-1 min-w-0">
            <div className="relative">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "#A9B3AF" }}
              />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tokens..."
                className="pl-9 text-sm"
                style={{
                  background: "#0F1513",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#E8ECEB",
                }}
                data-ocid="tokens.search_input"
              />
            </div>
            {/* Network filter chips - scrollable row */}
            <div
              style={{
                display: "flex",
                gap: "6px",
                flexWrap: "wrap",
                maxHeight: "72px",
                overflow: "hidden",
              }}
            >
              {NETWORK_FILTERS.map((n) => (
                <button
                  type="button"
                  key={n}
                  onClick={() => setNetworkFilter(n)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{
                    background:
                      networkFilter === n
                        ? "rgba(0,212,184,0.18)"
                        : "rgba(15,21,19,0.8)",
                    border:
                      networkFilter === n
                        ? "1px solid rgba(0,212,184,0.5)"
                        : "1px solid rgba(0,212,184,0.12)",
                    color: networkFilter === n ? "#00D4B8" : "#A9B3AF",
                    whiteSpace: "nowrap",
                  }}
                  data-ocid={`tokens.${n.toLowerCase()}.tab`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* View mode toggle */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            padding: "3px",
            borderRadius: "8px",
            background: "rgba(15,21,19,0.9)",
            border: "1px solid rgba(0,212,184,0.12)",
            marginLeft: showSearch ? "0" : "auto",
            flexShrink: 0,
          }}
        >
          <button
            type="button"
            onClick={() => setViewMode("grouped")}
            title="Grouped by network"
            style={{
              padding: "6px 8px",
              borderRadius: "5px",
              background:
                viewMode === "grouped" ? "rgba(0,212,184,0.15)" : "transparent",
              border: "none",
              color: viewMode === "grouped" ? "#00D4B8" : "#A9B3AF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Group by network"
            data-ocid="tokens.grouped.toggle"
          >
            <Layers size={15} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            title="Grid view"
            style={{
              padding: "6px 8px",
              borderRadius: "5px",
              background:
                viewMode === "grid" ? "rgba(0,212,184,0.15)" : "transparent",
              border: "none",
              color: viewMode === "grid" ? "#00D4B8" : "#A9B3AF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
            aria-label="Grid view"
            data-ocid="tokens.grid.toggle"
          >
            <LayoutGrid size={15} />
          </button>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div
          className="py-16 text-center rounded-xl"
          style={{ border: "1px solid rgba(0,212,184,0.1)" }}
          data-ocid="tokens.empty_state"
        >
          <p style={{ color: "#A9B3AF" }}>
            No tokens found matching your search.
          </p>
        </div>
      ) : viewMode === "grouped" ? (
        <NetworkGroupedView
          tokens={filtered}
          onNavigateToToken={onNavigateToToken}
          onConnectWallet={onConnectWallet}
          onBridge={onBridge}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((token, i) => (
            <TokenCard
              key={token.symbol}
              token={token}
              index={i}
              onNavigateToToken={onNavigateToToken}
            />
          ))}
        </div>
      )}

      {showSearch && (
        <p className="text-xs text-center" style={{ color: "#A9B3AF" }}>
          {filtered.length} of {tokens.length} tokens
        </p>
      )}
    </div>
  );
}
