import { useCallback, useEffect, useRef, useState } from "react";
import { useActor } from "./useActor";

const COINGECKO_IDS =
  "bitcoin,ethereum,solana,internet-computer,cosmos,polkadot,chainlink,avalanche-2,near,injective-protocol,akash-network,render-token,bittensor,arweave,mina-protocol,celestia,the-graph,sentinel,numeraire,livepeer,origintrail,cardano,kaito,virtuals-protocol,io-net,fetch-ai,ethena,api3,uniswap,aave,tether,usd-coin";

const ID_TO_SYMBOL: Record<string, string> = {
  bitcoin: "BTC",
  ethereum: "ETH",
  solana: "SOL",
  "internet-computer": "ICP",
  cosmos: "ATOM",
  polkadot: "DOT",
  chainlink: "LINK",
  "avalanche-2": "AVAX",
  near: "NEAR",
  "injective-protocol": "INJ",
  "akash-network": "AKT",
  "render-token": "RENDER",
  bittensor: "TAO",
  arweave: "AR",
  "mina-protocol": "MINA",
  celestia: "TIA",
  "the-graph": "GRT",
  sentinel: "DVPN",
  numeraire: "NMR",
  livepeer: "LPT",
  origintrail: "TRAC",
  cardano: "ADA",
  kaito: "KAITO",
  "virtuals-protocol": "VIRTUAL",
  "io-net": "IO",
  "fetch-ai": "ASI",
  ethena: "KERNEL",
  api3: "API3",
  uniswap: "UNI",
  aave: "AAVE",
  tether: "USDT",
  "usd-coin": "USDC",
};

export interface LivePrice {
  usd: number;
  usd_24h_change: number;
}

export interface UseLivePricesReturn {
  prices: Record<string, LivePrice>;
  isLive: boolean;
  lastUpdated: Date | null;
}

const CACHE_TTL = 60_000;

export function useLivePrices(): UseLivePricesReturn {
  const { actor } = useActor();
  const [prices, setPrices] = useState<Record<string, LivePrice>>({});
  const [isLive, setIsLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const lastFetchRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchPrices = useCallback(async () => {
    if (!actor) return;
    const now = Date.now();
    if (now - lastFetchRef.current < CACHE_TTL) return;
    lastFetchRef.current = now;

    try {
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${COINGECKO_IDS}&vs_currencies=usd&include_24hr_change=true`;
      const raw = await actor.fetchExternalUrl(url);
      const data: Record<string, { usd: number; usd_24h_change: number }> =
        JSON.parse(raw);

      const mapped: Record<string, LivePrice> = {};
      for (const [cgId, val] of Object.entries(data)) {
        const symbol = ID_TO_SYMBOL[cgId];
        if (symbol) {
          mapped[symbol] = {
            usd: val.usd,
            usd_24h_change: val.usd_24h_change ?? 0,
          };
        }
      }

      if (Object.keys(mapped).length > 0) {
        setPrices(mapped);
        setIsLive(true);
        setLastUpdated(new Date());
      }
    } catch {
      // Silently fall back to simulated prices
    }
  }, [actor]);

  useEffect(() => {
    fetchPrices();
    intervalRef.current = setInterval(fetchPrices, CACHE_TTL);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchPrices]);

  return { prices, isLive, lastUpdated };
}
