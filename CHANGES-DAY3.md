# CIEDixlab — Cambios Day 3 · v3

## Fixes nesta versión

### 1) Slide 2 — foto de equipa adaptativa
- A foto agora usa `object-fit: contain` cunha caixa de aspect-ratio 1280/1015 (a mesma da imaxe).
- O texto úsase con tipografía máis compacta (0.74em) para que TODO o contido caiba na slide.
- Grid columns 1.05fr / 1fr con `align-items: center` (NON stretch).
- En mobile (≤900px), pasa a unha columna e ocupa o 80% do ancho.

### 2) Slide 8 — imaxes legais con nomes seguros
- `RGPD.png` → `rgpd.png`
- `AI_Act.png` → `aiact.png`
- `Lei2_2025.png` → `lei.png`
- Sen guións baixos nin maiúsculas para evitar problemas de copia / sistemas de ficheiros.

### 3) Slide 13 — thumbnail simplificada
- Substituído o `<div role="button">` por un `<a>` real apuntando á URL de YouTube.
- Se o JS funciona: clic intercéptase e cárgase iframe in-page con `autoplay=1`.
- Se o JS falla: o link funciona como fallback nativo (abre YouTube nunha nova lapela).
- O SVG de Play ten dimensións FIXAS en píxeles (120×120) con `!important` para evitar
  que regras globais o inflen.

### 4) Contador de slide na esquina inferior esquerda
- CSS reforzado con selectores de alta especificidade.
- Ademais, JavaScript aplica estilos inline directamente sobre o elemento
  con `setProperty(..., 'important')`, que sempre gana en especificidade.
- Re-aplícase tras cada cambio de slide.

## Estrutura do paquete

```
ciedix-pres/
├── index.html                          ← actualizado
├── js/app.js                           ← actualizado
├── css/custom-additions.css            ← actualizado (NON sobrescribe custom.css)
├── assets/ciedix/equipa.png            ← foto da equipa
├── assets/ciedix/logo-positivo-ciedix.jpg ← logo institucional CIEDix
├── assets/legal/rgpd.png               ← novo nome (era RGPD.png)
├── assets/legal/aiact.png              ← novo nome (era AI_Act.png)
└── assets/legal/lei.png                ← novo nome (era Lei2_2025.png)
```

## Como aplicalo

Sobreescribir os ficheiros encima do teu proxecto:

```bash
cd /media/ajimgar/PENDELLOUSB/Ponencias/IAEducativaDay3/Reveal.JS/ciedix-pres.v19
unzip -o /ruta/ao/zip.zip
# A opción -o sobreescribe sen preguntar.
```

**IMPORTANTE — limpar caché do navegador:**
- Hard refresh: Ctrl+Shift+R (Linux/Win) ou Cmd+Shift+R (Mac)
- Ou abre DevTools (F12) → Network → marca "Disable cache" → recarga

Se segues vendo problemas tras hard-refresh, abre DevTools → Console e dime
o que sale (erros 404, mensaxes en vermello, etc.).
