import {
  ArrowLeftRight,
  ChevronDown,
  ExternalLink,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import type { TokenWithMeta } from "../contexts/TokenContext";
import type { NetworkContent } from "../data/networkContent";

// SVG texture patterns per network
const makeSvgUrl = (svg: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(svg)}")` as const;

const TEXTURES: Record<string, string> = {
  ICP: makeSvgUrl(
    `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="rgba(41,171,226,0.08)" stroke-width="0.5"><line x1="0" y1="20" x2="40" y2="20"/><line x1="20" y1="0" x2="20" y2="40"/><line x1="0" y1="10" x2="40" y2="10"/><line x1="0" y1="30" x2="40" y2="30"/><line x1="10" y1="0" x2="10" y2="40"/><line x1="30" y1="0" x2="30" y2="40"/></g><circle cx="20" cy="20" r="2" fill="rgba(41,171,226,0.15)"/><circle cx="10" cy="10" r="1" fill="rgba(41,171,226,0.12)"/><circle cx="30" cy="10" r="1" fill="rgba(41,171,226,0.12)"/><circle cx="10" cy="30" r="1" fill="rgba(41,171,226,0.12)"/><circle cx="30" cy="30" r="1" fill="rgba(41,171,226,0.12)"/></svg>`,
  ),
  Bitcoin: makeSvgUrl(
    `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="40" y2="40" stroke="rgba(247,147,26,0.06)" stroke-width="0.5"/><line x1="0" y1="10" x2="30" y2="40" stroke="rgba(255,215,0,0.04)" stroke-width="0.5"/><line x1="10" y1="0" x2="40" y2="30" stroke="rgba(247,147,26,0.04)" stroke-width="0.5"/><line x1="0" y1="20" x2="20" y2="40" stroke="rgba(255,215,0,0.03)" stroke-width="0.5"/><line x1="20" y1="0" x2="40" y2="20" stroke="rgba(247,147,26,0.03)" stroke-width="0.5"/></svg>`,
  ),
  Polkadot: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="15" cy="15" r="3" fill="rgba(230,0,122,0.08)"/><circle cx="45" cy="15" r="3" fill="rgba(230,0,122,0.08)"/><circle cx="15" cy="45" r="3" fill="rgba(230,0,122,0.06)"/><circle cx="45" cy="45" r="3" fill="rgba(230,0,122,0.06)"/><circle cx="30" cy="30" r="2" fill="rgba(230,0,122,0.10)"/><line x1="15" y1="15" x2="45" y2="15" stroke="rgba(230,0,122,0.05)" stroke-width="0.5"/><line x1="15" y1="45" x2="45" y2="45" stroke="rgba(230,0,122,0.05)" stroke-width="0.5"/><line x1="15" y1="15" x2="30" y2="30" stroke="rgba(230,0,122,0.04)" stroke-width="0.5"/><line x1="45" y1="15" x2="30" y2="30" stroke="rgba(230,0,122,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Cosmos: makeSvgUrl(
    `<svg width="80" height="80" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1" fill="rgba(255,255,255,0.08)"/><circle cx="40" cy="5" r="1.5" fill="rgba(255,255,255,0.12)"/><circle cx="70" cy="15" r="0.8" fill="rgba(255,255,255,0.07)"/><circle cx="20" cy="40" r="1.2" fill="rgba(255,255,255,0.09)"/><circle cx="60" cy="35" r="1" fill="rgba(255,255,255,0.08)"/><circle cx="75" cy="60" r="1.5" fill="rgba(255,255,255,0.11)"/><circle cx="15" cy="70" r="0.8" fill="rgba(255,255,255,0.06)"/><circle cx="50" cy="65" r="1" fill="rgba(255,255,255,0.09)"/><line x1="40" y1="5" x2="60" y2="35" stroke="rgba(111,115,144,0.05)" stroke-width="0.5"/><line x1="10" y1="10" x2="20" y2="40" stroke="rgba(111,115,144,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Celestia: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="10" width="50" height="8" rx="2" fill="rgba(123,47,190,0.07)"/><rect x="5" y="25" width="50" height="8" rx="2" fill="rgba(0,212,255,0.05)"/><rect x="5" y="40" width="50" height="8" rx="2" fill="rgba(123,47,190,0.06)"/></svg>`,
  ),
  "0G": makeSvgUrl(
    `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="1" fill="rgba(0,212,255,0.12)"/><circle cx="25" cy="5" r="0.8" fill="rgba(0,212,255,0.09)"/><circle cx="40" cy="10" r="1" fill="rgba(0,212,255,0.10)"/><circle cx="5" cy="25" r="0.8" fill="rgba(0,212,255,0.08)"/><circle cx="25" cy="25" r="1.5" fill="rgba(0,212,255,0.15)"/><circle cx="45" cy="25" r="0.8" fill="rgba(0,212,255,0.08)"/><circle cx="10" cy="40" r="1" fill="rgba(0,212,255,0.09)"/><circle cx="40" cy="40" r="1" fill="rgba(0,212,255,0.09)"/></svg>`,
  ),
  Ethereum: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M30 0 L60 30 L30 60 L0 30 Z" fill="none" stroke="rgba(98,126,234,0.07)" stroke-width="0.5"/><path d="M15 15 L45 15 L45 45 L15 45 Z" fill="none" stroke="rgba(98,126,234,0.05)" stroke-width="0.5"/><circle cx="30" cy="30" r="2" fill="rgba(98,126,234,0.12)"/><circle cx="15" cy="15" r="1" fill="rgba(247,147,26,0.10)"/><circle cx="45" cy="45" r="1" fill="rgba(247,147,26,0.10)"/></svg>`,
  ),
  Arbitrum: makeSvgUrl(
    `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="none" stroke="rgba(18,170,255,0.08)" stroke-width="0.5"><line x1="0" y1="20" x2="40" y2="20"/><line x1="20" y1="0" x2="20" y2="40"/><line x1="0" y1="0" x2="40" y2="40"/><line x1="40" y1="0" x2="0" y2="40"/></g><circle cx="20" cy="20" r="2" fill="rgba(18,170,255,0.12)"/><circle cx="0" cy="0" r="1" fill="rgba(18,170,255,0.08)"/><circle cx="40" cy="40" r="1" fill="rgba(18,170,255,0.08)"/></svg>`,
  ),
  Base: makeSvgUrl(
    `<svg width="80" height="20" viewBox="0 0 80 20" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="4" x2="80" y2="4" stroke="rgba(0,82,255,0.06)" stroke-width="0.5"/><line x1="0" y1="10" x2="80" y2="10" stroke="rgba(0,82,255,0.05)" stroke-width="0.5"/><line x1="0" y1="16" x2="80" y2="16" stroke="rgba(0,82,255,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Multichain: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="30" r="4" fill="none" stroke="rgba(245,166,35,0.08)" stroke-width="0.5"/><circle cx="30" cy="10" r="4" fill="none" stroke="rgba(245,166,35,0.08)" stroke-width="0.5"/><circle cx="50" cy="30" r="4" fill="none" stroke="rgba(245,166,35,0.07)" stroke-width="0.5"/><circle cx="30" cy="50" r="4" fill="none" stroke="rgba(245,166,35,0.07)" stroke-width="0.5"/><circle cx="30" cy="30" r="3" fill="rgba(245,166,35,0.10)"/><line x1="10" y1="30" x2="30" y2="30" stroke="rgba(245,166,35,0.05)" stroke-width="0.5"/><line x1="30" y1="10" x2="30" y2="30" stroke="rgba(245,166,35,0.05)" stroke-width="0.5"/><line x1="50" y1="30" x2="30" y2="30" stroke="rgba(245,166,35,0.05)" stroke-width="0.5"/><line x1="30" y1="50" x2="30" y2="30" stroke="rgba(245,166,35,0.05)" stroke-width="0.5"/></svg>`,
  ),
  Solana: makeSvgUrl(
    `<svg width="100" height="20" viewBox="0 0 100 20" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="5" x2="100" y2="5" stroke="rgba(153,69,255,0.06)" stroke-width="1"/><line x1="0" y1="10" x2="100" y2="10" stroke="rgba(0,255,163,0.04)" stroke-width="0.5"/><line x1="0" y1="15" x2="100" y2="15" stroke="rgba(153,69,255,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Near: makeSvgUrl(
    `<svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg"><path d="M0 20 Q20 5 40 20 Q60 35 80 20" fill="none" stroke="rgba(0,192,139,0.07)" stroke-width="0.5"/><path d="M0 25 Q20 10 40 25 Q60 40 80 25" fill="none" stroke="rgba(0,192,139,0.05)" stroke-width="0.5"/></svg>`,
  ),
  Avalanche: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><polygon points="30,5 55,50 5,50" fill="none" stroke="rgba(232,65,66,0.08)" stroke-width="0.5"/><polygon points="30,15 48,45 12,45" fill="none" stroke="rgba(232,65,66,0.06)" stroke-width="0.5"/></svg>`,
  ),
  Cardano: makeSvgUrl(
    `<svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><circle cx="25" cy="25" r="20" fill="none" stroke="rgba(0,51,173,0.08)" stroke-width="0.5"/><circle cx="25" cy="25" r="12" fill="none" stroke="rgba(0,51,173,0.06)" stroke-width="0.5"/><circle cx="25" cy="25" r="4" fill="rgba(0,51,173,0.10)"/></svg>`,
  ),
  Mina: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><path d="M30 5 L55 55 L5 55 Z" fill="none" stroke="rgba(231,172,87,0.08)" stroke-width="0.5"/><circle cx="30" cy="30" r="1.5" fill="rgba(231,172,87,0.12)"/><circle cx="20" cy="20" r="1" fill="rgba(231,172,87,0.08)"/><circle cx="40" cy="40" r="1" fill="rgba(231,172,87,0.08)"/></svg>`,
  ),
  Bittensor: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><circle cx="30" cy="30" r="3" fill="rgba(54,161,139,0.12)"/><circle cx="10" cy="15" r="2" fill="rgba(54,161,139,0.09)"/><circle cx="50" cy="15" r="2" fill="rgba(54,161,139,0.09)"/><circle cx="10" cy="45" r="2" fill="rgba(54,161,139,0.08)"/><circle cx="50" cy="45" r="2" fill="rgba(54,161,139,0.08)"/><line x1="30" y1="30" x2="10" y2="15" stroke="rgba(54,161,139,0.05)" stroke-width="0.5"/><line x1="30" y1="30" x2="50" y2="15" stroke="rgba(54,161,139,0.05)" stroke-width="0.5"/><line x1="30" y1="30" x2="10" y2="45" stroke="rgba(54,161,139,0.04)" stroke-width="0.5"/><line x1="30" y1="30" x2="50" y2="45" stroke="rgba(54,161,139,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Arweave: makeSvgUrl(
    `<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="8" x2="40" y2="8" stroke="rgba(136,136,136,0.07)" stroke-width="0.5"/><line x1="0" y1="16" x2="40" y2="16" stroke="rgba(136,136,136,0.06)" stroke-width="0.5"/><line x1="0" y1="24" x2="40" y2="24" stroke="rgba(136,136,136,0.05)" stroke-width="0.5"/><line x1="0" y1="32" x2="40" y2="32" stroke="rgba(136,136,136,0.04)" stroke-width="0.5"/></svg>`,
  ),
  Stablecoins: makeSvgUrl(
    `<svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="15" width="50" height="5" rx="2" fill="rgba(38,161,123,0.06)"/><rect x="5" y="27" width="50" height="5" rx="2" fill="rgba(39,117,202,0.05)"/><rect x="5" y="39" width="50" height="5" rx="2" fill="rgba(38,161,123,0.04)"/></svg>`,
  ),
};

const GRADIENTS: Record<string, string> = {
  ICP: "linear-gradient(135deg, rgba(41,171,226,0.12) 0%, rgba(7,11,10,0.95) 60%, rgba(41,171,226,0.06) 100%)",
  Bitcoin:
    "linear-gradient(135deg, rgba(247,147,26,0.12) 0%, rgba(7,11,10,0.95) 60%, rgba(255,215,0,0.06) 100%)",
  Polkadot:
    "linear-gradient(135deg, rgba(230,0,122,0.12) 0%, rgba(7,11,10,0.95) 55%, rgba(230,0,122,0.06) 100%)",
  Cosmos:
    "linear-gradient(135deg, rgba(111,115,144,0.12) 0%, rgba(7,11,10,0.94) 55%, rgba(111,115,144,0.06) 100%)",
  Celestia:
    "linear-gradient(135deg, rgba(123,47,190,0.14) 0%, rgba(7,11,10,0.93) 50%, rgba(0,212,255,0.06) 100%)",
  "0G": "linear-gradient(135deg, rgba(0,212,255,0.14) 0%, rgba(7,11,10,0.93) 50%, rgba(0,212,255,0.06) 100%)",
  Ethereum:
    "linear-gradient(135deg, rgba(98,126,234,0.10) 0%, rgba(7,11,10,0.93) 50%, rgba(247,147,26,0.06) 100%)",
  Arbitrum:
    "linear-gradient(135deg, rgba(18,170,255,0.10) 0%, rgba(7,11,10,0.93) 50%, rgba(18,170,255,0.04) 100%)",
  Base: "linear-gradient(135deg, rgba(0,82,255,0.10) 0%, rgba(7,11,10,0.94) 55%, rgba(0,82,255,0.05) 100%)",
  Multichain:
    "linear-gradient(135deg, rgba(245,166,35,0.10) 0%, rgba(7,11,10,0.94) 55%, rgba(245,166,35,0.05) 100%)",
  Solana:
    "linear-gradient(135deg, rgba(153,69,255,0.14) 0%, rgba(7,11,10,0.92) 45%, rgba(0,255,163,0.08) 100%)",
  Near: "linear-gradient(135deg, rgba(0,192,139,0.10) 0%, rgba(7,11,10,0.94) 55%, rgba(0,192,139,0.05) 100%)",
  Avalanche:
    "linear-gradient(135deg, rgba(232,65,66,0.12) 0%, rgba(7,11,10,0.94) 55%, rgba(232,65,66,0.05) 100%)",
  Cardano:
    "linear-gradient(135deg, rgba(0,51,173,0.12) 0%, rgba(7,11,10,0.95) 60%, rgba(0,51,173,0.05) 100%)",
  Mina: "linear-gradient(135deg, rgba(231,172,87,0.10) 0%, rgba(7,11,10,0.94) 55%, rgba(231,172,87,0.05) 100%)",
  Bittensor:
    "linear-gradient(135deg, rgba(54,161,139,0.10) 0%, rgba(7,11,10,0.94) 55%, rgba(54,161,139,0.05) 100%)",
  Arweave:
    "linear-gradient(135deg, rgba(136,136,136,0.08) 0%, rgba(7,11,10,0.96) 60%, rgba(136,136,136,0.04) 100%)",
  Stablecoins:
    "linear-gradient(135deg, rgba(38,161,123,0.10) 0%, rgba(7,11,10,0.93) 50%, rgba(39,117,202,0.08) 100%)",
};

const TEX_SIZES: Record<string, string> = {
  ICP: "40px 40px",
  Bitcoin: "40px 40px",
  Polkadot: "60px 60px",
  Cosmos: "80px 80px",
  Celestia: "60px 60px",
  "0G": "50px 50px",
  Ethereum: "60px 60px",
  Arbitrum: "40px 40px",
  Base: "80px 20px",
  Multichain: "60px 60px",
  Solana: "100px 20px",
  Near: "80px 40px",
  Avalanche: "60px 60px",
  Cardano: "50px 50px",
  Mina: "60px 60px",
  Bittensor: "60px 60px",
  Arweave: "40px 40px",
  Stablecoins: "60px 60px",
};

function getNetworkTexture(id: string): React.CSSProperties {
  const gradient = GRADIENTS[id] ?? "rgba(7,11,10,0.95)";
  const texture = TEXTURES[id];
  const size = TEX_SIZES[id] ?? "60px 60px";
  if (texture) {
    return {
      backgroundImage: [gradient, texture].join(", "),
      backgroundSize: `cover, ${size}`,
    };
  }
  return { background: gradient };
}

const WALLET_COLORS: Record<string, string> = {
  "Internet Identity": "#29ABE2",
  Plug: "#8247E5",
  Oisy: "#00D4B8",
  MetaMask: "#F6851B",
  "Coinbase Wallet": "#0052FF",
  WalletConnect: "#3B99FC",
  Binance: "#F0B90B",
  Phantom: "#AB9FF2",
  Backpack: "#E33E3F",
  Keplr: "#5C8BEB",
  Leap: "#8B5CF6",
  Nova: "#E6007A",
  Talisman: "#D4FF00",
  SubWallet: "#00B7FF",
  Unisat: "#F7931A",
  Xverse: "#6C52E7",
  OKX: "#FFFFFF",
  "NEAR Wallet": "#00C08B",
  Meteor: "#3888FF",
  "Core Wallet": "#E84142",
  Nami: "#0033AD",
  Eternl: "#6D80FF",
  "Auro Wallet": "#E7AC57",
  ArConnect: "#888888",
  "Mask Network": "#1C68F3",
};

interface NetworkBannerProps {
  network: NetworkContent;
  tokens: TokenWithMeta[];
  isExpanded: boolean;
  onToggle: () => void;
  onConnectWallet: () => void;
  onBridge: () => void;
}

export default function NetworkBanner({
  network,
  tokens,
  isExpanded,
  onToggle,
  onConnectWallet,
  onBridge,
}: NetworkBannerProps) {
  const texture = getNetworkTexture(network.id);
  const [_hover, setHover] = useState(false);

  return (
    <>
      <style>{`
        .network-banner-content {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease-in-out;
        }
        .network-banner-content.expanded {
          max-height: 700px;
        }
        @media (prefers-reduced-motion: reduce) {
          .network-banner-content { transition: none !important; }
        }
      `}</style>
      <div
        style={{
          borderRadius: "12px",
          border: `1px solid ${network.color}33`,
          borderLeft: `4px solid ${network.color}4D`,
          backdropFilter: "blur(8px)",
          overflow: "hidden",
          ...texture,
        }}
      >
        {/* Header - always visible */}
        <button
          type="button"
          onClick={onToggle}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          aria-expanded={isExpanded}
          aria-label={`${isExpanded ? "Collapse" : "Expand"} ${network.name} network`}
          className="w-full"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 20px",
            height: "76px",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            textAlign: "left",
          }}
          data-ocid={`network.${network.id.toLowerCase()}.toggle`}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: `${network.color}22`,
                border: `2px solid ${network.color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "11px",
                fontWeight: "800",
                color: network.color,
                letterSpacing: "0.03em",
                flexShrink: 0,
              }}
            >
              {network.name.slice(0, 3).toUpperCase()}
            </div>
            <div>
              <div
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#E8ECEB",
                  lineHeight: 1.2,
                }}
              >
                {network.name}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: network.color,
                  opacity: 0.85,
                  marginTop: "2px",
                }}
              >
                {network.fullName}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                padding: "4px 12px",
                borderRadius: "999px",
                background: `${network.color}18`,
                border: `1px solid ${network.color}44`,
                fontSize: "12px",
                fontWeight: "600",
                color: network.color,
              }}
            >
              {tokens.length} tokens
            </div>
            <ChevronDown
              size={18}
              style={{
                color: network.color,
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
            />
          </div>
        </button>

        {/* Sub-hub content */}
        <div
          className={`network-banner-content${isExpanded ? " expanded" : ""}`}
        >
          <div
            style={{
              padding: "0 20px 20px",
              borderTop: `1px solid ${network.color}20`,
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: "20px",
                paddingTop: "16px",
              }}
              className="network-subhub-grid"
            >
              {/* Col 1: Intro */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    padding: "4px 10px",
                    borderRadius: "6px",
                    background: `${network.color}18`,
                    fontSize: "10px",
                    fontWeight: "700",
                    color: network.color,
                    letterSpacing: "0.1em",
                    width: "fit-content",
                  }}
                >
                  {tokens.length} TOKENS
                </div>
                <p
                  style={{
                    fontSize: "13px",
                    color: "#A9B3AF",
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {network.intro25words}
                </p>
              </div>

              {/* Col 2: Stats + Wallets */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {network.stats.map((stat) => (
                  <div
                    key={stat.label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "7px 12px",
                      borderRadius: "8px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    <span style={{ fontSize: "11px", color: "#A9B3AF" }}>
                      {stat.label}
                    </span>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: "700",
                        color: network.color,
                      }}
                    >
                      {stat.value}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "5px",
                    marginTop: "4px",
                  }}
                >
                  {network.wallets.map((w) => (
                    <span
                      key={w}
                      style={{
                        padding: "3px 8px",
                        borderRadius: "999px",
                        background: `${WALLET_COLORS[w] ?? "#555"}22`,
                        border: `1px solid ${WALLET_COLORS[w] ?? "#555"}44`,
                        fontSize: "10px",
                        fontWeight: "600",
                        color: WALLET_COLORS[w] ?? "#A9B3AF",
                      }}
                    >
                      {w}
                    </span>
                  ))}
                </div>
              </div>

              {/* Col 3: Actions */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onConnectWallet();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    background: `${network.color}22`,
                    border: `1px solid ${network.color}55`,
                    color: network.color,
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  aria-label={`Connect wallet to ${network.name}`}
                  data-ocid={`network.${network.id.toLowerCase()}.connect_wallet.button`}
                >
                  <Wallet size={14} />
                  Connect Wallet
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBridge();
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#A9B3AF",
                    fontSize: "13px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                  aria-label={`Bridge to ${network.name}`}
                  data-ocid={`network.${network.id.toLowerCase()}.bridge.button`}
                >
                  <ArrowLeftRight size={14} />
                  Bridge
                </button>

                {/* External links */}
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    marginTop: "4px",
                  }}
                >
                  {network.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        fontSize: "11px",
                        color: "rgba(169,179,175,0.8)",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = network.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(169,179,175,0.8)";
                      }}
                    >
                      <ExternalLink size={9} />
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .network-subhub-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
