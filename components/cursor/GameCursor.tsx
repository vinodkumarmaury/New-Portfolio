"use client";

import { useEffect, useRef } from "react";

export default function GameCursor() {
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
    let lerpX = mx, lerpY = my;
    let prevX = mx, prevY = my;
    let moveSpeed = 0;
    let idleTime = 0;

    // ── DOM cursor pieces ──────────────────────────────
    const dot = document.createElement("div");
    dot.className = "gc-dot";
    document.body.appendChild(dot);

    const ring = document.createElement("div");
    ring.className = "gc-ring";
    document.body.appendChild(ring);

    // Crosshair bars
    const barTop    = document.createElement("div"); barTop.className    = "gc-bar gc-bar-top";
    const barBottom = document.createElement("div"); barBottom.className = "gc-bar gc-bar-bottom";
    const barLeft   = document.createElement("div"); barLeft.className   = "gc-bar gc-bar-left";
    const barRight  = document.createElement("div"); barRight.className  = "gc-bar gc-bar-right";
    document.body.appendChild(barTop);
    document.body.appendChild(barBottom);
    document.body.appendChild(barLeft);
    document.body.appendChild(barRight);

    // ── Particle system ────────────────────────────────
    type PType = "move" | "burst" | "spark" | "ring" | "glow";

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; decay: number;
      size: number;
      r: number; g: number; b: number;
      type: PType;
      curR?: number; maxR?: number;
    }

    const particles: Particle[] = [];

    function spawnMoveSparks(x: number, y: number, spd: number) {
      const count = Math.floor(spd * 0.5 + 2);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 1.5 + Math.random() * 3.5;
        const isCyan = Math.random() > 0.4;
        particles.push({
          x: x + (Math.random() - 0.5) * 8,
          y: y + (Math.random() - 0.5) * 8,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel - 0.8,
          life: 0.8 + Math.random() * 0.4,
          decay: 0.03 + Math.random() * 0.02,
          size: 1.5 + Math.random() * 3,
          r: isCyan ? 0 : 168,
          g: isCyan ? 229 : 85,
          b: 255,
          type: "move",
        });
      }
    }

    function spawnBurst(x: number, y: number) {
      const rings = [
        { r: 0,   g: 229, b: 255, maxR: 60,  size: 3 },
        { r: 168, g: 85,  b: 247, maxR: 95,  size: 2 },
        { r: 255, g: 255, b: 255, maxR: 130, size: 1.5 },
      ];
      rings.forEach(({ r, g, b, maxR, size }) =>
        particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.016, size, r, g, b, type: "ring", curR: 3, maxR })
      );

      particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.07, size: 50, r: 0, g: 229, b: 255, type: "glow" });

      for (let i = 0; i < 36; i++) {
        const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.15;
        const spd = 3 + Math.random() * 11;
        const col = i % 3 === 0
          ? { r: 251, g: 191, b: 36 }
          : i % 2 === 0 ? { r: 0, g: 229, b: 255 }
          : { r: 168, g: 85, b: 247 };
        particles.push({ x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, life: 1, decay: 0.018, size: 2.5 + Math.random() * 4, r: col.r, g: col.g, b: col.b, type: "burst" });
      }

      for (let i = 0; i < 25; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 6 + Math.random() * 18;
        particles.push({ x, y, vx: Math.cos(angle) * spd, vy: Math.sin(angle) * spd, life: 0.7 + Math.random() * 0.3, decay: 0.035, size: 1.2, r: 255, g: 255, b: 255, type: "spark" });
      }
    }

    // ── Orbit satellites ───────────────────────────────
    const ORBIT_COUNT = 6;
    const orbits = Array.from({ length: ORBIT_COUNT }, (_, i) => ({
      angle: (i / ORBIT_COUNT) * Math.PI * 2,
      dist: 28 + Math.random() * 10,
      speed: 0.02 + Math.random() * 0.02,
      size: 2 + Math.random() * 1.5,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── Events ─────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      prevX = mx; prevY = my;
      mx = e.clientX; my = e.clientY;
      const dx = mx - prevX, dy = my - prevY;
      moveSpeed = Math.sqrt(dx * dx + dy * dy);
      idleTime = 0;
      if (moveSpeed > 1.5) spawnMoveSparks(mx, my, moveSpeed);
    };

    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
      ring.classList.add("gc-ring-click");
      barTop.classList.add("gc-bar-click");
      barBottom.classList.add("gc-bar-click");
      barLeft.classList.add("gc-bar-click");
      barRight.classList.add("gc-bar-click");
      setTimeout(() => {
        ring.classList.remove("gc-ring-click");
        [barTop, barBottom, barLeft, barRight].forEach(b => b.classList.remove("gc-bar-click"));
      }, 380);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    });

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    // ── Render loop ────────────────────────────────────
    let prevT = performance.now();
    let raf: number;

    function render(now: number) {
      const dt = Math.min((now - prevT) / 16, 3.5);
      prevT = now;

      ctx.clearRect(0, 0, W, H);

      lerpX += (mx - lerpX) * 0.12 * dt;
      lerpY += (my - lerpY) * 0.12 * dt;
      idleTime += dt;

      // ── Orbit particles ──
      orbits.forEach((o, i) => {
        o.angle += o.speed * dt * (idleTime < 5 ? 1.4 : 0.7);
        const stretch = idleTime < 5 ? 1 + moveSpeed * 0.05 : 1;
        const ox = lerpX + Math.cos(o.angle) * o.dist * stretch;
        const oy = lerpY + Math.sin(o.angle) * o.dist;
        const brightness = 0.6 + Math.sin(now * 0.003 + o.phase) * 0.3;
        const isCyan = i % 2 === 0;
        const color = isCyan ? [0, 229, 255] : [168, 85, 247];

        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 3);
        rg.addColorStop(0, `rgba(${color[0]},${color[1]},${color[2]},${brightness})`);
        rg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(ox, oy, o.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, o.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${brightness * 0.95})`;
        ctx.fill();
      });

      // ── Particles ──
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= p.decay * dt;
        if (p.life <= 0) { particles.splice(i, 1); continue; }

        if (p.type === "ring") {
          p.curR! += (p.maxR! - p.curR!) * 0.11 * dt;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.curR!, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${p.r},${p.g},${p.b},${p.life * 0.95})`;
          ctx.lineWidth = p.size * p.life;
          ctx.stroke();
          continue;
        }

        if (p.type === "glow") {
          const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.life * 4);
          rg.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.life * 0.55})`);
          rg.addColorStop(0.5, `rgba(${p.r},${p.g},${p.b},${p.life * 0.18})`);
          rg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life * 4, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();
          continue;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.type === "burst") {
          p.vy += 0.15 * dt;
          p.vx *= Math.pow(0.962, dt);
          p.vy *= Math.pow(0.962, dt);
        } else if (p.type === "spark") {
          p.vx *= Math.pow(0.9, dt);
          p.vy *= Math.pow(0.9, dt);
        } else {
          p.vy -= 0.04 * dt;
          p.vx *= Math.pow(0.955, dt);
          p.vy *= Math.pow(0.955, dt);
        }

        const sz = p.type === "spark" ? p.size : Math.max(0.4, p.size * Math.sqrt(p.life));

        // glow halo around particle
        const rg2 = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, sz * 2.5);
        rg2.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.life * 0.7})`);
        rg2.addColorStop(1, "rgba(0,0,0,0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rg2;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life})`;
        ctx.fill();
      }

      // ── DOM cursor update ──
      const ringScale = Math.max(0.8, 1.3 - moveSpeed * 0.012);
      dot.style.transform = `translate(${mx - 10}px, ${my - 10}px)`;
      ring.style.transform = `translate(${lerpX - 32}px, ${lerpY - 32}px) scale(${ringScale})`;

      // crosshair bars follow dot exactly
      barTop.style.transform    = `translate(${mx - 1}px, ${my - 26}px)`;
      barBottom.style.transform = `translate(${mx - 1}px, ${my + 14}px)`;
      barLeft.style.transform   = `translate(${mx - 26}px, ${my - 1}px)`;
      barRight.style.transform  = `translate(${mx + 14}px, ${my - 1}px)`;

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      [dot, ring, barTop, barBottom, barLeft, barRight].forEach(el => el.remove());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 99998 }}
    />
  );
}
