import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, ArrowLeftRight, Clock, Loader2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTokens } from "../contexts/TokenContext";
import { useTransactions } from "../contexts/TransactionContext";
import { useWallet } from "../contexts/WalletContext";
import { formatBalance } from "../data/tokens";
import { useBridgeFee, useRecordTransaction } from "../hooks/useQueries";

const CHAINS = ["ICP", "Ethereum", "Solana", "Cosmos"];

export default function BridgePanel() {
  const { activeWallet, getBalance } = useWallet();
  const { addTransaction } = useTransactions();
  const { tokens } = useTokens();
  const { mutateAsync: recordTx, isPending } = useRecordTransaction();

  const [sourceChain, setSourceChain] = useState("");
  const [destChain, setDestChain] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");
  const [amount, setAmount] = useState("");
  const [destAddress, setDestAddress] = useState("");

  const numAmount = Number.parseFloat(amount) || 0;
  const { data: feeData, isLoading: feeLoading } = useBridgeFee(
    sourceChain,
    destChain,
    numAmount,
  );

  const balance =
    activeWallet && tokenSymbol
      ? getBalance(activeWallet.network, activeWallet.address, tokenSymbol)
      : 0;

  function handleMax() {
    setAmount(formatBalance(balance));
  }

  async function handleBridge() {
    if (
      !sourceChain ||
      !destChain ||
      !tokenSymbol ||
      !amount ||
      !destAddress.trim()
    ) {
      toast.error("Fill in all bridge fields");
      return;
    }
    if (numAmount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!activeWallet) {
      toast.error("Connect a wallet first");
      return;
    }
    if (numAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }
    try {
      await recordTx({
        txType: "Bridge",
        tokenSymbol,
        amount: numAmount,
        fromAddr: activeWallet.address,
        toAddr: destAddress,
        network: sourceChain,
        walletAddr: activeWallet.address,
      });

      addTransaction({
        txType: "Bridge",
        tokenSymbol,
        amount: numAmount,
        fromAddr: activeWallet.address,
        toAddr: destAddress,
        network: sourceChain,
        walletAddr: activeWallet.address,
      });

      toast.success(
        `Bridge initiated: ${numAmount} ${tokenSymbol} → ${destChain}`,
      );
      setAmount("");
      setDestAddress("");
    } catch {
      toast.error("Bridge transaction failed");
    }
  }

  return (
    <div className="max-w-[560px] mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold" style={{ color: "#E8ECEB" }}>
          Cross-Chain Bridge
        </h2>
        <p className="text-sm mt-1" style={{ color: "#A9B3AF" }}>
          Powered by Wormhole — ICP ↔ EVM ↔ Solana ↔ Cosmos
        </p>
      </div>

      <div
        className="rounded-2xl p-6 space-y-5"
        style={{
          background: "#0F1513",
          border: "1px solid rgba(0,212,184,0.2)",
          boxShadow: "0 0 30px rgba(0,212,184,0.06)",
        }}
      >
        {/* Source chain */}
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: "#A9B3AF" }}>
            Source Chain
          </Label>
          <Select value={sourceChain} onValueChange={setSourceChain}>
            <SelectTrigger
              style={{
                background: "#0B1110",
                border: "1px solid rgba(0,212,184,0.2)",
                color: "#E8ECEB",
              }}
              data-ocid="bridge.source_chain.select"
            >
              <SelectValue placeholder="Select source chain" />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "#0F1513",
                border: "1px solid rgba(0,212,184,0.2)",
              }}
            >
              {CHAINS.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Token + Amount */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#A9B3AF" }}>
              Token
            </Label>
            <Select value={tokenSymbol} onValueChange={setTokenSymbol}>
              <SelectTrigger
                style={{
                  background: "#0B1110",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#E8ECEB",
                }}
                data-ocid="bridge.token.select"
              >
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent
                style={{
                  background: "#0F1513",
                  border: "1px solid rgba(0,212,184,0.2)",
                }}
              >
                {tokens.map((t) => (
                  <SelectItem key={t.symbol} value={t.symbol}>
                    {t.symbol}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#A9B3AF" }}>
              Amount
            </Label>
            <div className="flex gap-1.5">
              <Input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="font-mono text-sm"
                style={{
                  background: "#0B1110",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#E8ECEB",
                }}
                data-ocid="bridge.amount.input"
              />
              <Button
                size="sm"
                variant="outline"
                onClick={handleMax}
                className="text-xs px-2"
                style={{
                  background: "rgba(0,212,184,0.06)",
                  border: "1px solid rgba(0,212,184,0.25)",
                  color: "#00D4B8",
                }}
                data-ocid="bridge.max.button"
              >
                MAX
              </Button>
            </div>
            {tokenSymbol && (
              <p className="text-[10px]" style={{ color: "#A9B3AF" }}>
                Bal: {formatBalance(balance)} {tokenSymbol}
              </p>
            )}
          </div>
        </div>

        {/* Arrow separator */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(0,212,184,0.1)" }}
          />
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{
              background: "rgba(0,212,184,0.12)",
              border: "1px solid rgba(0,212,184,0.25)",
            }}
          >
            <ArrowLeftRight size={14} style={{ color: "#00D4B8" }} />
          </div>
          <div
            className="flex-1 h-px"
            style={{ background: "rgba(0,212,184,0.1)" }}
          />
        </div>

        {/* Dest chain */}
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: "#A9B3AF" }}>
            Destination Chain
          </Label>
          <Select value={destChain} onValueChange={setDestChain}>
            <SelectTrigger
              style={{
                background: "#0B1110",
                border: "1px solid rgba(0,212,184,0.2)",
                color: "#E8ECEB",
              }}
              data-ocid="bridge.dest_chain.select"
            >
              <SelectValue placeholder="Select destination chain" />
            </SelectTrigger>
            <SelectContent
              style={{
                background: "#0F1513",
                border: "1px solid rgba(0,212,184,0.2)",
              }}
            >
              {CHAINS.filter((c) => c !== sourceChain).map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Destination address */}
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: "#A9B3AF" }}>
            Destination Wallet Address
          </Label>
          <Input
            value={destAddress}
            onChange={(e) => setDestAddress(e.target.value)}
            placeholder="0x... / cosmos1... / rdmx6..."
            className="font-mono text-xs"
            style={{
              background: "#0B1110",
              border: "1px solid rgba(0,212,184,0.2)",
              color: "#E8ECEB",
            }}
            data-ocid="bridge.dest_address.input"
          />
        </div>

        {/* Fee estimate */}
        {sourceChain && destChain && numAmount > 0 && (
          <div
            className="rounded-xl p-4 space-y-2"
            style={{
              background: "rgba(0,212,184,0.04)",
              border: "1px solid rgba(0,212,184,0.12)",
            }}
            data-ocid="bridge.fee.panel"
          >
            <div className="text-xs font-semibold" style={{ color: "#00D4B8" }}>
              Fee Estimate
            </div>
            {feeLoading ? (
              <div className="flex items-center gap-2">
                <Loader2
                  size={12}
                  className="animate-spin"
                  style={{ color: "#00D4B8" }}
                />
                <span className="text-xs" style={{ color: "#A9B3AF" }}>
                  Calculating...
                </span>
              </div>
            ) : feeData ? (
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <Zap size={11} style={{ color: "#C9A24A" }} />
                    <span className="text-xs" style={{ color: "#A9B3AF" }}>
                      Bridge Fee
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono font-medium"
                    style={{ color: "#C9A24A" }}
                  >
                    {feeData[0].toFixed(4)} {tokenSymbol}
                  </span>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center gap-1.5">
                    <Clock size={11} style={{ color: "#A9B3AF" }} />
                    <span className="text-xs" style={{ color: "#A9B3AF" }}>
                      Est. Time
                    </span>
                  </div>
                  <span
                    className="text-xs font-mono font-medium"
                    style={{ color: "#E8ECEB" }}
                  >
                    ~{Math.ceil(Number(feeData[1]) / 60)} min
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <AlertCircle size={11} style={{ color: "#A9B3AF" }} />
                <span className="text-xs" style={{ color: "#A9B3AF" }}>
                  Fee unavailable
                </span>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={handleBridge}
          disabled={
            isPending || !sourceChain || !destChain || !tokenSymbol || !amount
          }
          className="w-full font-semibold"
          style={{
            background:
              isPending || !sourceChain || !destChain || !tokenSymbol || !amount
                ? "rgba(0,212,184,0.2)"
                : "#00D4B8",
            color: "#070B0A",
            border: "none",
          }}
          data-ocid="bridge.initiate.button"
        >
          {isPending ? (
            <>
              <Loader2 size={14} className="mr-2 animate-spin" />
              Bridging...
            </>
          ) : (
            <>
              <ArrowLeftRight size={14} className="mr-2" />
              Initiate Bridge
            </>
          )}
        </Button>
      </div>

      {/* Info box */}
      <div
        className="rounded-xl p-4 text-xs space-y-1"
        style={{
          background: "rgba(201,162,74,0.05)",
          border: "1px solid rgba(201,162,74,0.15)",
          color: "#A9B3AF",
        }}
      >
        <p className="font-semibold" style={{ color: "#C9A24A" }}>
          ⚠️ Wormhole Bridge Simulation
        </p>
        <p>
          Cross-chain transfers are simulated. Real transactions require live
          Wormhole SDK integration.
        </p>
        <p>Always verify destination addresses before bridging.</p>
      </div>
    </div>
  );
}
