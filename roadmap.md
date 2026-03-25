# DCSS Crypto Hub — Roadmap de Ejecución

> Última actualización: Marzo 2026
> Estado actual: **specbeta activo** (Draft v29)

---

## Fase 1+2 — COMPLETADO
**Spec:** `spec1.md`

- Hub visual multichain con ~40 tokens canónicos en 18+ redes
- Glass morphism, paleta aquamarine/teal, botones rose gold
- Páginas: Dashboard, Tokens, Bridge, Activity, Project, Staking, Token Detail
- 35+ visualizaciones únicas por token
- Whitepaper CLP (DAI model, DeFi-only, sin banking)
- DePIN Universe en /project
- Accesibilidad: ARIA, teclado, alto contraste

---

## Fase 3+4 — COMPLETADO
**Spec:** `spec3.md`

- 29 wallets con detección individual por extensión
- Balance fetching real con múltiples endpoints y fallback
- Precios CoinGecko en vivo con badge LIVE
- Activity feed arranca completamente vacío (solo actividad real)
- Staking: Coming Soon con links nativos (NNS, Marinade, Keplr, Lido, etc.)
- Diagrama ecosistema 3D perspectiva solar system
- Portfolio analytics: sparkline 7D, columna 24h %, CSV export
- Tipografía: Bricolage Grotesque + Geist Mono

---

## Fase Beta — EN CURSO
**Spec:** `specbeta.md`
**Draft:** v29

Objetivo: base sólida y funcional antes de escalar.

- [x] Backend Motoko: DCSS Stablecoin (1 ICP = 1 DCSS, -0.3% fee), Governance Token (21M supply)
- [x] WalletAdapter pattern: escala a 100+ wallets sin reescribir contexto
- [x] II: conecta real, balance ICP via ledger canister + Rosetta fallback
- [x] Oisy: abre oisy.com como popup, solicita permisos ICRC-25, recibe principal
- [x] Dashboard: solo tokens con balance real > 0; banners colapsados sin wallet
- [x] Paleta monocromática: negro, gris oscuro, aquamarine como único acento
- [x] Página DCSS Coin: stats live, mint/burn, roadmap honesto
- [ ] Deploy a mainnet real (ver `spec3.5.md`)

---

## Fase 3.5 — PLANIFICADO
**Spec:** `spec3.5.md`

- Obtener ciclos via faucet.dfinity.org (gratis)
- Instalar dfx y crear identidad dcss-deployer
- Deploy a ICP Playground (gratis, sin ciclos)
- Deploy a ICP Mainnet (con ciclos del faucet)
- CI/CD con GitHub Actions
- Dominio custom (dcss.app)

---

## Fase Beta 2 — PLANIFICADO
**Spec:** `specbeta2.md` (por crear)

Combina spec3 + spec4 + spec3.5 en un build robusto:

- Todas las 29+ wallets con WalletAdapter
- Balance fetching para EVM, Solana, Cosmos, Polkadot, BTC
- Precios CoinGecko en vivo
- Bridge ICP ↔ DCSS en mainnet
- Oráculos Pyth/Chainlink (HTTP outcalls reales)
- Portfolio analytics completo
- Deploy a mainnet con CI/CD

---

## Fases Futuras

| Fase | Objetivo | Componentes |
|------|----------|-------------|
| 5 | Interoperabilidad | Wormhole/LayerZero MVP, ICP ↔ EVM ↔ Solana |
| 6 | Complementos | Render (APIs/indexadores), NEAR (staking pools), Agentes IO |
| 7 | Diferenciación | IA para swaps, gestión de portafolio, alertas de riesgo |
| 8 | Gobernanza | DAO DCSS, comité, guardianes, quórum mínimo |

---

## Archivos activos

| Archivo | Descripción |
|---------|-------------|
| `spec1.md` | Maestro Fase 1+2 (baseline canónico) |
| `spec3.md` | Maestro Fase 3+4 (wallets, precios, diagrama) |
| `spec3.5.md` | Deploy a testnet/mainnet (guía técnica) |
| `specbeta.md` | Build beta actual (II + Oisy, DCSS Coin) |
| `roadmap.md` | Este archivo |
