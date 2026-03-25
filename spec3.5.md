# DCSS Crypto Hub — Spec Fase 3.5

> **Referencia:** spec3.md es el baseline. Este archivo documenta SOLO el plan de deployment a mainnet/testnet.
> **Estado:** PLANIFICADO — no requiere cambios de código.

---

## Objetivo

Desplegar el canister de DCSS a ICP mainnet para que funcionen:
- Staking backend (neuronas, rewards, dissolve)
- Activity feed persistido on-chain
- Internet Identity real
- CoinGecko HTTP outcalls reales (sin sandboxing de desarrollo)

---

## Preguntas frecuentes

### ¿Se puede bajar la app una vez publicada?
**Sí.** En ICP mainnet el controlador del canister puede:
- `dfx canister stop --network ic dcss_backend` → pausa el canister (no acepta llamadas)
- `dfx canister delete --network ic dcss_backend` → elimina permanentemente

El frontend (asset canister) también se puede detener o actualizar en cualquier momento.

### ¿Se puede probar sin ser pública?
**Sí, de dos formas:**
1. **URL de Caffeine Draft** — el draft actual ya es una URL real en ICP pero no está indexada ni es pública. Cualquiera con el link puede acceder, pero no aparece en buscadores.
2. **Canister propio en mainnet sin publicitar** — despliegas a mainnet, usas la URL del canister (`https://<canister-id>.icp0.io`) sin compartirla. La app es real y funciona, pero nadie la encuentra a menos que tengas el link.

No existe modo "privado" con contraseña en ICP por defecto, pero puedes agregar autenticación con Internet Identity para proteger rutas.

### ¿Cuánto cuesta?
| Recurso | Costo estimado |
|---------|---------------|
| Ciclos iniciales backend | ~$5–10 USD en ICP |
| Ciclos asset canister (frontend) | ~$2–5 USD |
| Operación mensual (tráfico normal) | < $1 USD |

---

## Pasos para deploy a ICP mainnet (desde Caffeine)

> Caffeine maneja el deploy automático. Estos pasos son para cuando quieras operar el canister directamente.

### Opción A — Via Caffeine (recomendado)
1. En el panel de Caffeine, hacer clic en "Publish to Mainnet"
2. Caffeine despliega ambos canisters (backend + asset) en ICP mainnet
3. Recibes la URL pública: `https://<canister-id>.icp0.io`
4. Listo — staking real, Internet Identity real, precios reales

### Opción B — Via dfx (control total)
```bash
# 1. Instalar dfx
sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"

# 2. Crear identidad con fondos
dfx identity new dcss-deployer
dfx identity use dcss-deployer

# 3. Comprar ciclos (necesitas ICP en esa identidad)
# Transferir ICP → cycles via NNS o exchange

# 4. Deploy
dfx deploy --network ic

# 5. Ver canister IDs
dfx canister id --network ic dcss_backend
dfx canister id --network ic dcss_frontend
```

---

## Modificar la app una vez en mainnet

### ¿Cómo actualizo el código?
```bash
# Opción A — Desde Caffeine
# Hacer cambios en el editor → Deploy → "Update Mainnet"

# Opción B — Via dfx
dfx deploy --network ic          # actualiza ambos canisters
dfx deploy --network ic dcss_backend   # solo backend
dfx deploy --network ic dcss_frontend  # solo frontend
```

Cada actualización es instantánea. No hay downtime perceptible (ICP hace upgrade atómico del canister).

### ¿Puedo modificar mientras está al aire?
**Sí.** El flujo recomendado es:
1. Hacer cambios en desarrollo (Caffeine draft)
2. Probar en el draft (URL privada)
3. Cuando esté correcto, hacer "Deploy to Mainnet" desde Caffeine
4. La app live se actualiza en segundos

### ¿Puedo hacer rollback?
No hay rollback automático en ICP. Para volver a una versión anterior:
- Mantén el código en Git con tags por versión
- Redespliega el tag anterior con `dfx deploy --network ic`

---

## Variables de entorno por red

```typescript
// src/frontend/src/config.ts
const IS_MAINNET = process.env.DFX_NETWORK === "ic";

export const CONFIG = {
  coingeckoBaseUrl: IS_MAINNET
    ? "https://api.coingecko.com/api/v3"
    : "https://api.coingecko.com/api/v3",
  icpHost: IS_MAINNET
    ? "https://ic0.app"
    : "http://localhost:4943",
  internetIdentityUrl: IS_MAINNET
    ? "https://identity.ic0.app"
    : "http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943",
};
```

---

## CI/CD recomendado (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to ICP Mainnet
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Install dfx
        run: sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
      - name: Deploy
        env:
          DFX_IDENTITY_KEY: ${{ secrets.DFX_IDENTITY_KEY }}
        run: |
          echo "$DFX_IDENTITY_KEY" > identity.pem
          dfx identity import deployer identity.pem
          dfx identity use deployer
          dfx deploy --network ic
```

---

## Testnet (Playground)

ICP tiene un entorno "playground" gratuito para testing:
```bash
dfx deploy --playground
```
Esto despliega a canisters temporales en mainnet (se borran solos en ~20 min).
Sirve para probar Internet Identity real, staking, etc. sin gastar ciclos.

---

## Pendiente post-deploy mainnet

- [ ] Configurar dominio custom (ej: dcss.app) via Boundary Nodes ICP
- [ ] Activar logging con `ic-logger`
- [ ] Monitoreo de ciclos (alerta cuando bajen de umbral)
- [ ] Canister settings: freezing threshold, controller backup
