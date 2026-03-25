import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useWallet } from "../contexts/WalletContext";
import { useActor } from "../hooks/useActor";
import { useStats } from "../hooks/useQueries";

const COLLATERAL_RATIO = 1.5; // 150% collateral required
const ICP_PRICE_ESTIMATE = 12; // rough ICP price in USD for UX display

const ROADMAP = [
  { feature: "Mint/Burn básico", status: "Beta", date: "Ahora", live: true },
  {
    feature: "Staking veDCSS",
    status: "Desarrollo",
    date: "Q3 2026",
    live: false,
  },
  {
    feature: "Governance DAO",
    status: "Planificado",
    date: "Q4 2026",
    live: false,
  },
  {
    feature: "Puente EVM (Wormhole)",
    status: "Planificado",
    date: "2027",
    live: false,
  },
  {
    feature: "Integración bancaria",
    status: "OPCIONAL — comunidad",
    date: "Sin fecha",
    live: false,
  },
];

function StatBox({
  label,
  value,
  loading,
}: {
  label: string;
  value: string;
  loading: boolean;
}) {
  return (
    <div
      className="p-4 rounded-xl"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
      }}
    >
      <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </p>
      {loading ? (
        <Skeleton
          className="h-6 w-24"
          style={{ background: "var(--bg-elevated)" }}
        />
      ) : (
        <p
          className="text-lg font-bold font-mono"
          style={{ color: "var(--accent-color)" }}
        >
          {value}
        </p>
      )}
    </div>
  );
}

export default function DCSSCoinPage({ onBack }: { onBack: () => void }) {
  const { activeWallet } = useWallet();
  const { data: stats, isLoading } = useStats();
  const { actor } = useActor();

  const [mintIcp, setMintIcp] = useState("");
  const [burnDcss, setBurnDcss] = useState("");
  const [minting, setMinting] = useState(false);
  const [burning, setBurning] = useState(false);

  const estimatedDcss = mintIcp
    ? ((Number(mintIcp) * ICP_PRICE_ESTIMATE) / COLLATERAL_RATIO).toFixed(2)
    : "0";
  const estimatedIcp = burnDcss
    ? ((Number(burnDcss) * COLLATERAL_RATIO) / ICP_PRICE_ESTIMATE).toFixed(4)
    : "0";

  async function handleMint() {
    if (!actor || !activeWallet || !mintIcp) return;
    const icpAmount = Number(mintIcp);
    if (Number.isNaN(icpAmount) || icpAmount <= 0) {
      toast.error("Ingresa una cantidad válida de ICP");
      return;
    }
    setMinting(true);
    try {
      const collateral = BigInt(Math.floor(icpAmount * 1e8));
      const vaultId = await actor.openVault(collateral);
      await actor.recordTransaction(
        "mint",
        "DCSS",
        icpAmount,
        activeWallet.address,
        "dcss-protocol",
        "ICP",
        activeWallet.address,
      );
      toast.success(
        `Vault #${vaultId} abierto — ${estimatedDcss} DCSS mintados`,
      );
      setMintIcp("");
    } catch (err) {
      toast.error("Error al mintear DCSS", {
        description: String(err),
      });
    } finally {
      setMinting(false);
    }
  }

  async function handleBurn() {
    if (!actor || !activeWallet || !burnDcss) return;
    const dcssAmount = Number(burnDcss);
    if (Number.isNaN(dcssAmount) || dcssAmount <= 0) {
      toast.error("Ingresa una cantidad válida de DCSS");
      return;
    }
    setBurning(true);
    try {
      const vaultId = BigInt(0);
      await actor.closeVault(vaultId);
      await actor.recordTransaction(
        "burn",
        "DCSS",
        dcssAmount,
        activeWallet.address,
        "dcss-protocol",
        "ICP",
        activeWallet.address,
      );
      toast.success(
        `${dcssAmount} DCSS quemados — ~${estimatedIcp} ICP recuperados`,
      );
      setBurnDcss("");
    } catch (err) {
      toast.error("Error al quemar DCSS", {
        description: String(err),
      });
    } finally {
      setBurning(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto px-4 py-10">
      {/* Back */}
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 text-sm mb-8 transition-colors"
        style={{ color: "var(--text-muted)" }}
        data-ocid="dcss.back.button"
      >
        <ArrowLeft size={16} />
        Volver al dashboard
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm font-mono"
            style={{
              background: "var(--accent-dim)",
              border: "1px solid rgba(0,212,184,0.3)",
              color: "var(--accent-color)",
            }}
          >
            DCSS
          </div>
          <div>
            <h1
              className="text-2xl font-bold font-display"
              style={{ color: "var(--text-primary)" }}
            >
              DCSS Coin
            </h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Stablecoin DeFi-nativa en Internet Computer
            </p>
          </div>
        </div>
        <p
          style={{
            color: "var(--text-muted)",
            fontSize: "14px",
            lineHeight: "1.6",
            maxWidth: "600px",
          }}
        >
          DCSS es un stablecoin colateralizado al 150%, similar al modelo DAI,
          construido sobre ICP. Deposita ICP como colateral, recibe DCSS a valor
          USD. Quema DCSS para recuperar tu colateral. Sin banco. Sin permiso.
          Solo contratos.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        <StatBox
          label="Supply Circulante"
          value={stats ? `${(stats.circulatingSupply / 1e6).toFixed(2)}M` : "-"}
          loading={isLoading}
        />
        <StatBox
          label="Supply Total"
          value={stats ? `${(stats.totalSupply / 1e6).toFixed(2)}M` : "-"}
          loading={isLoading}
        />
        <StatBox
          label="Transacciones"
          value={stats ? Number(stats.txCount).toLocaleString() : "-"}
          loading={isLoading}
        />
        <StatBox
          label="Holders"
          value={stats ? Number(stats.holders).toLocaleString() : "-"}
          loading={isLoading}
        />
      </div>

      {/* Mint/Burn — only when wallet connected */}
      {activeWallet ? (
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {/* Mint */}
          <div
            className="p-5 rounded-xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h2
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Mint DCSS
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Deposita ICP como colateral (150%) y recibe DCSS
            </p>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="mint-icp-input"
                  className="text-xs mb-1 block"
                  style={{ color: "var(--text-muted)" }}
                >
                  ICP a depositar
                </label>
                <Input
                  id="mint-icp-input"
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={mintIcp}
                  onChange={(e) => setMintIcp(e.target.value)}
                  className="font-mono"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  data-ocid="dcss.mint.input"
                />
              </div>
              {mintIcp && (
                <div
                  className="px-3 py-2 rounded-lg text-xs font-mono"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-muted)",
                  }}
                >
                  Estimado:{" "}
                  <span style={{ color: "var(--accent-color)" }}>
                    {estimatedDcss} DCSS
                  </span>
                  <span className="ml-2">(colateral 150%)</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleMint}
                disabled={minting || !mintIcp}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background:
                    mintIcp && !minting
                      ? "var(--accent-color)"
                      : "var(--bg-elevated)",
                  color: mintIcp && !minting ? "#0A0A0A" : "var(--text-muted)",
                  border: "1px solid var(--border-subtle)",
                  cursor: minting || !mintIcp ? "not-allowed" : "pointer",
                }}
                data-ocid="dcss.mint.submit_button"
              >
                {minting && <Loader2 size={14} className="animate-spin" />}
                {minting ? "Minteando..." : "Mint DCSS"}
              </button>
            </div>
          </div>

          {/* Burn */}
          <div
            className="p-5 rounded-xl"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <h2
              className="text-sm font-semibold mb-1"
              style={{ color: "var(--text-primary)" }}
            >
              Burn DCSS
            </h2>
            <p className="text-xs mb-4" style={{ color: "var(--text-muted)" }}>
              Quema DCSS y recupera tu colateral ICP
            </p>
            <div className="space-y-3">
              <div>
                <label
                  htmlFor="burn-dcss-input"
                  className="text-xs mb-1 block"
                  style={{ color: "var(--text-muted)" }}
                >
                  DCSS a quemar
                </label>
                <Input
                  id="burn-dcss-input"
                  type="number"
                  min="0"
                  placeholder="0.00"
                  value={burnDcss}
                  onChange={(e) => setBurnDcss(e.target.value)}
                  className="font-mono"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-subtle)",
                    color: "var(--text-primary)",
                  }}
                  data-ocid="dcss.burn.input"
                />
              </div>
              {burnDcss && (
                <div
                  className="px-3 py-2 rounded-lg text-xs font-mono"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-muted)",
                  }}
                >
                  Estimado:{" "}
                  <span style={{ color: "var(--accent-color)" }}>
                    {estimatedIcp} ICP
                  </span>
                  <span className="ml-2">recuperados</span>
                </div>
              )}
              <button
                type="button"
                onClick={handleBurn}
                disabled={burning || !burnDcss}
                className="w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{
                  background: "transparent",
                  border:
                    burnDcss && !burning
                      ? "1px solid rgba(0,212,184,0.4)"
                      : "1px solid var(--border-subtle)",
                  color:
                    burnDcss && !burning
                      ? "var(--accent-color)"
                      : "var(--text-muted)",
                  cursor: burning || !burnDcss ? "not-allowed" : "pointer",
                }}
                data-ocid="dcss.burn.submit_button"
              >
                {burning && <Loader2 size={14} className="animate-spin" />}
                {burning ? "Quemando..." : "Burn DCSS"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="p-6 rounded-xl text-center mb-10"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-subtle)",
          }}
          data-ocid="dcss.connect.panel"
        >
          <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
            Conecta tu wallet para mintear o quemar DCSS
          </p>
        </div>
      )}

      {/* Roadmap */}
      <div>
        <h2
          className="text-base font-bold mb-4 font-display"
          style={{ color: "var(--text-primary)" }}
        >
          Roadmap DCSS Coin
        </h2>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid var(--border-subtle)" }}
          data-ocid="dcss.roadmap.table"
        >
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  background: "var(--bg-surface)",
                  borderBottom: "1px solid var(--border-subtle)",
                }}
              >
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Feature
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Estado
                </th>
                <th
                  className="text-left px-4 py-3 font-semibold"
                  style={{ color: "var(--text-muted)" }}
                >
                  Fecha
                </th>
              </tr>
            </thead>
            <tbody>
              {ROADMAP.map((row, idx) => (
                <tr
                  key={row.feature}
                  style={{
                    background:
                      idx % 2 === 0 ? "var(--bg-base)" : "var(--bg-surface)",
                    borderBottom:
                      idx < ROADMAP.length - 1
                        ? "1px solid var(--border-subtle)"
                        : "none",
                  }}
                  data-ocid={`dcss.roadmap.item.${idx + 1}`}
                >
                  <td
                    className="px-4 py-3"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {row.feature}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      style={{
                        background: row.live
                          ? "rgba(0,212,184,0.15)"
                          : "var(--bg-elevated)",
                        color: row.live
                          ? "var(--accent-color)"
                          : "var(--text-muted)",
                        border: row.live
                          ? "1px solid rgba(0,212,184,0.3)"
                          : "1px solid var(--border-subtle)",
                        fontSize: "11px",
                      }}
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td
                    className="px-4 py-3 font-mono text-xs"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {row.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
