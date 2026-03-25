export const DCSS_MANIFESTO = {
  title: "El futuro de las finanzas no tiene fronteras — ni bancos.",
  subtitle:
    "DCSS Crypto Hub es el primer panel multichain construido sobre Internet Computer, diseñado desde Chile para el mundo.",
  body: [
    "Vivimos en un mundo donde los sistemas financieros tradicionales excluyen a millones. Los bancos cobran comisiones abusivas, los gobiernos pueden congelar cuentas, y el acceso a oportunidades de inversión global sigue siendo un privilegio de pocos.",
    "Blockchain lo cambia todo. Por primera vez en la historia, cualquier persona con internet puede participar en la economía global en igualdad de condiciones. Sin intermediarios. Sin permisos. Sin fronteras.",
    "DCSS nació en Chile con una misión clara: hacer que esta revolución sea accesible, comprensible y poderosa para el usuario latinoamericano.",
    "No somos un exchange. No somos un banco. Somos un hub — un punto de convergencia donde ICP, Ethereum, Solana y el universo Cosmos se unen bajo una sola interfaz. Donde aprender y operar ocurre en el mismo lugar.",
    "Construido sobre Internet Computer Protocol — la única blockchain que puede alojar aplicaciones web completas en cadena, sin AWS, sin Google Cloud, sin ningún intermediario centralizado — DCSS es la demostración de que el futuro de internet es descentralizado.",
    "Esto es apenas el comienzo.",
  ],
};

export interface Differentiator {
  title: string;
  description: string;
  icon: string;
}

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "100% On-Chain",
    description:
      "La app corre completamente en Internet Computer. No hay AWS detrás. No hay Google Cloud. El código que ves es el código que corre.",
    icon: "Shield",
  },
  {
    title: "Educación Integrada",
    description:
      "Cada token tiene su historia, propósito y conexión al ecosistema. No es solo un precio — es un curso de blockchain navegable.",
    icon: "BookOpen",
  },
  {
    title: "Hecho para Chile",
    description:
      "Primer hub crypto diseñado para el usuario chileno. Token CLP, contenido en español, contexto local y comunidad cercana.",
    icon: "MapPin",
  },
  {
    title: "Transparencia Radical",
    description:
      "Código abierto, deployado on-chain. Sin tracking, sin venta de datos, sin cámaras oscuras.",
    icon: "Eye",
  },
];

export type RoadmapStatus = "completed" | "current" | "upcoming";

export interface RoadmapPhase {
  phase: string;
  title: string;
  description: string;
  status: RoadmapStatus;
}

export const ROADMAP: RoadmapPhase[] = [
  {
    phase: "Fase 0",
    title: "Base Funcional",
    description: "43 tokens, 4 redes, wallet connect, bridge UI, activity feed",
    status: "completed",
  },
  {
    phase: "Fase 1",
    title: "Visual Upgrade",
    description:
      "Banners con texturas, sub-hubs, splash overlay, staking UI, páginas proyecto y token detail",
    status: "current",
  },
  {
    phase: "Fase 2",
    title: "Token Universe",
    description:
      "38 páginas profundas por token, fonts únicas por red, oráculos de precios reales",
    status: "upcoming",
  },
  {
    phase: "Fase 3",
    title: "DeFi Activo",
    description:
      "Bridge SDK funcional (Wormhole), staking backend activo, activity feed on-chain",
    status: "upcoming",
  },
  {
    phase: "Fase 4",
    title: "Power Tools",
    description:
      "Portfolio analytics, price alerts, multi-wallet, export CSV, PWA mobile",
    status: "upcoming",
  },
];

export interface TokenDistributionItem {
  label: string;
  pct: number;
  color: string;
}

export const DCSS_TOKEN_INFO = {
  name: "DCSS Token",
  symbol: "DCSS",
  network: "Internet Computer Protocol",
  price: "$0.085",
  utility: [
    "Governance: votar sobre qué tokens se añaden al hub",
    "Staking: bloquear DCSS para recibir fees del protocolo",
    "Acceso premium: holders tienen acceso anticipado a features nuevas",
    "Rewards: usuarios activos reciben DCSS por interactuar",
    "Liquidez: token de liquidez en pares del hub",
  ],
  distribution: [
    { label: "Comunidad y ecosistema", pct: 40, color: "#22E97A" },
    { label: "Equipo fundador (4y vesting)", pct: 25, color: "#FFD700" },
    { label: "Tesorería del protocolo", pct: 20, color: "#29ABE2" },
    { label: "Inversores early (2y vesting)", pct: 10, color: "#9945FF" },
    { label: "Reserva para listings", pct: 5, color: "#F7931A" },
  ] as TokenDistributionItem[],
  status: "coming_soon" as const,
};

export const CHILE_SECTION = {
  title: "Para el Usuario Chileno",
  paragraphs: [
    "Chile tiene una de las tasas de adopción crypto más altas de América Latina. Sin embargo, la mayoría de las herramientas disponibles están en inglés, diseñadas para el mercado norteamericano o europeo.",
    "DCSS cambia eso. El token CLP es la representación simbólica del peso chileno en el ecosistema blockchain — un ancla educativa para entender cómo funciona una stablecoin local.",
    "Todo el contenido está escrito en castellano de Chile, con ejemplos y comparaciones que usan referencias al mercado financiero chileno: AFPs, bancos, tipo de cambio.",
  ],
  highlights: [
    "Token CLP nativo",
    "Contenido en español",
    "Contexto financiero chileno",
    "Comunidad activa en Chile",
  ],
};

export interface EducationSection {
  title: string;
  content: string;
}

export const BLOCKCHAIN_EDUCATION = {
  title: "Aprende Blockchain con DCSS",
  sections: [
    {
      title: "¿Qué es una Blockchain?",
      content:
        "Una blockchain es una base de datos distribuida que guarda registros de transacciones en bloques encadenados criptográficamente. Miles de computadoras en todo el mundo tienen una copia idéntica. Una vez registrada una transacción, nadie puede borrarla ni modificarla. No necesita un banco ni una empresa en el centro para funcionar.",
    },
    {
      title: "¿Qué es DeFi?",
      content:
        "DeFi (Decentralized Finance) son los servicios financieros que funcionan on-chain, sin intermediarios: exchanges descentralizados (DEX) donde intercambias tokens sin custodia, lending donde prestas y pides prestado sin banco, staking donde recibes recompensas por asegurar la red, y bridges que mueven tokens entre blockchains diferentes.",
    },
    {
      title: "¿Por qué ICP es diferente?",
      content:
        "Internet Computer Protocol es la blockchain que permite que DCSS exista completamente descentralizada: el código y los datos corren en la blockchain, no en AWS ni Google Cloud. Smart contracts como 'canisters' pueden almacenar datos y servir interfaces web completas. Transacciones finalizadas en ~1-2 segundos con costo predecible.",
    },
    {
      title: "¿Qué es Staking?",
      content:
        "Staking significa bloquear tokens para participar en la seguridad o governance de una blockchain y recibir recompensas: ICP Neurons hasta 15% APY bloqueando hasta 8 años, ATOM delegation ~14-20% APY, SOL liquid staking sin lockup. DCSS staking disponible próximamente.",
    },
  ] as EducationSection[],
};
