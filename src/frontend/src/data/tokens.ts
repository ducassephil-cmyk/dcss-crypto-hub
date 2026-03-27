export type Network =
  | "ICP"
  | "Bitcoin"
  | "Polkadot"
  | "Cosmos"
  | "Celestia"
  | "0G"
  | "Ethereum"
  | "Arbitrum"
  | "Base"
  | "Multichain"
  | "Solana"
  | "Near"
  | "Avalanche"
  | "Cardano"
  | "Mina"
  | "Bittensor"
  | "Arweave"
  | "Stablecoins";

export interface TokenMeta {
  symbol: string;
  name: string;
  color: string;
  network: Network;
  defaultPrice: number;
  description: string;
  officialUrl: string;
  explorerUrl?: string;
  logoUrl?: string;
  layer?: string;
  depin?: boolean;
  ath?: number;
}

export const NETWORK_COLORS: Record<string, string> = {
  ICP: "#29ABE2",
  Bitcoin: "#F7931A",
  Polkadot: "#E6007A",
  Cosmos: "#6F7390",
  Celestia: "#7B2FBE",
  "0G": "#00D4FF",
  Ethereum: "#627EEA",
  Arbitrum: "#12AAFF",
  Base: "#0052FF",
  Multichain: "#F5A623",
  Solana: "#9945FF",
  Near: "#00C08B",
  Avalanche: "#E84142",
  Cardano: "#0033AD",
  Mina: "#E7AC57",
  Bittensor: "#36A18B",
  Arweave: "#888888",
  Stablecoins: "#26A17B",
};

export const TOKEN_LIST: TokenMeta[] = [
  // ICP
  {
    symbol: "DCSS",
    name: "DCSS Token",
    color: "#FFD700",
    network: "ICP",
    defaultPrice: 0.085,
    description:
      "El token nativo del ecosistema DCSS. Centro de governance y recompensas construido sobre Internet Computer.",
    officialUrl: "https://dcss.io",
  },
  {
    symbol: "ICP",
    name: "Internet Computer",
    color: "#29ABE2",
    network: "ICP",
    defaultPrice: 12.45,
    description:
      "Blockchain que permite aplicaciones web completas 100% on-chain sin servidores centralizados. Velocidad submilisegundo.",
    officialUrl: "https://internetcomputer.org",
    logoUrl:
      "https://assets.coingecko.com/coins/images/14495/small/Internet_Computer_logo.png",
    explorerUrl: "https://dashboard.internetcomputer.org",
  },
  {
    symbol: "CLP",
    name: "Chilean Peso Token",
    color: "#D52B1E",
    network: "ICP",
    defaultPrice: 0.0011,
    description:
      "Representación simbólica del peso chileno en el ecosistema blockchain. Token educativo y comunitario.",
    officialUrl: "https://dcss.io",
  },
  // Bitcoin
  {
    symbol: "BTC",
    name: "Bitcoin",
    color: "#F7931A",
    network: "Bitcoin",
    defaultPrice: 67800,
    description:
      "La primera criptomoneda creada por Satoshi Nakamoto en 2009. El oro digital del siglo XXI, suministro máximo 21 millones.",
    officialUrl: "https://bitcoin.org",
    logoUrl: "https://assets.coingecko.com/coins/images/1/small/bitcoin.png",
    explorerUrl: "https://mempool.space",
  },
  // Polkadot
  {
    symbol: "DOT",
    name: "Polkadot",
    color: "#E6007A",
    network: "Polkadot",
    defaultPrice: 8.9,
    description:
      "Red de parachains soberanas con seguridad compartida. Creada por co-fundador de Ethereum Gavin Wood.",
    officialUrl: "https://polkadot.network",
    logoUrl:
      "https://assets.coingecko.com/coins/images/12171/small/polkadot.png",
    explorerUrl: "https://polkadot.subscan.io",
  },
  {
    symbol: "TRAC",
    name: "OriginTrail",
    color: "#3EAFDD",
    network: "Polkadot",
    defaultPrice: 0.85,
    description:
      "Protocolo de trazabilidad y conocimiento descentralizado en Polkadot. Grafos de conocimiento verificables on-chain.",
    officialUrl: "https://origintrail.io",
    depin: true,
  },
  // Cosmos
  {
    symbol: "ATOM",
    name: "Cosmos Hub",
    color: "#6F7390",
    network: "Cosmos",
    defaultPrice: 11.2,
    description:
      "El centro de la internet de blockchains. El protocolo IBC permite que blockchains soberanas se comuniquen entre sí.",
    officialUrl: "https://cosmos.network",
    logoUrl:
      "https://assets.coingecko.com/coins/images/1481/small/cosmos_hub.png",
    explorerUrl: "https://mintscan.io",
  },
  {
    symbol: "ASI",
    name: "Fetch.ai / ASI",
    color: "#1B2B4B",
    network: "Cosmos",
    defaultPrice: 0.85,
    description:
      "Plataforma de IA descentralizada en Cosmos. Agentes autónomos de IA operan servicios económicos sin intervención humana.",
    officialUrl: "https://fetch.ai",
    logoUrl: "https://assets.coingecko.com/coins/images/5681/small/Fetch.jpg",
    depin: true,
  },
  {
    symbol: "AKT",
    name: "Akash Network",
    color: "#FF414C",
    network: "Cosmos",
    defaultPrice: 3.5,
    description:
      "Mercado descentralizado de computación en la nube. Alternativa descentralizada a AWS sin intermediarios.",
    officialUrl: "https://akash.network",
    logoUrl:
      "https://assets.coingecko.com/coins/images/12785/small/akash-logo.png",
    depin: true,
  },
  {
    symbol: "DVPN",
    name: "Sentinel",
    color: "#4AB44A",
    network: "Cosmos",
    defaultPrice: 0.0042,
    description:
      "Red descentralizada de VPN sobre Cosmos. Infraestructura de privacidad de internet imposible de censurar.",
    officialUrl: "https://sentinel.co",
    depin: true,
  },
  {
    symbol: "INJ",
    name: "Injective",
    color: "#00F2FE",
    network: "Cosmos",
    defaultPrice: 28.5,
    description:
      "Blockchain para DeFi avanzado: derivados, futuros y opciones on-chain sin gas fees de trading.",
    officialUrl: "https://injective.com",
    logoUrl:
      "https://assets.coingecko.com/coins/images/12882/small/Secondary_Symbol.png",
  },
  // Celestia
  {
    symbol: "TIA",
    name: "Celestia",
    color: "#7B2FBE",
    network: "Celestia",
    defaultPrice: 6.2,
    description:
      "Primera red modular de disponibilidad de datos. Separa consenso de ejecución para blockchains más baratas y escalables.",
    officialUrl: "https://celestia.org",
    logoUrl:
      "https://assets.coingecko.com/coins/images/31967/small/celestia.png",
  },
  // 0G
  {
    symbol: "0G",
    name: "0G Labs",
    color: "#00D4FF",
    network: "0G",
    defaultPrice: 2.5,
    description:
      "Infraestructura modular para IA y datos on-chain. Habilita entrenamiento y almacenamiento descentralizado de modelos de IA.",
    officialUrl: "https://0g.ai",
    depin: true,
  },
  // Ethereum
  {
    symbol: "ETH",
    name: "Ethereum",
    color: "#627EEA",
    network: "Ethereum",
    defaultPrice: 3420,
    description:
      "La blockchain que inventó los smart contracts y el DeFi moderno. Mayor ecosistema de desarrolladores del mundo.",
    officialUrl: "https://ethereum.org",
    logoUrl: "https://assets.coingecko.com/coins/images/279/small/ethereum.png",
    explorerUrl: "https://etherscan.io",
  },
  {
    symbol: "LINK",
    name: "Chainlink",
    color: "#375BD2",
    network: "Ethereum",
    defaultPrice: 18.6,
    description:
      "Infraestructura de oráculos que conecta smart contracts con datos del mundo real. Sin Chainlink, el DeFi no funcionaría.",
    officialUrl: "https://chain.link",
    logoUrl:
      "https://assets.coingecko.com/coins/images/877/small/chainlink-new-logo.png",
  },
  {
    symbol: "GRT",
    name: "The Graph",
    color: "#6747ED",
    network: "Ethereum",
    defaultPrice: 0.25,
    description:
      "Protocolo de indexación descentralizada para blockchains. Permite consultar datos on-chain eficientemente via subgraphs.",
    officialUrl: "https://thegraph.com",
    depin: true,
  },
  {
    symbol: "API3",
    name: "API3",
    color: "#3643D9",
    network: "Ethereum",
    defaultPrice: 2.8,
    description:
      "Oráculos de primera parte: APIs conectan directamente con smart contracts. Elimina el riesgo del oráculo de terceros.",
    officialUrl: "https://api3.org",
  },
  {
    symbol: "NMR",
    name: "Numerai",
    color: "#00D4C4",
    network: "Ethereum",
    defaultPrice: 18.0,
    description:
      "Torneo de ciencia de datos financieros descentralizado. Data scientists compiten creando modelos predictivos.",
    officialUrl: "https://numer.ai",
  },
  {
    symbol: "SAHARA",
    name: "Sahara AI",
    color: "#FF6B35",
    network: "Ethereum",
    defaultPrice: 0.85,
    description:
      "Plataforma blockchain para monetización de datos e IA. Permite controlar y monetizar contribuciones a modelos de inteligencia artificial.",
    officialUrl: "https://saharalabs.ai",
  },
  {
    symbol: "IP",
    name: "Story Protocol",
    color: "#8B5CF6",
    network: "Ethereum",
    defaultPrice: 1.2,
    description:
      "Infraestructura para propiedad intelectual programable en blockchain. Registra, licencia y monetiza IP automáticamente.",
    officialUrl: "https://story.foundation",
  },
  // Arbitrum
  {
    symbol: "LPT",
    name: "Livepeer",
    color: "#00A55F",
    network: "Arbitrum",
    defaultPrice: 8.5,
    description:
      "Red descentralizada de transcodificación de video. Reduce el costo del streaming usando capacidad GPU ociosa.",
    officialUrl: "https://livepeer.org",
    depin: true,
  },
  {
    symbol: "SHELL",
    name: "Shell",
    color: "#7EC8E3",
    network: "Arbitrum",
    defaultPrice: 0.5,
    description:
      "Protocolo de liquidez en Arbitrum. Infraestructura DeFi modular para intercambios y gestión de activos on-chain.",
    officialUrl: "https://shellprotocol.io",
  },
  {
    symbol: "ATH",
    name: "Aethir",
    color: "#6EFF6E",
    network: "Arbitrum",
    defaultPrice: 0.14,
    description:
      "Infraestructura descentralizada de GPU para IA y gaming. Conecta proveedores GPU con consumidores globalmente.",
    officialUrl: "https://aethir.com",
    depin: true,
  },
  // Base
  {
    symbol: "KAITO",
    name: "Kaito",
    color: "#0052FF",
    network: "Base",
    defaultPrice: 1.2,
    description:
      "Motor de búsqueda e inteligencia crypto basado en IA. Agrega y analiza información Web3 en tiempo real.",
    officialUrl: "https://kaito.ai",
  },
  {
    symbol: "VIRTUAL",
    name: "Virtuals Protocol",
    color: "#9B59B6",
    network: "Base",
    defaultPrice: 1.8,
    description:
      "Plataforma para crear agentes de IA con personalidad propia en Base. Los agentes generan ingresos autónomos.",
    officialUrl: "https://virtuals.io",
  },
  // Multichain
  {
    symbol: "KERNEL",
    name: "Kernel",
    color: "#F5A623",
    network: "Multichain",
    defaultPrice: 0.15,
    description:
      "Protocolo de restaking multichain. Reutiliza stake de ETH para asegurar múltiples protocolos maximizando rendimiento.",
    officialUrl: "https://kerneldao.com",
  },
  {
    symbol: "UP",
    name: "Superform",
    color: "#FF6B6B",
    network: "Multichain",
    defaultPrice: 0.05,
    description:
      "Agregador de yield multichain. Una sola interfaz para las mejores oportunidades de rendimiento en todas las redes.",
    officialUrl: "https://superform.xyz",
  },
  // Solana
  {
    symbol: "SOL",
    name: "Solana",
    color: "#9945FF",
    network: "Solana",
    defaultPrice: 185.3,
    description:
      "65,000 TPS con fees de fracciones de centavo. Proof of History para ordenar transacciones sin cuellos de botella.",
    officialUrl: "https://solana.com",
    logoUrl: "https://assets.coingecko.com/coins/images/4128/small/solana.png",
    explorerUrl: "https://explorer.solana.com",
  },
  {
    symbol: "RENDER",
    name: "Render Network",
    color: "#FF4500",
    network: "Solana",
    defaultPrice: 8.5,
    description:
      "Red descentralizada de renderizado GPU. Artistas acceden a capacidad gráfica distribuida para renders 3D y VFX.",
    officialUrl: "https://rendernetwork.com",
    logoUrl: "https://assets.coingecko.com/coins/images/11636/small/rndr.png",
    depin: true,
  },
  {
    symbol: "IO",
    name: "io.net",
    color: "#00D4FF",
    network: "Solana",
    defaultPrice: 4.0,
    description:
      "Mercado descentralizado de GPU para ML e IA. Agrega capacidad de cómputo de data centers e individuos.",
    officialUrl: "https://io.net",
    depin: true,
  },
  {
    symbol: "GRASS",
    name: "Grass",
    color: "#4CAF50",
    network: "Solana",
    defaultPrice: 2.5,
    description:
      "Red descentralizada de datos web. Usuarios comparten ancho de banda para recopilar datos de entrenamiento de IA.",
    officialUrl: "https://getgrass.io",
    depin: true,
  },
  {
    symbol: "PYTH",
    name: "Pyth Network",
    color: "#E6DAFE",
    network: "Solana",
    defaultPrice: 0.45,
    description:
      "Oráculos de alta frecuencia para datos financieros en tiempo real. Alimenta precios a DeFi en múltiples blockchains.",
    officialUrl: "https://pyth.network",
  },
  // Near
  {
    symbol: "NEAR",
    name: "NEAR Protocol",
    color: "#00C08B",
    network: "Near",
    defaultPrice: 7.2,
    description:
      "Blockchain con cuentas de nombres legibles y fees casi nulos. Compatible con Ethereum via Aurora. Sharding automático.",
    officialUrl: "https://near.org",
    logoUrl: "https://assets.coingecko.com/coins/images/10365/small/near.jpg",
  },
  // Avalanche
  {
    symbol: "AVAX",
    name: "Avalanche",
    color: "#E84142",
    network: "Avalanche",
    defaultPrice: 38.75,
    description:
      "Alta velocidad con finalidad menor a 2 segundos. Arquitectura de subredes para blockchains personalizadas.",
    officialUrl: "https://avax.network",
    logoUrl:
      "https://assets.coingecko.com/coins/images/12559/small/Avalanche_Circle_RedWhite_Trans.png",
  },
  // Cardano
  {
    symbol: "ADA",
    name: "Cardano",
    color: "#0033AD",
    network: "Cardano",
    defaultPrice: 0.45,
    description:
      "La blockchain académica. Cada feature respaldada por papers peer-reviewed. Fundada por Charles Hoskinson.",
    officialUrl: "https://cardano.org",
    logoUrl: "https://assets.coingecko.com/coins/images/975/small/cardano.png",
  },
  // Mina
  {
    symbol: "MINA",
    name: "Mina Protocol",
    color: "#E7AC57",
    network: "Mina",
    defaultPrice: 0.55,
    description:
      "La blockchain más liviana del mundo (22kb). Usa zk-SNARKs para verificar el estado completo. Privacy by design.",
    officialUrl: "https://minaprotocol.com",
    logoUrl:
      "https://assets.coingecko.com/coins/images/15628/small/JM4_vQ34_400x400.png",
  },
  // Bittensor
  {
    symbol: "TAO",
    name: "Bittensor",
    color: "#36A18B",
    network: "Bittensor",
    defaultPrice: 380,
    description:
      "Red descentralizada de inteligencia artificial. Los modelos de ML compiten y se recompensan por su utilidad real.",
    officialUrl: "https://bittensor.com",
    logoUrl:
      "https://assets.coingecko.com/coins/images/28452/small/ARUsPeNQ_400x400.jpeg",
    depin: true,
  },
  // Arweave
  {
    symbol: "AR",
    name: "Arweave",
    color: "#888888",
    network: "Arweave",
    defaultPrice: 18.0,
    description:
      "Almacenamiento permanente de datos on-chain. Pago único para guardar datos para siempre. La biblioteca permanente de internet.",
    officialUrl: "https://arweave.org",
    logoUrl:
      "https://assets.coingecko.com/coins/images/4343/small/oRt6SiEN_400x400.jpg",
    depin: true,
  },
  // Stablecoins
  {
    symbol: "USDT",
    name: "Tether",
    color: "#26A17B",
    network: "Stablecoins",
    defaultPrice: 1.0,
    description:
      "Stablecoin más utilizada del mundo, anclada 1:1 al dólar. El dólar digital del ecosistema crypto.",
    officialUrl: "https://tether.to",
    logoUrl: "https://assets.coingecko.com/coins/images/325/small/Tether.png",
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    color: "#2775CA",
    network: "Stablecoins",
    defaultPrice: 1.0,
    description:
      "Stablecoin regulada de Circle/Coinbase. Transparencia total de reservas. Compatible con DeFi institucional.",
    officialUrl: "https://circle.com/usdc",
    logoUrl: "https://assets.coingecko.com/coins/images/6319/small/usdc.png",
  },
];

export const WALLETS_BY_NETWORK: Record<string, string[]> = {
  ICP: ["Internet Identity", "Plug", "Oisy"],
  Bitcoin: ["Unisat", "Xverse", "OKX"],
  Polkadot: ["Talisman", "SubWallet", "Nova"],
  Cosmos: ["Keplr", "Leap"],
  Celestia: ["Keplr", "Leap"],
  "0G": ["MetaMask", "Rabby", "KuCoin Web3", "Binance Web3"],
  Ethereum: [
    "MetaMask",
    "Rabby",
    "Coinbase Wallet",
    "Trust Wallet",
    "Rainbow",
    "KuCoin Web3",
    "Binance Web3",
    "OKX",
    "WalletConnect",
  ],
  Arbitrum: ["MetaMask", "Rabby", "Coinbase Wallet", "OKX", "KuCoin Web3"],
  Base: ["Coinbase Wallet", "MetaMask", "Rabby", "Phantom"],
  Multichain: ["MetaMask", "Rabby", "Trust Wallet", "WalletConnect"],
  Solana: ["Phantom", "Solflare", "Backpack", "OKX"],
  Near: ["NEAR Wallet", "Meteor"],
  Avalanche: ["MetaMask", "Core Wallet", "Rabby"],
  Cardano: ["Nami", "Eternl"],
  Mina: ["Auro Wallet"],
  Bittensor: ["SubWallet", "Binance Web3"],
  Arweave: ["ArConnect"],
  Stablecoins: [
    "MetaMask",
    "Rabby",
    "Coinbase Wallet",
    "Trust Wallet",
    "KuCoin Web3",
    "Binance Web3",
  ],
};

export const NETWORK_PRIMARY_TOKENS: Record<string, string[]> = {
  ICP: ["DCSS", "ICP", "CLP"],
  Bitcoin: ["BTC"],
  Polkadot: ["DOT", "TRAC"],
  Cosmos: ["ATOM", "ASI", "AKT", "DVPN", "INJ"],
  Celestia: ["TIA"],
  "0G": ["0G"],
  Ethereum: ["ETH", "LINK", "GRT", "API3", "NMR", "SAHARA", "IP"],
  Arbitrum: ["LPT", "SHELL", "ATH"],
  Base: ["KAITO", "VIRTUAL"],
  Multichain: ["KERNEL", "UP"],
  Solana: ["SOL", "RENDER", "IO", "GRASS", "PYTH"],
  Near: ["NEAR"],
  Avalanche: ["AVAX"],
  Cardano: ["ADA"],
  Mina: ["MINA"],
  Bittensor: ["TAO"],
  Arweave: ["AR"],
  Stablecoins: ["USDT", "USDC"],
};

export function getTokenMeta(symbol: string): TokenMeta | undefined {
  return TOKEN_LIST.find((t) => t.symbol === symbol);
}

export function getTextColorForBg(hexColor: string): string {
  const r = Number.parseInt(hexColor.slice(1, 3), 16);
  const g = Number.parseInt(hexColor.slice(3, 5), 16);
  const b = Number.parseInt(hexColor.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.45 ? "#000000" : "#ffffff";
}

export function formatPrice(price: number): string {
  if (price >= 1000)
    return `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  if (price >= 1) return `$${price.toFixed(3)}`;
  if (price >= 0.01) return `$${price.toFixed(4)}`;
  if (price >= 0.0001) return `$${price.toFixed(6)}`;
  return `$${price.toExponential(3)}`;
}

export function formatBalance(balance: number): string {
  if (balance === 0) return "0";
  if (balance >= 1000)
    return balance.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (balance >= 1) return balance.toFixed(4);
  return balance.toFixed(6);
}

export function truncateAddr(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function formatRelativeTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  if (diff < 60_000) return "Just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}
