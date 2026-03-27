# DCSS Crypto Hub — Visual Motion Spec

## Filosofia
- **Función primero**: las animaciones comunican estado, no son decorativas
- **Velocidades**: fast (150ms), normal (250ms), slow (400ms)
- **Easing**: `ease-out` para entradas, `ease-in-out` para transiciones de estado
- **Reduced motion**: todas las animaciones respetan `prefers-reduced-motion: reduce`

## Transiciones de tema (Claro/Midnight)
- La imagen de fondo del body hace crossfade en `400ms ease-in-out`
- Los hubs/cards no se ven afectados (fondos fijos)
```css
body {
  transition: background-image 400ms ease-in-out, background-color 400ms ease-in-out;
}
```

## Animaciones de entrada

### NetworkBanner (hub)
- Entrada: `opacity 0 → 1` + `transform: translateY(8px) → translateY(0)` en 250ms
- Stagger por hub: delay de 50ms entre cada hub
- Solo en carga inicial, no en re-renders

### TokenCard (dentro de hub al expandir)
- Expansión del hub: `max-height` transition en 300ms ease-out
- Token cards: fade in en cascada (stagger 30ms) al expandir

### Badge LIVE
- Pulso sutil: escala `1.0 → 1.05 → 1.0` en 2s loop
```css
@keyframes live-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}
.badge-live { animation: live-pulse 2s ease-in-out infinite; }
```

## Hover states

### NetworkBanner (hub card)
- `border-color` transition: 150ms
- Ligero `box-shadow` glow en el color de la red: 150ms
- No transform (mantiene layout estable)

### Botones (Connect Wallet, Buy, Bridge)
- `filter: brightness(1.1)` en hover: 150ms
- `transform: scale(1.02)` en hover: 150ms
- No transform en activo/pressed (feedback inmediato)

### Tabs del Navbar
- Underline indicator desliza horizontalmente entre tabs: 200ms ease-out
- Color del texto: 150ms

## Loading states

### Precio en vivo (badge LIVE)
- Spinner compacto de 12px mientras carga, reemplazado por el precio cuando llega
- Si el fetch falla: muestra `—` en gris, sin spinner infinito

### Balance de wallet
- Skeleton de 60px ancho mientras carga
- Desaparece y muestra el valor real sin animación extra

### Conexión de wallet
- Botón muestra spinner + "Conectando..." mientras espera la extensión
- Si tarda más de 10s: muestra error toast

## Micro-interacciones

### Botón tema (sol/luna)
- Rotación 360° del icono al cambiar tema: 400ms ease-in-out
- Cambio de icono (sun ↔ moon) mid-rotation

### Modal de wallet
- Entrada: `opacity 0 → 1` + `scale 0.95 → 1.0`: 200ms
- Salida: `opacity 1 → 0` + `scale 1.0 → 0.95`: 150ms
- Overlay: fade in/out 200ms

### Toast notifications
- Entrada desde abajo: `translateY(20px) → 0` en 250ms
- Auto-dismiss: fade out en 200ms después del timeout

## Reglas de accesibilidad
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```
- Todas las animaciones de entrada deben tener esta excepción
- Los pulsos (badge LIVE) se deshabilitan en reduced-motion
