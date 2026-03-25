import { useCallback, useEffect, useState } from "react";

export interface Neuron {
  id: string;
  token: string;
  amount: number;
  dissolveDelayDays: number;
  stakedAt: number;
  lastClaimAt: number;
  status: "active" | "dissolving";
}

const APY_MAP: Record<string, number> = {
  ICP: 0.1,
  DCSS: 0.18,
  SOL: 0.07,
  ATOM: 0.15,
};

const DEFAULT_APY = 0.05;
const STORAGE_KEY = "dcss-neurons";

function getApy(token: string): number {
  return APY_MAP[token] ?? DEFAULT_APY;
}

function calcRewards(neuron: Neuron): number {
  const apy = getApy(neuron.token);
  const elapsedMs = Date.now() - neuron.lastClaimAt;
  const elapsedYears = elapsedMs / (365 * 24 * 60 * 60 * 1000);
  return neuron.amount * apy * elapsedYears;
}

function loadNeurons(): Neuron[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Neuron[]) : [];
  } catch {
    return [];
  }
}

function saveNeurons(neurons: Neuron[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(neurons));
  } catch {
    // ignore
  }
}

export function useStaking() {
  const [neurons, setNeurons] = useState<Neuron[]>(loadNeurons);

  useEffect(() => {
    saveNeurons(neurons);
  }, [neurons]);

  const stakeTokens = useCallback(
    (token: string, amount: number, delayDays: number) => {
      const neuron: Neuron = {
        id: `neuron-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        token,
        amount,
        dissolveDelayDays: delayDays,
        stakedAt: Date.now(),
        lastClaimAt: Date.now(),
        status: "active",
      };
      setNeurons((prev) => [...prev, neuron]);
      return neuron;
    },
    [],
  );

  const unstake = useCallback((id: string) => {
    setNeurons((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, status: "dissolving" as const } : n,
      ),
    );
  }, []);

  const claimRewards = useCallback((id: string): number => {
    let claimed = 0;
    setNeurons((prev) =>
      prev.map((n) => {
        if (n.id !== id) return n;
        claimed = calcRewards(n);
        return { ...n, lastClaimAt: Date.now() };
      }),
    );
    return claimed;
  }, []);

  const getNeurons = useCallback((): Neuron[] => neurons, [neurons]);

  const tvl = neurons.reduce((sum, n) => sum + n.amount, 0);
  const avgApy =
    neurons.length > 0
      ? neurons.reduce((sum, n) => sum + getApy(n.token), 0) / neurons.length
      : 0;

  const neuronsWithRewards = neurons.map((n) => ({
    ...n,
    rewardsAccrued: calcRewards(n),
    apy: getApy(n.token),
  }));

  return {
    neurons: neuronsWithRewards,
    stakeTokens,
    unstake,
    claimRewards,
    getNeurons,
    tvl,
    avgApy,
    apyMap: APY_MAP,
    getApy,
  };
}
