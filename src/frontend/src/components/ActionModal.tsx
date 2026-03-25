import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ExternalLink, Loader2, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useTokens } from "../contexts/TokenContext";
import type { TokenWithMeta } from "../contexts/TokenContext";
import { useTransactions } from "../contexts/TransactionContext";
import { useWallet } from "../contexts/WalletContext";
import { type TokenMeta, formatBalance, truncateAddr } from "../data/tokens";
import { useRecordTransaction } from "../hooks/useQueries";
import { isEVMAvailable, sendEVMTransaction } from "../hooks/useRealWallet";

type ActionType = "buy" | "swap" | "send";

interface ActionModalProps {
  open: boolean;
  onClose: () => void;
  action: ActionType;
  token: TokenMeta & { price: number; change24h: number; id: bigint };
}

const ACTION_LABELS: Record<ActionType, string> = {
  buy: "Buy",
  swap: "Swap",
  send: "Send",
};

const EVM_NETWORK_SET = new Set([
  "Ethereum",
  "Arbitrum",
  "Base",
  "Multichain",
  "Avalanche",
  "Stablecoins",
  "0G",
]);

export default function ActionModal({
  open,
  onClose,
  action,
  token,
}: ActionModalProps) {
  const { activeWallet, connectedWallets, getBalance, setBalance } =
    useWallet();
  const { addTransaction } = useTransactions();
  const { tokens } = useTokens();
  const { mutateAsync: recordTx, isPending } = useRecordTransaction();

  const [amount, setAmount] = useState("");
  const [destAddress, setDestAddress] = useState("");
  const [swapToSymbol, setSwapToSymbol] = useState("");
  const [selectedWalletAddr, setSelectedWalletAddr] = useState(
    activeWallet?.address ?? "",
  );
  const [isSendingOnChain, setIsSendingOnChain] = useState(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const balance = activeWallet
    ? getBalance(activeWallet.network, activeWallet.address, token.symbol)
    : 0;
  const compatibleWallets = connectedWallets.filter(
    (w) => w.network === token.network || action === "buy",
  );

  const canSendRealEVM =
    action === "send" &&
    activeWallet?.isReal === true &&
    isEVMAvailable() &&
    EVM_NETWORK_SET.has(activeWallet.network);

  function handleMax() {
    setAmount(formatBalance(balance));
  }

  async function handleConfirm() {
    const numAmount = Number.parseFloat(amount);
    if (!numAmount || numAmount <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (!activeWallet) {
      toast.error("Connect a wallet first");
      return;
    }
    if (action === "send" && !destAddress.trim()) {
      toast.error("Enter destination address");
      return;
    }
    if (action !== "buy" && numAmount > balance) {
      toast.error("Insufficient balance");
      return;
    }

    const from = activeWallet.address;
    const to =
      action === "send"
        ? destAddress
        : selectedWalletAddr || activeWallet.address;
    const label = ACTION_LABELS[action];

    // Real EVM on-chain path
    if (canSendRealEVM && destAddress.trim()) {
      setIsSendingOnChain(true);
      const toastId = toast.loading("Waiting for MetaMask confirmation...");
      try {
        const txHash = await sendEVMTransaction(
          from,
          destAddress.trim(),
          amount,
        );
        setLastTxHash(txHash);
        toast.dismiss(toastId);
        toast.success(`Transaction sent! Hash: ${txHash.slice(0, 14)}...`, {
          description: (
            <a
              href={`https://etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "#00D4B8",
                display: "flex",
                alignItems: "center",
                gap: "4px",
              }}
            >
              View on Etherscan <ExternalLink size={12} />
            </a>
          ),
          duration: 8000,
        });
        setBalance(
          activeWallet.network,
          activeWallet.address,
          token.symbol,
          Math.max(0, balance - numAmount),
        );
        addTransaction({
          txType: label,
          tokenSymbol: token.symbol,
          amount: numAmount,
          fromAddr: from,
          toAddr: to,
          network: activeWallet.network,
          walletAddr: activeWallet.address,
        });
        setIsSendingOnChain(false);
        onClose();
        return;
      } catch (err: unknown) {
        toast.dismiss(toastId);
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes("User denied") || msg.includes("rejected")) {
          toast.error("Transaction rejected by user");
        } else {
          toast.error(`Transaction failed: ${msg.slice(0, 60)}`);
        }
        setIsSendingOnChain(false);
        return;
      }
    }

    // Simulated / demo path
    try {
      await recordTx({
        txType: label,
        tokenSymbol: token.symbol,
        amount: numAmount,
        fromAddr: from,
        toAddr: to,
        network: activeWallet.network,
        walletAddr: activeWallet.address,
      });

      if (action === "buy") {
        const current = getBalance(
          activeWallet.network,
          activeWallet.address,
          token.symbol,
        );
        setBalance(
          activeWallet.network,
          activeWallet.address,
          token.symbol,
          current + numAmount,
        );
      } else if (action === "send" || action === "swap") {
        setBalance(
          activeWallet.network,
          activeWallet.address,
          token.symbol,
          Math.max(0, balance - numAmount),
        );
        if (action === "swap" && swapToSymbol) {
          const swapToken = tokens.find((t) => t.symbol === swapToSymbol) as
            | TokenWithMeta
            | undefined;
          if (swapToken) {
            const rate = token.price / swapToken.price;
            const received = numAmount * rate * 0.997;
            const currentDest = getBalance(
              activeWallet.network,
              activeWallet.address,
              swapToSymbol,
            );
            setBalance(
              activeWallet.network,
              activeWallet.address,
              swapToSymbol,
              currentDest + received,
            );
          }
        }
      }

      addTransaction({
        txType: label,
        tokenSymbol: token.symbol,
        amount: numAmount,
        fromAddr: from,
        toAddr: to,
        network: activeWallet.network,
        walletAddr: activeWallet.address,
      });
      toast.success(`${label} ${numAmount} ${token.symbol} confirmed!`);
      onClose();
    } catch {
      toast.error("Transaction failed");
    }
  }

  const isLoading = isPending || isSendingOnChain;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        className="max-w-md"
        style={{
          background: "#0B1110",
          border: "1px solid rgba(0,212,184,0.25)",
          boxShadow: "0 0 40px rgba(0,212,184,0.12)",
        }}
        data-ocid="action.modal"
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2.5 text-base font-bold"
            style={{ color: "#E8ECEB" }}
          >
            <span
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
              style={{
                background: token.color,
                color:
                  Number.parseInt(token.color.slice(1, 3), 16) * 0.299 +
                    Number.parseInt(token.color.slice(3, 5), 16) * 0.587 +
                    Number.parseInt(token.color.slice(5, 7), 16) * 0.114 >
                  115
                    ? "#000"
                    : "#fff",
              }}
            >
              {token.symbol.slice(0, 3)}
            </span>
            {ACTION_LABELS[action]} {token.symbol}
            {canSendRealEVM && (
              <span
                className="text-[9px] font-bold px-2 py-0.5 rounded-full ml-1"
                style={{
                  background: "rgba(0,212,184,0.15)",
                  color: "#00D4B8",
                  border: "1px solid rgba(0,212,184,0.3)",
                }}
              >
                ON-CHAIN
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label className="text-xs" style={{ color: "#A9B3AF" }}>
              Amount
            </Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="0"
                step="any"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 font-mono text-sm"
                style={{
                  background: "#0F1513",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#E8ECEB",
                }}
                data-ocid="action.input"
              />
              {action !== "buy" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleMax}
                  className="text-xs px-3"
                  style={{
                    background: "rgba(0,212,184,0.08)",
                    border: "1px solid rgba(0,212,184,0.3)",
                    color: "#FFF",
                  }}
                  data-ocid="action.max_button"
                >
                  MAX
                </Button>
              )}
            </div>
            {action !== "buy" && (
              <p className="text-[10px]" style={{ color: "#A9B3AF" }}>
                Available: {formatBalance(balance)} {token.symbol}
              </p>
            )}
          </div>

          {action === "swap" && (
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#A9B3AF" }}>
                Swap To
              </Label>
              <Select value={swapToSymbol} onValueChange={setSwapToSymbol}>
                <SelectTrigger
                  style={{
                    background: "#0F1513",
                    border: "1px solid rgba(0,212,184,0.2)",
                    color: "#E8ECEB",
                  }}
                  data-ocid="action.swap_to.select"
                >
                  <SelectValue placeholder="Select token" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "#0F1513",
                    border: "1px solid rgba(0,212,184,0.2)",
                  }}
                >
                  {tokens
                    .filter((t) => t.symbol !== token.symbol)
                    .map((t) => (
                      <SelectItem key={t.symbol} value={t.symbol}>
                        {t.symbol} — {t.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {action === "send" && (
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#A9B3AF" }}>
                Destination Address
              </Label>
              <Input
                value={destAddress}
                onChange={(e) => setDestAddress(e.target.value)}
                placeholder="0x... / cosmos1... / rdmx6..."
                className="font-mono text-xs"
                style={{
                  background: "#0F1513",
                  border: "1px solid rgba(0,212,184,0.2)",
                  color: "#E8ECEB",
                }}
                data-ocid="action.destination.input"
              />
              {canSendRealEVM && destAddress && (
                <p className="text-[10px]" style={{ color: "#00D4B8" }}>
                  Real blockchain transaction via MetaMask
                </p>
              )}
            </div>
          )}

          {compatibleWallets.length > 0 && (
            <div className="space-y-1.5">
              <Label className="text-xs" style={{ color: "#A9B3AF" }}>
                {action === "buy" ? "Receive to Wallet" : "Source Wallet"}
              </Label>
              <Select
                value={selectedWalletAddr}
                onValueChange={setSelectedWalletAddr}
              >
                <SelectTrigger
                  style={{
                    background: "#0F1513",
                    border: "1px solid rgba(0,212,184,0.2)",
                    color: "#E8ECEB",
                  }}
                  data-ocid="action.wallet.select"
                >
                  <SelectValue placeholder="Select wallet" />
                </SelectTrigger>
                <SelectContent
                  style={{
                    background: "#0F1513",
                    border: "1px solid rgba(0,212,184,0.2)",
                  }}
                >
                  {compatibleWallets.map((w) => (
                    <SelectItem key={w.address} value={w.address}>
                      {w.walletType} {w.isReal ? "" : ""} ·{" "}
                      {truncateAddr(w.address)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {lastTxHash && (
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-lg"
              style={{
                background: "rgba(0,212,184,0.06)",
                border: "1px solid rgba(0,212,184,0.2)",
              }}
            >
              <span
                className="text-[10px] font-mono"
                style={{ color: "#00D4B8" }}
              >
                Last tx: {lastTxHash.slice(0, 20)}...
              </span>
              <a
                href={`https://etherscan.io/tx/${lastTxHash}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#00D4B8" }}
              >
                <ExternalLink size={10} />
              </a>
            </div>
          )}

          <div
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg"
            style={{
              background: "rgba(0,212,184,0.04)",
              border: "1px solid rgba(0,212,184,0.08)",
            }}
          >
            <Zap size={12} style={{ color: "#FFF" }} />
            <span className="text-[10px]" style={{ color: "#A9B3AF" }}>
              {canSendRealEVM
                ? "Real ETH transaction — gas fees apply"
                : "Estimated cost: ~500 cycles"}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 text-sm"
              style={{
                background: "transparent",
                border: "1px solid rgba(169,179,175,0.25)",
                color: "#A9B3AF",
              }}
              data-ocid="action.cancel_button"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              disabled={isLoading}
              className="flex-1 text-sm font-semibold"
              style={{
                background:
                  "linear-gradient(135deg, #E8A49C, #C4837A, #A65E5E)",
                color: "#FFF",
                border: "none",
              }}
              data-ocid="action.confirm_button"
            >
              {isLoading ? (
                <Loader2 size={14} className="mr-1.5 animate-spin" />
              ) : null}
              {isLoading
                ? isSendingOnChain
                  ? "Waiting for MetaMask..."
                  : "Confirming..."
                : `Confirm ${ACTION_LABELS[action]}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
