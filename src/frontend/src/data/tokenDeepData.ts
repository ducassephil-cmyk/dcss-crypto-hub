export interface TokenDeepData {
  tagline: string;
  educationalSection?: {
    title: string;
    content: string;
  };
  uniqueStats?: Array<{ label: string; value: string; sub?: string }>;
  visualizationType:
    | "icp-app-gallery"
    | "btc-halving-timeline"
    | "eth-solar-system"
    | "sol-metrics"
    | "clp-whitepaper"
    | "render-cost-bar"
    | "io-node-constellation"
    | "grass-particles"
    | "akt-calculator"
    | "dvpn-map"
    | "inj-live-stats"
    | "grt-roles"
    | "trac-neuro"
    | "pyth-ticker"
    | "near-abstraction"
    | "mina-size-comparison"
    | "tao-subnets"
    | "ar-timeline"
    | "sahara-ecosystem"
    | "ip-attribution-tree"
    | "link-oracle-web"
    | "kernel-restaking"
    | "api3-first-party"
    | "asi-alliance"
    | "nmr-leaderboard"
    | "kaito-mindshare"
    | "virtual-agents"
    | "usdt-comparison"
    | "atom-ibc"
    | "default";
}

export const TOKEN_DEEP_DATA: Record<string, TokenDeepData> = {
  DCSS: {
    tagline: "Nativo. Poderoso. Chileno.",
    visualizationType: "default",
    educationalSection: {
      title: "El Token del Ecosistema DCSS",
      content:
        "DCSS es el token nativo del hub. Se usa para gobernanza del protocolo, acceso premium a funciones avanzadas, staking para recibir fees del ecosistema, e incentivos para proveedores de liquidez. Con el tiempo, cada operación en DCSS Hub genera valor que fluye de regreso a los holders de DCSS.",
    },
    uniqueStats: [
      { label: "Supply Total", value: "100M", sub: "tokens DCSS" },
      { label: "Comunidad", value: "40%", sub: "distribución" },
      { label: "Vesting Equipo", value: "4 años", sub: "cliff 1 año" },
    ],
  },

  ICP: {
    tagline: "Soberano. Veloz. Imparable.",
    visualizationType: "icp-app-gallery",
    educationalSection: {
      title: "¿Por qué ICP es diferente a todas las demás blockchains?",
      content:
        "Internet Computer Protocol es la única blockchain que puede alojar aplicaciones web completas 100% on-chain. Sin AWS. Sin Google Cloud. Sin ningún servidor centralizado. Cada 'canister' (smart contract de ICP) puede almacenar datos, ejecutar lógica y servir interfaces web directamente desde la blockchain. Esto significa que DCSS Hub corre completamente en cadena — nadie puede apagarlo. Las transacciones se finalizan en ~1-2 segundos con cycles predecibles como gas. Internet Identity permite autenticación sin contraseñas usando tus dispositivos físicos.",
    },
    uniqueStats: [
      { label: "Finalidad", value: "~1-2s", sub: "por transacción" },
      { label: "Apps on-chain", value: "750+", sub: "canisters activos" },
      { label: "Cycles", value: "Predecibles", sub: "sin gas variable" },
    ],
  },

  CLP: {
    tagline: "Chileno. Estable. Tuyo.",
    visualizationType: "clp-whitepaper",
    educationalSection: {
      title: "¿Por qué el CLP Token no colapsará como Terra/LUNA?",
      content:
        "Terra colapsó porque su respaldo era su propio token volátil (LUNA). Cuando el precio de LUNA cayó, el algoritmo no pudo mantener la paridad. CLP Token es radicalmente diferente: cada CLP está respaldado 1:1 por USDT/USDC reales en contratos ICP auditables. Un comité de gobernanza con quórum mínimo previene propuestas maliciosas. Guardianes de emergencia pueden vetar cambios peligrosos. El 30-35% se mantiene líquido para redenciones inmediatas, eliminando el riesgo de 'bank run'. Cada redención destruye CLP tokens, manteniendo la paridad perfecta.",
    },
    uniqueStats: [
      { label: "Respaldo", value: "1:1", sub: "USDT/USDC auditado" },
      { label: "Liquidez", value: "35%", sub: "siempre disponible" },
      { label: "Staking", value: "65%", sub: "generando APY" },
    ],
  },

  BTC: {
    tagline: "Digital. Escaso. Libre.",
    visualizationType: "btc-halving-timeline",
    educationalSection: {
      title: "El Halving: Por qué el precio de BTC tiende a subir cada 4 años",
      content:
        "Cada ~4 años, el protocolo Bitcoin reduce a la mitad la recompensa por minar un bloque. Esto se llama 'halving'. Con menos BTC nuevos entrando al mercado y demanda constante o creciente, el precio históricamente ha subido. El suministro máximo es 21 millones — nunca habrá más. El último BTC se minará alrededor del año 2140. Esta escasez programada matemáticamente es lo que diferencia a Bitcoin de cualquier moneda fiat, que puede imprimirse infinitamente.",
    },
    uniqueStats: [
      { label: "Supply Máximo", value: "21M", sub: "para siempre" },
      { label: "Minados hoy", value: "~19.7M", sub: "93.8% del total" },
      { label: "Próximo Halving", value: "2028", sub: "~1.5625 BTC/bloque" },
    ],
  },

  DOT: {
    tagline: "Conectado. Seguro. Parachain.",
    visualizationType: "default",
    educationalSection: {
      title: "Polkadot: La Red de Redes",
      content:
        "Polkadot permite que blockchains especializadas (parachains) coexistan y se comuniquen bajo una seguridad compartida. Cada parachain puede tener sus propias reglas, tokens y velocidades — pero todas se benefician de los validadores del Relay Chain central. DOT es necesario para asegurar slots de parachain vía subastas on-chain. TRAC, el token de OriginTrail, opera como parachain de Polkadot, aportando inteligencia descentralizada de datos a toda la red.",
    },
    uniqueStats: [
      { label: "Parachains", value: "50+", sub: "activas" },
      { label: "Validators", value: "297", sub: "relay chain" },
      { label: "Nominadores", value: "23,000+", sub: "staking DOT" },
    ],
  },

  TRAC: {
    tagline: "Datos. Verificables. Descentralizados.",
    visualizationType: "trac-neuro",
    educationalSection: {
      title: "OriginTrail: El Google de los Datos Confiables",
      content:
        "OriginTrail construye un grafo de conocimiento descentralizado — una base de datos global donde los datos están verificados criptográficamente y son inmutables. Empresas como Walmart, AstraZeneca y la FDA ya usan OriginTrail para rastrear cadenas de suministro. En el contexto de IA, TRAC es crítico: permite saber si los datos que entrenaron un modelo son auténticos y no fueron manipulados. Es la capa de confianza para la IA descentralizada.",
    },
    uniqueStats: [
      { label: "Assets en grafo", value: "1B+", sub: "activos rastreados" },
      { label: "Partners", value: "Walmart / FDA", sub: "casos reales" },
      { label: "DePIN", value: "Sí", sub: "infraestructura física" },
    ],
  },

  ATOM: {
    tagline: "Interoperable. Soberano. IBC.",
    visualizationType: "atom-ibc",
    educationalSection: {
      title: "IBC: El Internet de las Blockchains",
      content:
        "Inter-Blockchain Communication (IBC) es el protocolo que permite a blockchains soberanas comunicarse de forma nativa. A diferencia de los bridges centralizados que custodian fondos (y pueden ser hackeados), IBC verifica cada transacción criptográficamente. Cosmos Hub (ATOM) es el centro de esta red. Desde DCSS, puedes acceder a ASI (IA), AKT (computación), DVPN (privacidad), INJ (derivados) y TIA (datos modulares) — todos conectados por IBC.",
    },
    uniqueStats: [
      { label: "Chains IBC", value: "100+", sub: "conectadas" },
      { label: "Volume IBC", value: "$2B+", sub: "transferido" },
      { label: "APY Staking", value: "14-20%", sub: "unbonding 21 días" },
    ],
  },

  ASI: {
    tagline: "IA. Descentralizada. Autónoma.",
    visualizationType: "asi-alliance",
    educationalSection: {
      title: "La Alianza AGI: FET + AGIX + OCEAN = ASI",
      content:
        "En 2024, tres proyectos líderes de IA descentralizada se fusionaron en el token ASI (Artificial Superintelligence Alliance): Fetch.ai (agentes autónomos), SingularityNET (mercado de IA) y Ocean Protocol (mercado de datos). Esta fusión crea el mayor ecosistema de IA descentralizada del mundo, con capacidad para desarrollar AGI (Inteligencia General Artificial) sin control corporativo centralizado. Los agentes autónomos de Fetch.ai pueden operar servicios económicos sin intervención humana.",
    },
    uniqueStats: [
      { label: "Proyectos fusionados", value: "3", sub: "FET + AGIX + OCEAN" },
      { label: "Fecha fusión", value: "2024", sub: "merge histórico" },
      { label: "Red", value: "Cosmos IBC", sub: "interoperable" },
    ],
  },

  AKT: {
    tagline: "Cloud. Descentralizada. Barata.",
    visualizationType: "akt-calculator",
    educationalSection: {
      title: "Akash: El AWS Descentralizado",
      content:
        "Amazon Web Services controla ~33% del cloud mundial y puede desconectar servicios cuando quiera. Akash es un mercado descentralizado donde cualquiera puede ofrecer capacidad de cómputo y cualquiera puede arrendarlo — sin intermediario, sin censura, a 66% menos costo que AWS. Los proveedores compiten en precio, creando un mercado libre de GPU y CPU. Akash ya ejecuta nodos de IA, aplicaciones DeFi y proyectos Web3 que requieren computación resistente a la censura.",
    },
    uniqueStats: [
      { label: "Ahorro vs AWS", value: "66%", sub: "GPU H100" },
      { label: "Proveedores", value: "130+", sub: "activos" },
      { label: "DePIN", value: "Sí", sub: "compute network" },
    ],
  },

  DVPN: {
    tagline: "Privacidad. Descentralizada. Imparable.",
    visualizationType: "dvpn-map",
    educationalSection: {
      title: "¿Por qué una VPN descentralizada importa?",
      content:
        "Las VPN centralizadas (NordVPN, ExpressVPN) pueden ser hackeadas, censuradas o forzadas a entregar datos de usuarios a gobiernos. Sentinel DVPN es una red de nodos operados por usuarios alrededor del mundo — nadie puede apagar toda la red porque no hay un servidor central. Los proveedores de ancho de banda reciben tokens DVPN a cambio. Los usuarios pagan con DVPN por privacidad genuina. En Chile y Latinoamérica, donde la vigilancia digital está creciendo, herramientas como DVPN son cada vez más relevantes.",
    },
    uniqueStats: [
      { label: "Nodos", value: "8,000+", sub: "en todo el mundo" },
      { label: "Países", value: "100+", sub: "cobertura" },
      { label: "DePIN", value: "Sí", sub: "bandwidth network" },
    ],
  },

  INJ: {
    tagline: "Derivados. On-chain. Ultrarrápido.",
    visualizationType: "inj-live-stats",
    educationalSection: {
      title: "Injective: El Exchange Descentralizado Más Avanzado",
      content:
        "Injective tiene un order book completamente on-chain — sin custodios, sin permiso, sin front-running. Puedes tradear futuros, opciones y perpetuos con la velocidad de un exchange centralizado pero con la transparencia de una blockchain. Block time de 0.64 segundos y fees prácticamente cero hacen que el trading de derivados sea económicamente viable para cualquier usuario. La filosofía es: todos los mercados financieros del mundo, disponibles on-chain, sin barreras.",
    },
    uniqueStats: [
      { label: "Block Time", value: "0.64s", sub: "ultrarrápido" },
      { label: "Fee Trading", value: "~$0.001", sub: "por transacción" },
      { label: "TPS", value: "25,000+", sub: "rendimiento" },
    ],
  },

  TIA: {
    tagline: "Modular. Disponible. Escalable.",
    visualizationType: "default",
    educationalSection: {
      title: "Celestia: La Arquitectura que Cambió el Diseño de Blockchains",
      content:
        "Celestia introdujo la idea de separar la 'disponibilidad de datos' de la 'ejecución'. En una blockchain monolítica (como Ethereum L1), todos los nodos hacen todo: consenso, ejecución y almacenamiento de datos. Celestia solo hace consenso y disponibilidad de datos — y lo hace extraordinariamente bien. Esto permite que cualquiera lance su propia blockchain usando Celestia como base de DA, con costos mínimos. Es la razón por la que las rollups modernas son tan baratas.",
    },
    uniqueStats: [
      { label: "Arquitectura", value: "Modular", sub: "DA layer puro" },
      { label: "ATH", value: "~$21.10", sub: "precio histórico" },
      { label: "Red", value: "Cosmos SDK", sub: "IBC compatible" },
    ],
  },

  "0G": {
    tagline: "IA. On-chain. Modular.",
    visualizationType: "default",
    educationalSection: {
      title: "0G Labs: Infraestructura para la IA Descentralizada",
      content:
        "0G Labs es la primera infraestructura modular diseñada específicamente para IA on-chain. Con 7 capas especializadas (almacenamiento, DA, computación, settlement, ejecución, consenso y P2P), permite entrenar y ejecutar modelos de IA directamente en blockchain. Sus testnet alcanzó 11,000 TPS con 650M transacciones y 22M cuentas — demostrando que la IA descentralizada a escala es posible. Partners como Alibaba Cloud, Hack VC y Ora validan el proyecto.",
    },
    uniqueStats: [
      { label: "TPS Peak", value: "11,000", sub: "testnet" },
      { label: "Txs testnet", value: "650M", sub: "transacciones" },
      { label: "DePIN", value: "Sí", sub: "compute + storage" },
    ],
  },

  ETH: {
    tagline: "Programable. Global. DeFi.",
    visualizationType: "eth-solar-system",
    educationalSection: {
      title: "Ethereum y su Ecosistema de L2s",
      content:
        "Ethereum inventó los smart contracts y el DeFi moderno. Pero su éxito generó congestionamiento y fees altos. La solución: Layer 2s — blockchains que heredan la seguridad de Ethereum pero procesan transacciones fuera de la cadena principal. Arbitrum (SHELL, ATH), Base (KAITO, VIRTUAL) y Optimism usan 'rollups' para comprimir miles de transacciones en una sola prueba criptográfica que se publica en Ethereum L1. El ecosistema ETH ahora puede procesar millones de transacciones por segundo, manteniendo su seguridad.",
    },
    uniqueStats: [
      { label: "TVL DeFi", value: "$50B+", sub: "valor bloqueado" },
      { label: "L2s activas", value: "50+", sub: "rollups" },
      { label: "Developers", value: "#1 global", sub: "mayor ecosistema" },
    ],
  },

  LINK: {
    tagline: "Oráculos. Confiables. Multichain.",
    visualizationType: "link-oracle-web",
    educationalSection: {
      title: "El Problema del Oráculo: Por qué DCSS usará Chainlink",
      content:
        "Los smart contracts son perfectos para ejecutar lógica on-chain — pero no pueden acceder a datos del mundo real por sí solos. ¿Cuánto vale BTC en este momento? ¿Ganó el equipo X el partido? Sin un oráculo confiable, el smart contract no puede saberlo. Chainlink resuelve esto con una red descentralizada de nodos que buscan datos reales y los llevan on-chain con garantías criptográficas. Sin Chainlink, la mayoría del DeFi — Aave, Compound, Uniswap — simplemente no podría funcionar. DCSS usará Chainlink para precios en tiempo real en Fase 3.",
    },
    uniqueStats: [
      { label: "Protocolos", value: "1,800+", sub: "usando Chainlink" },
      { label: "Valor asegurado", value: "$21T+", sub: "lifetime" },
      { label: "Chains", value: "15+", sub: "multichain nativo" },
    ],
  },

  GRT: {
    tagline: "Indexación. Descentralizada. Rápida.",
    visualizationType: "grt-roles",
    educationalSection: {
      title: "The Graph: El Backend Descentralizado de Web3",
      content:
        "Cuando una app necesita mostrar transacciones históricas, balances o eventos on-chain, necesita buscar en millones de bloques. The Graph indexa esa información en 'subgraphs' — bases de datos optimizadas para consultas rápidas usando GraphQL. Uniswap, Aave, Compound y cientos de proyectos DeFi dependen de The Graph. Los Indexadores (que indexan datos) y Delegadores (que les delegan GRT para staking) reciben recompensas. DCSS utilizará The Graph para el activity feed on-chain en Fase 3.",
    },
    uniqueStats: [
      { label: "Subgraphs", value: "90,000+", sub: "indexados" },
      { label: "Chains soportadas", value: "40+", sub: "blockchains" },
      { label: "Queries/mes", value: "1B+", sub: "consultas" },
    ],
  },

  API3: {
    tagline: "Primera Parte. Sin Intermediarios. Preciso.",
    visualizationType: "api3-first-party",
    educationalSection: {
      title: "API3 vs Chainlink: El Debate del Oráculo de Primera Parte",
      content:
        "Chainlink usa un intermediario: la API → nodo Chainlink → smart contract. API3 elimina ese intermediario: la API misma opera su propio nodo (Airnode) y conecta directamente con el smart contract. ¿La diferencia? Con API3, si los datos son incorrectos, sabes exactamente quién es responsable — la API misma. Esto reduce la superficie de ataque y aumenta la accountability. API3 es la apuesta por oráculos de primera parte donde cada fuente de datos es responsable directamente de su información.",
    },
    uniqueStats: [
      { label: "Modelo", value: "1st Party", sub: "APIs directas" },
      { label: "Airnodes", value: "400+", sub: "operados por APIs" },
      { label: "Chains", value: "30+", sub: "soportadas" },
    ],
  },

  NMR: {
    tagline: "Predicción. Competitiva. On-chain.",
    visualizationType: "nmr-leaderboard",
    educationalSection: {
      title: "Numerai: El Torneo de Predicción Más Difícil del Planeta",
      content:
        "Numerai es un hedge fund descentralizado donde miles de data scientists de todo el mundo compiten enviando predicciones del mercado de acciones global. Las predicciones se encriptan para que nadie pueda copiarlas — y los modelos se evalúan en dinero real. Los participantes hacen staking de NMR en sus propias predicciones: si son correctas, ganan más NMR; si son incorrectas, el staking se destruye (burn). El resultado es un metamodelo de predicción financiera construido por la inteligencia colectiva descentralizada.",
    },
    uniqueStats: [
      { label: "Data Scientists", value: "12,000+", sub: "compitiendo" },
      { label: "ATH", value: "~$168", sub: "precio histórico" },
      { label: "Modelo", value: "Stake-to-earn", sub: "con burn" },
    ],
  },

  SAHARA: {
    tagline: "Datos. Monetizados. Tuyos.",
    visualizationType: "sahara-ecosystem",
    educationalSection: {
      title: "Sahara AI: Recupera el Control de tus Datos",
      content:
        "Google, Facebook y Amazon han construido imperios valuados en billones usando tus datos — sin pagarte un centavo. Sahara AI invierte este modelo: cada vez que contribuyes datos para entrenar un modelo de IA, recibes compensación directa. Los contratos inteligentes rastrean qué datos contribuiste y cuánto valor generaron. Como usuario de DCSS, Sahara AI representa la tesis de que la IA del futuro debe ser un bien público donde los contribuyentes de datos sean también los beneficiarios.",
    },
    uniqueStats: [
      { label: "Red", value: "EVM", sub: "compatible" },
      { label: "Modelo", value: "Data-to-earn", sub: "monetización" },
      { label: "Sector", value: "AI + Web3", sub: "convergencia" },
    ],
  },

  IP: {
    tagline: "Propiedad. Programable. Perpetua.",
    visualizationType: "ip-attribution-tree",
    educationalSection: {
      title: "Story Protocol: Registrar Propiedad Intelectual en Blockchain",
      content:
        "Si creas una canción, un libro o un arte y alguien lo deriva, ¿recibes royalties automáticamente? Con Story Protocol, sí. Registras tu IP on-chain, defines las condiciones de licencia (puede derivarse, con qué %, para qué usos), y cada vez que alguien crea un derivado y genera ingresos, los royalties fluyen automáticamente hacia ti via smart contracts. Es 'la internet de la propiedad intelectual' — donde crear, licenciar y monetizar IP es tan fácil como hacer una transacción blockchain.",
    },
    uniqueStats: [
      { label: "IP Assets", value: "2M+", sub: "registrados" },
      { label: "Red", value: "EVM", sub: "layer 1 propio" },
      { label: "Royalties", value: "Automáticos", sub: "via smart contracts" },
    ],
  },

  LPT: {
    tagline: "Video. Descentralizado. Barato.",
    visualizationType: "render-cost-bar",
    educationalSection: {
      title: "Livepeer: El Streaming Descentralizado",
      content:
        "Transcodificar video para streaming (convertir 4K a múltiples resoluciones) es extremadamente costoso en infraestructura centralizada. Livepeer usa capacidad de GPU ociosa de miles de nodos distribuidos para hacer este trabajo a una fracción del costo. Plataformas de streaming pueden reducir sus costos de infraestructura hasta 10x usando Livepeer. Los transcoders reciben LPT como recompensa. Es el modelo DePIN aplicado a la industria del video digital.",
    },
    uniqueStats: [
      { label: "Red", value: "Arbitrum", sub: "L2 Ethereum" },
      { label: "Ahorro", value: "~50-90%", sub: "vs AWS" },
      { label: "DePIN", value: "Sí", sub: "video network" },
    ],
  },

  SHELL: {
    tagline: "Liquidez. Modular. Eficiente.",
    visualizationType: "default",
    educationalSection: {
      title: "Shell Protocol: La Próxima Generación de AMMs",
      content:
        "Los AMMs (Automated Market Makers) como Uniswap son la base del DeFi — pero tienen problemas: impermanent loss para proveedores de liquidez y slippage para traders. Shell Protocol repiensa la arquitectura de liquidez con 'primitivas' modulares que se pueden componer como bloques. Cada primitiva se especializa en un tipo de intercambio, reduciendo slippage y mejorando los retornos para LPs. Opera en Arbitrum para máxima velocidad y mínimos fees.",
    },
    uniqueStats: [
      { label: "Red", value: "Arbitrum", sub: "L2" },
      { label: "Tipo", value: "AMM Modular", sub: "próxima generación" },
      { label: "Sector", value: "DeFi", sub: "liquidez" },
    ],
  },

  ATH: {
    tagline: "GPU. Descentralizada. Global.",
    visualizationType: "io-node-constellation",
    educationalSection: {
      title: "Aethir: GPUs para IA y Gaming Descentralizado",
      content:
        "La demanda de GPU para IA y gaming cloud está explotando — y la oferta está concentrada en pocas empresas (NVIDIA, AWS, Azure). Aethir crea un mercado descentralizado donde data centers y mineros de GPU ofrecen capacidad a desarrolladores de IA y empresas de cloud gaming. Los nodos de Aethir están distribuidos globalmente, reduciendo latencia. Los holders de ATH participan en la gobernanza y reciben parte de los fees. Es DePIN aplicado a la computación de alta performance.",
    },
    uniqueStats: [
      { label: "Red", value: "Arbitrum", sub: "L2" },
      { label: "DePIN", value: "Sí", sub: "GPU network" },
      { label: "Sector", value: "AI + Gaming", sub: "cloud compute" },
    ],
  },

  KAITO: {
    tagline: "Inteligencia. Crypto. Tiempo Real.",
    visualizationType: "kaito-mindshare",
    educationalSection: {
      title: "Kaito: El Motor de Búsqueda Inteligente de Crypto",
      content:
        "El problema de Web3: información crítica está dispersa en Twitter, Discord, Telegram, blogs y documentación técnica. Kaito agrega y analiza toda esa información usando IA para crear un motor de búsqueda especializado en crypto. Puedes preguntar '¿qué dice la comunidad de Solana sobre las fees?' y Kaito sintetiza cientos de fuentes en segundos. Su métrica 'Mindshare' mide qué proyectos generan más atención informada — no solo precio, sino relevancia real.",
    },
    uniqueStats: [
      { label: "Red", value: "Base", sub: "L2 Ethereum" },
      { label: "Tipo", value: "AI + Search", sub: "crypto intelligence" },
      { label: "Métrica", value: "Mindshare", sub: "atención real" },
    ],
  },

  VIRTUAL: {
    tagline: "Agentes. IA. Autónomos.",
    visualizationType: "virtual-agents",
    educationalSection: {
      title: "Virtuals Protocol: Crea y Monetiza Agentes de IA",
      content:
        "Virtuals permite a cualquiera crear un agente de IA con personalidad propia, habilidades definidas y capacidad de generar ingresos autónomos. Imagina un agente de trading que opera 24/7, o un agente creativo que vende arte generativo — cada uno tiene su propio token, y sus creadores reciben fees de cada interacción. Es la economía de los agentes autónomos: software que trabaja para ti mientras duermes, en Base blockchain con fees mínimos.",
    },
    uniqueStats: [
      { label: "Red", value: "Base", sub: "L2 Ethereum" },
      { label: "Tipo", value: "AI Agents", sub: "autónomos" },
      { label: "ATH", value: "~$5.07", sub: "precio histórico" },
    ],
  },

  KERNEL: {
    tagline: "Restaking. Multichain. Optimizado.",
    visualizationType: "kernel-restaking",
    educationalSection: {
      title: "Restaking: Maximiza el Rendimiento de tu Stake",
      content:
        "Cuando haces staking de ETH, ese stake asegura Ethereum — y eso es todo. Kernel permite 'restaking': usar ese mismo stake para asegurar múltiples protocolos simultáneamente, ganando fees adicionales de cada uno. Es como prestar tu garantía a múltiples prestamistas al mismo tiempo. EigenLayer popularizó la idea en Ethereum; Kernel la expande a múltiples cadenas. El riesgo es real — más protocolos asegurados significa más slashing risk — pero el APY adicional puede ser sustancial.",
    },
    uniqueStats: [
      { label: "Tipo", value: "Restaking", sub: "multichain" },
      { label: "APY adicional", value: "+3-8%", sub: "sobre el stake base" },
      { label: "Chains", value: "Multichain", sub: "agnóstico" },
    ],
  },

  UP: {
    tagline: "Yield. Agregado. Multichain.",
    visualizationType: "default",
    educationalSection: {
      title: "Superform: Un Solo Portal para Todo el Yield de DeFi",
      content:
        "DeFi tiene cientos de protocolos de yield (Aave, Compound, Morpho, Yearn) en docenas de chains. Encontrar el mejor APY manual es imposible. Superform agrega todas esas oportunidades en una sola interfaz — depositas desde cualquier chain y Superform encuentra y ejecuta el mejor yield disponible. DCSS Hub fue inspirado por Superform, con la diferencia de que DCSS va más allá: educación, DePIN, ICP nativo y contexto latinoamericano.",
    },
    uniqueStats: [
      { label: "Tipo", value: "Yield Aggregator", sub: "multichain" },
      { label: "Protocolo", value: "LUKSO / L1", sub: "red base" },
      { label: "Recompensas", value: "Puntos", sub: "sistema propio" },
    ],
  },

  SOL: {
    tagline: "Rápido. Barato. Escalable.",
    visualizationType: "sol-metrics",
    educationalSection: {
      title: "Solana: La Blockchain de Alta Performance",
      content:
        "Solana usa Proof of History (PoH) — un mecanismo que crea un registro verificable del tiempo antes del consenso, permitiendo ordenar transacciones sin el cuello de botella de la comunicación entre nodos. El resultado: 65,000 TPS teóricos, fees de fracciones de centavo, y finalidad en menos de 400ms. El ecosistema Solana es el hogar de DePIN (RENDER, IO, GRASS), oráculos (PYTH), gaming, NFTs y DeFi de alta velocidad. Desde DCSS, accedes a todo el ecosistema Solana desde una sola interfaz.",
    },
    uniqueStats: [
      { label: "TPS", value: "65,000", sub: "capacidad" },
      { label: "Fee avg", value: "$0.00025", sub: "por transacción" },
      { label: "Finalidad", value: "<400ms", sub: "confirmación" },
    ],
  },

  RENDER: {
    tagline: "Renderizado. Descentralizado. Accesible.",
    visualizationType: "render-cost-bar",
    educationalSection: {
      title: "Render Network: GPUs para Arte y VFX Descentralizado",
      content:
        "Los estudios de efectos visuales (VFX) y artistas 3D necesitan enormes clusters de GPU para renderizar — y alquilarlos de AWS puede costar miles de dólares por proyecto. Render Network conecta artistas con propietarios de GPU ociosas en todo el mundo, reduciendo costos 5-10x. Los renders se procesan de forma distribuida, los artistas pagan en RENDER tokens, y los propietarios de GPU ganan tokens por su infraestructura. Es DePIN aplicado a la industria creativa — el Netflix de la computación gráfica.",
    },
    uniqueStats: [
      { label: "Red", value: "Solana", sub: "DePIN" },
      { label: "Ahorro", value: "5-10x", sub: "vs AWS render" },
      { label: "ATH", value: "~$13.50", sub: "precio histórico" },
    ],
  },

  IO: {
    tagline: "Computación. Abierta. Descentralizada.",
    visualizationType: "io-node-constellation",
    educationalSection: {
      title: "io.net: La Nube de IA Open Source",
      content:
        "io.net agrega capacidad de GPU de data centers independientes, mineros de criptomonedas y dispositivos individuales en una sola red de computación. Los desarrolladores de IA pueden alquilar clústeres de GPU bajo demanda, más baratos que AWS y con menos restricciones. A diferencia de clouds tradicionales, io.net no requiere contratos a largo plazo y permite escalar desde 1 GPU hasta miles en minutos. Los proveedores de GPU reciben IO tokens. Es la infraestructura abierta de IA que el mundo necesita.",
    },
    uniqueStats: [
      { label: "GPUs", value: "200,000+", sub: "en la red" },
      { label: "Red", value: "Solana", sub: "DePIN" },
      { label: "ATH", value: "~$6.50", sub: "precio histórico" },
    ],
  },

  GRASS: {
    tagline: "Ancho de banda. Pasivo. Rentable.",
    visualizationType: "grass-particles",
    educationalSection: {
      title: "Grass: Convierte tu Internet en Ingresos Pasivos",
      content:
        "Los modelos de IA necesitan datos de entrenamiento del internet real — y recolectarlos centralizadamente es lento y caro. Grass crea una red donde usuarios comparten su ancho de banda inactivo para recopilar datos web de forma distribuida. Tú instalas la extensión de Grass, dejas que use tu conexión cuando no la estás usando, y recibes tokens GRASS. Los clientes de IA pagan por acceder a esos datos. Es minería pasiva sin GPU — solo con tu conexión a internet. Ya tiene 2M+ usuarios activos.",
    },
    uniqueStats: [
      { label: "Usuarios", value: "2M+", sub: "activos" },
      { label: "Red", value: "Solana", sub: "DePIN" },
      { label: "ATH", value: "~$3.90", sub: "precio histórico" },
    ],
  },

  PYTH: {
    tagline: "Oráculos. Alta Frecuencia. Tiempo Real.",
    visualizationType: "pyth-ticker",
    educationalSection: {
      title: "Pyth Network: Datos Financieros de Alta Frecuencia On-chain",
      content:
        "Pyth obtiene precios directamente de los proveedores más grandes del mundo: exchanges (FTX, Binance, OKX), fondos cuantitativos y market makers institucionales. Se actualiza cada 400ms — suficiente para trading de alta frecuencia on-chain. Opera en 40+ blockchains simultáneamente usando mensajes cross-chain. DCSS usará Pyth para alimentar precios en tiempo real en toda la app en Fase 3. A diferencia de otros oráculos que agregan datos de terceros, Pyth recibe datos directo de la fuente primaria.",
    },
    uniqueStats: [
      { label: "Actualización", value: "400ms", sub: "alta frecuencia" },
      { label: "Chains", value: "40+", sub: "cross-chain" },
      { label: "Price feeds", value: "500+", sub: "activos" },
    ],
  },

  NEAR: {
    tagline: "Abstracción. Simple. Universal.",
    visualizationType: "near-abstraction",
    educationalSection: {
      title: "Chain Abstraction: El Fin de las Wallets por Red",
      content:
        "Hoy, para usar DeFi en Ethereum necesitas MetaMask con ETH para gas. Para Solana necesitas Phantom con SOL. Para Cosmos necesitas Keplr. Cada chain tiene su propia wallet, fees y UX. NEAR desarrolló Chain Abstraction: defines tu 'intent' (qué quieres lograr) y NEAR resuelve automáticamente la cadena óptima, el routing de fees y la ejecución. Una sola cuenta NEAR, readable como 'mi-nombre.near', funciona en todas las chains. Es la visión de internet donde el usuario no sabe qué servidor está procesando su request.",
    },
    uniqueStats: [
      { label: "Cuentas", value: "25M+", sub: "registradas" },
      { label: "Fee", value: "~$0.001", sub: "casi cero" },
      { label: "Modelo", value: "Chain Abstraction", sub: "multi-chain" },
    ],
  },

  AVAX: {
    tagline: "Subnets. Rápido. Personalizable.",
    visualizationType: "default",
    educationalSection: {
      title: "Avalanche: Blockchains Personalizadas para Cada Caso de Uso",
      content:
        "Avalanche permite crear 'subnets' — blockchains completamente personalizadas que comparten el ecosistema de AVAX pero tienen sus propias reglas, fees y validadores. Esto permite que empresas, gobiernos o proyectos DeFi tengan blockchains diseñadas exactamente para sus necesidades, con la seguridad de la red Avalanche como base. La finalidad en <2 segundos y el soporte nativo para contratos Solidity (EVM compatible) facilita migrar proyectos de Ethereum a Avalanche.",
    },
    uniqueStats: [
      { label: "Finalidad", value: "<2s", sub: "confirmación" },
      { label: "Subnets", value: "60+", sub: "activas" },
      { label: "TPS", value: "4,500+", sub: "capacidad" },
    ],
  },

  ADA: {
    tagline: "Académico. Peer-reviewed. Seguro.",
    visualizationType: "default",
    educationalSection: {
      title: "Cardano: La Blockchain Construida con Rigor Científico",
      content:
        "Cardano es única: cada feature del protocolo es respaldada por papers académicos peer-reviewed antes de implementarse. Fundada por Charles Hoskinson (co-fundador de Ethereum), usa el lenguaje Haskell para el código del protocolo — elegido por sus propiedades matemáticas de corrección formal. Ouroboros es el primer algoritmo de Proof of Stake con pruebas de seguridad matemáticas publicadas. Para los que valoran la solidez académica sobre la velocidad de iteración, Cardano es la alternativa.",
    },
    uniqueStats: [
      { label: "Papers publicados", value: "140+", sub: "peer-reviewed" },
      { label: "Staking APY", value: "~4-5%", sub: "sin lockup" },
      { label: "ADA holders", value: "4M+", sub: "wallets" },
    ],
  },

  MINA: {
    tagline: "22KB. Verificable. Liviana.",
    visualizationType: "mina-size-comparison",
    educationalSection: {
      title: "zk-SNARKs: Por qué Mina siempre pesa solo 22KB",
      content:
        "Toda blockchain normal crece con cada bloque: Bitcoin pesa 500GB+, Ethereum 1TB+. Para verificar la cadena necesitas descargar todo el historial. Mina usa zk-SNARKs (Zero Knowledge Succinct Non-Interactive Arguments of Knowledge) para comprimir toda la historia de la blockchain en una 'prueba' de 22KB. Cualquiera puede verificar el estado completo de Mina desde un celular, sin descargar nada más. Esta tecnología de privacidad matemática también permite que Mina pruebe cosas sobre datos sin revelar los datos mismos.",
    },
    uniqueStats: [
      { label: "Tamaño blockchain", value: "22KB", sub: "fijo para siempre" },
      { label: "Tecnología", value: "zk-SNARKs", sub: "zero knowledge" },
      { label: "Verificación", value: "Móvil", sub: "sin descarga" },
    ],
  },

  TAO: {
    tagline: "IA. Competitiva. Descentralizada.",
    visualizationType: "tao-subnets",
    educationalSection: {
      title: "Bittensor: La Red que Paga a los Mejores Modelos de IA",
      content:
        "Bittensor crea un mercado donde modelos de IA compiten para dar las mejores respuestas y reciben TAO tokens como recompensa. Cada 'subnet' especializa en un tipo de IA: texto, imágenes, audio, trading, código, biología. Los validadores evalúan los modelos y distribuyen recompensas según la calidad. El incentivo económico atrae a los mejores investigadores del mundo a contribuir modelos. El resultado es una red de IA que mejora continuamente, descentralizada y resistente a la censura.",
    },
    uniqueStats: [
      { label: "Subnets", value: "60+", sub: "especializadas" },
      { label: "ATH", value: "~$760", sub: "precio histórico" },
      { label: "DePIN", value: "Sí", sub: "AI network" },
    ],
  },

  AR: {
    tagline: "Permanente. Para siempre. Inmutable.",
    visualizationType: "ar-timeline",
    educationalSection: {
      title: "Arweave: Almacenamiento Permanente de la Historia de Internet",
      content:
        "Pagas una vez, tus datos persisten para siempre. Ese es el modelo de Arweave. Usando un mecanismo llamado 'blockweave', Arweave incentiva a los mineros a almacenar datos históricos — cuanto más raro es un bloque, más recompensa recibe quien lo almacena. NFTs que se almacenan en IPFS o AWS pueden desaparecer si el servidor se cae. NFTs en Arweave son permanentes. La Biblioteca del Congreso, los contratos de Solana y el metaverso del futuro usan Arweave para garantizar que su historial nunca desaparezca.",
    },
    uniqueStats: [
      { label: "Modelo", value: "Pay-once", sub: "permanente" },
      { label: "DePIN", value: "Sí", sub: "storage network" },
      { label: "Datos guardados", value: "250TB+", sub: "y creciendo" },
    ],
  },

  USDT: {
    tagline: "Estable. Líquido. Universal.",
    visualizationType: "usdt-comparison",
    educationalSection: {
      title: "Stablecoins: La Puerta de Entrada a DeFi para Chilenos",
      content:
        "Para participar en DeFi desde Chile, el flujo típico es: Peso chileno → Exchange (Buda, Cryptomkt) → USDT/USDC → Wallet personal → DeFi. Las stablecoins son el puente indispensable entre el peso fiat y el ecosistema crypto. USDT (Tether) tiene la mayor liquidez y el mayor volumen de trading del mundo. USDC (Circle/Coinbase) tiene auditorías más transparentes y cumplimiento regulatorio. Ambas tienen sus ventajas: USDT para liquidez máxima, USDC para contextos institucionales o regulados.",
    },
    uniqueStats: [
      { label: "Supply", value: "$110B+", sub: "circulando" },
      { label: "Chains", value: "10+", sub: "multichain" },
      { label: "Volume diario", value: "$50B+", sub: "trading" },
    ],
  },

  USDC: {
    tagline: "Auditado. Regulado. Confiable.",
    visualizationType: "usdt-comparison",
    educationalSection: {
      title: "USDC vs USDT: ¿Cuál elegir desde Chile?",
      content:
        "USDC (emitido por Circle, respaldado por Coinbase) publica auditorías mensuales verificadas de sus reservas en bancos regulados de EE.UU. USDT (Tether) tiene mayor volumen pero controversias históricas sobre la composición de sus reservas. Para DeFi institucional o bridges hacia Ethereum y Solana, USDC es generalmente preferido. Para trading de alta frecuencia y máxima liquidez, USDT domina. Ambos son redimibles 1:1 por dólar. En DCSS, soportamos ambos para máxima flexibilidad.",
    },
    uniqueStats: [
      { label: "Auditorías", value: "Mensuales", sub: "transparentes" },
      { label: "Emisor", value: "Circle", sub: "regulado USA" },
      { label: "Supply", value: "$42B+", sub: "circulando" },
    ],
  },
};
