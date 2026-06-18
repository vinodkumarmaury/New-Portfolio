"use client";

import { useEffect, useRef } from "react";

// PS-symbol paths (relative to a 40x40 box centred at 0,0)
function drawCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string) {
  const s = size * 0.38;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = s * 0.28;
  ctx.lineCap = "round";
  // × (cross)
  ctx.beginPath();
  ctx.moveTo(-s, -s); ctx.lineTo(s, s);
  ctx.moveTo(s, -s);  ctx.lineTo(-s, s);
  ctx.stroke();
  ctx.restore();
}

function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string) {
  const s = size * 0.38;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = s * 0.22;
  ctx.beginPath();
  ctx.arc(0, 0, s, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string) {
  const s = size * 0.42;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = s * 0.2;
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(0, -s);
  ctx.lineTo(s * 0.87, s * 0.5);
  ctx.lineTo(-s * 0.87, s * 0.5);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

function drawSquare(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string) {
  const s = size * 0.36;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.PI / 4); // diamond orientation
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = s * 0.2;
  ctx.lineJoin = "round";
  ctx.strokeRect(-s * 0.72, -s * 0.72, s * 1.44, s * 1.44);
  ctx.restore();
}

function drawHex(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, alpha: number, color: string, fill = false) {
  const s = size * 0.5;
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = color;
  ctx.lineWidth = fill ? 0 : s * 0.08;
  ctx.beginPath();
  for (let i = 0; i < 6; i++) {
    const a = (i * Math.PI) / 3 - Math.PI / 6;
    i === 0 ? ctx.moveTo(Math.cos(a) * s, Math.sin(a) * s) : ctx.lineTo(Math.cos(a) * s, Math.sin(a) * s);
  }
  ctx.closePath();
  if (fill) {
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.stroke();
  }
  ctx.restore();
}

export default function GamingBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let mx = W / 2, my = H / 2;
    let scrollY = 0;

    // ── Floating dot network ───────────────────────────
    const COUNT = 90;
    const MAX_DIST = 150;

    interface Dot {
      x: number; y: number;
      vx: number; vy: number;
      r: number; pulse: number; pulseSpeed: number;
    }

    const dots: Dot[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: 0.8 + Math.random() * 1.8,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.018 + Math.random() * 0.035,
    }));

    // ── PS floating symbols ────────────────────────────
    type SymType = "cross" | "circle" | "triangle" | "square" | "hex";
    const SYM_COLORS: Record<SymType, string> = {
      cross:    "rgba(0,229,255,1)",
      circle:   "rgba(251,191,36,1)",
      triangle: "rgba(168,85,247,1)",
      square:   "rgba(34,197,94,1)",
      hex:      "rgba(0,229,255,0.7)",
    };

    interface Symbol {
      x: number; y: number;
      type: SymType;
      size: number;
      alpha: number; targetAlpha: number;
      rot: number; rotSpeed: number;
      vx: number; vy: number;
      driftX: number; driftY: number; driftPhase: number; driftAmp: number;
      layer: number; // 0 = far, 1 = mid, 2 = close
    }

    function makeSymbol(): Symbol {
      const types: SymType[] = ["cross", "circle", "triangle", "square", "hex"];
      const type = types[Math.floor(Math.random() * types.length)];
      const layer = Math.floor(Math.random() * 3);
      const size = layer === 0 ? 12 + Math.random() * 10 : layer === 1 ? 20 + Math.random() * 16 : 30 + Math.random() * 20;
      return {
        x: Math.random() * W,
        y: Math.random() * H,
        type, size,
        alpha: 0,
        targetAlpha: (layer === 0 ? 0.06 : layer === 1 ? 0.12 : 0.2) + Math.random() * 0.06,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.006,
        vx: (Math.random() - 0.5) * (layer === 0 ? 0.1 : 0.2),
        vy: -0.12 - Math.random() * 0.15 * (layer + 1),
        driftX: 0, driftY: 0,
        driftPhase: Math.random() * Math.PI * 2,
        driftAmp: 0.3 + Math.random() * 0.5,
        layer,
      };
    }

    const symbols: Symbol[] = Array.from({ length: 28 }, makeSymbol);

    // ── Volumetric scan lines ──────────────────────────
    let scanLine = 0;

    // ── Hex grid tiles (static, far background) ────────
    const hexTiles: { x: number; y: number; phase: number; color: string }[] = [];
    const HEX_COLS = 12, HEX_ROWS = 7;
    const HEX_W = W / HEX_COLS;
    const HEX_H = H / HEX_ROWS;
    const hexColors = ["rgba(0,229,255,", "rgba(168,85,247,", "rgba(34,197,94,"];
    for (let row = 0; row < HEX_ROWS + 1; row++) {
      for (let col = 0; col < HEX_COLS + 1; col++) {
        const offset = row % 2 === 0 ? 0 : HEX_W / 2;
        hexTiles.push({
          x: col * HEX_W + offset,
          y: row * HEX_H,
          phase: Math.random() * Math.PI * 2,
          color: hexColors[Math.floor(Math.random() * hexColors.length)],
        });
      }
    }

    // ── Events ─────────────────────────────────────────
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    let raf: number;
    let frame = 0;

    function animate(now: number) {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const t = now * 0.001;

      // ── 1. Far hex grid (very subtle, pulsing) ──────
      hexTiles.forEach(h => {
        const pulse = 0.018 + Math.sin(t * 0.4 + h.phase) * 0.012;
        const dist = Math.hypot(h.x - mx, h.y - my);
        const mouseBoost = Math.max(0, (1 - dist / 350)) * 0.025;
        drawHex(ctx, h.x, h.y, HEX_W * 0.48, pulse + mouseBoost, h.color + (pulse + mouseBoost).toFixed(3) + ")");
      });

      // ── 2. Dot network ─────────────────────────────
      for (const d of dots) {
        d.pulse += d.pulseSpeed;
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;

        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.hypot(dx, dy);
        if (dist < 120 && dist > 0) {
          const force = (1 - dist / 120) * 0.28;
          d.vx += (dx / dist) * force * 0.5;
          d.vy += (dy / dist) * force * 0.5;
        }
        d.vx *= 0.993; d.vy *= 0.993;
        const s = Math.hypot(d.vx, d.vy);
        if (s > 1.5) { d.vx *= 1.5 / s; d.vy *= 1.5 / s; }

        const br = 0.45 + Math.sin(d.pulse) * 0.28;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${br * 0.75})`;
        ctx.fill();
      }

      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            const midX = (dots[i].x + dots[j].x) / 2 - mx;
            const midY = (dots[i].y + dots[j].y) / 2 - my;
            const mp = Math.max(0, 1 - Math.hypot(midX, midY) / 280);
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${Math.round(168 * mp)},${Math.round(229 - 144 * mp)},255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // ── 3. PS-style floating symbols ───────────────
      symbols.forEach((sym, idx) => {
        // Drift
        sym.x += sym.vx + Math.sin(t * 0.5 + sym.driftPhase) * sym.driftAmp * 0.02;
        sym.y += sym.vy + Math.cos(t * 0.4 + sym.driftPhase) * sym.driftAmp * 0.015;
        sym.rot += sym.rotSpeed;

        // Respawn at bottom if off top
        if (sym.y < -sym.size * 2) {
          sym.y = H + sym.size;
          sym.x = Math.random() * W;
          sym.alpha = 0;
        }
        if (sym.x < -sym.size * 2) sym.x = W + sym.size;
        if (sym.x > W + sym.size * 2) sym.x = -sym.size;

        // Fade in/out
        sym.alpha += (sym.targetAlpha - sym.alpha) * 0.02;
        if (frame % 300 === idx % 300) {
          sym.targetAlpha = sym.alpha > 0.05
            ? 0
            : (sym.layer === 0 ? 0.06 : sym.layer === 1 ? 0.12 : 0.2) + Math.random() * 0.06;
        }

        const color = SYM_COLORS[sym.type];

        ctx.save();
        ctx.translate(sym.x, sym.y);
        ctx.rotate(sym.rot);
        ctx.globalAlpha = sym.alpha;

        switch (sym.type) {
          case "cross":    drawCross(ctx, 0, 0, sym.size, 1, color); break;
          case "circle":   drawCircle(ctx, 0, 0, sym.size, 1, color); break;
          case "triangle": drawTriangle(ctx, 0, 0, sym.size, 1, color); break;
          case "square":   drawSquare(ctx, 0, 0, sym.size, 1, color); break;
          case "hex":      drawHex(ctx, 0, 0, sym.size, 1, color); break;
        }

        ctx.restore();
      });

      // ── 4. Volumetric scan line ─────────────────────
      scanLine = (scanLine + 0.6) % H;
      const scanGrad = ctx.createLinearGradient(0, scanLine - 40, 0, scanLine + 40);
      scanGrad.addColorStop(0, "rgba(0,229,255,0)");
      scanGrad.addColorStop(0.5, "rgba(0,229,255,0.025)");
      scanGrad.addColorStop(1, "rgba(0,229,255,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanLine - 40, W, 80);

      // ── 5. Mouse light cone ─────────────────────────
      const coneGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 350);
      coneGrad.addColorStop(0, "rgba(0,229,255,0.038)");
      coneGrad.addColorStop(0.5, "rgba(168,85,247,0.012)");
      coneGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = coneGrad;
      ctx.fillRect(0, 0, W, H);

      // ── 6. Corner vignette ─────────────────────────
      if (frame % 3 === 0) {
        const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.25, W / 2, H / 2, H * 0.85);
        vg.addColorStop(0, "rgba(0,0,0,0)");
        vg.addColorStop(1, "rgba(0,0,0,0.35)");
        ctx.fillStyle = vg;
        ctx.fillRect(0, 0, W, H);
      }

      raf = requestAnimationFrame(animate);
    }

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: -1 }}
    />
  );
}
