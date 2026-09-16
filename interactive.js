const WORKS = [
    { src: 'breakdown',   title: '21st Century Breakdown', cat: 'Poster',          tools: 'Photoshop · Halftone',        ratio: '1523 / 1600' },
    { src: 'heartless',   title: 'Heartless',              cat: 'Album Art',       tools: 'Photoshop · Duotone & grain', ratio: '4 / 5' },
    { src: 'kurt',        title: 'Kurt',                   cat: 'Portrait',        tools: 'Photoshop · Scanline',        ratio: '880 / 1050' },
    { src: 'coordinates', title: 'Coordinates',            cat: 'Generative',      tools: 'Illustrator · Photoshop',     ratio: '3 / 4' },
    { src: 'chester',     title: 'Chester',                cat: 'Tribute Poster',  tools: 'Photoshop · Illustrator',     ratio: '1 / 1' },
    { src: 'wordface',    title: 'Between the Lines',      cat: 'Typography',      tools: 'Photoshop · Type portrait',   ratio: '734 / 812' },
    { src: 'verstappen',  title: 'Verstappen 01',          cat: 'Sports Poster',   tools: 'Photoshop',                   ratio: '1391 / 1600' },
    { src: 'signal',      title: 'Signal Lost',            cat: 'Glitch Art',      tools: 'Photoshop · Displacement',    ratio: '1 / 1' },
    { src: 'nyt',         title: 'Iron Giants',            cat: 'Editorial',       tools: 'InDesign · Photoshop',        ratio: '1 / 1' },
    { src: 'city',        title: 'The All-New City',       cat: 'Automotive Ad',   tools: 'Photoshop',                   ratio: '4 / 5' },
    { src: 'melam',       title: 'Melam',                  cat: 'Event Poster',    tools: 'Photoshop · Illustrator',     ratio: '1 / 1' },
    { src: 'cityrain',    title: 'City — Wet Roads',       cat: 'Automotive Ad',   tools: 'Photoshop',                   ratio: '890 / 593' },
];
let FEATURED_INDEX = 0;
const FEATURED_POOL = ['heartless', 'breakdown', 'chester', 'city', 'cityrain', 'kurt'];

const BAND_WORDS = ['Graphic Design', 'Posters', 'Album Art', 'Typography', 'Brand Visuals', 'UI / UX', 'Front-End', 'Full Stack'];

const STROKE = 'fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"';
const svg = (inner, attrs = '') => `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" ${attrs}>${inner}</svg>`;
const tile = (txt) => svg(`<rect x="1.5" y="1.5" width="21" height="21" rx="5" ${STROKE}/><text x="12" y="15.8" text-anchor="middle" font-family="Sora, Inter, sans-serif" font-weight="700" font-size="10" fill="currentColor">${txt}</text>`);

const ICONS = {
    figma:    svg(`<path d="M12 3H9a3 3 0 0 0 0 6h3z"/><path d="M12 3h3a3 3 0 0 1 0 6h-3z"/><path d="M12 9H9a3 3 0 0 0 0 6h3z"/><circle cx="15" cy="12" r="3"/><path d="M12 15H9a3 3 0 1 0 3 3z"/>`, 'fill="currentColor"'),
    react:    svg(`<circle cx="12" cy="12" r="2" fill="currentColor"/><ellipse cx="12" cy="12" rx="10" ry="3.8"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="3.8" transform="rotate(120 12 12)"/>`, STROKE.replace('1.6', '1.3')),
    code:     svg(`<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>`, STROKE),
    tailwind: svg(`<path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.4 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C15.5 7.1 14.4 6 12 6zM7 12c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 1.9 1.4.9 1 2 2.1 4.4 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-1.9-1.4C10.5 13.1 9.4 12 7 12z"/>`, 'fill="currentColor"'),
    node:     svg(`<path d="M12 2l8.66 5v10L12 22l-8.66-5V7z"/><path d="M12 7.5l4.3 2.5v5L12 17.5l-4.3-2.5v-5z" fill="currentColor" opacity=".35" stroke="none"/>`, STROKE),
    python:   svg(`<path d="M11.9 2c-2.6 0-4.4.6-4.4 2.6V7h4.6v.7H5.6C3.6 7.7 2 9.3 2 12s1.6 4.3 3.6 4.3h1.9v-2.5c0-2.1 1.8-3.8 3.9-3.8h4c1.7 0 3.1-1.4 3.1-3.1V4.6C18.5 2.6 14.5 2 11.9 2zM9.4 4.1a.9.9 0 1 1 0 1.8.9.9 0 0 1 0-1.8z"/><path d="M12.1 22c2.6 0 4.4-.6 4.4-2.6V17h-4.6v-.7h6.5c2 0 3.6-1.6 3.6-4.3s-1.6-4.3-3.6-4.3h-1.9v2.5c0 2.1-1.8 3.8-3.9 3.8h-4c-1.7 0-3.1 1.4-3.1 3.1v2.3c0 2 4 2.6 6.6 2.6zm2.5-2.1a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8z"/>`, 'fill="currentColor"'),
    database: svg(`<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>`, STROKE),
    server:   svg(`<rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01M6 17.5h.01"/>`, STROKE),
    git:      svg(`<path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>`, STROKE),
    terminal: svg(`<path d="m4 17 6-6-6-6"/><path d="M12 19h8"/>`, STROKE),
};

const SKILLS = [
    { name: 'Photoshop',    cat: 'design',   pct: 95, brand: '#31A8FF', meta: 'Compositing, retouching & large-format print',  icon: tile('Ps') },
    { name: 'Illustrator',  cat: 'design',   pct: 90, brand: '#FF9A00', meta: 'Vector art, branding & iconography',            icon: tile('Ai') },
    { name: 'InDesign',     cat: 'design',   pct: 85, brand: '#FF3366', meta: 'Editorial layout & press-ready artwork',        icon: tile('Id') },
    { name: 'Figma',        cat: 'design',   pct: 90, brand: '#F24E1E', meta: 'UI/UX, prototyping & design systems',           icon: ICONS.figma },
    { name: 'React',        cat: 'frontend', pct: 88, brand: '#61DAFB', meta: 'SPAs, kiosks & component architecture',        icon: ICONS.react },
    { name: 'JavaScript',   cat: 'frontend', pct: 88, brand: '#F7DF1E', meta: 'ES6+, DOM & animation',                        icon: tile('JS') },
    { name: 'TypeScript',   cat: 'frontend', pct: 78, brand: '#3178C6', meta: 'Typed front-ends & APIs',                       icon: tile('TS') },
    { name: 'HTML & CSS',   cat: 'frontend', pct: 92, brand: '#E34F26', meta: 'Semantic markup, SCSS & responsive layout',     icon: ICONS.code },
    { name: 'Tailwind CSS', cat: 'frontend', pct: 85, brand: '#06B6D4', meta: 'Utility-first UI at speed',                     icon: ICONS.tailwind },
    { name: 'Node.js',      cat: 'backend',  pct: 80, brand: '#5FA04E', meta: 'REST APIs, auth & integrations',                icon: ICONS.node },
    { name: 'Express',      cat: 'backend',  pct: 78, brand: '#9CA3AF', meta: 'Routing, middleware & JWT',                     icon: tile('ex') },
    { name: 'Python',       cat: 'backend',  pct: 82, brand: '#3776AB', meta: 'Scripting, CV pipelines & tooling',             icon: ICONS.python },
    { name: 'PostgreSQL',   cat: 'backend',  pct: 75, brand: '#4169E1', meta: 'Schema design, Prisma & Supabase',              icon: ICONS.database },
    { name: 'MySQL',        cat: 'backend',  pct: 78, brand: '#00A3C4', meta: 'Relational modelling & queries',                icon: ICONS.server },
    { name: 'Git & GitHub', cat: 'tools',    pct: 85, brand: '#F05032', meta: 'Version control & collaboration',               icon: ICONS.git },
    { name: 'Linux',        cat: 'tools',    pct: 70, brand: '#FCC624', meta: 'CLI, deployment & servers',                     icon: ICONS.terminal },
];

const MORE_TOOLS = [
    'Canva', 'Adobe Creative Cloud', 'Typography & layout', 'Brand systems', 'Large-format print', 'Information design',
    'UI/UX', 'Wireframing', 'Vite', 'Prisma', 'Supabase', 'SCSS', 'Framer Motion', 'React Router',
    'JWT & bcrypt', 'Nodemailer', 'WhatsApp Cloud API', 'OpenCV', 'Unity / AR', 'VS Code', 'C / C++', 'SQL', 'REST API design'
];

const levelLabel = (p) => p >= 90 ? 'Expert' : p >= 80 ? 'Advanced' : p >= 70 ? 'Proficient' : 'Working';
const clamp = (v, a, b) => Math.min(Math.max(v, a), b);
const lerp = (a, b, t) => a + (b - a) * t;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const pad2 = (n) => String(n).padStart(2, '0');
const $ = (id) => document.getElementById(id);

let currentImageIndex = 0;

const scrollFns = [];
let scrollQueued = false;
function onScroll(fn) { scrollFns.push(fn); }
window.addEventListener('scroll', () => {
    if (scrollQueued) return;
    scrollQueued = true;
    requestAnimationFrame(() => { scrollFns.forEach(f => f()); scrollQueued = false; });
}, { passive: true });
const runScrollFns = () => scrollFns.forEach(f => f());

let sY = window.scrollY, smoothRunning = false;
const smoothFns = [];
function onSmooth(fn) { smoothFns.push(fn); }
function tickSmooth() {
    const diff = window.scrollY - sY;
    if (reducedMotion || Math.abs(diff) < 0.25) { sY = window.scrollY; smoothFns.forEach(f => f(sY)); smoothRunning = false; return; }
    sY += diff * 0.14;
    smoothFns.forEach(f => f(sY));
    requestAnimationFrame(tickSmooth);
}
onScroll(() => { if (!smoothRunning) { smoothRunning = true; requestAnimationFrame(tickSmooth); } });
const runSmoothFns = () => { sY = window.scrollY; smoothFns.forEach(f => f(sY)); };

let logoWritten = false;
function initLogo() {
    const morphWrap = $('morph-logo'), slotWrap = $('slot-logo');
    morphWrap.innerHTML = buildLogoSVG('m', { masked: true });
    slotWrap.innerHTML = buildLogoSVG('s', { masked: false });

    const morphSvg = morphWrap.querySelector('svg');
    const total = primeLogo(morphSvg, { instant: reducedMotion });
    const heroAfter = document.querySelector('.hero-after');
    if (reducedMotion) { heroAfter.classList.add('on'); logoWritten = true; $('brand-morph').classList.add('dotted'); }
    else {
        setTimeout(() => morphSvg.classList.add('write'), 250);
        setTimeout(() => heroAfter.classList.add('on'), 250 + total * 0.72);
        setTimeout(() => { morphSvg.classList.add('done'); logoWritten = true; $('brand-morph').classList.add('dotted'); runSmoothFns(); }, 250 + total - 100);
    }
}

function initBrandMorph() {
    const morph = $('brand-morph'), heroSlot = $('hero-slot'), navSlot = $('slot-logo'), morphLogo = $('morph-logo');
    const rest = $('morph-rest'), dot = $('morph-dot');
    let heroFont = 100, navFont = 18, mode = '', heroDoc = { left: 0, top: 0 }, dotGap = 1;
    const setMode = (m) => {
        if (m === mode) return;
        mode = m;
        morph.style.fontSize = `${m === 'nav' ? navFont : heroFont}px`;
        const base = m === 'nav' ? navFont : heroFont;
        const dotSize = base * 0.19; dotGap = base * 0.07;
        dot.style.width = dot.style.height = `${dotSize}px`;
        dot.style.top = `${morphLogo.offsetTop + morphLogo.offsetHeight - dotSize}px`;
    };
    const measure = () => {
        heroFont = parseFloat(getComputedStyle(heroSlot).fontSize);
        navFont = parseFloat(getComputedStyle(navSlot.closest('.brand')).fontSize);
        const r = heroSlot.getBoundingClientRect();
        heroDoc = { left: r.left, top: r.top + window.scrollY };
        const m = mode || 'big'; mode = ''; setMode(m);
    };
    const easeInOut = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const frame = (y) => {
        const dist = window.innerHeight * 0.55;
        const raw = clamp(y / dist, 0, 1);
        const p = easeInOut(raw);
        const docked = raw >= 0.999;
        setMode(docked ? 'nav' : 'big');
        const base = mode === 'nav' ? navFont : heroFont;
        const sc = lerp(heroFont, navFont, p) / base;
        const nr = navSlot.getBoundingClientRect();
        const ox = morphLogo.offsetLeft, oy = morphLogo.offsetTop;
        const x = lerp(heroDoc.left, nr.left, p) - ox * sc;
        const yy = lerp(heroDoc.top - y, nr.top, p) - oy * sc;
        morph.style.transform = `translate3d(${x}px, ${yy}px, 0) scale(${sc})`;
        morph.style.setProperty('--rest', clamp((raw - 0.55) / 0.45, 0, 1).toFixed(3));
        const afterH = morphLogo.offsetLeft + morphLogo.offsetWidth + dotGap;
        const afterUnni = rest.offsetLeft + rest.offsetWidth + dotGap;
        dot.style.left = `${lerp(afterH, afterUnni, p).toFixed(2)}px`;
        morph.classList.toggle('docked', docked);
    };
    measure();
    document.fonts?.ready.then(() => { measure(); frame(sY); });
    window.addEventListener('resize', () => { measure(); frame(sY); });
    new ResizeObserver(() => { measure(); frame(sY); }).observe(document.querySelector('.wrapper'));
    onSmooth(frame);
    frame(sY);
    requestAnimationFrame(() => morph.classList.add('ready'));
}

function roundedPath(pts, r) {
    let d = '';
    for (let i = 1; i < pts.length - 1; i++) {
        const [px, py] = pts[i - 1], [cx, cy] = pts[i], [nx, ny] = pts[i + 1];
        const d1 = [Math.sign(cx - px), Math.sign(cy - py)], d2 = [Math.sign(nx - cx), Math.sign(ny - cy)];
        const cross = d1[0] * d2[1] - d1[1] * d2[0];
        if (cross === 0) { d += ` L${cx.toFixed(1)} ${cy.toFixed(1)}`; continue; }
        const rr = Math.min(r, Math.hypot(cx - px, cy - py) / 2, Math.hypot(nx - cx, ny - cy) / 2);
        const a = [cx - d1[0] * rr, cy - d1[1] * rr], b = [cx + d2[0] * rr, cy + d2[1] * rr];
        d += ` L${a[0].toFixed(1)} ${a[1].toFixed(1)} A${rr.toFixed(1)} ${rr.toFixed(1)} 0 0 ${cross > 0 ? 1 : 0} ${b[0].toFixed(1)} ${b[1].toFixed(1)}`;
    }
    const last = pts[pts.length - 1];
    return d + ` L${last[0].toFixed(1)} ${last[1].toFixed(1)}`;
}

const RIB_SEED = (Number(new URLSearchParams(location.search).get('seed')) || Math.random() * 4294967296) >>> 0;
function seededRandom(seed) {
    return () => { seed = (seed + 0x6D2B79F5) >>> 0; let t = seed; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function initRibbon() {
    const svgEl = $('ribbon'), tail = $('rib-tail'), lower = $('rib-lower');
    const win = $('window'), heroSlot = $('hero-slot'), wrapper = document.querySelector('.wrapper');
    const grid = $('works-grid'), inverted = $('inverted'), giant = document.querySelector('.giant');
    const inlet = $('rib-inlet'), funnel = $('rib-funnel');
    let geo = null;
    const docY = (el) => el.getBoundingClientRect().top + window.scrollY;
    const layoutTop = (el) => { let y = 0; while (el) { y += el.offsetTop; el = el.offsetParent; } return y; };

    if (giant && !giant.querySelector('.gl')) {
        giant.innerHTML = [...giant.textContent.trim()].map((ch, i) => `<span class="gl" style="--k:${i}">${ch}${i === 0 ? '<i class="bl"></i>' : ''}</span>`).join('');
    }
    const marks = [...inverted.querySelectorAll('.section')].filter(sec => sec.id !== 'skills').map(sec => sec.querySelector('.sec-index')).filter(Boolean);
    marks.forEach(m => { if (!m.querySelector('.bl')) m.insertAdjacentHTML('beforeend', '<i class="bl"></i>'); });
    const spine = marks.map((_, k) => {
        const el = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        el.id = `rib-spine-${k}`; inlet.appendChild(el); return el;
    });
    spine.push((() => { const el = document.createElementNS('http://www.w3.org/2000/svg', 'path'); el.id = `rib-spine-${marks.length}`; inlet.appendChild(el); return el; })());

    const build = () => {
        const W = document.documentElement.clientWidth;
        if (W < 320) {
            svgEl.classList.remove('on'); win.style.width = ''; win.style.clipPath = ''; geo = null;
            inlet.style.display = 'none'; giant.style.paddingLeft = ''; inverted.querySelector('.inner').style.paddingLeft = '';
            return;
        }
        svgEl.classList.add('on'); inlet.style.display = '';
        const H = document.documentElement.scrollHeight, vh = window.innerHeight;
        svgEl.setAttribute('width', W); svgEl.setAttribute('height', H); svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
        const rand = seededRandom(RIB_SEED);

        const hr = heroSlot.getBoundingClientRect();
        const F = parseFloat(getComputedStyle(heroSlot).fontSize);
        const dotSize = F * 0.19, dotGap = F * 0.07;
        const xDot = hr.right + dotGap + dotSize / 2;
        const startY = hr.bottom + window.scrollY - dotSize;
        const contentLeft = wrapper.getBoundingClientRect().left + parseFloat(getComputedStyle(wrapper).paddingLeft);

        win.style.width = `${Math.round(xDot + dotSize / 2 - contentLeft)}px`;
        const wr = win.getBoundingClientRect();
        const winTop = wr.top + window.scrollY, winBottom = wr.bottom + window.scrollY, winRight = wr.right;
        const winH = winBottom - winTop;

        tail.setAttribute('d', `M${xDot.toFixed(1)} ${startY.toFixed(1)} V${winTop + 30}`);
        tail.style.strokeWidth = dotSize;

        const section = grid.closest('.section');
        const secTop = docY(section), secLeft = section.getBoundingClientRect().left;
        const gcs = getComputedStyle(grid);
        const cols = parseInt(gcs.columnCount) || 1, gap = parseFloat(gcs.columnGap) || 56;
        const gridLeft = secLeft + grid.offsetLeft, gridW = grid.offsetWidth, gridRight = gridLeft + gridW;
        const colW = (gridW - gap * (cols - 1)) / cols;
        const tiles = [...grid.children].map(t => ({
            col: Math.round((t.offsetLeft - grid.offsetLeft) / (colW + gap)),
            top: secTop + t.offsetTop, bottom: secTop + t.offsetTop + t.offsetHeight,
        }));
        const gridTop = Math.min(...tiles.map(t => t.top)), gridBottom = Math.max(...tiles.map(t => t.bottom));
        const bandW = Math.min(dotSize, cols > 1 ? gap - 12 : dotSize);

        const inner = inverted.querySelector('.inner');
        inner.style.paddingLeft = '';
        const basePad = parseFloat(getComputedStyle(inner).paddingLeft);
        let innerLeft = inner.getBoundingClientRect().left + basePad;
        if (innerLeft < bandW + 6) { inner.style.paddingLeft = `${(basePad + bandW + 6 - innerLeft).toFixed(1)}px`; innerLeft = bandW + 6; }
        const S = giant.querySelector('.gl'), bl = S.querySelector('.bl');
        const giantF = parseFloat(getComputedStyle(giant).fontSize);
        giant.style.paddingLeft = '';
        const sr0 = S.getBoundingClientRect();
        const blockLeft = inverted.getBoundingClientRect().left;
        let dotX = sr0.left - giantF * 0.07 - bandW / 2;
        const minX = 3 + bandW / 2, maxX = innerLeft - 3 - bandW / 2;
        if (dotX < minX) {
            dotX = Math.min(minX, maxX);
            giant.style.paddingLeft = `${Math.max(0, dotX + bandW / 2 + giantF * 0.07 - sr0.left).toFixed(1)}px`;
        }
        const dotBottom = bl.getBoundingClientRect().top + window.scrollY;
        const blockTop = docY(inverted), blockBottom = blockTop + inverted.offsetHeight;

        const chan = {};
        for (let c = 1; c < cols; c++) chan[c] = gridLeft + c * colW + (c - 0.5) * gap;
        if (gridLeft >= bandW + 6) chan[0] = gridLeft >= 90 ? gridLeft - 46 : gridLeft / 2;
        if (W - gridRight >= bandW + 6) chan[cols] = gridLeft >= 90 ? gridRight + 46 : gridRight + (W - gridRight) / 2;
        if (chan[0] !== undefined && dotX + bandW / 2 <= gridLeft - 3 && dotX - bandW / 2 >= 3) chan[0] = dotX;
        const corridors = [];
        for (let c = 0; c < cols; c++) {
            if (chan[c] === undefined || chan[c + 1] === undefined) continue;
            const col = tiles.filter(t => t.col === c).sort((a, b2) => a.top - b2.top);
            for (let i = 0; i < col.length - 1; i++) {
                const hgt = col[i + 1].top - col[i].bottom;
                if (hgt >= bandW + 14) corridors.push({ y: (col[i].bottom + col[i + 1].top) / 2, a: c, b: c + 1 });
            }
        }
        corridors.sort((p1, p2) => p1.y - p2.y);

        const bands = Object.keys(chan).map(Number).sort((x, y) => x - y);
        if (!bands.length) {
            svgEl.classList.remove('on'); win.style.width = ''; win.style.clipPath = ''; geo = null;
            inlet.style.display = 'none'; giant.style.paddingLeft = ''; inner.style.paddingLeft = '';
            return;
        }
        let b = cols >= 3 ? cols - 1 : (chan[1] !== undefined ? 1 : bands[bands.length - 1]);
        if (chan[b] === undefined) b = bands[bands.length - 1];
        const turnEnd = gridTop - 40;
        const pts = [[chan[b], turnEnd]];
        let y = turnEnd;
        for (let guard = 0; guard < 14; guard++) {
            const ahead = corridors.filter(k => (k.a === b || k.b === b) && k.y > y + 90 && k.y < gridBottom - 50);
            if (!ahead.length) break;
            const lowerHalf = y > gridTop + (gridBottom - gridTop) * 0.45;
            const leftward = ahead.filter(k => k.b === b);
            const pool = (lowerHalf && leftward.length) ? leftward.slice(0, 2) : ahead.slice(0, 3);
            const pick = pool[Math.floor(rand() * pool.length)];
            const nb = pick.a === b ? pick.b : pick.a;
            pts.push([chan[b], pick.y], [chan[nb], pick.y]);
            b = nb; y = pick.y;
        }
        const exitY = gridBottom + 40;
        pts.push([chan[b], exitY]);

        const xLast = chan[b], dx = dotX - xLast;
        let approach = '';
        if (Math.abs(dx) >= 80) {
            const turnY = exitY + (blockTop - exitY) * 0.5;
            pts.push([xLast, turnY], [dotX, turnY], [dotX, blockTop + 2]);
        } else if (Math.abs(dx) >= 1) {
            const my = (exitY + blockTop) / 2;
            approach = ` C ${xLast.toFixed(1)} ${my.toFixed(1)}, ${dotX.toFixed(1)} ${my.toFixed(1)}, ${dotX.toFixed(1)} ${(blockTop + 2).toFixed(1)}`;
        } else {
            dotX = xLast;
            pts.push([dotX, blockTop + 2]);
        }

        const xExit = winRight - clamp((winRight - wr.left) * 0.08, bandW * 1.5, 64);
        const turnStart = gridTop - 300;
        const x0 = pts[0][0];
        let d = `M${xExit.toFixed(1)} ${winBottom - 30} V${turnStart} C ${xExit.toFixed(1)} ${turnStart + 180}, ${x0.toFixed(1)} ${turnEnd - 180}, ${x0.toFixed(1)} ${turnEnd}`;
        d += roundedPath(pts, 34) + approach;
        lower.setAttribute('d', d);
        lower.style.strokeWidth = bandW;

        const lx = (dotX - blockLeft).toFixed(1);
        funnel.setAttribute('d', `M${lx} 0 V${(dotBottom - blockTop).toFixed(1)}`);
        funnel.setAttribute('style', `fill:none;stroke:var(--accent);stroke-width:${bandW}px;stroke-linecap:butt`);
        funnel.removeAttribute('clip-path');
        const inletLen = dotBottom - blockTop;

        const tailLen = tail.getTotalLength(), lowerLen = lower.getTotalLength();
        const lowerStart = winBottom - 30;
        const prof = []; let eff = 0, prev = lower.getPointAtLength(0);
        for (let L = 0; L <= lowerLen + 6; L += 6) {
            const at = Math.min(L, lowerLen), pt = lower.getPointAtLength(at);
            eff += Math.max(0, pt.y - prev.y) + Math.abs(pt.x - prev.x) * 0.07;
            prev = pt;
            prof.push([at, eff, pt.y]);
        }
        const lowerEffort = eff;

        const dropFrom = blockTop - 120;
        const yArrive = (lowerStart + lowerEffort + inletLen + dropFrom) / 2 - vh * 0.86;
        const reelRange = Math.max(vh * 0.3, dotBottom - vh * 0.32 - yArrive);
        const effortAt = (t) => {
            if (t <= winTop + 30) return clamp(t - startY, 0, tailLen);
            if (t <= winBottom) return tailLen + clamp(t - winTop, 0, winH);
            const q = prof.find(k => k[2] >= t);
            if (q) return tailLen + winH + q[1];
            return tailLen + winH + lowerEffort + clamp(t - blockTop, 0, inletLen);
        };
        const eStart = effortAt(yArrive - vh * 0.12);
        const eEnd = tailLen + winH + lowerEffort + inletLen - bandW;

        const maxScroll = H - vh;
        const stops = [dotBottom];
        marks.forEach(m => {
            const mb = m.querySelector('.bl');
            stops.push(layoutTop(m) + (mb.getBoundingClientRect().top - m.getBoundingClientRect().top));
        });
        stops.push(blockBottom - 50);
        const segs = [];
        let yStart = yArrive + reelRange;
        for (let k = 0; k < stops.length - 1; k++) {
            const top = stops[k] - bandW, bottom = stops[k], nextTop = stops[k + 1] - bandW, nextBottom = stops[k + 1];
            const el = spine[k];
            el.setAttribute('d', `M${lx} ${(top - blockTop).toFixed(1)} V${(nextBottom - blockTop).toFixed(1)}`);
            el.setAttribute('style', `fill:none;stroke:var(--accent);stroke-width:${bandW}px;stroke-linecap:butt`);
            const arrive = Math.max(nextBottom - vh * 0.86, yStart + (nextBottom - bottom) / 2.4);
            const done = Math.max(arrive + vh * 0.15, Math.min(nextBottom - vh * 0.32, maxScroll - 2));
            segs.push({ el, top, bottom, nextTop, nextBottom, yStart, arrive, done, eStart: clamp(arrive - vh * 0.12, top, nextTop) });
            yStart = done;
        }

        geo = { startY, winTop, winBottom, winH, tailLen, lowerLen, lowerStart, prof, lowerEffort, inletLen, bandW,
                dropFrom, yArrive, reelRange, eStart, eEnd, segs };
        draw(sY);
    };

    const lengthFor = (effort) => {
        const prof = geo.prof; let lo = 0, hi = prof.length - 1;
        if (effort <= prof[0][1]) return 0;
        if (effort >= prof[hi][1]) return geo.lowerLen;
        while (hi - lo > 1) { const m = (lo + hi) >> 1; if (prof[m][1] <= effort) lo = m; else hi = m; }
        const [l0, e0] = prof[lo], [l1, e1] = prof[hi];
        return e1 > e0 ? l0 + (l1 - l0) * (effort - e0) / (e1 - e0) : l0;
    };

    const show = (el, from, to) => {
        const len = Math.max(0, to - from);
        el.style.strokeDasharray = `${len.toFixed(1)} 100000`;
        el.style.strokeDashoffset = (-from).toFixed(1);
    };
    const reel = (c) => { const v = clamp((c - 0.06) / 0.94, 0, 1); return [clamp(c / 0.06, 0, 1), (v + v * v * (3 - 2 * v)) / 2]; };

    const draw = (y) => {
        if (!geo) return;
        const vh = window.innerHeight;
        const head = logoWritten ? Math.min(y + vh * 0.86, geo.startY + y * 2.4) : geo.startY;

        const dTail = clamp(head - geo.startY, 0, geo.tailLen);
        const fWin = clamp((head - geo.winTop) / geo.winH, 0, 1);
        const h = head + Math.max(0, head - geo.dropFrom);
        const dLower = lengthFor(h - geo.lowerStart);
        const dInlet = clamp(h - geo.lowerStart - geo.lowerEffort, 0, geo.inletLen);

        const [hid, vis] = reel(clamp((y - geo.yArrive) / geo.reelRange, 0, 1));
        const e = geo.eStart * hid + (geo.eEnd - geo.eStart) * vis;
        const sTail = clamp(e, 0, geo.tailLen);
        const sWin = clamp((e - geo.tailLen) / geo.winH, 0, 1);
        const sLower = lengthFor(e - geo.tailLen - geo.winH);
        const sInlet = clamp(e - geo.tailLen - geo.winH - geo.lowerEffort, 0, geo.inletLen - geo.bandW);

        show(tail, sTail, dTail);
        win.style.clipPath = `inset(${(sWin * 100).toFixed(2)}% 0 ${((1 - fWin) * 100).toFixed(2)}% 0 round 28px)`;
        show(lower, sLower, dLower);
        show(funnel, sInlet, dInlet);

        geo.segs.forEach(sg => {
            if (y < sg.yStart) { show(sg.el, 0, 0); return; }
            const hd = clamp(Math.min(y + vh * 0.86, sg.bottom + (y - sg.yStart) * 2.4), sg.bottom, sg.nextBottom);
            const [h0, v0] = reel(clamp((y - sg.arrive) / (sg.done - sg.arrive), 0, 1));
            const tl = sg.top + (sg.eStart - sg.top) * h0 + (sg.nextTop - sg.eStart) * v0;
            show(sg.el, tl - sg.top, hd - sg.top);
        });
    };

    build();
    onSmooth(draw);
    window.addEventListener('resize', build);
    window.addEventListener('load', build);
    document.fonts?.ready.then(build);
    let rebuildT = 0;
    new ResizeObserver(() => { clearTimeout(rebuildT); rebuildT = setTimeout(build, 120); }).observe(wrapper);
}

function initFeatured() {
    const win = $('window');
    if (!win) return;
    const pick = FEATURED_POOL[Math.floor(Math.random() * FEATURED_POOL.length)];
    FEATURED_INDEX = Math.max(0, WORKS.findIndex(w => w.src === pick));
    const w = WORKS[FEATURED_INDEX];
    const img = win.querySelector('img');
    img.src = `images/works/${w.src}.webp`;
    img.alt = `${w.title} — ${w.cat}`;
    win.querySelector('.win-title').textContent = w.title;
    win.querySelector('.win-sub').textContent = `${w.cat} · ${w.tools}`;
    win.querySelector('.win-open').setAttribute('aria-label', `Open ${w.title} in the lightbox`);
}

function buildWorks() {
    const grid = $('works-grid');
    if (!grid) return;
    grid.innerHTML = WORKS.map((w, i) => `
        <figure class="work" style="--i:${i % 3}" data-index="${i}" tabindex="0" role="button" aria-label="Open ${w.title}">
            <div class="work-media" style="aspect-ratio:${w.ratio}">
                <img src="images/works/${w.src}.webp" alt="${w.title} — ${w.cat}" loading="${i < 3 ? 'eager' : 'lazy'}" decoding="async">
            </div>
            <figcaption class="work-cap">
                <div class="work-top"><span class="work-num">${pad2(i + 1)}</span><span class="work-cat">${w.cat}</span></div>
                <div class="work-bottom"><h3>${w.title}</h3><span class="work-tools">${w.tools}</span></div>
                <span class="work-arrow"><i data-lucide="arrow-up-right"></i></span>
            </figcaption>
        </figure>`).join('');

    grid.querySelectorAll('.work').forEach(el => {
        el.addEventListener('click', () => openLightbox(+el.dataset.index));
        el.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(+el.dataset.index); } });
    });
    const io = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    grid.querySelectorAll('.work').forEach(el => io.observe(el));

    if (!reducedMotion) {
        const imgs = [...grid.querySelectorAll('.work-media img')];
        const tick = () => {
            const vh = window.innerHeight;
            imgs.forEach(img => {
                const r = img.parentElement.getBoundingClientRect();
                if (r.bottom < 0 || r.top > vh) return;
                const t = (r.top + r.height / 2 - vh / 2) / vh;
                img.style.translate = `0 ${(-t * 24).toFixed(1)}px`;
            });
        };
        onScroll(tick); tick();
    }
    $('window')?.querySelector('.win-open')?.addEventListener('click', (e) => { e.stopPropagation(); openLightbox(FEATURED_INDEX); });
    $('window')?.addEventListener('click', () => openLightbox(FEATURED_INDEX));
}

function buildBand() {
    const track = $('band-track');
    if (!track) return;
    const items = BAND_WORDS.map((w, i) => `<span class="band-item ${i % 2 ? 'outline' : ''}">${w}</span><span class="band-star">✦</span>`).join('');
    track.innerHTML = `<div class="band-group">${items}</div><div class="band-group" aria-hidden="true">${items}</div>`;
    const band = $('band');
    if (band && !reducedMotion) {
        const drift = () => {
            const r = band.getBoundingClientRect();
            if (r.bottom < 0 || r.top > window.innerHeight) return;
            band.style.setProperty('--drift', `${(-(window.innerHeight - r.top) * 0.35).toFixed(1)}px`);
        };
        onScroll(drift); drift();
    }
}

function initStatement() {
    const el = $('statement-text');
    if (!el) return;
    el.querySelectorAll('em').forEach(em => { em.innerHTML = em.textContent.split(/\s+/).filter(Boolean).map(w => `<span class="w">${w}</span>`).join(' '); });
    [...el.childNodes].forEach(n => {
        if (n.nodeType !== 3 || !n.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(pt => {
            if (!pt) return;
            if (/^\s+$/.test(pt)) frag.appendChild(document.createTextNode(' '));
            else { const sp = document.createElement('span'); sp.className = 'w'; sp.textContent = pt; frag.appendChild(sp); }
        });
        n.replaceWith(frag);
    });
    const words = [...el.querySelectorAll('.w')];
    if (reducedMotion) { words.forEach(w => w.classList.add('on')); return; }
    const N = words.length;
    const update = () => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const p = clamp((vh * 0.85 - r.top) / (r.height + vh * 0.5), 0, 1);
        const lit = Math.round(p * (N + 1));
        words.forEach((w, i) => w.classList.toggle('on', i < lit));
    };
    onScroll(update); update();
}

function initFooterReveal() {
    const top = $('footer-top');
    if (!top) return;
    const splitChars = (el, lineIndex) => {
        const text = el.textContent;
        el.innerHTML = [...text].map((ch, i) => `<span class="char" style="--c:${i};--l:${lineIndex}">${ch === ' ' ? '&nbsp;' : ch}</span>`).join('');
    };
    top.querySelectorAll('#footer-q .line').forEach((line, li) => {
        const inner = document.createElement('span'); inner.className = 'splitline'; inner.textContent = line.textContent;
        line.textContent = ''; line.classList.add('splitline-mask'); line.style.setProperty('--l', li); line.appendChild(inner);
        splitChars(inner, li);
    });
    const label = $('footer-cta-label');
    if (label) splitChars(label, 2);
    if (reducedMotion) { top.classList.add('in'); return; }
    const io = new IntersectionObserver((en) => { if (en[0].isIntersecting) { top.classList.add('in'); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(top);
}

function initRows() {
    const rows = [...document.querySelectorAll('.row')];
    if (!rows.length || reducedMotion) return;
    const update = () => {
        rows.forEach(row => {
            const head = row.querySelector('.row-head').getBoundingClientRect();
            const body = row.querySelector('.row-body');
            const br = body.getBoundingClientRect();
            const cut = clamp(head.bottom - br.top, 0, br.height);
            body.style.clipPath = cut > 0.5 ? `inset(${cut.toFixed(1)}px 0 0 0)` : 'none';
            const t = clamp((br.height - cut) / Math.max(1, br.height), 0, 1);
            body.style.opacity = (0.35 + 0.65 * t).toFixed(3);
        });
    };
    onScroll(update); update();
}

function initCursor() {
    const cur = $('cursor');
    if (!cur || !window.matchMedia('(pointer: fine)').matches || reducedMotion) return;
    document.body.classList.add('has-cursor');
    let x = -100, y = -100, tx = x, ty = y;
    const classify = (t) => {
        const view = t?.closest?.('.work, .window');
        const link = t?.closest?.('a, button, .row-head, .chip, [role="button"]');
        cur.classList.toggle('is-view', !!view);
        cur.classList.toggle('is-link', !view && !!link);
    };
    window.addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; classify(e.target); }, { passive: true });
    onScroll(() => classify(document.elementFromPoint(tx, ty)));
    document.addEventListener('mouseleave', () => cur.classList.add('is-hidden'));
    document.addEventListener('mouseenter', () => cur.classList.remove('is-hidden'));
    const loop = () => {
        x = lerp(x, tx, 0.35); y = lerp(y, ty, 0.35);
        cur.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        requestAnimationFrame(loop);
    };
    loop();
}

function buildSkills() {
    const grid = $('skills-grid'), track = $('marquee-track');
    if (!grid) return;
    grid.innerHTML = SKILLS.map((s, i) => `
        <article class="skill" data-cat="${s.cat}" style="--brand:${s.brand};--w:${s.pct}%;--i:${i}" tabindex="0">
            <div class="skill-top">
                <span class="skill-icon">${s.icon}</span>
                <span class="skill-pct"><span class="num" data-target="${s.pct}">0</span>%</span>
            </div>
            <h3>${s.name}</h3>
            <p class="skill-meta">${s.meta}</p>
            <div class="skill-bar"><span class="skill-fill"></span></div>
            <div class="skill-foot"><span>${levelLabel(s.pct)}</span><span>${s.cat}</span></div>
        </article>`).join('');
    const pills = MORE_TOOLS.map(t => `<span class="tool-pill">${t}</span>`).join('');
    track.innerHTML = `<div class="marquee-group">${pills}</div><div class="marquee-group" aria-hidden="true">${pills}</div>`;
    const tiles = [...grid.querySelectorAll('.skill')];
    initSkillTilt(grid);
    const revealer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const t = entry.target;
            t.classList.add('in');
            countUp(t.querySelector('.num'), +t.style.getPropertyValue('--i') * 50 + 200);
            revealer.unobserve(t);
        });
    }, { threshold: 0.2 });
    tiles.forEach(t => revealer.observe(t));
    grid.addEventListener('pointermove', (e) => {
        const t = e.target.closest('.skill');
        if (!t) return;
        const r = t.getBoundingClientRect();
        t.style.setProperty('--mx', `${e.clientX - r.left}px`);
        t.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
    document.querySelectorAll('.skill-filters .chip').forEach(chip => {
        chip.addEventListener('click', () => {
            if (chip.classList.contains('active')) return;
            document.querySelector('.skill-filters .chip.active').classList.remove('active');
            chip.classList.add('active');
            filterSkills(grid, tiles, chip.dataset.filter);
        });
    });
}

const TILTS = [
    { rz: -14 }, { rz: 14 },
    { rx: 28, ny: -2 }, { rx: -28, ny: 2 },
    { ry: 32 }, { ry: -32 },
    { rz: -9, ry: 20, nx: -1 }, { rz: 9, ry: -20, nx: 1 },
    { rx: 18, rz: 8 }, { rx: -18, rz: -8 },
];
function initSkillTilt(grid) {
    let last = -1;
    grid.querySelectorAll('.skill').forEach(card => {
        const icon = card.querySelector('.skill-icon');
        card.addEventListener('pointerenter', () => {
            let k;
            do { k = Math.floor(Math.random() * TILTS.length); } while (k === last);
            last = k;
            const t = { rx: 0, ry: 0, rz: 0, nx: 0, ny: 0, ...TILTS[k] };
            const s = 0.75 + Math.random() * 0.5;
            icon.style.setProperty('--rx', `${(t.rx * s).toFixed(1)}deg`);
            icon.style.setProperty('--ry', `${(t.ry * s).toFixed(1)}deg`);
            icon.style.setProperty('--rz', `${(t.rz * s).toFixed(1)}deg`);
            icon.style.setProperty('--nx', `${(t.nx * s).toFixed(1)}px`);
            icon.style.setProperty('--ny', `${(t.ny * s).toFixed(1)}px`);
        });
    });
}

function countUp(el, delay) {
    const target = +el.dataset.target, duration = 1200;
    setTimeout(() => {
        const start = performance.now();
        const step = (now) => {
            const t = Math.min((now - start) / duration, 1);
            el.textContent = Math.round(target * (1 - Math.pow(1 - t, 4)));
            if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, delay);
}

function filterSkills(grid, tiles, cat) {
    const show = (t) => cat === 'all' || t.dataset.cat === cat;
    const first = new Map(tiles.map(t => [t, t.getBoundingClientRect()]));
    tiles.forEach(t => { t.classList.add('no-anim'); if (!show(t)) t.classList.add('is-out'); });
    setTimeout(() => {
        tiles.forEach(t => {
            const visible = show(t);
            t.hidden = !visible;
            if (visible && t.classList.contains('is-out')) t.classList.add('entering');
        });
        tiles.filter(show).forEach(t => {
            const last = t.getBoundingClientRect(), prev = first.get(t);
            if (!t.classList.contains('entering')) {
                const dx = prev.left - last.left, dy = prev.top - last.top;
                if (dx || dy) {
                    t.style.transition = 'none';
                    t.style.transform = `translate(${dx}px, ${dy}px)`;
                    t.getBoundingClientRect();
                    t.style.transition = ''; t.style.transform = '';
                }
            } else { t.getBoundingClientRect(); t.classList.remove('is-out', 'entering'); }
        });
    }, 260);
}

document.addEventListener('DOMContentLoaded', () => {
    initLogo();
    initFeatured();
    buildBand();
    buildWorks();
    buildSkills();
    initBrandMorph();
    initCursor();
    initRows();
    initFooterReveal();

    const words = ['Graphic Designer', 'Full Stack Developer', 'Visual Storyteller'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;
    const typingElement = $('typing-text');
    function typeEffect() {
        if (!typingElement) return;
        const currentWord = words[wordIdx];
        typingElement.textContent = currentWord.substring(0, isDeleting ? charIdx - 1 : charIdx + 1);
        charIdx += isDeleting ? -1 : 1;
        let speed = isDeleting ? 45 : 90;
        if (!isDeleting && charIdx === currentWord.length) { speed = 2200; isDeleting = true; }
        else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; speed = 450; }
        setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, reducedMotion ? 0 : 1400);

    const scrollTopBtn = $('scroll-to-top');
    onScroll(() => scrollTopBtn.classList.toggle('show', window.scrollY > 600));
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    const themeBtn = $('theme-toggle');
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light');
        themeBtn.innerHTML = `<i data-lucide="${document.body.classList.contains('light') ? 'moon' : 'sun'}"></i>`;
        lucide.createIcons();
    });

    const reveal = new IntersectionObserver((entries) => {
        entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-in'); reveal.unobserve(en.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('[data-reveal]').forEach(el => reveal.observe(el));

    const numerals = [...document.querySelectorAll('.sec-index')];
    onScroll(() => { const line = window.innerHeight * 0.55; numerals.forEach(h => h.classList.toggle('lit', h.getBoundingClientRect().top < line)); });

    initStatement();
    initRibbon();
    runScrollFns();
    runSmoothFns();
    lucide.createIcons();
});

function openLightbox(index) {
    currentImageIndex = index;
    const lb = $('lightbox');
    lb.style.display = 'flex';
    lb.setAttribute('aria-hidden', 'false');
    updateLightboxUI(false);
    requestAnimationFrame(() => lb.classList.add('open'));
    document.body.style.overflow = 'hidden';
}
function updateLightboxUI(animate = true) {
    const img = $('lb-img'), w = WORKS[currentImageIndex];
    if (!w) return;
    const apply = () => {
        img.src = `images/works/${w.src}.webp`;
        img.alt = `${w.title} — ${w.cat}`;
        $('lb-cap').textContent = w.title;
        $('lb-sub').textContent = `${w.cat} · ${w.tools}`;
        $('lb-count').textContent = `${pad2(currentImageIndex + 1)} / ${pad2(WORKS.length)}`;
        img.classList.remove('swap');
        const fit = () => { document.querySelector('.lb-meta').style.width = img.clientWidth ? `${img.clientWidth}px` : ''; };
        img.complete ? fit() : img.addEventListener('load', fit, { once: true });
    };
    if (animate && !reducedMotion) { img.classList.add('swap'); setTimeout(apply, 180); } else apply();
}
function changeImage(step) { currentImageIndex = (currentImageIndex + step + WORKS.length) % WORKS.length; updateLightboxUI(); }
function closeLightbox() {
    const lb = $('lightbox');
    lb.classList.remove('open');
    lb.setAttribute('aria-hidden', 'true');
    setTimeout(() => { lb.style.display = 'none'; }, 350);
    document.body.style.overflow = 'auto';
}
document.addEventListener('keydown', (e) => {
    if ($('lightbox').style.display === 'flex') {
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'Escape') closeLightbox();
    }
});
document.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox' || e.target.classList.contains('lb-content')) closeLightbox();
});
