"use client";

import { useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   PS5-INSPIRED AMBIENT BACKGROUND

   Design rule: everything decorative lives in the side gutters or
   below the fold line. The centre column — where the content is —
   stays calm so text always reads first.

   Layers (back → front)
     1. Volumetric light pools    — slow breathing console ambience
     2. Perspective horizon grid  — game-world depth, scroll-reactive
     3. Hex mesh                  — far HUD texture, edge-weighted
     4. PlayStation symbols       — upright, drifting, gutters only
     5. Circuit traces            — data streams down the gutters
     6. Scan sweep + calm mask    — readability pass
   ═══════════════════════════════════════════════════════════════ */

const CYAN = [0, 229, 255] as const;
const VIOLET = [168, 85, 247] as const;
const GREEN = [34, 197, 94] as const;
const AMBER = [251, 191, 36] as const;

type RGB = readonly [number, number, number];

const rgba = (c: RGB, a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const smoothstep = (edge0: number, edge1: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
};

type SymType = "cross" | "circle" | "triangle" | "square";

/** Authentic PlayStation face-button colour mapping, tuned to the site palette. */
const SYM_COLORS: Record<SymType, RGB> = {
  cross: CYAN,
  circle: AMBER,
  triangle: GREEN,
  square: VIOLET,
};

/** Draws a face-button glyph centred on the current origin. Always upright. */
function drawSymbol(ctx: CanvasRenderingContext2D, type: SymType, size: number) {
  const s = size / 2;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();

  switch (type) {
    case "cross": {
      const k = s * 0.7;
      ctx.moveTo(-k, -k);
      ctx.lineTo(k, k);
      ctx.moveTo(k, -k);
      ctx.lineTo(-k, k);
      break;
    }
    case "circle":
      ctx.arc(0, 0, s * 0.78, 0, Math.PI * 2);
      break;
    case "triangle": {
      const r = s * 0.92;
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.866, r * 0.52);
      ctx.lineTo(-r * 0.866, r * 0.52);
      ctx.closePath();
      break;
    }
    case "square": {
      const k = s * 0.66;
      ctx.rect(-k, -k, k * 2, k * 2);
      break;
    }
  }

  ctx.stroke();
}

function pathHex(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 6;
    const px = x + Math.cos(a) * r;
    const py = y + Math.sin(a) * r;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  }
  ctx.closePath();
}

export default function GamingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = window.innerWidth;
    let H = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    /* ── Content safe zone ───────────────────────────────────────
       Mirrors the `max-w-7xl` (1280px) content column. Decoration
       fades out before it reaches the text.                       */
    let contentHalf = 0;
    let gutterStart = 0;
    let gutterFull = 0;

    const measure = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      contentHalf = Math.min(W * 0.5, 660);
      gutterStart = contentHalf * 0.68;
      gutterFull = contentHalf * 1.02;
    };

    measure();

    /** 0 over the content column, 1 out in the gutters. */
    const gutter = (x: number) => smoothstep(gutterStart, gutterFull, Math.abs(x - W / 2));
    /** Keeps decoration clear of the fixed navbar and the very bottom edge. */
    const verticalFade = (y: number) => smoothstep(60, 170, y) * (1 - smoothstep(H - 90, H + 10, y));

    // ── Pointer / scroll state (smoothed) ──────────────────────
    let mx = W / 2;
    let my = H * 0.35;
    let px = 0; // -0.5 … 0.5
    let py = 0;
    let pxs = 0;
    let pys = 0;
    let scrollY = 0;
    let scrollSmooth = 0;

    // ── 1. Volumetric light pools ──────────────────────────────
    const pools = [
      { c: CYAN, ox: 0.16, oy: 0.1, ax: 0.07, ay: 0.05, sp: 0.055, ph: 0, r: 0.62, a: 0.1 },
      { c: VIOLET, ox: 0.85, oy: 0.14, ax: 0.06, ay: 0.06, sp: 0.043, ph: 2.1, r: 0.58, a: 0.09 },
      { c: GREEN, ox: 0.55, oy: 0.86, ax: 0.09, ay: 0.04, sp: 0.032, ph: 4.2, r: 0.5, a: 0.05 },
    ];

    // ── 3. Hex mesh ────────────────────────────────────────────
    interface Hex {
      x: number;
      y: number;
      r: number;
      phase: number;
      c: RGB;
    }
    let hexes: Hex[] = [];

    const buildHexes = () => {
      hexes = [];
      const r = Math.max(46, Math.min(78, W / 22));
      const stepX = r * 1.74;
      const stepY = r * 1.5;
      const palette: RGB[] = [CYAN, VIOLET, GREEN];
      for (let row = -1; row * stepY < H + stepY; row++) {
        for (let col = -1; col * stepX < W + stepX; col++) {
          const x = col * stepX + (row % 2 ? stepX / 2 : 0);
          const y = row * stepY;
          hexes.push({
            x,
            y,
            r,
            phase: (col * 0.7 + row * 1.3) % (Math.PI * 2),
            c: palette[(col + row * 2 + 30) % 3],
          });
        }
      }
    };
    buildHexes();

    // ── 4. PlayStation symbols ─────────────────────────────────
    interface Sym {
      x: number;
      y: number;
      type: SymType;
      size: number;
      layer: 0 | 1 | 2;
      alpha: number;
      target: number;
      vy: number;
      swayPhase: number;
      swayAmp: number;
      tiltPhase: number;
      life: number;
      span: number;
    }

    const TYPES: SymType[] = ["cross", "circle", "triangle", "square"];
    const LAYER_ALPHA = [0.055, 0.095, 0.15];

    const spawnX = () => {
      const side = Math.random() < 0.5 ? -1 : 1;
      const band = Math.max(60, W / 2 - gutterStart);
      return W / 2 + side * (gutterStart + Math.random() * band);
    };

    const makeSym = (seedY?: number): Sym => {
      const layer = Math.floor(Math.random() * 3) as 0 | 1 | 2;
      const size = layer === 0 ? 16 + Math.random() * 8 : layer === 1 ? 26 + Math.random() * 12 : 40 + Math.random() * 22;
      const span = 620 + Math.random() * 520;
      return {
        x: spawnX(),
        y: seedY ?? H + size,
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        size,
        layer,
        alpha: 0,
        target: LAYER_ALPHA[layer] * (0.75 + Math.random() * 0.5),
        vy: -(0.09 + layer * 0.05 + Math.random() * 0.05),
        swayPhase: Math.random() * Math.PI * 2,
        swayAmp: 6 + Math.random() * 14,
        tiltPhase: Math.random() * Math.PI * 2,
        life: Math.random() * span,
        span,
      };
    };

    let symbols: Sym[] = [];
    let traces: Trace[] = [];

    // ── 5. Circuit traces ──────────────────────────────────────
    interface Trace {
      x: number;
      y: number;
      len: number;
      speed: number;
      alpha: number;
      c: RGB;
    }

    const makeTrace = (seed = false): Trace => ({
      x: Math.round(spawnX()),
      y: seed ? Math.random() * H : -Math.random() * H * 0.6,
      len: 90 + Math.random() * 220,
      speed: 0.8 + Math.random() * 1.9,
      alpha: 0.1 + Math.random() * 0.18,
      c: Math.random() < 0.72 ? CYAN : VIOLET,
    });

    const buildAgents = () => {
      const mobile = W < 768;
      const symCount = mobile ? 8 : W < 1280 ? 14 : 20;
      const traceCount = mobile ? 3 : W < 1280 ? 5 : 8;
      symbols = Array.from({ length: symCount }, () => makeSym(Math.random() * H));
      traces = Array.from({ length: traceCount }, () => makeTrace(true));
    };
    buildAgents();

    // ── Events ─────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      px = mx / W - 0.5;
      py = my / H - 0.5;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    let resizeTimer: number | undefined;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measure();
        buildHexes();
        buildAgents();
        if (reduced) render(0);
      }, 140);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // ── Render ─────────────────────────────────────────────────
    let scan = 0;

    function render(t: number) {
      ctx!.clearRect(0, 0, W, H);

      pxs += (px - pxs) * 0.045;
      pys += (py - pys) * 0.045;
      scrollSmooth += (scrollY - scrollSmooth) * 0.08;

      ctx!.globalCompositeOperation = "lighter";

      /* ── 1. Volumetric light pools ───────────────────────── */
      for (const p of pools) {
        const cx = W * p.ox + Math.sin(t * p.sp + p.ph) * W * p.ax + pxs * 26;
        const cy = H * p.oy + Math.cos(t * p.sp * 0.8 + p.ph) * H * p.ay + pys * 18;
        const r = Math.max(W, H) * p.r;
        const breathe = 0.8 + Math.sin(t * 0.22 + p.ph) * 0.2;
        const g = ctx!.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, rgba(p.c, p.a * breathe));
        g.addColorStop(0.42, rgba(p.c, p.a * breathe * 0.28));
        g.addColorStop(1, rgba(p.c, 0));
        ctx!.fillStyle = g;
        ctx!.fillRect(0, 0, W, H);
      }

      /* ── 2. Perspective horizon grid ─────────────────────── */
      const horizon = H * 0.68;
      const depth = H - horizon;
      const vpX = W / 2 + pxs * 46;

      ctx!.save();
      ctx!.translate(0, pys * 8);
      ctx!.lineWidth = 1;

      // converging rails
      const RAILS = 22;
      for (let i = -RAILS; i <= RAILS; i++) {
        const bx = W / 2 + (i / RAILS) * W * 1.35;
        const edge = smoothstep(0.12, 0.85, Math.abs(i) / RAILS);
        const a = 0.035 + edge * 0.055;
        const g = ctx!.createLinearGradient(0, horizon, 0, H);
        g.addColorStop(0, rgba(CYAN, 0));
        g.addColorStop(1, rgba(CYAN, a));
        ctx!.strokeStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(vpX, horizon);
        ctx!.lineTo(bx, H);
        ctx!.stroke();
      }

      // forward-scrolling rungs — speed reacts to page scroll
      const ROWS = 13;
      const phase = ((t * 0.045 + scrollSmooth * 0.0009) % 1 + 1) % 1;
      for (let i = 0; i < ROWS; i++) {
        const p = (i / ROWS + phase) % 1;
        const y = horizon + depth * p * p * p;
        const a = p * 0.075;
        const g = ctx!.createLinearGradient(0, 0, W, 0);
        g.addColorStop(0, rgba(CYAN, a));
        g.addColorStop(0.5, rgba(CYAN, a * 0.22));
        g.addColorStop(1, rgba(CYAN, a));
        ctx!.strokeStyle = g;
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(W, y);
        ctx!.stroke();
      }

      // horizon glow
      const hg = ctx!.createLinearGradient(0, horizon - 90, 0, horizon + 4);
      hg.addColorStop(0, rgba(CYAN, 0));
      hg.addColorStop(1, rgba(CYAN, 0.05));
      ctx!.fillStyle = hg;
      ctx!.fillRect(0, horizon - 90, W, 94);
      ctx!.restore();

      /* ── 3. Hex mesh ─────────────────────────────────────── */
      ctx!.save();
      ctx!.translate(pxs * 10, pys * 6 - (scrollSmooth * 0.012) % 90);
      ctx!.lineWidth = 1;
      for (const h of hexes) {
        const g = gutter(h.x + pxs * 10);
        const edgeY = 1 - smoothstep(H * 0.18, H * 0.6, h.y);
        const weight = Math.max(g * 0.85, edgeY * 0.5);
        if (weight < 0.03) continue;
        const pulse = 0.5 + Math.sin(t * 0.5 + h.phase) * 0.5;
        const dist = Math.hypot(h.x - mx, h.y - my);
        const focus = Math.max(0, 1 - dist / 320);
        const a = weight * (0.016 + pulse * 0.012) + focus * 0.05;
        ctx!.strokeStyle = rgba(h.c, a);
        pathHex(ctx!, h.x, h.y, h.r);
        ctx!.stroke();
      }
      ctx!.restore();

      /* ── 5. Circuit traces (behind the symbols) ──────────── */
      for (const tr of traces) {
        tr.y += tr.speed;
        if (tr.y - tr.len > H) {
          Object.assign(tr, makeTrace());
          continue;
        }
        const w = gutter(tr.x) * verticalFade(tr.y);
        if (w < 0.04) continue;
        const top = tr.y - tr.len;
        const g = ctx!.createLinearGradient(0, top, 0, tr.y);
        g.addColorStop(0, rgba(tr.c, 0));
        g.addColorStop(1, rgba(tr.c, tr.alpha * w));
        ctx!.strokeStyle = g;
        ctx!.lineWidth = 1;
        ctx!.beginPath();
        ctx!.moveTo(tr.x, top);
        ctx!.lineTo(tr.x, tr.y);
        ctx!.stroke();

        ctx!.fillStyle = rgba(tr.c, Math.min(0.55, tr.alpha * 2.6 * w));
        ctx!.beginPath();
        ctx!.arc(tr.x, tr.y, 1.4, 0, Math.PI * 2);
        ctx!.fill();
      }

      /* ── 4. PlayStation symbols ──────────────────────────── */
      for (let i = 0; i < symbols.length; i++) {
        const s = symbols[i];
        s.life += 1;
        s.y += s.vy;

        if (s.y < -s.size * 2 || s.life > s.span) {
          symbols[i] = makeSym();
          continue;
        }

        // fade in on entry, out on exit
        const inT = smoothstep(0, 90, s.life);
        const outT = 1 - smoothstep(s.span - 120, s.span, s.life);
        s.alpha += (s.target * inT * outT - s.alpha) * 0.04;

        const x = s.x + Math.sin(t * 0.35 + s.swayPhase) * s.swayAmp + pxs * (6 + s.layer * 9);
        const y = s.y + pys * (4 + s.layer * 6);
        const w = gutter(x) * verticalFade(y);
        const a = s.alpha * w;
        if (a < 0.004) continue;

        const color = s.layer === 2 ? SYM_COLORS[s.type] : CYAN;

        ctx!.save();
        ctx!.translate(x, y);
        ctx!.rotate(Math.sin(t * 0.28 + s.tiltPhase) * 0.06); // ±3.5° breathing tilt
        ctx!.strokeStyle = rgba(color, a);
        ctx!.lineWidth = Math.max(1.2, s.size * 0.075);
        ctx!.shadowColor = rgba(color, a * 0.9);
        ctx!.shadowBlur = s.size * 0.45;
        drawSymbol(ctx!, s.type, s.size);
        ctx!.restore();
      }
      ctx!.shadowBlur = 0;

      /* ── 6a. Scan sweep ──────────────────────────────────── */
      scan = (scan + 0.55) % (H + 260);
      const sy = scan - 130;
      const sg = ctx!.createLinearGradient(0, sy - 130, 0, sy + 130);
      sg.addColorStop(0, rgba(CYAN, 0));
      sg.addColorStop(0.5, rgba(CYAN, 0.022));
      sg.addColorStop(1, rgba(CYAN, 0));
      ctx!.fillStyle = sg;
      ctx!.fillRect(0, sy - 130, W, 260);

      /* ── 6b. Calm mask — settles everything behind content ── */
      ctx!.globalCompositeOperation = "source-over";

      const calm = ctx!.createRadialGradient(W / 2, H * 0.48, 0, W / 2, H * 0.48, contentHalf * 1.5);
      calm.addColorStop(0, "rgba(3,6,18,0.34)");
      calm.addColorStop(0.62, "rgba(3,6,18,0.16)");
      calm.addColorStop(1, "rgba(3,6,18,0)");
      ctx!.fillStyle = calm;
      ctx!.fillRect(0, 0, W, H);

      const vig = ctx!.createRadialGradient(W / 2, H / 2, H * 0.34, W / 2, H / 2, H * 0.95);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.42)");
      ctx!.fillStyle = vig;
      ctx!.fillRect(0, 0, W, H);
    }

    // ── Loop ───────────────────────────────────────────────────
    let raf = 0;
    let running = true;

    const loop = (now: number) => {
      render(now * 0.001);
      raf = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (running) {
          cancelAnimationFrame(raf);
          running = false;
        }
      } else if (!running && !reduced) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    if (reduced) {
      running = false;
      render(0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }} aria-hidden />
      <HudFrame />
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Console HUD frame — corner brackets + edge tick rails.
   Static, cheap, and the strongest "this is a game UI" signal.
   ═══════════════════════════════════════════════════════════════ */

const BRACKET = 1;
const BRACKET_COLOR = "rgba(0,229,255,0.28)";

function Bracket({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const top = pos[0] === "t";
  const left = pos[1] === "l";
  return (
    <div
      className="absolute"
      style={{
        width: 46,
        height: 46,
        [top ? "top" : "bottom"]: 22,
        [left ? "left" : "right"]: 22,
        borderTop: top ? `${BRACKET}px solid ${BRACKET_COLOR}` : undefined,
        borderBottom: !top ? `${BRACKET}px solid ${BRACKET_COLOR}` : undefined,
        borderLeft: left ? `${BRACKET}px solid ${BRACKET_COLOR}` : undefined,
        borderRight: !left ? `${BRACKET}px solid ${BRACKET_COLOR}` : undefined,
        borderTopLeftRadius: top && left ? 8 : undefined,
        borderTopRightRadius: top && !left ? 8 : undefined,
        borderBottomLeftRadius: !top && left ? 8 : undefined,
        borderBottomRightRadius: !top && !left ? 8 : undefined,
        boxShadow: "0 0 14px rgba(0,229,255,0.12)",
      }}
    />
  );
}

function HudFrame() {
  return (
    <div className="fixed inset-0 pointer-events-none hidden lg:block" style={{ zIndex: 1 }} aria-hidden>
      <Bracket pos="tl" />
      <Bracket pos="tr" />
      <Bracket pos="bl" />
      {/* bottom-right is left open — the AI assistant button anchors that corner */}

      {/* tick rails */}
      <div
        className="absolute left-[22px] top-1/2 -translate-y-1/2"
        style={{
          width: 1,
          height: "34vh",
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(0,229,255,0.30) 0 8px, rgba(0,229,255,0) 8px 22px)",
        }}
      />
      <div
        className="absolute right-[22px] top-1/2 -translate-y-1/2"
        style={{
          width: 1,
          height: "34vh",
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(168,85,247,0.26) 0 8px, rgba(168,85,247,0) 8px 22px)",
        }}
      />
    </div>
  );
}
