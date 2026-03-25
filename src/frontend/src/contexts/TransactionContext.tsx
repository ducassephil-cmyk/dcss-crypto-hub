import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export interface LocalTransaction {
  id: string;
  txType: string;
  tokenSymbol: string;
  amount: number;
  fromAddr: string;
  toAddr: string;
  network: string;
  walletAddr: string;
  timestamp: number;
  status: "confirmed" | "pending" | "failed";
}

export interface TransactionContextType {
  transactions: LocalTransaction[];
  addTransaction: (
    tx: Omit<LocalTransaction, "id" | "timestamp" | "status">,
  ) => void;
  clearTransactions: () => void;
}

const TxCtx = createContext<TransactionContextType | null>(null);

export function TransactionProvider({ children }: { children: ReactNode }) {
  // Starts EMPTY — only real user activity populates this
  const [transactions, setTransactions] = useState<LocalTransaction[]>([]);

  const addTransaction = useCallback(
    (tx: Omit<LocalTransaction, "id" | "timestamp" | "status">) => {
      const newTx: LocalTransaction = {
        ...tx,
        id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        timestamp: Date.now(),
        status: "confirmed",
      };
      setTransactions((prev) => [newTx, ...prev]);
    },
    [],
  );

  const clearTransactions = useCallback(() => setTransactions([]), []);

  const value = useMemo(
    () => ({ transactions, addTransaction, clearTransactions }),
    [transactions, addTransaction, clearTransactions],
  );

  return <TxCtx.Provider value={value}>{children}</TxCtx.Provider>;
}

export function useTransactions(): TransactionContextType {
  const ctx = useContext(TxCtx);
  if (!ctx)
    throw new Error("useTransactions must be used within TransactionProvider");
  return ctx;
}
