# DCSS Crypto Hub — Fase 3 Completion

## Current State
Draft v32. Backend DCSS canister done, WalletAdapter with II + Oisy + Keplr, themed banner CSS gradients per network, white body background, compact hubs. Token logos use emoji/colored circles. Oisy still tries to detect Chrome extension before falling back to oisy.com. No Claro/Midnight toggle.

## Requested Changes (Diff)

### Add
- Claro/Midnight theme toggle button in Navbar (sun/moon icon). Claro = body uses sunrise image background (`/assets/uploads/claro_full-019d2e07-845d-77ea-a30e-3578063f9192-1.png`). Midnight = body uses aurora borealis night image (`/assets/uploads/fondos_cielo-019d2e0d-11ac-7427-a835-25a16d69ba7d-2.png`). Both modes preserve dark hubs/cards.
- `logoUrl` field to `TokenMeta` (CoinGecko CDN URLs for each token)
- `spec-visual.md` and `spec-visual-motion.md` doc files

### Modify
- **Oisy adapter**: Remove all extension detection logic and Chrome Web Store URL. New behavior: clicking Oisy always opens `https://oisy.com` in a new tab (no popup, no ICRC-25). Update WalletConnectModal Oisy button to open oisy.com directly.
- **NetworkBanner & TokenCard**: Use `<img src={token.logoUrl}>` with fallback to colored circle. Logos from CoinGecko CDN: `https://assets.coingecko.com/coins/images/{id}/small/{filename}.png`
- **App.tsx**: Add theme state (claro | midnight). Pass to body via class or CSS variable. Claro mode: body background-image set to sunrise image, body background-color warm cream. Midnight mode: body background-image set to aurora image, body background-color dark navy.

### Remove
- `getOisyInstallUrl()` function and browser detection logic for Oisy
- Chrome Web Store install URL from oisyAdapter

## Implementation Plan
1. Fix Oisy in WalletContext.tsx — adapter opens oisy.com directly
2. Fix WalletConnectModal.tsx — Oisy button opens oisy.com directly
3. Add logoUrl to tokens.ts for all ~40 tokens
4. Update NetworkBanner.tsx to render `<img>` logo with fallback
5. Add ThemeContext or theme state in App.tsx with toggle in Navbar.tsx
6. Apply background images to body/root based on theme
7. Write spec-visual.md and spec-visual-motion.md
