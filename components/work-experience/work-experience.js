import gsap from 'https://cdn.skypack.dev/gsap@3.11.0';

function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Uniform dot matrix: same radius & pitch (CSS px) on every logo. Smaller pitch ⇒ denser grid. */
const WORKEX_DOT_PITCH_CSS = 3.85;
const WORKEX_DOT_RADIUS_CSS = 1.75;
const WORKEX_DOT_MIN_COLS = 20;

class WorkLogoDotMatrix {
    constructor(el) {
        this.el = el;
        this.img = el.querySelector('.workex-logo__source');
        this.canvas = el.querySelector('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.cols = 0;
        this.rows = 0;
        this.samples = null;
        this.shimmerPhase = 0;
        this.hoverActive = false;
        this.boundShimmer = this.shimmerFrame.bind(this);
        this._resizeQueued = false;

        this.onImageLoad = this.onImageLoad.bind(this);
        this.onResize = this.onResize.bind(this);

        this.img.addEventListener('load', this.onImageLoad);
        if (this.img.complete && this.img.naturalWidth > 0) {
            this.onImageLoad();
        }

        this.ro = new ResizeObserver(() => this.onResize());
        this.ro.observe(this.el);
    }

    onImageLoad() {
        const nw = this.img.naturalWidth;
        const nh = this.img.naturalHeight;
        if (!nw || !nh) return;
        this.el.style.setProperty('--workex-logo-ar', String(nw / nh));
        this.samples = null;
        this.cols = 0;
        this.rows = 0;
        const paintOnce = () => this.paint(1);
        paintOnce();
        requestAnimationFrame(paintOnce);
    }

    onResize() {
        if (this._resizeQueued) return;
        this._resizeQueued = true;
        requestAnimationFrame(() => {
            this._resizeQueued = false;
            if (this.hoverActive && !prefersReducedMotion()) {
                const pulse = 1 + 0.07 * Math.sin(this.shimmerPhase);
                const ripple = 1 + 0.04 * Math.sin(this.shimmerPhase * 1.6);
                this.paint(pulse * ripple);
            } else {
                this.paint(1);
            }
        });
    }

    sampleGrid() {
        const nw = this.img.naturalWidth;
        const nh = this.img.naturalHeight;
        const w = this.cols;
        const h = this.rows;

        const off = document.createElement('canvas');
        off.width = w;
        off.height = h;
        const octx = off.getContext('2d');
        octx.drawImage(this.img, 0, 0, w, h);
        const { data } = octx.getImageData(0, 0, w, h);
        this.samples = new Float32Array(w * h * 4);
        for (let i = 0, j = 0; i < data.length; i += 4, j += 4) {
            this.samples[j] = data[i];
            this.samples[j + 1] = data[i + 1];
            this.samples[j + 2] = data[i + 2];
            this.samples[j + 3] = data[i + 3] / 255;
        }
    }

    paint(brightness) {
        const nw = this.img.naturalWidth;
        const nh = this.img.naturalHeight;
        if (!nw || !nh) return;

        const rect = this.el.getBoundingClientRect();
        const cssW = rect.width;
        const cssH = rect.height;
        if (cssW < 2 || cssH < 2) return;

        const cols = Math.max(WORKEX_DOT_MIN_COLS, Math.round(cssW / WORKEX_DOT_PITCH_CSS));
        const rows = Math.max(1, Math.round((cols * nh) / nw));

        if (!this.samples || this.cols !== cols || this.rows !== rows) {
            this.cols = cols;
            this.rows = rows;
            this.sampleGrid();
        }

        const dpr = window.devicePixelRatio || 1;
        this.canvas.width = Math.max(1, Math.floor(cssW * dpr));
        this.canvas.height = Math.max(1, Math.floor(cssH * dpr));
        this.canvas.style.width = `${cssW}px`;
        this.canvas.style.height = `${cssH}px`;

        const ctx = this.ctx;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, cssW, cssH);

        const cellW = cssW / cols;
        const cellH = cssH / rows;
        const radius = WORKEX_DOT_RADIUS_CSS;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const idx = (row * cols + col) * 4;
                let r = this.samples[idx];
                let g = this.samples[idx + 1];
                let b = this.samples[idx + 2];
                const a = this.samples[idx + 3];
                if (a < 0.02) continue;

                r = Math.min(255, r * brightness);
                g = Math.min(255, g * brightness);
                b = Math.min(255, b * brightness);

                ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${a})`;
                ctx.beginPath();
                ctx.arc(col * cellW + cellW * 0.5, row * cellH + cellH * 0.5, radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    shimmerFrame() {
        if (!this.hoverActive || prefersReducedMotion()) return;
        this.shimmerPhase += 0.12;
        const pulse = 1 + 0.07 * Math.sin(this.shimmerPhase);
        const ripple = 1 + 0.04 * Math.sin(this.shimmerPhase * 1.6);
        this.paint(pulse * ripple);
    }

    enableHover() {
        if (prefersReducedMotion()) return;
        this.hoverActive = true;
        gsap.ticker.add(this.boundShimmer);
    }

    disableHover() {
        this.hoverActive = false;
        gsap.ticker.remove(this.boundShimmer);
        this.paint(1);
    }
}

const workLogoBoards = [];

function initWorkExperience() {
    document.querySelectorAll('.workex-logo').forEach(el => {
        const board = new WorkLogoDotMatrix(el);
        workLogoBoards.push(board);
        el.addEventListener('pointerenter', () => board.enableHover());
        el.addEventListener('pointerleave', () => board.disableHover());
    });

    function onReducedMotionChange() {
        workLogoBoards.forEach(b => b.disableHover());
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.addEventListener) {
        mq.addEventListener('change', onReducedMotionChange);
    } else {
        mq.addListener(onReducedMotionChange);
    }

}

function initWorkexSlideNav() {
    const scrollEl = document.getElementById('workex-billboard');
    const btnUp = document.querySelector('.workex-slide-nav__btn--up');
    const btnDown = document.querySelector('.workex-slide-nav__btn--down');
    if (!scrollEl || !btnUp || !btnDown) return;

    const slides = () => Array.from(scrollEl.querySelectorAll('.workex-slide'));

    function slideIndexFromScroll() {
        const list = slides();
        if (!list.length) return 0;
        let idx = 0;
        const st = scrollEl.scrollTop;
        for (let i = 0; i < list.length; i++) {
            if (list[i].offsetTop <= st + 4) idx = i;
        }
        return idx;
    }

    function updateNavVisibility() {
        const list = slides();
        const i = slideIndexFromScroll();
        const last = list.length - 1;
        btnUp.hidden = i <= 0;
        btnDown.hidden = last < 0 || i >= last;
    }

    function scrollBehavior() {
        return prefersReducedMotion() ? 'auto' : 'smooth';
    }

    btnUp.addEventListener('click', () => {
        const list = slides();
        const i = slideIndexFromScroll();
        if (i > 0) {
            scrollEl.scrollTo({ top: list[i - 1].offsetTop, behavior: scrollBehavior() });
        }
    });

    btnDown.addEventListener('click', () => {
        const list = slides();
        const i = slideIndexFromScroll();
        if (i < list.length - 1) {
            scrollEl.scrollTo({ top: list[i + 1].offsetTop, behavior: scrollBehavior() });
        }
    });

    let scrollRafId = 0;
    scrollEl.addEventListener(
        'scroll',
        () => {
            if (scrollRafId) return;
            scrollRafId = requestAnimationFrame(() => {
                scrollRafId = 0;
                updateNavVisibility();
            });
        },
        { passive: true }
    );

    const ro = new ResizeObserver(() => updateNavVisibility());
    ro.observe(scrollEl);

    updateNavVisibility();
}

initWorkExperience();
initWorkexSlideNav();
