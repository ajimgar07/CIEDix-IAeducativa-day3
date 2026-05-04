# CIEDixlab — Innovación e Soberanía Dixital

Presentación para a charla sobre IA no ámbito educativo galego.
Reveal.js · bilingüe GL/ES · responsive · totalmente autocontida.

**25 slides · tipografía institucional XuntaSans · cero dependencias de rede.**

---

## Estrutura de ficheiros

```
ciedix-pres/
├── index.html               ← arquivo principal (25 slides)
├── css/custom.css           ← estilos, layout, responsive, @font-face
├── js/app.js                ← conmutador idioma, QR, matriz LLMs
├── assets/
│   ├── bg.png               ← fondo institucional
│   ├── cover.png            ← fondo portada/contraportada
│   ├── logo.png             ← logo persoal (esquina inf. esquerda)
│   ├── voice-config.png     ← captura Moodle · Asistente de Voz
│   └── fonts/
│       ├── XuntaSans-Regular.woff2
│       ├── XuntaSans-Italic.woff2
│       ├── XuntaSans-Bold.woff2
│       ├── XuntaSans-BoldItalic.woff2
│       ├── XuntaSansMono-Regular.woff2
│       ├── XuntaSansMono-Bold.woff2
│       └── LicenzaXuntaSans.pdf
└── vendor/
    ├── reveal/              ← Reveal.js 5.x + plugins
    ├── qrcode/              ← qrcode-svg
    └── react/               ← React 18 + htm (dispoñibles para extensións)
```

---

## Como probar en local

**IMPORTANTE:** NON abrir `index.html` directamente no navegador (URL `file://...`).
Os fondos, as fontes e o iframe de Reveal requiren servidor HTTP. Ademais, o navegador
con `file://` aplica políticas CORS estritas que poden facer que as fontes non carguen
e o layout se rompa.

```bash
cd ciedix-pres
python3 -m http.server 8000
# abrir http://localhost:8000
```

Se non tes Python 3:
- Node.js: `npx serve`
- PHP: `php -S localhost:8000`
- Ou calquera servidor HTTP estático.

### Por que unha ventá en modo vertical se ve distinta

Reveal.js escala a presentación (1920×1080) para que caiba no viewport do navegador.
Nunha ventá en modo paisaxe grande, a slide énchea por completo. Nunha ventá vertical
ou cadrada, a slide conserva a súa proporción 16:9 e queda centrada cunha banda gris
por enriba e debaixo. Isto é comportamento normal de Reveal, non un erro.

### Atallos útiles de Reveal.js

| Tecla    | Acción                                |
|----------|---------------------------------------|
| `→ ←`    | Seguinte / anterior                   |
| `Esc / o`| Vista xeral (overview)                |
| `s`      | Vista do ponente (speaker notes)      |
| `f`      | Pantalla completa                     |
| `b`      | Pausar (pantalla negra)               |
| `?`      | Axuda                                 |

---

## Orde da presentación (26 slides)

```
 1. Portada
 2. CIEDix · web embebida
 3. I+D+i · CIEDix
 4. CIEDixlab · dúas vertentes (cloud + local)
 5. Cloud · servizos contratados (Google / AWS / Azure)
 6. Local · máquinas (Beast, DGX Spark, Jetson)
 7. Filosofía · ecosistema comparativo
 8. Marco normativo (RGPD · AI Act · Lei 2/2025)
 9. Matriz de cumprimento · 11 LLMs avaliados
10. Constatacións · que aprendemos até hoxe
────────────────────────────────────────────────
11. 🔔 PREGUNTAS DO PÚBLICO · QR activado
    A partir daquí, QR pequeno permanente na esquina
    superior dereita de todas as slides seguintes.
────────────────────────────────────────────────
12. Tres exemplos · intro
13. Exemplo cloud · vídeo YouTube
14. Bisagra · soberanía dixital vs cloud
15. Exemplo local · asistente de voz
16. Esquema de configuración do plugin
17. Configuración Moodle · bloque Asistente de Voz
18. Local · innovación + soberanía
19. Local · atención á diversidade
20. Datasets · pipeline de xeración
21. Datasets · ¿por que este esforzo?
22. Datasets · vídeo do proceso
23. AMTEGA · colaboración interinstitucional
24. Créditos · uso de IA neste traballo
25. Miña pregunta ao público · QR
26. Contraportada · GRAZAS + LinkedIn
```

**Mudanza respecto á estrutura inicial:** as preguntas do público foron adiantadas á slide 11 (xusto tras as constatacións e antes dos exemplos), para que o público poida formular preguntas mentres se presentan os exemplos. O QR flotante superior-dereito acompaña todas as slides posteriores.

---

## Personalización antes da ponencia

### 1 · URL do formulario Nextcloud (preguntas do público)

Abre `index.html` e localiza preto do principio:

```js
window.CIEDIX_QUESTIONS_URL = 'https://xyz.gal';
```

Substitúe pola URL real. Este QR aparece:

- **Grande** na slide 11 (`slide-audience-questions`).
- **Pequeno e persistente** na esquina superior dereita de **todas as slides 12-25**.

### 2 · URLs dos vídeos de YouTube

Tres iframes de vídeo apuntan a un placeholder (`dQw4w9WgXcQ`). Buscar e substituír:

```html
<iframe src="https://www.youtube.com/embed/TEU_VIDEO_ID" ...>
```

Ocorrencias:
- Slide 13 `slide-cloud-example` — demo modelo cloud
- Slide 15 `slide-local-example` — demo asistente local
- Slide 21 `slide-datasets-video` — proceso de xeración de datasets

### 3 · URL da pregunta propia (slide 24)

Slide `slide-my-question`, dúas referencias a `https://xyz.gal`:
- QR: `data-qr-url="https://xyz.gal"`
- URL visible: `<span class="url">https://xyz.gal</span>`

### 4 · URL de LinkedIn (slide 25)

Verifica `data-qr-url="https://www.linkedin.com/in/alfonso-jimenez-garcia/"`.

### 5 · Logo persoal (opcional)

Se prefires retiralo, en `css/custom.css` engade `display: none;` a `.custom-logo`.
**Nota importante:** o logo persoal está só á esquerda. O logo institucional do CIEDix do fondo queda **sempre visible** porque `--pad-strip` (180px) reserva espazo inferior en todas as slides.

### 6 · Iframe do CIEDix (slide 2)

Se `ciedix.edu.xunta.gal` bloquea embedding (`X-Frame-Options`):

1. Captura de pantalla → `assets/ciedix-web.png`
2. Substituír `<iframe>` por `<img src="assets/ciedix-web.png" class="screenshot">`

---

## Formulario Nextcloud para preguntas do público

Na túa instancia:

1. **Instalar** a app *Forms* (Apps → Office & text → Forms → Enable).
2. **Crear** un formulario:
   - Título: `Preguntas · Ponencia CIEDixlab`
   - Descrición: `Fai a túa pregunta aquí · Haz tu pregunta aquí`
   - Unha pregunta: **Long answer**, etiquetada `A túa pregunta / Tu pregunta`, non obrigatoria.
3. **Configuración**:
   - Sen expiración (ou a data do día seguinte).
   - *Allow multiple submissions* activado.
   - Acceso *Anyone with the link*.
4. Copiar o *Share link* e pegalo en `window.CIEDIX_QUESTIONS_URL`.
5. **Durante a ponencia:** abre o panel *Responses* nunha segunda xanela/tableta para ir vendo as preguntas en vivo. O refresco de Nextcloud Forms é manual; se queres polling automático instala a app *Forms → Results auto-refresh* ou abre o panel noutro dispositivo coa páxina recargando cada pouco.

**Nota:** ningún dato sae da túa infraestrutura. Coherente co discurso da ponencia.

---

## Exportar a PDF (respaldo)

Reveal.js ten modo impresión:

```
http://localhost:8000/?print-pdf
```

Ctrl+P → *Save as PDF* · Layout *Landscape* · Margins *None* · Background graphics ✓

**Limitación:** vídeos e iframes non se renderizan; útil só como backup.

---

## Responsive

- **Escritorio (≥1200px):** layout completo con columnas.
- **Tablet (900–1200px):** escalado proporcional.
- **Móbil vertical (≤900px):** columnas a unha soa, tipografía reducida, QRs máis pequenos.
- **Móbil horizontal:** aínda máis compacto.

A portada reaxusta o rectángulo do título segundo pantalla, mantendo sempre a relación cos dous ángulos rectos do fondo.

---

## Conmutador de idioma

Esquina superior esquerda: botón **GL / ES**. Persiste en `localStorage`.
Todo o texto duplícase con `.lang-gl` e `.lang-es`:

```html
<p>
    <span class="lang-gl">Texto en galego</span>
    <span class="lang-es">Texto en castelán</span>
</p>
```

---


## Tipografía

**XuntaSans** (institucional da Xunta de Galicia) cargada localmente:
- Regular 400 / Italic 400 / Bold 700 / BoldItalic 700
- XuntaSansMono Regular e Bold (para metadatos, captions e chips)

Conversión de XuntaSansMono de OTF a WOFF2 feita co paquete `fonttools`. A licenza `LicenzaXuntaSans.pdf` inclúese en `assets/fonts/`.

---

## Dependencias (todo local)

| Paquete        | Versión | Licenza |
|----------------|---------|---------|
| reveal.js      | 5.x     | MIT     |
| qrcode-svg     | 1.x     | ISC     |
| React + htm    | 18.x    | MIT     |
| XuntaSans      | 1.0     | Ver LicenzaXuntaSans.pdf |

**Ningunha chamada a CDN durante a presentación.** Funciona offline.

---

## Problemas coñecidos

**Iframe do CIEDix en branco** → bloqueo `X-Frame-Options`. Sustituír por captura (ver punto 6).

**Tipografía non carga** → verificar que `assets/fonts/*.woff2` están accesibles. Se fallan, fallback a Helvetica/Arial definido en `--f-display`.

**QR flotante non aparece nas slides finais** → `window.CIEDIX_QR_FROM_SLIDE_ID` debe coincidir cun id de slide. Por defecto `slide-audience-questions` (slide 11).

**Vídeos de YouTube non cargan sen rede** → descargar MP4 e substituír por `<video>` local.

---

## Contacto

Alfonso Jiménez García · CIEDix · Consellería de Educación, Ciencia, Universidades e FP · Xunta de Galicia.
alfonso.jimenez.garcia@xunta.gal
alfonso.jimenez.garcia@edu.xunta.gal
