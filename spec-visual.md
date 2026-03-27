# DCSS Crypto Hub — Visual Spec

## Paleta y Tokens CSS

### Colores principales
- **Aquamarine/Teal**: `#00D4B8`, `#1DE9B6` — acento primario, badges "LIVE", links activos
- **ICP Blue**: `#29ABE2` — ICP network color
- **Bitcoin Orange**: `#F7931A` — Bitcoin network color
- **Polkadot Pink**: `#E6007A` — Polkadot network color
- **Cosmos Gray-Blue**: `#6F7390` — Cosmos network color
- **Celestia Purple**: `#7B2FBE` — Celestia network color
- **Rose Gold**: gradiente `#E8A090 → #C9748F → #D4A0C0` — botones Buy/Send/Swap
- **Hub Dark**: `#0F1513`, `#141414` — fondo de hubs/cards

### Variables CSS clave
```css
--bg-claro: url('/assets/uploads/claro_full-019d2e07-845d-77ea-a30e-3578063f9192-1.png');
--bg-midnight: url('/assets/uploads/fondos_cielo-019d2e0d-11ac-7427-a835-25a16d69ba7d-2.png');
--accent: #00D4B8;
--hub-bg: #141414;
```

## Tipografía
- **Display / Hábitos**: Bricolage Grotesque (Google Fonts) — titulares grandes, hero, token names
- **Mono / Precios**: Geist Mono (Google Fonts) — precios, balances, addresses, badges LIVE
- **Body**: System UI / -apple-system como fallback

## Fondos y Texturas

### Body background
- **Modo Claro**: imagen amanecer (`claro_full-...png`), `background-size: cover`, `background-attachment: fixed`, `background-position: center top`. Temperatura cálida, tonos dorados/crema.
- **Modo Midnight**: imagen aurora boreal (`fondos_cielo-...png`) con overlay `rgba(5, 10, 20, 0.7)`. Temperatura fría, tonos azul/verde.
- Toggle: botón sol/luna en Navbar (32px, icon-only).

### Hubs / Cards
- Fondo siempre oscuro (`#141414` o similar), no cambia con el tema del body
- Border: `1px solid rgba(255,255,255,0.08)` — sutil separación
- Border-radius: `12px`

### Banners de red (NetworkBanner)
Cada red tiene un gradiente temático en la parte superior del banner (imagen de fondo o CSS gradient), que se funde con el texto vía overlay `linear-gradient(to right, dark 35% → transparent)`:

| Red | Paleta | Concepto visual |
|-----|--------|-----------------|
| Bitcoin | Naranja/dorado | Planeta dorado en el horizonte, anillos orbitales |
| Polkadot | Rosa/magenta | Montañas cósmicas, aurora magenta |
| Ethereum | Azul/violeta | Nebulosa azul-violeta, ondas plasma |
| Solana | Verde/teal | Aurora boreal sobre océano cristal |
| Cosmos | Azul profundo | Nebulosa espiral intergaláctica |
| Celestia | Púrpura/lila | Cielo celestial con esferas de datos flotantes |
| ICP | Violeta/cyan | Red neuronal digital |
| Avalanche | Rojo/blanco | Volcán en erupción, planeta helado |
| Bittensor | Verde/cyan | Cerebro digital bioluminiscente |
| Cardano | Azul oscuro | Océano alien, plataformas flotantes |

## Logos de tokens
- Fuente: CoinGecko CDN (`https://assets.coingecko.com/coins/images/{id}/small/{name}.png`)
- Renderizar con `<img>` + fallback a círculo de color con letra del símbolo
- Tamaño: `w-8 h-8 rounded-full object-cover`
- Tokens sin logo oficial (DCSS, CLP): círculo de color con letra inicial

## Efectos visuales
- **Glows**: reducidos al mínimo (accesibilidad). Solo en badges activos y hover de hubs.
- **Sombras**: `box-shadow: 0 2px 8px rgba(0,0,0,0.3)` en cards
- **Hover en hubs**: `border-color` sube a `rgba(255,255,255,0.15)`, sombra leve
- **Badge LIVE**: fondo `#00D4B8` con texto negro, font Geist Mono, pulsación sutil

## Por componente

### Navbar
- Fondo oscuro siempre (`#0F1513`)
- Logo DCSS con "C" en badge dorado, texto blanco
- Tabs activos: acento aquamarine con underline
- Botón "Connect Wallet": verde esmeralda (#00D4B8) o variante
- Botón tema sol/luna: icon-only, 32px, junto al Connect Wallet

### NetworkBanner (hub)
- Alto reducido (~80px cuando colapsado, ~160px cuando expandido)
- Logo oficial del token principal a la izquierda
- Gradiente temático en zona superior derecha del banner
- Badge contador de tokens en esquina derecha

### TokenCard (dentro de hub)
- Fila compacta con logo + nombre + precio + balance
- Botones Buy/Send/Swap en rose gold gradient
- Bridge en blanco/borde

### Hero (Dashboard)
- Título grande en Bricolage Grotesque
- Stats row debajo con precios en tiempo real
- Fondo negro/hub

### Footer
- Oscuro, minimalista, sin textura
