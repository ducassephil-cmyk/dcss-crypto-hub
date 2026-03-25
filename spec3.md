# DCSS Crypto Hub — Spec Fase 3

> **Referencia:** spec1 + spec2 son el baseline. Este archivo documenta SOLO el delta de Fase 3.
> **Versión desplegada:** Draft v15
> **Estado:** COMPLETO — bugs de balance pendientes (ver sección 4)

---

## 1. Paleta de colores

| Elemento | Antes | Ahora |
|----------|-------|-------|
| Acento principal | #22E97A (matrix green) | #00D4B8 (aquamarine) |
| Acento secundario | #00FF9F | #1DE9B6 |
| Botón Buy/Send/Swap | Gold #FFD700 | Rose gold metallic gradient |
| Glow banners (borde izq.) | 60% opacidad | 30% (reducido) |
| Circuit background | Verde neon | Teal neon |

---

## 2. Precios reales — CoinGecko

- HTTP outcalls desde backend ICP a CoinGecko, cache 60s
- Badge "LIVE" en TokenCard cuando los datos son reales
- Variación 24h en rojo/verde
- Fallback silencioso a precios simulados si CoinGecko no responde

---

## 3. Conexión auténtica de wallets (29 wallets)

**Regla:** cada wallet conecta SOLO con su propia extensión. Sin fallbacks. Sin demos.
Si no está instalada → redirige a instalación. Nunca simula conexión ni balance.

| Red | Wallets soportadas |
|-----|-------------------|
| ICP | Internet Identity, Plug, Oisy |
| Ethereum/EVM | MetaMask, Coinbase, Rabby, Trust, Rainbow, KuCoin, Binance, Core, OKX |
| Solana | Phantom, Solflare, Backpack |
| Cosmos | Keplr, Leap |
| Polkadot | Talisman, SubWallet, Nova (redirect móvil) |
| Bitcoin | Unisat, Xverse, OKX |
| Arweave | ArConnect |
| Mina | Auro Wallet |
| Cardano | Nami, Eternl |

**Nota:** WalletConnect requiere Project ID externo — pendiente Fase 4.

---

## 4. Balances auténticos — Estado actual

**Bug activo:** Phantom y Keplr muestran balance vacío aunque conecten correctamente.
**Causa raíz:** `fetchSolanaBalance` y `fetchCosmosBalance` son fire-and-forget async.
Escriben en `localStorage` pero no disparan re-render en React. Los componentes leen
el estado en el momento del render inicial, antes de que el fetch complete.

**Fix requerido (Fase 4):**
- Agregar `balanceTick` state en WalletContext
- Después de cada fetch exitoso, llamar `setBalanceTick(t => t + 1)`
- Navbar y PortfolioBar incluyen `balanceTick` como dependencia → se re-renderizan

| Red | Método de fetch | Token | Estado |
|-----|----------------|-------|--------|
| EVM (MetaMask) | `eth_getBalance` via provider | ETH | Funciona |
| Solana (Phantom) | `getBalance` RPC mainnet-beta | SOL | Bug — no re-renderiza |
| Cosmos (Keplr) | REST api.cosmos.network | ATOM | Bug — no re-renderiza |
| Polkadot | Subscan API | DOT | Pendiente Fase 4 |
| Bitcoin | mempool.space API | BTC | Pendiente Fase 4 |

---

## 5. Wallet Hub (Navbar) + PortfolioBar

- Dropdown del navbar: tipo de wallet, dirección truncada, balance nativo, valor USD
- Total Portfolio al fondo del dropdown
- PortfolioBar en dashboard: total USD + cantidad de tokens con saldo > 0

---

## 6. Diagrama del Ecosistema DCSS

- Componente: `src/frontend/src/components/DCSSEcosystemDiagram.tsx`
- Reemplaza el planeta 3D (Three.js) en el hero del dashboard
- 4 anillos orbitales: ICP Core, Oráculos, Redes, Wallets & Bridges
- Nodos FASE 4 aparecen atenuados
- Hover en nodo: panel de descripción + status LIVE / PARTIAL / FASE 4

---

## 7. Activity Feed

- Arranca vacío: "No transactions yet"
- Solo muestra actividad cuando el usuario ejecuta transacciones reales
- Estructura lista para The Graph en Fase 4

---

## 8. Staking — Coming Soon con enlaces nativos

Backend de staking simulado removido. Solo enlaces a plataformas nativas:

| Token | Plataforma |
|-------|-----------|
| ICP | NNS (nns.ic0.app) |
| SOL | Marinade (marinade.finance) |
| ATOM | Keplr Dashboard |
| DOT | Polkadot Staking Dashboard |
| ETH | Lido (lido.fi) |
| TIA | Celestia staking nativo |

---

## Coming Soon en UI

| Feature | Razón |
|---------|-------|
| Send / Buy / Receive | Requiere librerías por chain (@solana/web3.js, cosmjs, etc.) |
| Staking propio DCSS | Requiere token DCSS en ICP mainnet |
| DCSS Coin | Requiere contrato ICP |
| Bridge cross-chain | Wormhole/LayerZero — relayer EVM externo |
| Swap | Requiere DEX integration (Jupiter, Uniswap, etc.) |
| WalletConnect | Pendiente Project ID (cloud.walletconnect.com) |

---

## Archivos modificados

| Archivo | Cambio |
|---------|--------|
| `src/frontend/src/index.css` | Paleta aquamarine, variables CSS globales |
| `src/frontend/src/App.tsx` | Eliminado toggle ecosistema redundante |
| `src/frontend/src/contexts/WalletContext.tsx` | Sin wipe localStorage; fetch ATOM/SOL post-conexión |
| `src/frontend/src/hooks/useRealWallet.ts` | Detección estricta por wallet, sin fallbacks cruzados |
| `src/frontend/src/hooks/useLivePrices.ts` | CoinGecko HTTP outcalls, badge LIVE |
| `src/frontend/src/components/Navbar.tsx` | Mini Wallet Hub con balances y total portafolio |
| `src/frontend/src/components/DCSSHero.tsx` | Planeta 3D reemplazado por DCSSEcosystemDiagram |
| `src/frontend/src/components/DCSSEcosystemDiagram.tsx` | Diagrama orbital 4 anillos (nuevo) |
| `src/frontend/src/components/ActivityFeed.tsx` | Arranca vacío |
| `src/frontend/src/pages/StakingPage.tsx` | Coming Soon + enlaces nativos |
| `src/backend/main.mo` | Stats, price cache — staking simulado removido |

---

## Pendiente — Fase 4

- Fix balanceTick (re-render después de fetch Phantom/Keplr)
- DOT y BTC balance fetch (Subscan, mempool.space)
- Send/Buy/Receive reales
- WalletConnect con Project ID
- Bridge Wormhole/LayerZero
- DCSS Coin
- The Graph para activity feed
- Wallet tab dedicada (historial, por token, export CSV)
- Portfolio analytics P&L, charts, price alerts
- Expansión LATAM (ARS, COP, PEN)
- Fase 3.5: testnet/mainnet deployment (ver spec3.5.md)
