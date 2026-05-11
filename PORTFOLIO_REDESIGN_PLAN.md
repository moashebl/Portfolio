# 🚀 Portfolio Redesign Plan — Mohamed Alaa (MO)
### Complete Implementation Guide for AI Agent

---

## ⚠️ READ THIS FIRST — AGENT INSTRUCTIONS

You are editing a single `index.html` portfolio file. Apply **every change below in order**. Do NOT skip any step. Do NOT restructure existing sections — only apply the specific edits described. After all changes, the page must still have all original sections (Home, About, Skills, Experience, Projects, Contact) fully intact.

---

## 📋 SUMMARY OF ALL CHANGES

| # | Change | Priority |
|---|--------|----------|
| 1 | Global color palette — BetterStack-inspired black/dark | 🔴 CRITICAL |
| 2 | Animated neural network canvas hero background + bug fix | 🔴 CRITICAL |
| 3 | Scroll indicator redesign (pulse rings + arrow) | 🟡 HIGH |
| 4 | Terminal code — Python name printer | 🟡 HIGH |
| 5 | Nav glass effect | 🟢 MEDIUM |
| 6 | Section title fix | 🟢 MEDIUM |
| 7 | Info card hover effects | 🟢 MEDIUM |

---

# CHANGE 1 — GLOBAL COLOR PALETTE 🔴 CRITICAL

## Inspiration: Modern Dark Mode Aesthetic

A sleek developer-focused dark mode:
- Background is a deep, rich charcoal/almost black (`#0B0D12`).
- Surface/Card Backgrounds are a slightly lighter dark gray for elevation (`#13161F`).
- Primary Accent (Buttons/Links) is a vibrant Indigo/Blurple (`#5E6AD2`).
- Primary Text is Crisp White (`#FFFFFF`).
- Secondary Text is Muted Slate Gray (`#9CA3AF`).

## Exact Color Variables to Apply

Add the following `:root` block to the TOP of your `<style>` section, replacing any existing color variables:

```css
:root {
  /* ── BACKGROUNDS ── */
  --bg-base:        #0B0D12;   /* page background — true near-black */
  --bg-surface:     #13161F;   /* cards, panels, terminal */
  --bg-elevated:    #1f2433;   /* hover states, dropdowns */

  /* ── BORDERS ── */
  --border-subtle:  rgba(255, 255, 255, 0.05);  /* default border */
  --border-medium:  rgba(255, 255, 255, 0.1);  /* hover border */
  --border-strong:  rgba(94, 106, 210, 0.3);  /* active / focused */

  /* ── TEXT ── */
  --text-primary:   #FFFFFF;   /* main text — crisp white */
  --text-secondary: #9CA3AF;   /* labels, subtext */
  --text-dim:       #4B5563;   /* placeholders, disabled */

  /* ── ACCENT ── */
  --accent-indigo:     #5E6AD2;              /* THE only color accent */
  --accent-indigo-dim: rgba(94,106,210,0.15); /* glow backgrounds */
}
```

## Global Find-and-Replace Rules

Apply these across the ENTIRE `<style>` block and all inline styles:

### Backgrounds
| Old value | Replace with |
|---|---|
| `#0d1b2a` | `var(--bg-base)` |
| `#1b2c3e` | `var(--bg-surface)` |
| `#112236` | `var(--bg-elevated)` |
| `#0c1829` | `var(--bg-surface)` |
| `#060d1a` | `var(--bg-base)` |
| Any other dark navy hex | `var(--bg-base)` |

### Accent colors (ALL cyan/blue → green)
| Old value | Replace with |
|---|---|
| `#00d4ff` | `var(--accent-green)` |
| `#00c2ff` | `var(--accent-green)` |
| `#0077cc` | `var(--accent-green)` |
| `rgba(0, 194, 255, ...)` | `rgba(62, 207, 142, same-alpha)` |
| `rgba(0, 119, 204, ...)` | `rgba(255, 255, 255, 0.10)` |
| `color: cyan` | `color: var(--accent-green)` |

### Text
| Old value | Replace with |
|---|---|
| `color: #ffffff` | `color: var(--text-primary)` |
| `color: white` | `color: var(--text-primary)` |
| Gray text (`#9ca3af`, `#aaa`, `#999`) | `var(--text-secondary)` |

### Borders
| Old value | Replace with |
|---|---|
| `rgba(0, 194, 255, 0.12)` | `var(--border-subtle)` |
| `rgba(0, 194, 255, 0.35)` | `var(--border-medium)` |

## Element-Specific Rules

### body
```css
body {
  background-color: var(--bg-base);
  color: var(--text-primary);
}
```

### Buttons
```css
/* Primary CTA button */
.btn-primary, button.primary {
  background: var(--accent-green);
  color: #0a0a0b;
  border: none;
  padding: 11px 24px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: opacity 0.2s;
}
.btn-primary:hover { opacity: 0.88; }

/* Secondary outlined button */
.btn-secondary, button.secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-medium);
  padding: 11px 24px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}
.btn-secondary:hover {
  border-color: var(--border-strong);
  background: var(--bg-elevated);
}
```

### Nav links
```css
nav a { color: var(--text-secondary); transition: color 0.2s; }
nav a:hover { color: var(--text-primary); }
```

### Section titles
```css
h2, .section-title {
  color: var(--text-primary);
  font-weight: 700;
  letter-spacing: -0.02em;
}
.section-title::after {
  content: '';
  display: block;
  width: 28px;
  height: 2px;
  background: var(--accent-green);
  margin: 12px auto 0;
  border-radius: 1px;
}
```

### Cards
```css
.card, .info-card, .project-card {
  background: var(--bg-surface);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  transition: border-color 0.25s, background 0.25s, transform 0.25s;
}
.card:hover, .info-card:hover, .project-card:hover {
  border-color: var(--border-medium);
  background: var(--bg-elevated);
  transform: translateY(-3px);
}
```

---

# CHANGE 2 — NEURAL NETWORK CANVAS BACKGROUND 🔴 CRITICAL

## ⚠️ THE ANIMATION SLIDES DOWN BUG — ROOT CAUSE AND FIX

**Why it breaks:** If the hero `<section>` does not have `overflow: hidden`, the canvas (which is `position: absolute`) can escape the section boundaries and push layout content downward, causing the entire page to shift. This is the #1 critical fix.

**Three things MUST be true simultaneously:**
1. Hero section has `position: relative` + `overflow: hidden`
2. Canvas has `position: absolute; top:0; left:0; width:100%; height:100%; pointer-events:none`
3. All hero text/button content is in a wrapper with `position: relative; z-index: 1`

## Step 1 — Fix the Hero Section Tag

Find `<section id="home">` (or `<section id="hero">`) and change it to:

```html
<section id="home" style="position: relative; overflow: hidden; min-height: 100vh;">
```

## Step 2 — Add Canvas as First Child

Immediately after the opening `<section>` tag, before any other content, insert:

```html
<canvas id="neuralCanvas" style="
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  display: block;
  pointer-events: none;
"></canvas>
```

## Step 3 — Protect Hero Content

Find the `<div>` that wraps your hero text (name, subtitle, buttons). Add to it:

```html
style="position: relative; z-index: 1;"
```

Do the same for the terminal panel div (the code window on the right):

```html
style="position: relative; z-index: 1;"
```

If both are inside a flex/grid container div, just add `position: relative; z-index: 1;` to that container.

## Step 4 — Add to CSS

```css
#home { cursor: none; }
```

## Step 5 — Full Canvas JavaScript

Paste this entire block just before the closing `</body>` tag:

```javascript
(function () {
  const canvas = document.getElementById('neuralCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, nodes = [];
  let mouse = { x: -9999, y: -9999 };

  const CFG = {
    count:    85,
    range:    150,
    nearEdge: 55,
    mRadius:  125,
    mForce:   0.055,
    speed:    0.35,
    maxV:     1.1,
    friction: 0.994,
    jitter:   0.018,
    rMin:     1.4,
    rMax:     2.8,
    bg:       '#0a0a0b',
  };

  function resize() {
    const rect = canvas.parentElement.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    W = canvas.width  = rect.width  * dpr;
    H = canvas.height = rect.height * dpr;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    W /= dpr;
    H /= dpr;
  }

  function mkNode() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * CFG.speed,
      vy:    (Math.random() - 0.5) * CFG.speed,
      r:     Math.random() * (CFG.rMax - CFG.rMin) + CFG.rMin,
      phase: Math.random() * Math.PI * 2,
    };
  }

  function init() { resize(); nodes = Array.from({ length: CFG.count }, mkNode); }

  // Attach to parent SECTION so mousemove works even though canvas has pointer-events:none
  const sec = canvas.parentElement;
  sec.addEventListener('mousemove', e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  sec.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });
  window.addEventListener('resize', init);

  function draw() {
    const t = performance.now() * 0.001;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = CFG.bg;
    ctx.fillRect(0, 0, W, H);

    // Physics update
    for (const n of nodes) {
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const d2 = dx * dx + dy * dy, mR2 = CFG.mRadius * CFG.mRadius;
      if (d2 < mR2 && d2 > 0.01) {
        const d = Math.sqrt(d2), f = (CFG.mRadius - d) / CFG.mRadius * CFG.mForce;
        n.vx += dx / d * f;
        n.vy += dy / d * f;
      }
      const v = Math.sqrt(n.vx * n.vx + n.vy * n.vy);
      if (v > CFG.maxV) { n.vx = n.vx / v * CFG.maxV; n.vy = n.vy / v * CFG.maxV; }
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0) { n.x = 0; n.vx = Math.abs(n.vx); }
      if (n.x > W) { n.x = W; n.vx = -Math.abs(n.vx); }
      if (n.y < 0) { n.y = 0; n.vy = Math.abs(n.vy); }
      if (n.y > H) { n.y = H; n.vy = -Math.abs(n.vy); }
      n.vx = n.vx * CFG.friction + (Math.random() - 0.5) * CFG.jitter;
      n.vy = n.vy * CFG.friction + (Math.random() - 0.5) * CFG.jitter;
    }

    // Draw edges
    const rng2 = CFG.range * CFG.range;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
        const d2 = dx * dx + dy * dy;
        if (d2 < rng2) {
          const d = Math.sqrt(d2), a = (1 - d / CFG.range) * 0.6, near = d < CFG.nearEdge;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = near
            ? `rgba(255,255,255,${(a * 0.9).toFixed(2)})`
            : `rgba(255,255,255,${(a * 0.3).toFixed(2)})`;
          ctx.lineWidth = near ? 0.7 : 0.35;
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (const n of nodes) {
      const dx = mouse.x - n.x, dy = mouse.y - n.y;
      const near = (dx * dx + dy * dy) < (CFG.mRadius * CFG.mRadius);
      const r = near ? n.r + Math.sin(t * 4.5 + n.phase) * 1.1 : n.r;
      if (near) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, r + 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240,240,239,0.10)';
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = near ? 'rgba(240,240,239,0.92)' : 'rgba(255,255,255,0.20)';
      ctx.fill();
    }

    // Custom green cursor dot
    if (mouse.x > 0 && mouse.x < W) {
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 12, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(62,207,142,0.18)';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(62,207,142,0.95)';
      ctx.fill();
    }

    requestAnimationFrame(draw);
  }

  // 50ms delay ensures DOM has finished sizing before reading getBoundingClientRect
  setTimeout(() => { init(); draw(); }, 50);
})();
```

---

# CHANGE 3 — SCROLL INDICATOR 🟡 HIGH

Find the existing scroll down indicator (the circle/arrow at the bottom of the hero). Replace it entirely with:

```html
<div style="position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;width:48px;height:48px;z-index:2;cursor:pointer;">
  <div style="position:absolute;width:44px;height:44px;border:1.5px solid rgba(62,207,142,0.7);border-radius:50%;animation:scrollPulse 2.2s ease-out infinite;"></div>
  <div style="position:absolute;width:44px;height:44px;border:1.5px solid rgba(62,207,142,0.4);border-radius:50%;animation:scrollPulse 2.2s ease-out infinite;animation-delay:0.8s;"></div>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(62,207,142,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:scrollBounce 1.6s ease-in-out infinite;position:relative;z-index:1;">
    <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
  </svg>
</div>
```

Add to `<style>`:

```css
@keyframes scrollPulse {
  0%   { transform: scale(0.75); opacity: 0.85; }
  100% { transform: scale(2.0);  opacity: 0; }
}
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(7px); }
}
```

---

# CHANGE 4 — TERMINAL CODE: PYTHON NAME PRINTER 🟡 HIGH

## Terminal Header Label

Find the terminal header bar label text and change it to:
```
mo@portfolio:~/projects
```

## Terminal Code Content

Replace the entire code content inside the terminal body with this HTML (with syntax highlighting spans):

```html
<span style="color:#c792ea">import</span> <span style="color:#82aaff">time</span>
<span style="color:#c792ea">import</span> <span style="color:#82aaff">sys</span>

<span style="color:#c792ea">def</span> <span style="color:#82aaff">print_name</span>():
    frames = [
        <span style="color:#c3e88d">"███╗   ███╗  ██████╗ "</span>,
        <span style="color:#c3e88d">"████╗ ████║ ██╔═══██╗"</span>,
        <span style="color:#c3e88d">"██╔████╔██║ ██║   ██║"</span>,
        <span style="color:#c3e88d">"██║╚██╔╝██║ ██║   ██║"</span>,
        <span style="color:#c3e88d">"██║ ╚═╝ ██║ ╚██████╔╝"</span>,
        <span style="color:#c3e88d">"╚═╝     ╚═╝  ╚═════╝ "</span>,
    ]
    <span style="color:#c792ea">for</span> line <span style="color:#c792ea">in</span> frames:
        <span style="color:#82aaff">print</span>(line)
        <span style="color:#82aaff">time</span>.sleep(<span style="color:#f78c6c">0.07</span>)
    <span style="color:#82aaff">print</span>()
    <span style="color:#82aaff">print</span>(<span style="color:#c3e88d">"  Mohamed Alaa Shebl"</span>)
    <span style="color:#82aaff">print</span>(<span style="color:#c3e88d">"  Software Engineer — Istanbul, Turkey"</span>)

<span style="color:#82aaff">print_name</span>()

<span style="color:#4a5568"># Output:</span>
<span style="color:#3ecf8e">███╗   ███╗  ██████╗ </span>
<span style="color:#3ecf8e">████╗ ████║ ██╔═══██╗</span>
<span style="color:#3ecf8e">██╔████╔██║ ██║   ██║</span>
<span style="color:#3ecf8e">██║╚██╔╝██║ ██║   ██║</span>
<span style="color:#3ecf8e">██║ ╚═╝ ██║ ╚██████╔╝</span>
<span style="color:#3ecf8e">╚═╝     ╚═╝  ╚═════╝ </span>
<span style="color:#f0f0ef">  Mohamed Alaa Shebl</span>
<span style="color:#8a8a8e">  Software Engineer — Istanbul, Turkey</span>
```

## Terminal Window CSS

```css
.terminal {
  background: #111113;
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 10px;
  overflow: hidden;
  font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.65;
}
.terminal-header {
  background: #1a1a1d;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  padding: 10px 16px;
  display: flex;
  align-items: center;
  gap: 7px;
}
.terminal-dot { width:12px; height:12px; border-radius:50%; }
.terminal-dot.red    { background: #ff5f57; }
.terminal-dot.yellow { background: #ffbd2e; }
.terminal-dot.green  { background: #28c840; }
.terminal-label { color: #4a4a50; font-size: 12px; margin-left: 6px; }
.terminal-body  { padding: 20px; color: #e8e8e6; }
```

---

# CHANGES 5–7 — NAV, TITLES, CARDS 🟢 MEDIUM

These are already fully covered within Change 1. Just confirm:

**Nav:**
```css
nav {
  background: rgba(10,10,11,0.82);
  backdrop-filter: blur(20px) saturate(1.2);
  -webkit-backdrop-filter: blur(20px) saturate(1.2);
  border-bottom: 1px solid rgba(255,255,255,0.07);
}
```

**Section titles (h2):** color `#f0f0ef`, green `#3ecf8e` 28px underline via `::after`

**Cards:** `background: #111113`, `border: 1px solid rgba(255,255,255,0.07)`, hover → `#1a1a1d` bg + `rgba(255,255,255,0.13)` border + `translateY(-3px)`

---

# 📋 MASTER AGENT PROMPT (copy-paste ready)

```
You are editing my portfolio (index.html). Apply ALL changes below. Do not remove any sections.

━━━ CHANGE 1: COLOR PALETTE ━━━

Add to top of <style>:
:root {
  --bg-base: #0a0a0b;
  --bg-surface: #111113;
  --bg-elevated: #1a1a1d;
  --border-subtle: rgba(255,255,255,0.07);
  --border-medium: rgba(255,255,255,0.13);
  --border-strong: rgba(255,255,255,0.22);
  --text-primary: #f0f0ef;
  --text-secondary: #8a8a8e;
  --text-dim: #4a4a50;
  --accent-green: #3ecf8e;
  --accent-green-dim: rgba(62,207,142,0.12);
}

Replace all old dark navy backgrounds (#0d1b2a, #1b2c3e, #0c1829, #060d1a etc.) with var(--bg-base) or var(--bg-surface).
Replace all cyan/blue accents (#00d4ff, #00c2ff, rgba(0,194,255,...)) with var(--accent-green) or rgba(62,207,142,...).
Set body { background: var(--bg-base); color: var(--text-primary); }
Nav: background:rgba(10,10,11,0.82); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.07);
Primary button: background:var(--accent-green); color:#0a0a0b; font-weight:700;
Secondary button: background:transparent; border:1px solid var(--border-medium); color:var(--text-primary);
Cards: background:#111113; border:1px solid rgba(255,255,255,0.07); border-radius:12px;
Card hover: border-color:rgba(255,255,255,0.13); background:#1a1a1d; transform:translateY(-3px);
h2/.section-title: color:#f0f0ef; font-weight:700; letter-spacing:-0.02em; + ::after{width:28px;height:2px;background:#3ecf8e;margin:12px auto 0;}

━━━ CHANGE 2: NEURAL CANVAS HERO BACKGROUND ━━━

CRITICAL BUG FIX — must apply all 4 of these or animation breaks:
1. Hero section tag: <section id="home" style="position:relative;overflow:hidden;min-height:100vh;">
2. First child of hero section: <canvas id="neuralCanvas" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;display:block;pointer-events:none;"></canvas>
3. Hero content wrapper div: add style="position:relative;z-index:1;"
4. CSS: #home { cursor: none; }

Then paste before </body>:
(function(){
  const canvas=document.getElementById('neuralCanvas');
  if(!canvas)return;
  const ctx=canvas.getContext('2d');
  let W,H,nodes=[],mouse={x:-9999,y:-9999};
  const CFG={count:85,range:150,nearEdge:55,mRadius:125,mForce:0.055,speed:0.35,maxV:1.1,friction:0.994,jitter:0.018,rMin:1.4,rMax:2.8,bg:'#0a0a0b'};
  function resize(){const rect=canvas.parentElement.getBoundingClientRect(),dpr=window.devicePixelRatio||1;W=canvas.width=rect.width*dpr;H=canvas.height=rect.height*dpr;ctx.setTransform(1,0,0,1,0,0);ctx.scale(dpr,dpr);W/=dpr;H/=dpr;}
  function mkNode(){return{x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*CFG.speed,vy:(Math.random()-.5)*CFG.speed,r:Math.random()*(CFG.rMax-CFG.rMin)+CFG.rMin,phase:Math.random()*Math.PI*2};}
  function init(){resize();nodes=Array.from({length:CFG.count},mkNode);}
  const sec=canvas.parentElement;
  sec.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  sec.addEventListener('mouseleave',()=>{mouse.x=-9999;mouse.y=-9999;});
  window.addEventListener('resize',init);
  function draw(){
    const t=performance.now()*.001;
    ctx.clearRect(0,0,W,H);ctx.fillStyle=CFG.bg;ctx.fillRect(0,0,W,H);
    for(const n of nodes){
      const dx=mouse.x-n.x,dy=mouse.y-n.y,d2=dx*dx+dy*dy,mR2=CFG.mRadius*CFG.mRadius;
      if(d2<mR2&&d2>.01){const d=Math.sqrt(d2),f=(CFG.mRadius-d)/CFG.mRadius*CFG.mForce;n.vx+=dx/d*f;n.vy+=dy/d*f;}
      const v=Math.sqrt(n.vx*n.vx+n.vy*n.vy);
      if(v>CFG.maxV){n.vx=n.vx/v*CFG.maxV;n.vy=n.vy/v*CFG.maxV;}
      n.x+=n.vx;n.y+=n.vy;
      if(n.x<0){n.x=0;n.vx=Math.abs(n.vx);}if(n.x>W){n.x=W;n.vx=-Math.abs(n.vx);}
      if(n.y<0){n.y=0;n.vy=Math.abs(n.vy);}if(n.y>H){n.y=H;n.vy=-Math.abs(n.vy);}
      n.vx=n.vx*CFG.friction+(Math.random()-.5)*CFG.jitter;
      n.vy=n.vy*CFG.friction+(Math.random()-.5)*CFG.jitter;
    }
    const rng2=CFG.range*CFG.range;
    for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){
      const dx=nodes[i].x-nodes[j].x,dy=nodes[i].y-nodes[j].y,d2=dx*dx+dy*dy;
      if(d2<rng2){const d=Math.sqrt(d2),a=(1-d/CFG.range)*.6,near=d<CFG.nearEdge;
        ctx.beginPath();ctx.moveTo(nodes[i].x,nodes[i].y);ctx.lineTo(nodes[j].x,nodes[j].y);
        ctx.strokeStyle=near?`rgba(255,255,255,${(a*.9).toFixed(2)})`:`rgba(255,255,255,${(a*.3).toFixed(2)})`;
        ctx.lineWidth=near?.7:.35;ctx.stroke();}
    }
    for(const n of nodes){
      const dx=mouse.x-n.x,dy=mouse.y-n.y,near=(dx*dx+dy*dy)<(CFG.mRadius*CFG.mRadius);
      const r=near?n.r+Math.sin(t*4.5+n.phase)*1.1:n.r;
      if(near){ctx.beginPath();ctx.arc(n.x,n.y,r+5,0,Math.PI*2);ctx.fillStyle='rgba(240,240,239,0.10)';ctx.fill();}
      ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2);
      ctx.fillStyle=near?'rgba(240,240,239,0.92)':'rgba(255,255,255,0.20)';ctx.fill();
    }
    if(mouse.x>0&&mouse.x<W){
      ctx.beginPath();ctx.arc(mouse.x,mouse.y,12,0,Math.PI*2);ctx.fillStyle='rgba(62,207,142,0.18)';ctx.fill();
      ctx.beginPath();ctx.arc(mouse.x,mouse.y,4,0,Math.PI*2);ctx.fillStyle='rgba(62,207,142,0.95)';ctx.fill();
    }
    requestAnimationFrame(draw);
  }
  setTimeout(()=>{init();draw();},50);
})();

━━━ CHANGE 3: SCROLL INDICATOR ━━━

Replace existing scroll indicator with:
<div style="position:absolute;bottom:36px;left:50%;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;width:48px;height:48px;z-index:2;cursor:pointer;">
  <div style="position:absolute;width:44px;height:44px;border:1.5px solid rgba(62,207,142,0.7);border-radius:50%;animation:scrollPulse 2.2s ease-out infinite;"></div>
  <div style="position:absolute;width:44px;height:44px;border:1.5px solid rgba(62,207,142,0.4);border-radius:50%;animation:scrollPulse 2.2s ease-out infinite;animation-delay:0.8s;"></div>
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(62,207,142,0.9)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="animation:scrollBounce 1.6s ease-in-out infinite;position:relative;z-index:1;"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>
</div>

Add to <style>:
@keyframes scrollPulse{0%{transform:scale(0.75);opacity:0.85;}100%{transform:scale(2.0);opacity:0;}}
@keyframes scrollBounce{0%,100%{transform:translateY(0);}50%{transform:translateY(7px);}}

━━━ CHANGE 4: TERMINAL CODE ━━━

Terminal header label → "mo@portfolio:~/projects"

Replace terminal code body content with:
<span style="color:#c792ea">import</span> <span style="color:#82aaff">time</span>
<span style="color:#c792ea">import</span> <span style="color:#82aaff">sys</span>

<span style="color:#c792ea">def</span> <span style="color:#82aaff">print_name</span>():
    frames = [
        <span style="color:#c3e88d">"███╗   ███╗  ██████╗ "</span>,
        <span style="color:#c3e88d">"████╗ ████║ ██╔═══██╗"</span>,
        <span style="color:#c3e88d">"██╔████╔██║ ██║   ██║"</span>,
        <span style="color:#c3e88d">"██║╚██╔╝██║ ██║   ██║"</span>,
        <span style="color:#c3e88d">"██║ ╚═╝ ██║ ╚██████╔╝"</span>,
        <span style="color:#c3e88d">"╚═╝     ╚═╝  ╚═════╝ "</span>,
    ]
    <span style="color:#c792ea">for</span> line <span style="color:#c792ea">in</span> frames:
        <span style="color:#82aaff">print</span>(line)
        <span style="color:#82aaff">time</span>.sleep(<span style="color:#f78c6c">0.07</span>)
    <span style="color:#82aaff">print</span>()
    <span style="color:#82aaff">print</span>(<span style="color:#c3e88d">"  Mohamed Alaa Shebl"</span>)
    <span style="color:#82aaff">print</span>(<span style="color:#c3e88d">"  Software Engineer — Istanbul, Turkey"</span>)

<span style="color:#82aaff">print_name</span>()

<span style="color:#4a5568"># Output:</span>
<span style="color:#3ecf8e">███╗   ███╗  ██████╗ </span>
<span style="color:#3ecf8e">████╗ ████║ ██╔═══██╗</span>
<span style="color:#3ecf8e">██╔████╔██║ ██║   ██║</span>
<span style="color:#3ecf8e">██║╚██╔╝██║ ██║   ██║</span>
<span style="color:#3ecf8e">██║ ╚═╝ ██║ ╚██████╔╝</span>
<span style="color:#3ecf8e">╚═╝     ╚═╝  ╚═════╝ </span>
<span style="color:#f0f0ef">  Mohamed Alaa Shebl</span>
<span style="color:#8a8a8e">  Software Engineer — Istanbul, Turkey</span>

Terminal CSS: background:#111113; border:1px solid rgba(255,255,255,0.07); font-family:'JetBrains Mono','Fira Code',monospace;
Terminal header: background:#1a1a1d; border-bottom:1px solid rgba(255,255,255,0.07);
```

---

*Portfolio Redesign Plan — Mohamed Alaa (MO) — May 2026*
