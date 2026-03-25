import { Download, LogOut, Wallet } from "lucide-react";
import { useState } from "react";
import { useWallet } from "../contexts/WalletContext";
import { TOKEN_LIST, truncateAddr } from "../data/tokens";
import type { Network } from "../data/tokens";
import { useLivePrices } from "../hooks/useLivePrices";

const TOKEN_COLORS: Record<string, string> = {
  ETH: "#627EEA",
  BTC: "#F7931A",
  SOL: "#9945FF",
  ATOM: "#2E3148",
  DOT: "#E6007A",
  ICP: "#00D4B8",
  AVAX: "#E84142",
  USDT: "#26A17B",
  USDC: "#2775CA",
  CLP: "#1DE9B6",
  ADA: "#0033AD",
  LINK: "#375BD2",
  MATIC: "#8247E5",
  AR: "#222F3E",
  MINA: "#E0C142",
  TIA: "#7B2FBE",
  INJ: "#00B2FF",
  NEAR: "#00C1DE",
  GRT: "#6747ED",
  OTHER: "#A9B3AF",
};

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

const SPARKLINE_FACTORS = [0.92, 0.95, 0.97, 0.96, 0.99, 1.01, 1.0];

interface WalletBalance {
  wallet: string;
  network: Network;
  address: string;
  symbol: string;
  amount: number;
  usdValue: number;
  change24h?: number;
}

function getAllBalances(
  connectedWallets: ReturnType<typeof useWallet>["connectedWallets"],
  prices: Record<string, { usd: number; usd_24h_change?: number }>,
): WalletBalance[] {
  const rows: WalletBalance[] = [];
  for (const w of connectedWallets) {
    const native = NETWORK_NATIVE[w.network as string];
    if (native) {
      const raw = localStorage.getItem(
        `dcss_${w.network}_${w.address}_${native}`,
      );
      if (raw) {
        const amount = Number.parseFloat(raw);
        if (amount > 0) {
          const priceData = prices[native];
          const price = priceData?.usd ?? 0;
          rows.push({
            wallet: w.walletType,
            network: w.network,
            address: w.address,
            symbol: native,
            amount,
            usdValue: amount * price,
            change24h: priceData?.usd_24h_change,
          });
        }
      }
    }
    for (const token of TOKEN_LIST) {
      if (token.symbol === native) continue;
      const raw = localStorage.getItem(
        `dcss_${w.network}_${w.address}_${token.symbol}`,
      );
      if (raw) {
        const amount = Number.parseFloat(raw);
        if (amount > 0) {
          const priceData = prices[token.symbol];
          const price = priceData?.usd ?? token.defaultPrice ?? 0;
          rows.push({
            wallet: w.walletType,
            network: w.network,
            address: w.address,
            symbol: token.symbol,
            amount,
            usdValue: amount * price,
            change24h: priceData?.usd_24h_change,
          });
        }
      }
    }
  }
  return rows;
}

function exportCSV(balances: WalletBalance[]) {
  const header =
    "wallet,network,address,token,balance,usd_value,change_24h,timestamp";
  const ts = new Date().toISOString();
  const rows = balances.map(
    (b) =>
      `${b.wallet},${b.network},${b.address},${b.symbol},${b.amount},${b.usdValue.toFixed(2)},${b.change24h?.toFixed(2) ?? ""},${ts}`,
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dcss-portfolio-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

interface AllocationSegment {
  symbol: string;
  pct: number;
  usd: number;
  color: string;
}

function buildAllocation(balances: WalletBalance[]): AllocationSegment[] {
  if (!balances.length) return [];
  const totals: Record<string, number> = {};
  for (const b of balances) {
    totals[b.symbol] = (totals[b.symbol] ?? 0) + b.usdValue;
  }
  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);
  if (!grandTotal) return [];

  const sorted = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
  const top5 = sorted.slice(0, 5);
  const otherUsd = sorted.slice(5).reduce((s, [, v]) => s + v, 0);

  const segments: AllocationSegment[] = top5.map(([symbol, usd]) => ({
    symbol,
    usd,
    pct: (usd / grandTotal) * 100,
    color: TOKEN_COLORS[symbol] ?? "#00D4B8",
  }));

  if (otherUsd > 0) {
    segments.push({
      symbol: "OTHER",
      usd: otherUsd,
      pct: (otherUsd / grandTotal) * 100,
      color: TOKEN_COLORS.OTHER,
    });
  }

  return segments;
}

function PortfolioSparkline({ totalUSD }: { totalUSD: number }) {
  if (totalUSD === 0) return null;
  const W = 280;
  const H = 56;
  const pad = 8;
  const values = SPARKLINE_FACTORS.map((f) => totalUSD * f);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1)) * (W - pad * 2);
    const y = H - pad - ((v - min) / range) * (H - pad * 2);
    return `${x},${y}`;
  });
  const polyline = points.join(" ");
  const areaPath = `M${points[0]} ${points
    .slice(1)
    .map((p) => `L${p}`)
    .join(" ")} L${W - pad},${H - pad} L${pad},${H - pad} Z`;

  return (
    <div
      className="rounded-xl p-4 mb-6"
      style={{
        background: "rgba(0,212,184,0.04)",
        border: "1px solid rgba(0,212,184,0.1)",
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold" style={{ color: "#A9B3AF" }}>
          RENDIMIENTO ESTIMADO 7D
        </span>
        <span
          className="text-[10px] px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(196,131,122,0.12)",
            color: "#C4837A",
            border: "1px solid rgba(196,131,122,0.25)",
          }}
        >
          DEMO
        </span>
      </div>
      <svg
        role="img"
        aria-label="Rendimiento estimado del portfolio en los últimos 7 días"
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{ width: "100%", height: "auto" }}
      >
        <title>Rendimiento estimado 7D</title>
        <defs>
          <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4B8" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00D4B8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaPath} fill="url(#sparkGrad)" />
        <polyline
          points={polyline}
          fill="none"
          stroke="#00D4B8"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="flex justify-between text-[10px] mt-1"
        style={{ color: "#5A6560" }}
      >
        <span>7D atrás</span>
        <span>Hoy</span>
      </div>
    </div>
  );
}

export default function WalletPage() {
  const { connectedWallets, disconnectWallet, balanceTick } = useWallet();
  const { prices } = useLivePrices();
  void balanceTick;

  const balances = getAllBalances(connectedWallets, prices);
  const totalUSD = balances.reduce((s, b) => s + b.usdValue, 0);
  const allocation = buildAllocation(balances);
  const hasBalances = balances.some((b) => b.usdValue > 0);

  const [confirming, setConfirming] = useState<string | null>(null);

  if (!connectedWallets.length) {
    return (
      <section className="max-w-[1200px] mx-auto px-4 py-16">
        <div
          className="flex flex-col items-center justify-center gap-4 py-20 rounded-2xl"
          style={{
            background: "rgba(0,212,184,0.04)",
            border: "1px solid rgba(0,212,184,0.12)",
          }}
          data-ocid="wallet.empty_state"
        >
          <Wallet size={48} style={{ color: "rgba(0,212,184,0.3)" }} />
          <p className="text-lg font-semibold" style={{ color: "#E8ECEB" }}>
            Sin billeteras conectadas
          </p>
          <p className="text-sm" style={{ color: "#A9B3AF" }}>
            Conecta una billetera desde el botón arriba a la derecha para ver tu
            portfolio aquí.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2
            className="text-2xl font-bold font-display"
            style={{ color: "#E8ECEB" }}
          >
            Mis Billeteras
          </h2>
          <p className="text-sm mt-1" style={{ color: "#A9B3AF" }}>
            {connectedWallets.length} billetera
            {connectedWallets.length !== 1 ? "s" : ""} conectada
            {connectedWallets.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div
            className="px-4 py-2 rounded-xl text-sm font-mono"
            style={{
              background: "rgba(0,212,184,0.08)",
              border: "1px solid rgba(0,212,184,0.2)",
              color: "#00D4B8",
            }}
          >
            Total:{" "}
            <span className="font-bold text-white">
              $
              {totalUSD.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              USD
            </span>
          </div>
          {hasBalances && (
            <button
              type="button"
              onClick={() => exportCSV(balances)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={{
                background: "rgba(0,212,184,0.1)",
                border: "1px solid rgba(0,212,184,0.3)",
                color: "#00D4B8",
              }}
              data-ocid="wallet.upload_button"
            >
              <Download size={14} />
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      <PortfolioSparkline totalUSD={totalUSD} />

      {hasBalances && allocation.length > 0 && (
        <div
          className="rounded-2xl p-5 mb-8"
          style={{
            background: "rgba(0,212,184,0.04)",
            border: "1px solid rgba(0,212,184,0.12)",
          }}
          data-ocid="wallet.panel"
        >
          <h3
            className="text-sm font-semibold mb-4"
            style={{ color: "#A9B3AF" }}
          >
            ASIGNACIÓN
          </h3>
          <div
            className="flex rounded-full overflow-hidden mb-3"
            style={{ height: "18px", gap: "2px" }}
          >
            {allocation.map((seg) => (
              <div
                key={seg.symbol}
                style={{ width: `${seg.pct}%`, background: seg.color }}
                title={`${seg.symbol}: ${seg.pct.toFixed(1)}%`}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-2">
            {allocation.map((seg) => (
              <div
                key={seg.symbol}
                className="flex items-center gap-1.5 text-xs"
              >
                <span
                  className="w-2.5 h-2.5 rounded-sm inline-block"
                  style={{ background: seg.color }}
                />
                <span style={{ color: "#E8ECEB" }}>{seg.symbol}</span>
                <span style={{ color: "#5A6560" }}>{seg.pct.toFixed(1)}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {connectedWallets.map((w, idx) => {
          const nativeSymbol = NETWORK_NATIVE[w.network as string];
          const nativeRaw = nativeSymbol
            ? localStorage.getItem(
                `dcss_${w.network}_${w.address}_${nativeSymbol}`,
              )
            : null;
          const nativeAmount = nativeRaw ? Number.parseFloat(nativeRaw) : 0;
          const nativePrice = nativeSymbol
            ? (prices[nativeSymbol]?.usd ?? 0)
            : 0;
          const nativeUSD = nativeAmount * nativePrice;
          const nativeChange = nativeSymbol
            ? prices[nativeSymbol]?.usd_24h_change
            : undefined;

          const walletBalances = balances.filter(
            (b) => b.address === w.address,
          );
          const walletTotal = walletBalances.reduce(
            (s, b) => s + b.usdValue,
            0,
          );

          const isConfirming = confirming === w.address;

          return (
            <div
              key={w.address}
              className="rounded-2xl p-5"
              style={{
                background: "rgba(0,212,184,0.06)",
                border: "1px solid rgba(0,212,184,0.15)",
              }}
              data-ocid={`wallet.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#E8ECEB" }}
                  >
                    {w.walletType}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#A9B3AF" }}>
                    {w.network}
                  </p>
                </div>
                {!isConfirming ? (
                  <button
                    type="button"
                    onClick={() => setConfirming(w.address)}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg transition-colors"
                    style={{
                      color: "#ef4444",
                      border: "1px solid rgba(239,68,68,0.25)",
                    }}
                    data-ocid={`wallet.delete_button.${idx + 1}`}
                  >
                    <LogOut size={11} />
                    Desconectar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        disconnectWallet(w.address);
                        setConfirming(null);
                      }}
                      className="text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        background: "rgba(239,68,68,0.15)",
                        color: "#ef4444",
                        border: "1px solid rgba(239,68,68,0.35)",
                      }}
                      data-ocid={`wallet.confirm_button.${idx + 1}`}
                    >
                      Confirmar
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirming(null)}
                      className="text-xs px-2.5 py-1 rounded-lg"
                      style={{
                        color: "#A9B3AF",
                        border: "1px solid rgba(169,179,175,0.2)",
                      }}
                      data-ocid={`wallet.cancel_button.${idx + 1}`}
                    >
                      Cancelar
                    </button>
                  </div>
                )}
              </div>

              <p
                className="text-xs font-mono mb-4 truncate"
                style={{ color: "#5A6560" }}
              >
                {w.address}
              </p>

              {nativeAmount > 0 ? (
                <div className="flex items-baseline justify-between">
                  <span
                    className="text-xl font-bold"
                    style={{ color: "#00D4B8" }}
                  >
                    {nativeAmount.toLocaleString(undefined, {
                      maximumFractionDigits: 6,
                    })}{" "}
                    <span className="text-sm" style={{ color: "#A9B3AF" }}>
                      {nativeSymbol}
                    </span>
                  </span>
                  <div className="text-right">
                    <span
                      className="text-sm font-mono block"
                      style={{ color: "#1DE9B6" }}
                    >
                      $
                      {nativeUSD.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </span>
                    {nativeChange !== undefined ? (
                      <span
                        className="text-xs font-mono"
                        style={{
                          color: nativeChange >= 0 ? "#1DE9B6" : "#ef4444",
                        }}
                      >
                        {nativeChange >= 0 ? "+" : ""}
                        {nativeChange.toFixed(2)}% 24h
                      </span>
                    ) : null}
                  </div>
                </div>
              ) : (
                <p className="text-sm" style={{ color: "#5A6560" }}>
                  Cargando balance… o 0 {nativeSymbol}
                </p>
              )}

              {walletBalances.length > 1 && (
                <div
                  className="mt-3 pt-3 space-y-1"
                  style={{ borderTop: "1px solid rgba(0,212,184,0.08)" }}
                >
                  {walletBalances.slice(0, 6).map((b) => (
                    <div
                      key={b.symbol}
                      className="flex justify-between text-xs font-mono"
                    >
                      <span style={{ color: "#A9B3AF" }}>{b.symbol}</span>
                      <span style={{ color: "#E8ECEB" }}>
                        {b.amount.toLocaleString(undefined, {
                          maximumFractionDigits: 6,
                        })}
                      </span>
                      <span style={{ color: "#5A6560" }}>
                        $
                        {b.usdValue.toLocaleString(undefined, {
                          maximumFractionDigits: 2,
                        })}
                      </span>
                      {b.change24h !== undefined ? (
                        <span
                          style={{
                            color: b.change24h >= 0 ? "#1DE9B6" : "#ef4444",
                            minWidth: "48px",
                            textAlign: "right",
                          }}
                        >
                          {b.change24h >= 0 ? "+" : ""}
                          {b.change24h.toFixed(1)}%
                        </span>
                      ) : (
                        <span
                          style={{
                            color: "#5A6560",
                            minWidth: "48px",
                            textAlign: "right",
                          }}
                        >
                          —
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {walletTotal > 0 && (
                <div
                  className="mt-3 pt-2 flex justify-between text-xs"
                  style={{ borderTop: "1px solid rgba(0,212,184,0.08)" }}
                >
                  <span style={{ color: "#A9B3AF" }}>Wallet total</span>
                  <span className="font-bold" style={{ color: "#00D4B8" }}>
                    $
                    {walletTotal.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}{" "}
                    USD
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {balances.length > 0 && (
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: "rgba(0,212,184,0.03)",
            border: "1px solid rgba(0,212,184,0.12)",
          }}
          data-ocid="wallet.table"
        >
          <div
            className="px-5 py-3"
            style={{ borderBottom: "1px solid rgba(0,212,184,0.08)" }}
          >
            <h3 className="text-sm font-semibold" style={{ color: "#A9B3AF" }}>
              TODOS MIS ACTIVOS
            </h3>
          </div>
          <table className="w-full text-xs">
            <thead>
              <tr
                style={{
                  color: "#5A6560",
                  borderBottom: "1px solid rgba(0,212,184,0.06)",
                }}
              >
                <th className="px-5 py-2 text-left">Billetera</th>
                <th className="px-5 py-2 text-left">Red</th>
                <th className="px-5 py-2 text-left">Dirección</th>
                <th className="px-5 py-2 text-right">Token</th>
                <th className="px-5 py-2 text-right">Balance</th>
                <th className="px-5 py-2 text-right">Valor USD</th>
                <th className="px-5 py-2 text-right">24h</th>
              </tr>
            </thead>
            <tbody>
              {balances.map((b, i) => (
                <tr
                  key={`${b.address}-${b.symbol}`}
                  style={{
                    borderBottom:
                      i < balances.length - 1
                        ? "1px solid rgba(0,212,184,0.04)"
                        : "none",
                  }}
                  data-ocid={`wallet.row.${i + 1}`}
                >
                  <td className="px-5 py-2" style={{ color: "#E8ECEB" }}>
                    {b.wallet}
                  </td>
                  <td className="px-5 py-2" style={{ color: "#A9B3AF" }}>
                    {b.network}
                  </td>
                  <td
                    className="px-5 py-2 font-mono"
                    style={{ color: "#5A6560" }}
                  >
                    {truncateAddr(b.address)}
                  </td>
                  <td
                    className="px-5 py-2 text-right font-mono"
                    style={{ color: "#00D4B8" }}
                  >
                    {b.symbol}
                  </td>
                  <td
                    className="px-5 py-2 text-right font-mono"
                    style={{ color: "#1DE9B6" }}
                  >
                    {b.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 8,
                    })}
                  </td>
                  <td
                    className="px-5 py-2 text-right font-mono"
                    style={{ color: "#E8ECEB" }}
                  >
                    $
                    {b.usdValue.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td
                    className="px-5 py-2 text-right font-mono"
                    style={{
                      color:
                        b.change24h !== undefined
                          ? b.change24h >= 0
                            ? "#1DE9B6"
                            : "#ef4444"
                          : "#5A6560",
                    }}
                  >
                    {b.change24h !== undefined
                      ? `${b.change24h >= 0 ? "+" : ""}${b.change24h.toFixed(2)}%`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
