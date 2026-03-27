# DCSS Crypto Hub — Spec Fases 4–6

> **Estado:** Fases 4–5 implementadas en código. Fase 6 planificada.
> Delta sobre spec1.md (Fases 1–3).

---

## Fase 4 — CI/CD y deploy

- `.github/workflows/deploy.yml` — build automático en cada push a `main`
- `dfx.json` con 3 redes: `ic` (mainnet), `playground` (gratis, ~20 min), `local`
- `canister_ids.json` — IDs de mainnet fijos:
  - backend: `emsf6-jqaaa-aaaaj-qroja-cai`
  - frontend: `eltdk-eiaaa-aaaaj-qrojq-cai`
- Frontend source: `src/frontend/dist`

**Comandos de deploy:**
```bash
dfx deploy --playground       # testnet gratis, ~20 min
dfx deploy --network ic       # mainnet real
dfx start --background && dfx deploy  # local
```

---

## Fase 5 — Todas las wallets, balance real, acciones

### Wallets (WalletAdapter pattern)

| Ecosistema | Wallets |
|---|---|
| ICP | Internet Identity, Oisy (ICRC-25 via popup) |
| EVM | MetaMask, Rabby, Coinbase, Trust, Rainbow, KuCoin Web3, Binance Web3, OKX |
| Solana | Phantom, Solflare, Backpack |
| Cosmos | Keplr, Leap |
| Polkadot | Talisman, SubWallet |
| Bitcoin | Unisat, Xverse |
| Cardano | Nami, Eternl |
| NEAR | NEAR Wallet |
| Arweave | ArConnect |
| Mobile | WalletConnect (requiere Project ID de cloud.walletconnect.com) |

### Balance fetch real

| Red | Método |
|---|---|
| ICP | Rosetta API |
| EVM | eth_getBalance, 3 endpoints con fallback |
| Solana | getBalance RPC |
| Cosmos | REST API, fallback múltiple |

### Acciones

- **Buy** — Transak popup con token/red pre-seleccionados
- **Swap** — DEX por red: 1inch / Jupiter / Osmosis / Hydration / THORSwap
- **Send EVM** — Real on-chain via MetaMask (ethers.js)
- **Send Solana** — Real on-chain via Phantom/Solflare/Backpack (@solana/web3.js)
- **Send Cosmos** — Link a Keplr con datos pre-llenados
- **Bridge** — Wormhole Portal + LayerZero (Stargate) con parámetros pre-llenados
- **WalletConnect** — Panel con Project ID, deeplink móvil

### Portfolio
- PortfolioBar: suma USD multi-wallet
- CSV export
- Buscador en tiempo real, grupos por ecosistema

---

## Fase 6 — Planificado

- Complementos: Render, NEAR, Agentes IO
- IA para swaps y portafolio
- Gobernanza DAO
- Oráculos Pyth/Chainlink via HTTP outcalls
- Bridge SDK completo (Wormhole/LayerZero SDK)

---

## Pendientes Fase 5

| Item | Qué necesitas |
|------|---------------|
| WalletConnect QR | Project ID en cloud.walletconnect.com |
| Swap on-chain | API key en portal.1inch.dev |
| Oisy aprobación | Registrar dapp en oisy.com/ecosystem |
