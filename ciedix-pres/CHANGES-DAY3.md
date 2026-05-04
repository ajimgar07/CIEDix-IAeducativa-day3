# CIEDixlab — Cambios Day 3

Paquete con os cambios solicitados aplicados sobre a presentación CIEDixlab.

## Como aplicalo

Este zip está pensado para **superpoñerse á túa carpeta `ciedix-pres/` existente**.
Os ficheiros que xa tiñas de antes (CSS base con fontes XuntaSans, vendor de Reveal,
logos institucionais, fontes, QRs, fotos de hardware…) **non se tocan**.

```bash
# Desde a raíz do teu proxecto, sobreescribe co contido deste paquete:
cp -r ciedix-pres/* /ruta/ao/teu/ciedix-pres/
```

## Que cambia

| Ficheiro                           | Estado    | Descrición |
|------------------------------------|-----------|------------|
| `index.html`                       | **Substituído** | 26 slides cos cambios baked-in |
| `js/app.js`                        | **Substituído** | + `activateVideoThumbnails()` chamado tras `deck.initialize()` |
| `css/custom-additions.css`         | **Novo**  | Engadidos CSS para todos os cambios. Cargase tras `custom.css` |
| `assets/ciedix/logo-positivo-ciedix.jpg` | **Novo**  | Logo CIEDix institucional (slides 2 e 13) |
| `assets/legal/RGPD.png`            | **Novo**  | Substitúe `rgpd.png` antigo (slide 8) |
| `assets/legal/AI_Act.png`          | **Novo**  | Substitúe `aiact.png` antigo (slide 8) |
| `assets/legal/Lei2_2025.png`       | **Novo**  | Substitúe `lei.png` antigo (slide 8) |

## Que NON cambia (quedará como xa o tes)

- `css/custom.css`  — todo o sistema de estilos base (fontes XuntaSans embebidas, layout, responsive, etc.)
- `vendor/`         — Reveal.js, plugins, qrcode-svg, react
- `assets/bg.png`, `assets/cover.png`, `assets/logo.png`, `assets/voice-config.png`
- `assets/logo-ciedix.png` (franxa institucional)
- `assets/fonts/`, `assets/qr/`, `assets/cloud/`, `assets/hw/`

## Resumo dos cambios por slide

1. **Slide 2** — QR substituído por logo institucional. A palabra **CIEDix** enlaza a `ciedix.edu.xunta.gal/` (GL) e `/es` (ES). Logo coa altura completa do bloque de texto, sen deformación.
2. **Slide 8** — Tres imaxes legais novas: `RGPD.png`, `AI_Act.png`, `Lei2_2025.png`.
3. **Slide 13** — Thumbnail click-to-play co logo do CIEDix + icona Play SVG centrada. Ao premer (clic ou Enter/Espazo), substitúese por iframe co vídeo en `autoplay`.
4. **Slide 15** — Engadida caixa `.piper-note` explicando que é Piper (TTS libre, neural, 100 % local).
5. **Slide 16** — Dúas versións do diagrama SVG: `lang-gl` e `lang-es`. Aliméntase do sistema CSS `html[lang]` xa existente.
6. **Slide 17** — Imaxe `voice-config.png` pode desbordar visualmente sobre a franxa institucional inferior (`z-index: 20` por enriba do `z-index: 10` da franxa).
7. **Global** — Contador de slides (`c/t`) reposicionado á esquina inferior esquerda, en branco sobre fondo escuro semitransparente.

## Antes de presentar

Recorda persoalizar (xa estaba na túa lista de tarefas previa):

- `data-video-src` do iframe de YouTube na slide 13 (xa apunta a `EZMbSYQkK6Y`).
- Iframes placeholder (`dQw4w9WgXcQ`) nas slides 15 e 22.
- URLs e QRs do formulario Nextcloud (slides 11 e 25) e LinkedIn (slide 26).

## Comprobación rápida

```bash
cd ciedix-pres
python3 -m http.server 8000
# Abrir http://localhost:8000 e verificar:
# - Slide 2: logo CIEDix á dereita, palabra "CIEDix" enlazada
# - Slide 8: as 3 imaxes legais novas
# - Slide 13: thumbnail con Play; clic → vídeo
# - Slide 15: caixa "¿Que é Piper?" con bordo rosa
# - Slide 16: alternar GL/ES → diagrama enteiro cambia
# - Slide 17: imaxe estendida abaixo, sobre a franxa
# - Esquina inferior esquerda: contador 1/26, 2/26…
```
