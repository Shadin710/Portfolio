/* ============================================================
   THREE.JS NEURAL NETWORK BACKGROUND
   ============================================================ */
;(function () {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 65;

    const N = 90;
    const posArr  = new Float32Array(N * 3);
    const velFlat = new Float32Array(N * 3);

    for (let i = 0; i < N; i++) {
        posArr[i*3]   = (Math.random() - 0.5) * 130;
        posArr[i*3+1] = (Math.random() - 0.5) * 75;
        posArr[i*3+2] = (Math.random() - 0.5) * 35;
        velFlat[i*3]   = (Math.random() - 0.5) * 0.035;
        velFlat[i*3+1] = (Math.random() - 0.5) * 0.035;
        velFlat[i*3+2] = (Math.random() - 0.5) * 0.012;
    }

    // Points
    const ptGeom = new THREE.BufferGeometry();
    const ptAttr = new THREE.BufferAttribute(posArr, 3);
    ptAttr.setUsage(THREE.DynamicDrawUsage);
    ptGeom.setAttribute('position', ptAttr);
    const ptMat = new THREE.PointsMaterial({ color: 0x22D3EE, size: 0.7, transparent: true, opacity: 0.7 });
    scene.add(new THREE.Points(ptGeom, ptMat));

    // Lines
    const maxSegs = N * (N - 1) / 2;
    const lineArr  = new Float32Array(maxSegs * 6);
    const lineAttr = new THREE.BufferAttribute(lineArr, 3);
    lineAttr.setUsage(THREE.DynamicDrawUsage);
    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute('position', lineAttr);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x22D3EE, transparent: true, opacity: 0.16 });
    scene.add(new THREE.LineSegments(lineGeom, lineMat));

    const D = 22; // connection distance
    let mx = 0, my = 0;

    window.addEventListener('mousemove', e => {
        mx =  (e.clientX / window.innerWidth  - 0.5) * 18;
        my = -(e.clientY / window.innerHeight - 0.5) * 12;
    });

    function setColors() {
        const light = document.documentElement.hasAttribute('data-theme');
        const c = light ? 0x0891B2 : 0x22D3EE;
        ptMat.color.setHex(c);
        lineMat.color.setHex(c);
        ptMat.opacity   = light ? 0.45 : 0.7;
        lineMat.opacity = light ? 0.10 : 0.16;
    }

    window._setNeuralColors = setColors;

    (function frame() {
        requestAnimationFrame(frame);

        for (let i = 0; i < N; i++) {
            posArr[i*3]   += velFlat[i*3];
            posArr[i*3+1] += velFlat[i*3+1];
            posArr[i*3+2] += velFlat[i*3+2];
            if (Math.abs(posArr[i*3])   > 65) velFlat[i*3]   *= -1;
            if (Math.abs(posArr[i*3+1]) > 37) velFlat[i*3+1] *= -1;
            if (Math.abs(posArr[i*3+2]) > 17) velFlat[i*3+2] *= -1;
        }
        ptAttr.needsUpdate = true;

        let idx = 0;
        for (let i = 0; i < N; i++) {
            for (let j = i + 1; j < N; j++) {
                const dx = posArr[i*3] - posArr[j*3];
                const dy = posArr[i*3+1] - posArr[j*3+1];
                const dz = posArr[i*3+2] - posArr[j*3+2];
                if (Math.sqrt(dx*dx + dy*dy + dz*dz) < D) {
                    lineArr[idx++] = posArr[i*3];   lineArr[idx++] = posArr[i*3+1]; lineArr[idx++] = posArr[i*3+2];
                    lineArr[idx++] = posArr[j*3];   lineArr[idx++] = posArr[j*3+1]; lineArr[idx++] = posArr[j*3+2];
                }
            }
        }
        for (let k = idx; k < lineArr.length; k++) lineArr[k] = 0;
        lineAttr.needsUpdate = true;
        lineGeom.setDrawRange(0, idx / 3);

        camera.position.x += (mx - camera.position.x) * 0.025;
        camera.position.y += (my - camera.position.y) * 0.025;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
    })();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

/* ============================================================
   PAGE LOADER
   ============================================================ */
window.addEventListener('load', () => {
    setTimeout(() => {
        const loader = document.getElementById('page-loader');
        loader.classList.add('hide');
        setTimeout(() => loader.remove(), 700);
    }, 950);
});

/* ============================================================
   THEME TOGGLE
   ============================================================ */
let darkMode = true;
document.getElementById('themeBtn').addEventListener('click', function () {
    darkMode = !darkMode;
    this.textContent = darkMode ? '🌙' : '☀️';
    document.documentElement.toggleAttribute('data-theme', !darkMode);
    if (window._setNeuralColors) window._setNeuralColors();
});

/* ============================================================
   NAVIGATION
   ============================================================ */
const nav = document.getElementById('nav');
function syncNav() {
    nav.classList.toggle('scrolled', window.pageYOffset > 40);
    const secIds = ['hero','about','journey','projects','skills','contact'];
    let cur = 'hero';
    secIds.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.pageYOffset >= el.offsetTop - 140) cur = id;
    });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + cur);
    });
}
window.addEventListener('scroll', syncNav, { passive: true });
syncNav();

/* ============================================================
   MOBILE DRAWER
   ============================================================ */
const mobDrawer = document.getElementById('mobDrawer');
document.getElementById('mobBtn').addEventListener('click',   () => mobDrawer.classList.add('open'));
document.getElementById('mobClose').addEventListener('click', () => mobDrawer.classList.remove('open'));
mobDrawer.querySelectorAll('.mob-link').forEach(l => l.addEventListener('click', () => mobDrawer.classList.remove('open')));

/* ============================================================
   SMOOTH SCROLL
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); window.scrollTo({ top: t.offsetTop - 80, behavior: 'smooth' }); }
    });
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
const dot = document.getElementById('cDot');
const ring = document.getElementById('cRing');
let cx = -100, cy = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
(function cursorLoop() {
    dot.style.left  = cx + 'px'; dot.style.top  = cy + 'px';
    rx += (cx - rx) * 0.14;     ry += (cy - ry) * 0.14;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(cursorLoop);
})();
document.querySelectorAll('a, button, .sk-pill, .proj-card, .stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-grow'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-grow'));
});

/* ============================================================
   TYPING EFFECT
   ============================================================ */
const roles = ['Software Engineer', 'Backend Developer', 'ML & CV Engineer', 'Full-Stack Developer'];
let ri = 0, ci = 0, typing = true;
const roleEl = document.getElementById('role-text');
function typeRole() {
    const cur = roles[ri];
    if (typing) {
        roleEl.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) { typing = false; setTimeout(typeRole, 1900); }
        else setTimeout(typeRole, 80);
    } else {
        roleEl.textContent = cur.slice(0, --ci);
        if (ci === 0) { typing = true; ri = (ri+1) % roles.length; setTimeout(typeRole, 320); }
        else setTimeout(typeRole, 42);
    }
}
typeRole();

/* ============================================================
   INTERSECTION OBSERVER — fade-up & timeline
   ============================================================ */
const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.fu, .tl-item').forEach(el => io.observe(el));

/* ============================================================
   STATS COUNTER
   ============================================================ */
const statsIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.querySelectorAll('[data-count]').forEach(el => {
            const target = +el.dataset.count;
            let cur = 0;
            (function tick() {
                cur = Math.min(cur + target / 38, target);
                el.textContent = Math.ceil(cur) + '+';
                if (cur < target) requestAnimationFrame(tick);
            })();
        });
        statsIO.unobserve(e.target);
    });
}, { threshold: 0.5 });
const sr = document.querySelector('.stats-row');
if (sr) statsIO.observe(sr);

/* ============================================================
   PROJECT CARD 3D TILT
   ============================================================ */
document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const rx = ((e.clientY - r.top)  / r.height - 0.5) * 11;
        const ry = ((e.clientX - r.left) / r.width  - 0.5) * -11;
        card.style.transform = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
});

/* ============================================================
   SCROLL CUE FADE
   ============================================================ */
const scue = document.getElementById('scrollCue');
window.addEventListener('scroll', () => {
    if (scue) scue.style.opacity = window.pageYOffset > 160 ? '0' : '0.45';
}, { passive: true });

/* ============================================================
   CONTACT FORM
   ============================================================ */
document.getElementById('cForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('fSubmit');
    btn.textContent = 'Sending…'; btn.disabled = true;
    try {
        await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(new FormData(this)).toString()
        });
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
            document.getElementById('fSuccess').style.display = 'block';
        }, 300);
    } catch {
        btn.textContent = 'Send Message'; btn.disabled = false;
    }
});
