# DCSS Crypto Hub — Spec Beta

> **Objetivo:** versión simplificada y funcional. II + Oisy como wallets piloto.
> Patron WalletAdapter para escalar a 100+ wallets sin cambiar el contexto.
> Backend fuerte con canister DCSS Stablecoin y Governance Token.
> Paleta monocromática. Sin animaciones complejas. DCSS Coin como centro.

---

## Qué se SACA (vs spec3)

- Diagrama del ecosistema (canvas/Three.js) — eliminado por completo
- 29 wallets EVM/Solana/Cosmos — fuera de beta, vuelven en v1.0
- CLP en /project page — removido
- Variaciones aleatorias de precios (Math.random) — eliminado
- Staking backend simulado — ya era Coming Soon, se mantiene
- Fase 4 features (bridge, The Graph, WalletConnect) — fuera de beta

---

## Paleta monocromática

| Token | Valor |
|-------|-------|
| `--bg-base` | #0A0A0A |
| `--bg-surface` | #141414 |
| `--bg-elevated` | #1E1E1E |
| `--border` | #2A2A2A |
| `--text-primary` | #F0F0F0 |
| `--text-muted` | #6B6B6B |
| `--accent` | #00D4B8 (aquamarine — único color) |
| `--accent-dim` | #00D4B820 |
| `--error` | #FF4444 |

Sin gradientes rose gold, sin matrix green, sin neon. Solo aquamarine como acento.

---

## Wallets Beta: II + Oisy

### WalletAdapter pattern

```ts
interface WalletAdapter {
  id: string
  name: string
  icon: string
  networks: Network[]
  isInstalled: () => boolean
  connect: () => Promise<{ address: string; isReal: boolean }>
  fetchBalances: (address: string) => Promise<TokenBalance[]>
  disconnect: () => Promise<void>
}
```

Cada wallet es un objeto que implementa `WalletAdapter`. Agregar wallet nueva = agregar objeto, no tocar contexto.

### Internet Identity
- Conexión via `@dfinity/auth-client`
- Devuelve `Principal` del usuario
- Redes: ICP únicamente
- Balance: fetch via canister DCSS

### Oisy
- Conexión via `window.oisy` provider (extensión de browser)
- Si no está instalada: link a chrome.google.com/webstore/oisy
- Redes: ICP + Ethereum (vía clave ECDSA delegada)
- Balance: fetch ICP via canister DCSS, ETH via eth_getBalance del provider

---

## Backend — Canisters DCSS

### Canister 1: DCSS Stablecoin (modelo DAI)

**Concepto:** usuario deposita ICP → recibe DCSS tokens (1:1 con USD-equivalent del ICP).
Quema DCSS → recupera ICP proporcional.

**Funciones públicas:**
- `mintDCSS(amount: Nat) → Result<Nat, Text>` — deposita ICP, recibe DCSS
- `burnDCSS(amount: Nat) → Result<Nat, Text>` — quema DCSS, recupera ICP
- `getBalance(user: Principal) → Nat` — balance DCSS del usuario
- `getTotalSupply() → Nat` — supply total circulante
- `getCollateralRatio() → Float` — ratio de colateral (objetivo: ≥150%)
- `getIcpPrice() → Float` — precio ICP en USD desde oracle interno
- `getUserVault(user: Principal) → Vault` — vault del usuario

**Vault:**
```
type Vault = {
  owner: Principal;
  collateralICP: Nat;    // ICP depositado
  mintedDCSS: Nat;       // DCSS emitido
  collateralRatio: Float; // ratio actual
  liquidationPrice: Float; // precio ICP al que se liquida
};
```

**Reglas:**
- Colateral mínimo 150% para mint
- Fee 0.3% al treasury en cada mint/burn
- Liquidación automática si ratio cae bajo 120%
- `mintDCSS` y `burnDCSS` son transacciones reales en ICP mainnet

### Canister 2: DCSS Governance Token

**Concepto:** supply fijo 21M. Staking → veDCSS → poder de voto + share de fees del treasury.

**Funciones públicas:**
- `transfer(to: Principal, amount: Nat) → Result<(), Text>`
- `balanceOf(user: Principal) → Nat`
- `stake(amount: Nat, lockDays: Nat) → Result<(), Text>` — lock hasta 4 años
- `getVotingPower(user: Principal) → Nat` — veDCSS = amount × (days/1460)
- `claimFees() → Result<Nat, Text>` — claim ICP fees acumulados
- `getTotalStaked() → Nat`
- `getStakeInfo(user: Principal) → StakeInfo`

**StakeInfo:**
```
type StakeInfo = {
  amount: Nat;
  lockUntil: Time;
  votingPower: Nat;
  pendingFees: Nat;
};
```

---

## Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard — tokens canónicos + precios live |
| `/tokens` | Grid con búsqueda y filtros |
| `/token/DCSS` | Página dedicada DCSS Coin — stats live, mint/burn, governance |
| `/token/:symbol` | Detalle por token (educativo, sin CLP whitepaper) |
| `/project` | Manifesto DCSS — solo Web3, sin CLP, foco en DCSS Coin |
| `/staking` | Coming Soon + enlaces nativos por token |
| `/activity` | Feed vacío hasta actividad real |

---

## Página /token/DCSS (centro de la app)

- **Stats live del canister:** total supply circulante, ratio de colateral, precio ICP actual
- **Tu vault:** colateral depositado, DCSS emitido, ratio actual, precio de liquidación
- **Mint DCSS:** form — ingresa ICP → preview de DCSS a recibir → confirmar (requiere II/Oisy conectado)
- **Burn DCSS:** form — ingresa DCSS → preview de ICP a recuperar → confirmar
- **Governance token:** supply total, tu balance, staking disponible (Próximamente)
- **Tabla de futures:** features en roadmap con fechas honestas y estado

| Feature | Estado | Fecha estimada |
|---------|--------|----------------|
| Mint/Burn básico | Beta | Ahora |
| Staking veDCSS | Desarrollo | Q3 2026 |
| Governance DAO | Planificado | Q4 2026 |
| Puente EVM (Wormhole) | Planificado | 2027 |
| Integración bancaria CLP | OPCIONAL — comunidad | Sin fecha |

---

## Lo que es real en beta

| Feature | Real / Simulado | Nota |
|---------|----------------|------|
| Conexión II | Real | Requiere URL desplegada (no iframe) |
| Conexión Oisy | Real | Requiere extensión instalada |
| Balance ICP | Real | Via canister |
| Precios tokens | Real | CoinGecko HTTP outcalls |
| Mint/Burn DCSS | Real en mainnet | En dev: UI completa, tx simulada |
| Activity feed | Vacío hasta tx real | — |
| Staking DCSS | Coming Soon | Q3 2026 |

---

## Archivos a crear/modificar

| Archivo | Acción |
|---------|--------|
| `src/backend/main.mo` | Reescribir con canister DCSS stablecoin + governance |
| `src/frontend/src/index.css` | Paleta monocromática |
| `src/frontend/src/contexts/WalletContext.tsx` | Solo II + Oisy via WalletAdapter |
| `src/frontend/src/adapters/iiAdapter.ts` | Internet Identity adapter |
| `src/frontend/src/adapters/oisyAdapter.ts` | Oisy adapter |
| `src/frontend/src/pages/DCSSTokenPage.tsx` | Página dedicada DCSS con mint/burn/stats |
| `src/frontend/src/pages/ProjectPage.tsx` | Sin CLP, foco DCSS Web3 manifesto |
| `src/frontend/src/components/DCSSHero.tsx` | Sin diagrama canvas, hero limpio |
| `src/frontend/src/components/WalletConnectModal.tsx` | Solo II + Oisy |
