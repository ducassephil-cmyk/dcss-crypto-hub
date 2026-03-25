import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Stats, TokenInfo } from "../backend.d";
import { useActor } from "./useActor";

export function useTokenPrices() {
  const { actor, isFetching } = useActor();
  return useQuery<TokenInfo[]>({
    queryKey: ["tokenPrices"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getTokenPrices();
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
    refetchInterval: 60_000,
  });
}

export function useStats() {
  const { actor, isFetching } = useActor();
  return useQuery<Stats>({
    queryKey: ["stats"],
    queryFn: async () => {
      if (!actor) {
        return {
          totalSupply: 1_000_000_000,
          circulatingSupply: 420_000_000,
          holders: BigInt(12_847),
          txCount: BigInt(384_921),
          cyclesConsumed: BigInt(8_432_000_000),
        };
      }
      return actor.getStats();
    },
    enabled: !isFetching,
    staleTime: 60_000,
  });
}

export function useWalletTransactions(walletAddr: string | null) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["transactions", walletAddr],
    queryFn: async () => {
      if (!actor || !walletAddr) return [];
      return actor.getTransactions(walletAddr);
    },
    enabled: !!actor && !isFetching && !!walletAddr,
    staleTime: 10_000,
  });
}

export function useBridgeFee(
  sourceChain: string,
  destChain: string,
  amount: number,
) {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["bridgeFee", sourceChain, destChain, amount],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getBridgeFee(sourceChain, destChain, amount);
    },
    enabled:
      !!actor &&
      !isFetching &&
      !!sourceChain &&
      !!destChain &&
      amount > 0 &&
      sourceChain !== destChain,
    staleTime: 15_000,
  });
}

export function useRecordTransaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      txType: string;
      tokenSymbol: string;
      amount: number;
      fromAddr: string;
      toAddr: string;
      network: string;
      walletAddr: string;
    }) => {
      if (!actor) return BigInt(0);
      return actor.recordTransaction(
        args.txType,
        args.tokenSymbol,
        args.amount,
        args.fromAddr,
        args.toAddr,
        args.network,
        args.walletAddr,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
}
