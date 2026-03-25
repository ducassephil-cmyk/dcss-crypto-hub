# DCSS Crypto Hub — Spec Fase 1 (Baseline Canónico)

> **Estado:** COMPLETADO — Draft v5. Documento de referencia base para todas las fases.
> spec2 y spec3 documentan solo deltas sobre este baseline.

---

## Visión del producto

Hub multichain Web3 orientado al mercado chileno. Permite gestionar, aprender e interactuar
con ~40 tokens canónicos (BTC, CLP, ETH, ICP, SOL, DOT, ATOM, etc.) en 18+ redes
(EVM, ICP, Solana, Cosmos, Polkadot, Celestia, 0G Labs, y más).

Posicionamiento: alternativa educativa y visualmente sofisticada a Superform, con foco
en DePIN, contexto LATAM, y el token CLP como stablecoin DeFi-nativa del ecosistema chileno.
Puro Web3 — sin integración fiat en el core.

---

## Tokens canónicos (~40)

Agrupados en 18+ banners de red. Solo tokens presentes en la planilla de referencia.
Imagen de referencia:
`src/frontend/public/assets/uploads/screenshot_2026-03-23_at_10.58.46_pm-019d1d92-8a2f-76db-b76a-d562f9e31650.png`

**Redes y tokens principales:**
- ICP: ICP, DCSS (futuro)
- Ethereum: ETH, LINK, GRT, LPT, NMR, KERNEL, API3
- Solana: SOL, PYTH, RENDER, GRASS
- Cosmos: ATOM, INJ, TIA
- Polkadot: DOT
- AI/DePIN: TAO, ASI, AKT, IO, ATH, VIRTUAL, KAITO
- Other: AR, MINA, NEAR, AVAX, ADA, IP, TRAC, DVPN, SHELL, UP
- Stablecoins: USDT, USDC
- CLP Token: banner propio
- Bitcoin: BTC
- 0G Labs: 0G

---

## Diseño visual

- **Paleta Fase 1/2:** matrix green #22E97A + gold #FFD700
- **Paleta Fase 3+:** aquamarine #00D4B8, #1DE9B6 (actualizada en spec3)
- Glass morphism, circuit-chip neon de fondo, texturas Call of Duty por red
- Cards con hover glow, banners con borde izquierdo iluminado
- Accesibilidad: ARIA labels, navegación por teclado, alto contraste, reduced motion

---

## Páginas y navegación

| Ruta | Descripción |
|------|-------------|
| `/` (dashboard) | Hero + grid de tokens por red |
| `/tokens` | Grid con búsqueda y filtros |
| `/bridge` | Panel de bridge (UI lista, funcionalidad Fase 4) |
| `/activity` | Feed de actividad on-chain |
| `/project` | Manifesto DCSS, DePIN Universe, whitepaper CLP |
| `/staking` | Staking de ICP (backend activo en Fase 3) |
| `/token/:symbol` | Página de detalle por token |

---

## Componentes principales

- `DCSSHero`: hero con globo 3D wireframe, stats del canister
- `TokenCard`: precio, balance, acciones (Buy/Send/Swap/Stake)
- `NetworkBanner`: banner por red con textura CoD
- `WalletConnectModal`: flujo de conexión por red → wallet
- `ActionModal`: Buy/Send/Swap/Stake (UI completa; transacciones reales en Fase 4)
- `BridgePanel`: UI de bridge cross-chain (funcional en Fase 4)
- `ActivityFeed`: historial de transacciones on-chain
- `StakingPage`: stake/unstake/rewards de ICP
- `ProjectPage`: manifesto, DePIN Universe, whitepaper CLP
- `TokenDetailPage`: visualización única + educación por token

---

## Flujo de wallets (Fase 1)

1. Usuario selecciona red en `WalletConnectModal`
2. Se muestran solo wallets compatibles con esa red
3. Si la extensión está instalada: conecta real
4. Si no está instalada: redirige a página de instalación de esa wallet
5. Una vez conectado: dirección visible, balance visible en TokenCard

---

## Flujo de compra Chile (informativo, en token pages USDT/USDC)

**Actual (sin DCSS):** Pesos CLP → Buda/Cryptomkt → USDT → Exchange → DeFi
**Con DCSS (futuro):** Pesos CLP → Buda → USDT → Mint CLP Token (ICP) → DeFi directo

DCSS elimina el Exchange intermediario. Buda sigue siendo necesario en fases tempranas.
La integración bancaria directa (saltarse Buda) queda en Fase 2 del roadmap CLP,
y es opcional — activable solo por gobernanza comunitaria.

---

## CLP Token — posicionamiento

Protocolo DeFi puro bajo modelo DAI, construido en ICP. Sin compromisos bancarios del equipo core.

- Respaldo 1:1 en USDT/USDC bloqueados en contratos ICP
- 30–40% líquido para traders, 60–70% en staking largo plazo
- Quema en cada redención para mantener paridad
- Gobernanza: comité + guardianes + quórum mínimo
- APY de comisiones reales, no inflacionario

**Roadmap CLP:**
| Fase | Descripción | Tipo |
|------|-------------|------|
| 1 | Emisión respaldada en USDT/USDC | Core |
| 2 | Integración bancaria chilena (CLP fiat) | OPCIONAL — comunidad |
| 3 | Puentes a EVM/Solana via Wormhole/IBC | Core |
| 4 | Gobernanza DAO con comité y guardianes | Core |
| 5 | Auditorías externas + adopción masiva | OPCIONAL — comunidad |

---

## Contenido de datos (archivos)

- `src/frontend/src/data/tokens.ts` — lista canónica de tokens y redes
- `src/frontend/src/data/tokenDeepData.ts` — contenido profundo por token (Fase 2)
- `src/frontend/src/data/projectContent.ts` — contenido página /project
- `src/frontend/src/data/networkContent.ts` — intros, stats y links por red
