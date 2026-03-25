export interface NetworkContent {
  id: string;
  name: string;
  fullName: string;
  color: string;
  accentColor: string;
  intro25words: string;
  description: string;
  wallets: string[];
  links: { label: string; url: string }[];
  stats: { label: string; value: string }[];
}

export const NETWORK_CONTENT: NetworkContent[] = [
  {
    id: "Bitcoin",
    name: "Bitcoin",
    fullName: "Bitcoin Network L0",
    color: "#F7931A",
    accentColor: "#FFD700",
    intro25words:
      "El origen de todo. Reserva de valor digital inmutable, base económica del ecosistema blockchain y colateral máximo de la economía descentralizada global.",
    description:
      "Bitcoin es el activo de reserva del ecosistema crypto. Con suministro máximo de 21 millones, es el oro digital del siglo XXI.",
    wallets: ["Unisat", "Xverse", "OKX"],
    links: [
      { label: "bitcoin.org", url: "https://bitcoin.org" },
      { label: "Mempool", url: "https://mempool.space" },
    ],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Supply máx", value: "21M" },
      { label: "Market Cap", value: "#1" },
    ],
  },
  {
    id: "Polkadot",
    name: "Polkadot Hub",
    fullName: "Polkadot Relay Chain L0",
    color: "#E6007A",
    accentColor: "#FFFFFF",
    intro25words:
      "Red de parachains soberanas con seguridad compartida. DOT conecta blockchains especializadas y TRAC aporta inteligencia descentralizada de datos.",
    description:
      "Polkadot permite que blockchains especializadas interoperen con seguridad compartida del relay chain central.",
    wallets: ["Nova", "Talisman", "SubWallet"],
    links: [
      { label: "polkadot.network", url: "https://polkadot.network" },
      { label: "Subscan", url: "https://polkadot.subscan.io" },
    ],
    stats: [
      { label: "Tokens", value: "2" },
      { label: "Parachains", value: "50+" },
      { label: "Seguridad", value: "Compartida" },
    ],
  },
  {
    id: "Cosmos",
    name: "Cosmos Hub",
    fullName: "Cosmos IBC Ecosystem L0",
    color: "#6F7390",
    accentColor: "#FFFFFF",
    intro25words:
      "El internet de blockchains. IBC conecta ATOM, Fetch.ai, Akash, Sentinel e Injective en un ecosistema soberano e interoperable.",
    description:
      "Cosmos creó IBC, el protocolo que permite que blockchains soberanas se comuniquen nativamente entre sí.",
    wallets: ["Keplr", "Leap"],
    links: [
      { label: "cosmos.network", url: "https://cosmos.network" },
      { label: "Mintscan", url: "https://mintscan.io" },
    ],
    stats: [
      { label: "Tokens", value: "5" },
      { label: "Chains IBC", value: "50+" },
      { label: "TVL", value: ">$3B" },
    ],
  },
  {
    id: "Celestia",
    name: "Celestia",
    fullName: "Celestia Modular L0",
    color: "#7B2FBE",
    accentColor: "#00D4FF",
    intro25words:
      "La primera red modular de disponibilidad de datos. TIA separa el consenso de la ejecución, permitiendo blockchains más baratas y escalables.",
    description:
      "Celestia inventó la arquitectura modular: separa disponibilidad de datos del consenso y ejecución.",
    wallets: ["Keplr", "Leap"],
    links: [{ label: "celestia.org", url: "https://celestia.org" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Tipo", value: "Modular L0" },
      { label: "DA Layer", value: "Nativo" },
    ],
  },
  {
    id: "0G",
    name: "0G Labs",
    fullName: "0G Labs Modular L0",
    color: "#00D4FF",
    accentColor: "#FFFFFF",
    intro25words:
      "Infraestructura modular de IA y datos on-chain. 0G habilita el entrenamiento y almacenamiento descentralizado de modelos de inteligencia artificial.",
    description:
      "0G Labs es infraestructura para IA on-chain. Almacena y procesa modelos de IA de forma descentralizada.",
    wallets: ["Binance", "Mask Network"],
    links: [{ label: "0g.ai", url: "https://0g.ai" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Tipo", value: "IA + Datos" },
      { label: "DePIN", value: "Sí" },
    ],
  },
  {
    id: "Ethereum",
    name: "Ethereum",
    fullName: "Ethereum Mainnet + L2s",
    color: "#627EEA",
    accentColor: "#F7931A",
    intro25words:
      "El ecosistema más grande de DeFi. DCSS conecta Ethereum, Arbitrum, Base y tokens especializados para máxima liquidez y acceso multi-protocolo.",
    description:
      "Ethereum es el hogar del DeFi. Con el mayor TVL, los más desarrolladores y la mayor liquidez del mundo blockchain.",
    wallets: ["MetaMask", "Coinbase Wallet", "WalletConnect"],
    links: [
      { label: "ethereum.org", url: "https://ethereum.org" },
      { label: "Etherscan", url: "https://etherscan.io" },
    ],
    stats: [
      { label: "Tokens", value: "7" },
      { label: "TVL DeFi", value: ">$60B" },
      { label: "Protocolos", value: "500+" },
    ],
  },
  {
    id: "Arbitrum",
    name: "Arbitrum L2",
    fullName: "Arbitrum One Layer 2",
    color: "#12AAFF",
    accentColor: "#FFFFFF",
    intro25words:
      "El L2 de Ethereum más grande por TVL. Optimistic Rollups para transacciones DeFi a fracción del costo del mainnet con total seguridad.",
    description:
      "Arbitrum es el L2 con mayor TVL. Transacciones baratas y rápidas con seguridad de Ethereum.",
    wallets: ["MetaMask", "Coinbase Wallet"],
    links: [
      { label: "arbitrum.io", url: "https://arbitrum.io" },
      { label: "Arbiscan", url: "https://arbiscan.io" },
    ],
    stats: [
      { label: "Tokens", value: "3" },
      { label: "TVL", value: ">$15B" },
      { label: "Gas", value: "~$0.10" },
    ],
  },
  {
    id: "Base",
    name: "Base L2",
    fullName: "Base Mainnet Layer 2",
    color: "#0052FF",
    accentColor: "#FFFFFF",
    intro25words:
      "L2 de Coinbase sobre OP Stack. Ventaja única en onboarding de usuarios tradicionales al ecosistema crypto con fees mínimos.",
    description:
      "Base es el L2 de Coinbase. Acceso masivo al ecosistema crypto para usuarios tradicionales.",
    wallets: ["Coinbase Wallet", "Phantom"],
    links: [
      { label: "base.org", url: "https://base.org" },
      { label: "Basescan", url: "https://basescan.org" },
    ],
    stats: [
      { label: "Tokens", value: "2" },
      { label: "Base", value: "OP Stack" },
      { label: "Respaldo", value: "Coinbase" },
    ],
  },
  {
    id: "Multichain",
    name: "Multichain",
    fullName: "Multichain Protocols",
    color: "#F5A623",
    accentColor: "#FFFFFF",
    intro25words:
      "Protocolos que operan en múltiples cadenas simultáneamente. Restaking y agregación de yield cross-chain para máximo rendimiento del capital.",
    description:
      "Protocolos multichain como KERNEL y Superform operan en varias redes para maximizar el rendimiento.",
    wallets: ["MetaMask", "WalletConnect"],
    links: [
      { label: "kerneldao.com", url: "https://kerneldao.com" },
      { label: "superform.xyz", url: "https://superform.xyz" },
    ],
    stats: [
      { label: "Tokens", value: "2" },
      { label: "Tipo", value: "Cross-chain" },
      { label: "Yield", value: "Agregado" },
    ],
  },
  {
    id: "Solana",
    name: "Solana",
    fullName: "Solana Network",
    color: "#9945FF",
    accentColor: "#00FFA3",
    intro25words:
      "Alta velocidad, costos mínimos. DCSS integra Solana para aprovechar 65,000 TPS y acceso a DeFi ultrarrápido desde Chile.",
    description:
      "Solana es la blockchain más rápida del ecosistema. 65,000 TPS con fees de fracciones de centavo.",
    wallets: ["Phantom", "Backpack"],
    links: [
      { label: "solana.com", url: "https://solana.com" },
      { label: "Explorer", url: "https://explorer.solana.com" },
    ],
    stats: [
      { label: "Tokens", value: "5" },
      { label: "TPS", value: "65,000" },
      { label: "Fee", value: "$0.001" },
    ],
  },
  {
    id: "ICP",
    name: "Internet Computer",
    fullName: "Internet Computer Protocol",
    color: "#29ABE2",
    accentColor: "#22E97A",
    intro25words:
      "La capa base del ecosistema DCSS. Computación descentralizada en cadena nativa, sin gas fees y velocidad submilisegundo de Internet Computer.",
    description:
      "ICP permite que DCSS exista 100% on-chain. Sin AWS. Sin servidores. Código y datos en la blockchain.",
    wallets: ["Internet Identity", "Plug", "Oisy"],
    links: [
      { label: "internetcomputer.org", url: "https://internetcomputer.org" },
      { label: "Dashboard", url: "https://dashboard.internetcomputer.org" },
    ],
    stats: [
      { label: "Tokens", value: "3" },
      { label: "Gas", value: "$0.00" },
      { label: "Velocidad", value: "<2s" },
    ],
  },
  {
    id: "Near",
    name: "Near",
    fullName: "NEAR Protocol",
    color: "#00C08B",
    accentColor: "#FFFFFF",
    intro25words:
      "Blockchain con cuentas de nombres legibles y fees casi nulos. Compatible con Ethereum via Aurora y sharding automático para escalabilidad.",
    description:
      "NEAR es la blockchain diseñada para usabilidad. Cuentas como nombres.near, fees mínimos, compatible con EVM.",
    wallets: ["NEAR Wallet", "Meteor"],
    links: [{ label: "near.org", url: "https://near.org" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Fee", value: "~$0.001" },
      { label: "EVM", value: "Aurora" },
    ],
  },
  {
    id: "Avalanche",
    name: "Avalanche",
    fullName: "Avalanche Network",
    color: "#E84142",
    accentColor: "#FFFFFF",
    intro25words:
      "Alta velocidad con finalidad menor a 2 segundos. Arquitectura de subredes permite blockchains personalizadas. Ecosistema DeFi activo con instituciones.",
    description:
      "Avalanche destaca por su arquitectura de subredes y finalidad sub-segundo. Popular entre instituciones.",
    wallets: ["MetaMask", "Core Wallet"],
    links: [
      { label: "avax.network", url: "https://avax.network" },
      { label: "Snowtrace", url: "https://snowtrace.io" },
    ],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Finalidad", value: "<2s" },
      { label: "Subnets", value: "Sí" },
    ],
  },
  {
    id: "Cardano",
    name: "Cardano",
    fullName: "Cardano Network",
    color: "#0033AD",
    accentColor: "#FFFFFF",
    intro25words:
      "La blockchain académica. Cada feature respaldada por papers peer-reviewed. Fundada por Charles Hoskinson, co-fundador de Ethereum.",
    description:
      "Cardano se diferencia por su rigor académico. Cada actualización pasa por revisión científica antes de implementarse.",
    wallets: ["Nami", "Eternl"],
    links: [{ label: "cardano.org", url: "https://cardano.org" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Consenso", value: "Ouroboros" },
      { label: "Estilo", value: "Académico" },
    ],
  },
  {
    id: "Mina",
    name: "Mina Protocol",
    fullName: "Mina Protocol ZK-L1",
    color: "#E7AC57",
    accentColor: "#FFFFFF",
    intro25words:
      "La blockchain más liviana del mundo con solo 22kb. Usa zk-SNARKs para verificar el estado completo. Privacy by design.",
    description:
      "Mina tiene la blockchain más pequeña del mundo. Cualquier dispositivo puede verificar la cadena completa.",
    wallets: ["Auro Wallet"],
    links: [{ label: "minaprotocol.com", url: "https://minaprotocol.com" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Tamaño", value: "22kb" },
      { label: "ZK", value: "Nativo" },
    ],
  },
  {
    id: "Bittensor",
    name: "Bittensor",
    fullName: "Bittensor AI Network",
    color: "#36A18B",
    accentColor: "#FFFFFF",
    intro25words:
      "Red descentralizada de inteligencia artificial. Los modelos de ML compiten y se recompensan por utilidad real en la red de Bittensor.",
    description:
      "Bittensor crea un mercado descentralizado donde los modelos de IA compiten por relevancia y se recompensan en TAO.",
    wallets: ["Binance", "SubWallet"],
    links: [{ label: "bittensor.com", url: "https://bittensor.com" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Subnets", value: "50+" },
      { label: "DePIN", value: "Sí" },
    ],
  },
  {
    id: "Arweave",
    name: "Arweave",
    fullName: "Arweave Permanent Storage",
    color: "#888888",
    accentColor: "#FFFFFF",
    intro25words:
      "Almacenamiento permanente de datos on-chain. Pago único para guardar datos para siempre. La biblioteca permanente e inmutable de internet.",
    description:
      "Arweave ofrece almacenamiento permanente con un único pago. Los datos nunca se pierden ni pueden borrarse.",
    wallets: ["ArConnect"],
    links: [{ label: "arweave.org", url: "https://arweave.org" }],
    stats: [
      { label: "Tokens", value: "1" },
      { label: "Storage", value: "Permanente" },
      { label: "DePIN", value: "Sí" },
    ],
  },
  {
    id: "Stablecoins",
    name: "Stablecoins",
    fullName: "Stable Assets",
    color: "#26A17B",
    accentColor: "#2775CA",
    intro25words:
      "Valor estable en el ecosistema volátil. USDT y USDC son el ancla del DeFi, puerta de entrada y refugio de todo inversor crypto.",
    description:
      "Las stablecoins son el ancla del ecosistema. Permiten entrar y salir del mercado sin exposición a volatilidad.",
    wallets: ["MetaMask", "Coinbase Wallet"],
    links: [
      { label: "tether.to", url: "https://tether.to" },
      { label: "circle.com", url: "https://circle.com/usdc" },
    ],
    stats: [
      { label: "Tokens", value: "2" },
      { label: "Tipo", value: "Estable $1" },
      { label: "Respaldo", value: "USD" },
    ],
  },
];
