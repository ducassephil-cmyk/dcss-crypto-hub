import { useState } from "react";
import type { TokenWithMeta } from "../contexts/TokenContext";
import { NETWORK_CONTENT } from "../data/networkContent";
import NetworkBanner from "./NetworkBanner";
import TokenCard from "./TokenCard";

const NETWORK_ORDER = [
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
];

interface NetworkGroupedViewProps {
  tokens: TokenWithMeta[];
  onNavigateToToken?: (symbol: string) => void;
  onConnectWallet?: (network: string) => void;
  onBridge?: () => void;
}

export default function NetworkGroupedView({
  tokens,
  onNavigateToToken,
  onConnectWallet,
  onBridge,
}: NetworkGroupedViewProps) {
  const [expandedNetworks, setExpandedNetworks] = useState<Set<string>>(
    new Set(["ICP", "Bitcoin", "Solana", "Cosmos", "Ethereum"]),
  );

  function toggleNetwork(id: string) {
    setExpandedNetworks((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  // Sort NETWORK_CONTENT according to NETWORK_ORDER
  const orderedNetworks = [...NETWORK_CONTENT].sort((a, b) => {
    const ai = NETWORK_ORDER.indexOf(a.id);
    const bi = NETWORK_ORDER.indexOf(b.id);
    if (ai === -1 && bi === -1) return 0;
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {orderedNetworks.map((network) => {
        const networkTokens = tokens.filter((t) => t.network === network.id);
        if (networkTokens.length === 0) return null;
        const isExpanded = expandedNetworks.has(network.id);

        return (
          <div
            key={network.id}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <NetworkBanner
              network={network}
              tokens={networkTokens}
              isExpanded={isExpanded}
              onToggle={() => toggleNetwork(network.id)}
              onConnectWallet={() => onConnectWallet?.(network.id)}
              onBridge={() => onBridge?.()}
            />

            {isExpanded && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "10px",
                  paddingLeft: "8px",
                }}
              >
                {networkTokens.map((token, i) => (
                  <TokenCard
                    key={token.symbol}
                    token={token}
                    index={i}
                    onNavigateToToken={onNavigateToToken}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
