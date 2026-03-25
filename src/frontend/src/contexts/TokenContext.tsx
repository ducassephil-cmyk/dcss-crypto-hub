import { type ReactNode, createContext, useContext, useMemo } from "react";
import { type Network, TOKEN_LIST, type TokenMeta } from "../data/tokens";
import { useLivePrices } from "../hooks/useLivePrices";
import { useTokenPrices } from "../hooks/useQueries";

export interface TokenWithMeta extends TokenMeta {
  id: bigint;
  price: number;
  change24h: number;
  isLivePrice?: boolean;
}

export interface TokenContextType {
  tokens: TokenWithMeta[];
  getToken: (symbol: string) => TokenWithMeta | undefined;
  livePricesActive: boolean;
}

const TokenCtx = createContext<TokenContextType | null>(null);

export function TokenProvider({ children }: { children: ReactNode }) {
  const { data: backendTokens } = useTokenPrices();
  const { prices: livePrices, isLive } = useLivePrices();

  const tokens = useMemo<TokenWithMeta[]>(() => {
    return TOKEN_LIST.map((meta) => {
      const backend = backendTokens?.find((t) => t.symbol === meta.symbol);
      const live = livePrices[meta.symbol];

      let price: number;
      let change24h: number;
      let isLivePrice = false;

      if (live) {
        price = live.usd;
        change24h = live.usd_24h_change;
        isLivePrice = true;
      } else if (backend && backend.price > 0) {
        price = backend.price;
        change24h = 0;
      } else {
        price = meta.defaultPrice ?? 0;
        change24h = 0;
      }

      return {
        ...meta,
        id: backend?.id ?? BigInt(0),
        price,
        change24h,
        isLivePrice,
        network: meta.network as Network,
      };
    });
  }, [backendTokens, livePrices]);

  const getToken = useMemo(
    () =>
      (symbol: string): TokenWithMeta | undefined =>
        tokens.find((t) => t.symbol === symbol),
    [tokens],
  );

  const value = useMemo(
    () => ({ tokens, getToken, livePricesActive: isLive }),
    [tokens, getToken, isLive],
  );

  return <TokenCtx.Provider value={value}>{children}</TokenCtx.Provider>;
}

export function useTokens(): TokenContextType {
  const ctx = useContext(TokenCtx);
  if (!ctx) throw new Error("useTokens must be used within TokenProvider");
  return ctx;
}

export const SKELETON_KEYS = Array.from(
  { length: 8 },
  (_, i) => `skeleton-slot-${i}`,
);
