import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import ActivityFeed from "./components/ActivityFeed";
import AnnouncementBanner from "./components/AnnouncementBanner";
import BridgePanel from "./components/BridgePanel";
import CircuitBackground from "./components/CircuitBackground";
import DCSSHero from "./components/DCSSHero";
import Footer from "./components/Footer";
import Navbar, { type Tab } from "./components/Navbar";
import SplashOverlay from "./components/SplashOverlay";
import TokenGrid from "./components/TokenGrid";
import WalletConnectModal from "./components/WalletConnectModal";
import { TokenProvider } from "./contexts/TokenContext";
import { TransactionProvider } from "./contexts/TransactionContext";
import { WalletProvider } from "./contexts/WalletContext";
import { useWallet } from "./contexts/WalletContext";
import { TOKEN_LIST } from "./data/tokens";
import { useLivePrices } from "./hooks/useLivePrices";
import DCSSCoinPage from "./pages/DCSSCoinPage";
import ProjectPage from "./pages/ProjectPage";
import StakingPage from "./pages/StakingPage";
import TokenDetailPage from "./pages/TokenDetailPage";
import WalletPage from "./pages/WalletPage";

function PortfolioBar() {
  const { activeWallet, getBalance, balanceTick } = useWallet();
  void balanceTick;
  const { prices } = useLivePrices();

  if (!activeWallet) return null;

  let totalUSD = 0;
  let tokenCount = 0;

  for (const token of TOKEN_LIST) {
    const bal = getBalance(
      activeWallet.network,
      activeWallet.address,
      token.symbol,
    );
    const price = prices[token.symbol]?.usd ?? token.defaultPrice ?? 0;
    if (bal > 0) {
      totalUSD += bal * price;
      tokenCount++;
    }
  }

  const walletLabel = `${activeWallet.walletType}`;

  return (
    <div
      className="flex items-center gap-4 px-4 py-2 rounded-xl text-xs font-mono flex-wrap mb-3"
      style={{
        background: "var(--accent-dim)",
        border: "1px solid rgba(0,212,184,0.15)",
        color: "var(--text-muted)",
      }}
      data-ocid="portfolio.panel"
    >
      <span style={{ color: "var(--accent-color)" }}>&#x1F4BC; Portfolio</span>
      <span style={{ color: "var(--text-primary)", fontWeight: 700 }}>
        $
        {totalUSD.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{" "}
        USD
      </span>
      <span style={{ color: "rgba(107,107,107,0.6)" }}>|</span>
      <span>
        {tokenCount} token{tokenCount !== 1 ? "s" : ""}
      </span>
      <span style={{ color: "rgba(107,107,107,0.6)" }}>|</span>
      <span>
        Conectado:{" "}
        <span style={{ color: "var(--accent-color)" }}>{walletLabel}</span>
      </span>
    </div>
  );
}

function Dashboard({
  onNavigateToToken,
  onConnectWallet,
  onBridge,
}: {
  onNavigateToToken: (symbol: string) => void;
  onConnectWallet: () => void;
  onBridge: () => void;
}) {
  return (
    <div>
      <DCSSHero onConnectWallet={onConnectWallet} />
      <section className="max-w-[1200px] mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2
              className="text-xl font-bold font-display"
              style={{ color: "var(--text-primary)" }}
            >
              Todos los Tokens
            </h2>
            <p
              className="text-xs mt-0.5"
              style={{ color: "var(--text-muted)" }}
            >
              43 activos en ICP, EVM, Solana &amp; Cosmos
            </p>
          </div>
          <div
            className="text-xs px-3 py-1.5 rounded-full font-mono"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(0,212,184,0.2)",
              color: "var(--accent-color)",
            }}
          >
            Precios en vivo • 30s
          </div>
        </div>
        <PortfolioBar />
        <TokenGrid
          onNavigateToToken={onNavigateToToken}
          onConnectWallet={() => onConnectWallet()}
          onBridge={onBridge}
        />
      </section>
    </div>
  );
}

function TokensPage({
  onNavigateToToken,
}: {
  onNavigateToToken: (symbol: string) => void;
}) {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="mb-6">
        <h2
          className="text-2xl font-bold font-display"
          style={{ color: "var(--text-primary)" }}
        >
          Tokens
        </h2>
        <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>
          Busca y filtra entre los 43 activos soportados
        </p>
      </div>
      <TokenGrid showSearch onNavigateToToken={onNavigateToToken} />
    </section>
  );
}

function BridgePage() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <BridgePanel />
    </section>
  );
}

function ActivityPage() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <ActivityFeed />
    </section>
  );
}

function AppContent() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [tokenDetailSymbol, setTokenDetailSymbol] = useState<string | null>(
    null,
  );
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  function handleNavigateToToken(symbol: string) {
    setTokenDetailSymbol(symbol);
  }

  function handleBackFromToken() {
    setTokenDetailSymbol(null);
  }

  function handleBridge() {
    setActiveTab("bridge");
  }

  function handleTabChange(tab: Tab) {
    setActiveTab(tab);
    setTokenDetailSymbol(null);
  }

  // Show DCSS coin page when token is DCSS
  const isDCSSPage = tokenDetailSymbol === "DCSS";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "var(--bg-base)", position: "relative" }}
    >
      <SplashOverlay />
      <CircuitBackground />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Navbar activeTab={activeTab} onTabChange={handleTabChange} />
        <AnnouncementBanner />

        <main className="flex-1">
          {isDCSSPage ? (
            <DCSSCoinPage onBack={handleBackFromToken} />
          ) : tokenDetailSymbol ? (
            <TokenDetailPage
              symbol={tokenDetailSymbol}
              onBack={handleBackFromToken}
            />
          ) : (
            <>
              {activeTab === "dashboard" && (
                <Dashboard
                  onNavigateToToken={handleNavigateToToken}
                  onConnectWallet={() => setWalletModalOpen(true)}
                  onBridge={handleBridge}
                />
              )}
              {activeTab === "tokens" && (
                <TokensPage onNavigateToToken={handleNavigateToToken} />
              )}
              {activeTab === "bridge" && <BridgePage />}
              {activeTab === "activity" && <ActivityPage />}
              {activeTab === "project" && (
                <ProjectPage onNavigateToTab={handleTabChange} />
              )}
              {activeTab === "staking" && <StakingPage />}
              {activeTab === "wallets" && <WalletPage />}
            </>
          )}
        </main>

        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
              color: "var(--text-primary)",
            },
          }}
        />
      </div>

      <WalletConnectModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <WalletProvider>
      <TransactionProvider>
        <TokenProvider>
          <AppContent />
        </TokenProvider>
      </TransactionProvider>
    </WalletProvider>
  );
}
