import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Activity,
  ArrowLeftRight,
  BookOpen,
  ChevronDown,
  Coins,
  Layers,
  LayoutDashboard,
  LogOut,
  Moon,
  Sun,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import type { AppTheme } from "../App";
import { useWallet } from "../contexts/WalletContext";
import type { Network } from "../data/tokens";
import { truncateAddr } from "../data/tokens";
import { useLivePrices } from "../hooks/useLivePrices";
import WalletConnectModal from "./WalletConnectModal";

export type Tab =
  | "dashboard"
  | "tokens"
  | "bridge"
  | "activity"
  | "project"
  | "staking"
  | "wallets";

const NAV_ITEMS: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "tokens", label: "Tokens", icon: Coins },
  { id: "bridge", label: "Bridge", icon: ArrowLeftRight },
  { id: "activity", label: "Activity", icon: Activity },
  { id: "project", label: "Project", icon: BookOpen },
  { id: "staking", label: "Staking", icon: Layers },
  { id: "wallets", label: "Wallets", icon: Wallet },
];

const NETWORK_NATIVE: Record<string, string> = {
  Ethereum: "ETH",
  Arbitrum: "ETH",
  Base: "ETH",
  Multichain: "ETH",
  Avalanche: "AVAX",
  Stablecoins: "ETH",
  "0G": "ETH",
  Solana: "SOL",
  Cosmos: "ATOM",
  Polkadot: "DOT",
  ICP: "ICP",
  Bitcoin: "BTC",
  Arweave: "AR",
  Mina: "MINA",
  Cardano: "ADA",
  Celestia: "TIA",
};

interface NavbarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  theme: AppTheme;
  onThemeToggle: () => void;
}

export default function Navbar({
  activeTab,
  onTabChange,
  theme,
  onThemeToggle,
}: NavbarProps) {
  const {
    connectedWallets,
    activeWallet,
    setActiveWallet,
    disconnectWallet,
    balanceTick,
  } = useWallet();
  void balanceTick;
  const { prices } = useLivePrices();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  function getWalletBalance(network: Network, address: string) {
    const symbol = NETWORK_NATIVE[network as string];
    if (!symbol) return null;
    const raw = localStorage.getItem(`dcss_${network}_${address}_${symbol}`);
    if (!raw) return null;
    const amount = Number.parseFloat(raw);
    if (!amount || amount <= 0) return null;
    return { amount, symbol };
  }

  function getWalletUSD(network: Network, address: string): number | null {
    const bal = getWalletBalance(network, address);
    if (!bal) return null;
    const price = prices[bal.symbol]?.usd;
    if (!price) return null;
    return bal.amount * price;
  }

  const totalPortfolio = connectedWallets.reduce((sum, w) => {
    const usd = getWalletUSD(w.network, w.address);
    return usd != null ? sum + usd : sum;
  }, 0);

  const hasAnyBalance = connectedWallets.some(
    (w) => getWalletBalance(w.network, w.address) !== null,
  );

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: "rgba(11,17,16,0.96)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,212,184,0.12)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => onTabChange("dashboard")}
            className="flex items-center gap-2.5 shrink-0"
            data-ocid="nav.dashboard.link"
          >
            <img
              src="/assets/generated/dcss-logo-transparent.dim_200x200.png"
              alt="DCSS"
              className="w-9 h-9 rounded-full object-cover"
            />
            <span
              className="font-bold text-sm tracking-widest uppercase"
              style={{ color: "#00D4B8" }}
            >
              DCSS
            </span>
            <span className="hidden sm:block text-xs text-muted-foreground tracking-wider font-medium">
              CRYPTO HUB
            </span>
          </button>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  data-ocid={`nav.${item.id}.link`}
                  className="relative flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-md transition-colors"
                  style={{
                    color: isActive ? "#00D4B8" : "rgba(169,179,175,1)",
                    background: isActive
                      ? "rgba(0,212,184,0.08)"
                      : "transparent",
                  }}
                >
                  <Icon size={13} />
                  {item.label}
                  {isActive && (
                    <span
                      className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full"
                      style={{ background: "#00D4B8" }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right: theme toggle + wallet */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              type="button"
              onClick={onThemeToggle}
              className="flex items-center justify-center rounded-full transition-colors"
              style={{
                width: "32px",
                height: "32px",
                background:
                  theme === "midnight"
                    ? "rgba(120,160,255,0.12)"
                    : "rgba(255,200,80,0.12)",
                border:
                  theme === "midnight"
                    ? "1px solid rgba(120,160,255,0.3)"
                    : "1px solid rgba(255,200,80,0.35)",
                color: theme === "midnight" ? "#8ab4f8" : "#f5c842",
              }}
              title={
                theme === "midnight" ? "Cambiar a Claro" : "Cambiar a Midnight"
              }
              data-ocid="nav.theme.toggle"
            >
              {theme === "midnight" ? <Sun size={14} /> : <Moon size={14} />}
            </button>

            {activeWallet ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-colors"
                    style={{
                      background: "rgba(0,212,184,0.08)",
                      borderColor: "rgba(0,212,184,0.35)",
                      color: "#00D4B8",
                    }}
                    data-ocid="nav.wallet.toggle"
                  >
                    <span
                      className="w-2 h-2 rounded-full animate-pulse_neon"
                      style={{ background: "#00D4B8" }}
                    />
                    {truncateAddr(activeWallet.address)}
                    <ChevronDown size={12} />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64"
                  style={{
                    background: "#0F1513",
                    border: "1px solid rgba(0,212,184,0.2)",
                  }}
                >
                  {connectedWallets.map((w) => {
                    const bal = getWalletBalance(w.network, w.address);
                    const usd = getWalletUSD(w.network, w.address);
                    return (
                      <DropdownMenuItem
                        key={w.address}
                        onClick={() => setActiveWallet(w)}
                        className="flex flex-col items-start gap-0.5 cursor-pointer py-2"
                        style={{
                          color:
                            activeWallet.address === w.address
                              ? "#00D4B8"
                              : "#E8ECEB",
                        }}
                      >
                        <span className="text-xs font-medium">
                          {w.walletType} · {w.network}
                        </span>
                        <span
                          className="text-[10px] font-mono"
                          style={{ color: "#A9B3AF" }}
                        >
                          {truncateAddr(w.address)}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span
                            className="text-[11px] font-semibold"
                            style={{ color: bal ? "#1DE9B6" : "#5A6560" }}
                          >
                            {bal
                              ? `${bal.amount.toLocaleString(undefined, { maximumFractionDigits: 6 })} ${bal.symbol}`
                              : "—"}
                          </span>
                          {usd != null && (
                            <span
                              className="text-[10px]"
                              style={{ color: "#A9B3AF" }}
                            >
                              $
                              {usd.toLocaleString(undefined, {
                                maximumFractionDigits: 2,
                              })}
                            </span>
                          )}
                        </div>
                      </DropdownMenuItem>
                    );
                  })}

                  {hasAnyBalance && (
                    <div
                      className="px-2 py-1.5 flex items-center justify-between"
                      style={{
                        borderTop: "1px solid rgba(0,212,184,0.1)",
                        borderBottom: "1px solid rgba(0,212,184,0.1)",
                      }}
                    >
                      <span
                        className="text-[10px]"
                        style={{ color: "#A9B3AF" }}
                      >
                        Total Portfolio
                      </span>
                      <span
                        className="text-[11px] font-bold"
                        style={{ color: "#00D4B8" }}
                      >
                        $
                        {totalPortfolio.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}{" "}
                        USD
                      </span>
                    </div>
                  )}

                  <DropdownMenuSeparator
                    style={{ background: "rgba(0,212,184,0.1)" }}
                  />
                  <DropdownMenuItem
                    onClick={() => {
                      setWalletModalOpen(true);
                    }}
                    style={{ color: "#00D4B8" }}
                    data-ocid="nav.connect_wallet.button"
                  >
                    <Wallet size={13} className="mr-2" />
                    Add Wallet
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => onTabChange("wallets")}
                    style={{ color: "#00D4B8" }}
                    data-ocid="nav.wallets.link"
                  >
                    <Wallet size={13} className="mr-2" />
                    Manage Wallets
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => disconnectWallet(activeWallet.address)}
                    style={{ color: "#ef4444" }}
                    data-ocid="nav.disconnect.button"
                  >
                    <LogOut size={13} className="mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => setWalletModalOpen(true)}
                size="sm"
                className="rounded-full text-xs font-semibold px-4"
                style={{
                  background: "#00D4B8",
                  color: "#070B0A",
                  border: "none",
                }}
                data-ocid="nav.connect_wallet.button"
              >
                <Wallet size={13} className="mr-1.5" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>

        {/* Mobile nav — horizontal scroll */}
        <div
          className="flex md:hidden border-t items-center px-2 py-1"
          style={{
            borderColor: "rgba(0,212,184,0.08)",
            overflowX: "auto",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center gap-0.5 px-3 py-1.5 text-[10px] font-medium shrink-0"
                style={{ color: isActive ? "#00D4B8" : "#A9B3AF" }}
                data-ocid={`nav.${item.id}.link`}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </div>
      </header>

      <WalletConnectModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </>
  );
}
