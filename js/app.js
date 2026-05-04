/* ========================================================================
   CIEDixlab · app.js  (v3 · day-3 fixes)
   - Conmutador de idioma
   - QR flotante (slide audience-questions en adiante)
   - Matriz de cumprimento LLMs
   - Click-to-play para thumbnails de vídeo (slide 13)
   - Forzar posición do contador de slides en abaixo-esquerda
   - Inicialización de Reveal
   ======================================================================== */

(function () {
    'use strict';

    /* --- localStorage seguro (non rompe en file://) -------------------- */
    const LANG_STORAGE = 'ciedix-pres-lang';
    const safeStorage = {
        get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
        set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} },
    };

    function setLang(lang) {
        document.documentElement.lang = lang;
        safeStorage.set(LANG_STORAGE, lang);
        document.querySelectorAll('#lang-switcher button').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang);
        });
        if (window.Reveal) window.Reveal.layout();
    }

    const initialLang = safeStorage.get(LANG_STORAGE) || 'gl';
    document.documentElement.lang = initialLang;

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('#lang-switcher button').forEach(b => {
            b.addEventListener('click', () => setLang(b.dataset.lang));
        });
        setLang(initialLang);
    });

    /* --- QR flotante: visible a partir da slide 12 ---------------- */
    function updateQRVisibility(event) {
        const qr = document.getElementById('questions-qr');
        if (!qr) return;
        const current = event.currentSlide;
        if (!current) return;

        if (current.dataset.hideQr === 'true') {
            qr.classList.remove('visible');
            return;
        }

        const triggerEl = document.getElementById('slide-examples-intro');
        if (!triggerEl) return;

        const allSections = Array.from(document.querySelectorAll('.reveal .slides > section'));
        const triggerIdx = allSections.indexOf(triggerEl);
        const currentIdx = allSections.indexOf(current);
        qr.classList.toggle('visible', triggerIdx >= 0 && currentIdx >= triggerIdx);
    }

    /* --- Click-to-play para thumbnails de vídeo (.video-thumb) ---------
       Opción A: ao premer ábrese YouTube nunha nova lapela.
       Mantemos a thumbnail visible para que o presentador poida volver á
       slide cun Alt+Tab sen perder o seu sitio.
       --------------------------------------------------------------- */
    function activateVideoThumbnails() {
        const thumbs = document.querySelectorAll('.video-thumb[data-video-id]');

        thumbs.forEach(thumb => {
            if (thumb.dataset.activated === 'true') return;
            thumb.dataset.activated = 'true';

            // Asegurarnos de que abre en nova lapela
            thumb.setAttribute('target', '_blank');
            thumb.setAttribute('rel', 'noopener');
        });
    }

    /* --- Forzar posición do contador de slide en abaixo-esquerda -------
       O contador de Reveal renderízase con CSS que ás veces non se pode
       sobrescribir só desde unha folla externa. Aplicamos estilo inline
       directamente sobre o elemento (sempre gana en especificidade).
       --------------------------------------------------------------- */
    function forceSlideNumberPosition() {
        const sn = document.querySelector('.reveal .slide-number');
        if (!sn) return;

        // setProperty con 'important' supera calquera regra CSS externa
        const props = {
            position: 'fixed',
            top: 'auto',
            right: 'auto',
            bottom: '12px',
            left: '16px',
            inset: 'auto auto 12px 16px',
            background: 'rgba(0, 0, 0, 0.55)',
            color: '#ffffff',
            'font-family': "'XuntaSansMono', 'Menlo', 'Consolas', monospace",
            'font-size': '13px',
            'font-weight': '700',
            'letter-spacing': '0.06em',
            padding: '5px 12px',
            'border-radius': '999px',
            'z-index': '30',
            'pointer-events': 'auto',
            'line-height': '1.2',
            margin: '0',
            width: 'auto',
            height: 'auto',
        };
        Object.entries(props).forEach(([k, v]) => sn.style.setProperty(k, v, 'important'));
    }

    /* --- Matriz de cumprimento LLMs ----------------------------------- */
    const COMPLIANCE_DATA = [
        { model: 'Mistral 7B',        provider: 'Mistral AI',   loc: 'EU (Francia)', gdpr: 'ok',    aiact: 'ok',    decision: 'ok',    label_gl: 'APROBADO',        label_es: 'APROBADO' },
        { model: 'Mistral-Small 3.1', provider: 'Mistral AI',   loc: 'EU (Francia)', gdpr: 'ok',    aiact: 'ok',    decision: 'ok',    label_gl: 'APROBADO',        label_es: 'APROBADO' },
        { model: 'Granite 3.3',       provider: 'IBM',          loc: 'US',           gdpr: 'ok',    aiact: 'ok',    decision: 'ok',    label_gl: 'APROBADO',        label_es: 'APROBADO' },
        { model: 'Gemma 3n',          provider: 'Google',       loc: 'US',           gdpr: 'ok',    aiact: 'ok',    decision: 'warn',  label_gl: 'A VERIFICAR',     label_es: 'A VERIFICAR' },
        { model: 'Phi 4',             provider: 'Microsoft',    loc: 'US',           gdpr: 'ok',    aiact: 'ok',    decision: 'warn',  label_gl: 'A VERIFICAR',     label_es: 'A VERIFICAR' },
        { model: 'Llama 3.3',         provider: 'Meta',         loc: 'US',           gdpr: 'warn',  aiact: 'warn',  decision: 'warn',  label_gl: 'ALTO RISCO',      label_es: 'ALTO RIESGO' },
        { model: 'Llama 3.1 · 70B',   provider: 'Meta',         loc: 'US',           gdpr: 'warn',  aiact: 'ko',    decision: 'warn',  label_gl: 'RISCO SISTÉMICO', label_es: 'RIESGO SISTÉMICO' },
        { model: 'Llama 3.2',         provider: 'Meta',         loc: 'US',           gdpr: 'ko',    aiact: 'ko',    decision: 'ko',    label_gl: 'EXCLUÍDO · UE',   label_es: 'EXCLUIDO · UE' },
        { model: 'DeepSeek R1',       provider: 'DeepSeek',     loc: 'China',        gdpr: 'ko',    aiact: 'ko',    decision: 'ko',    label_gl: 'EXCLUÍDO',        label_es: 'EXCLUIDO' },
        { model: 'Qwen 3',            provider: 'Alibaba',      loc: 'China',        gdpr: 'warn',  aiact: 'warn',  decision: 'warn',  label_gl: 'ALTO RISCO',      label_es: 'ALTO RIESGO' },
        { model: 'Cogito',            provider: 'Deep Cogito',  loc: 'US',           gdpr: 'review',aiact: 'review',decision: 'review',label_gl: 'SEN DOC.',        label_es: 'SIN DOC.' },
    ];

    function cellIcon(state) {
        switch (state) {
            case 'ok':     return '<span class="badge ok">✓</span>';
            case 'warn':   return '<span class="badge warn">⚠</span>';
            case 'ko':     return '<span class="badge ko">✗</span>';
            case 'review': return '<span class="badge review">?</span>';
            default:       return '';
        }
    }

    function renderComplianceMatrix() {
        const target = document.getElementById('compliance-matrix');
        if (!target) return;
        const rows = COMPLIANCE_DATA.map(r => `
            <tr>
                <td><strong>${r.model}</strong></td>
                <td>${r.provider}</td>
                <td>${r.loc}</td>
                <td>${cellIcon(r.gdpr)}</td>
                <td>${cellIcon(r.aiact)}</td>
                <td>
                    <span class="badge ${r.decision} lang-gl">${r.label_gl}</span>
                    <span class="badge ${r.decision} lang-es">${r.label_es}</span>
                </td>
            </tr>`).join('');

        target.innerHTML = `
            <table class="compliance-table">
                <thead>
                    <tr>
                        <th><span class="lang-gl">Modelo</span><span class="lang-es">Modelo</span></th>
                        <th><span class="lang-gl">Provedor</span><span class="lang-es">Proveedor</span></th>
                        <th><span class="lang-gl">Localización</span><span class="lang-es">Localización</span></th>
                        <th>RGPD</th>
                        <th>AI Act</th>
                        <th><span class="lang-gl">Decisión</span><span class="lang-es">Decisión</span></th>
                    </tr>
                </thead>
                <tbody>${rows}</tbody>
            </table>
            <div class="compliance-caption">
                <span class="lang-gl">Fonte: revisión interna CIEDixlab</span>
                <span class="lang-es">Fuente: revisión interna CIEDixlab</span>
            </div>`;
    }

    /* --- Reveal init -------------------------------------------------- */
    function initReveal() {
        const deck = new Reveal({
            hash: false,
            controls: true,
            progress: true,
            slideNumber: 'c/t',
            history: false,
            keyboard: true,
            overview: true,
            center: false,
            touch: true,
            loop: false,
            rtl: false,
            fragments: true,
            embedded: false,
            help: true,
            showNotes: false,
            autoPlayMedia: null,
            transition: 'fade',
            transitionSpeed: 'default',
            backgroundTransition: 'none',
            width: 1920,
            height: 1080,
            margin: 0,
            minScale: 0.2,
            maxScale: 2.0,
            plugins: [ RevealNotes, RevealZoom ],
        });

        deck.initialize().then(() => {
            renderComplianceMatrix();
            activateVideoThumbnails();
            forceSlideNumberPosition();
            deck.layout();
            deck.on('slidechanged', updateQRVisibility);
            deck.on('slidechanged', forceSlideNumberPosition);
            updateQRVisibility({ currentSlide: deck.getCurrentSlide() });
        });

        window.Reveal = deck;
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReveal);
    } else {
        initReveal();
    }
})();
