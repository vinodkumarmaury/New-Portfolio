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
    let prevX = mx, prevY = my;
    let lerpX = mx, lerpY = my;
    let velX = 0, velY = 0;

    interface TrailPoint { x: number; y: number; t: number; spd: number; }
    const trail: TrailPoint[] = [];
    const TRAIL_LIFE = 2000;

    type PType = "burst" | "spark" | "ring" | "glow";
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

    function spawnBurst(x: number, y: number) {
      // 3 expanding shock rings
      const rings = [
        { r: 0, g: 229, b: 255, maxR: 55, size: 2.5 },
        { r: 168, g: 85, b: 247, maxR: 85, size: 1.8 },
        { r: 255, g: 255, b: 255, maxR: 115, size: 1.2 },
      ];
      rings.forEach(({ r, g, b, maxR, size }) => {
        particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.018, size, r, g, b, type: "ring", curR: 2, maxR });
      });

      // Glow flash
      particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.09, size: 35, r: 0, g: 229, b: 255, type: "glow" });

      // Radial burst
      for (let i = 0; i < 28; i++) {
        const angle = (i / 28) * Math.PI * 2 + Math.random() * 0.2;
        const spd = 2.5 + Math.random() * 9;
        const col = i % 3 === 0
          ? { r: 251, g: 191, b: 36 }
          : i % 2 === 0
          ? { r: 0, g: 229, b: 255 }
          : { r: 168, g: 85, b: 247 };
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1, decay: 0.022,
          size: 2 + Math.random() * 3.5,
          r: col.r, g: col.g, b: col.b,
          type: "burst",
        });
      }

      // Sparks
      for (let i = 0; i < 18; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 6 + Math.random() * 16;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 0.7 + Math.random() * 0.3,
          decay: 0.042,
          size: 0.9,
          r: 255, g: 255, b: 255,
          type: "spark",
        });
      }
    }

    // Cursor DOM elements
    const dot = document.createElement("div");
    dot.className = "gc-dot";
    document.body.appendChild(dot);

    const outerRing = document.createElement("div");
    outerRing.className = "gc-ring";
    document.body.appendChild(outerRing);

    const crossH = document.createElement("div");
    crossH.className = "gc-cross-h";
    document.body.appendChild(crossH);

    const crossV = document.createElement("div");
    crossV.className = "gc-cross-v";
    document.body.appendChild(crossV);

    const onMove = (e: MouseEvent) => {
      prevX = mx; prevY = my;
      mx = e.clientX; my = e.clientY;
      velX = mx - prevX; velY = my - prevY;
      const spd = Math.sqrt(velX * velX + velY * velY);
      trail.push({ x: mx, y: my, t: Date.now(), spd });
    };

    const onClick = (e: MouseEvent) => {
      spawnBurst(e.clientX, e.clientY);
      outerRing.classList.add("gc-ring-click");
      setTimeout(() => outerRing.classList.remove("gc-ring-click"), 350);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    window.addEventListener("resize", () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    });

    document.body.style.cursor = "none";

    let prevT = performance.now();
    let raf: number;

    function render(now: number) {
      const dt = Math.min((now - prevT) / 16, 3.5);
      prevT = now;

      ctx.clearRect(0, 0, W, H);

      lerpX += (mx - lerpX) * 0.16 * dt;
      lerpY += (my - lerpY) * 0.16 * dt;

      // ---- TRAIL ----
      const curT = Date.now();
      while (trail.length && curT - trail[0].t > TRAIL_LIFE) trail.shift();

      if (trail.length > 1) {
        // Draw glowing line
        for (let i = 1; i < trail.length; i++) {
          const p0 = trail[i - 1];
          const p1 = trail[i];
          const a0 = Math.max(0, 1 - (curT - p0.t) / TRAIL_LIFE);
          const a1 = Math.max(0, 1 - (curT - p1.t) / TRAIL_LIFE);
          if (a0 + a1 < 0.04) continue;

          const isFast = p1.spd > 14;
          const r = isFast ? 168 : 0;
          const g = isFast ? 85 : 229;
          const b = 255;

          const grad = ctx.createLinearGradient(p0.x, p0.y, p1.x, p1.y);
          grad.addColorStop(0, `rgba(${r},${g},${b},${a0 * 0.55})`);
          grad.addColorStop(1, `rgba(0,229,255,${a1 * 0.85})`);

          ctx.beginPath();
          ctx.moveTo(p0.x, p0.y);
          ctx.lineTo(p1.x, p1.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = Math.max(0.8, a1 * 3.2);
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // Trail energy dots — visible when cursor has stopped (path persistence)
        for (let i = 0; i < trail.length; i++) {
          const p = trail[i];
          const age = 1 - (curT - p.t) / TRAIL_LIFE;
          if (age < 0.04) continue;
          const dA = age * 0.55;
          const dR = Math.max(0.5, age * 2.2);

          ctx.beginPath();
          ctx.arc(p.x, p.y, dR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,229,255,${dA})`;
          ctx.fill();
        }

        // Soft glow behind newest trail segment
        const recent = trail.slice(Math.max(0, trail.length - 15));
        if (recent.length > 1) {
          ctx.save();
          ctx.globalAlpha = 0.18;
          ctx.filter = "blur(6px)";
          ctx.beginPath();
          ctx.moveTo(recent[0].x, recent[0].y);
          recent.forEach(p => ctx.lineTo(p.x, p.y));
          ctx.strokeStyle = "rgba(0,229,255,1)";
          ctx.lineWidth = 6;
          ctx.lineCap = "round";
          ctx.stroke();
          ctx.filter = "none";
          ctx.globalAlpha = 1;
          ctx.restore();
        }
      }

      // ---- PARTICLES ----
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
          const rg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * p.life * 3.5);
          rg.addColorStop(0, `rgba(${p.r},${p.g},${p.b},${p.life * 0.5})`);
          rg.addColorStop(0.4, `rgba(${p.r},${p.g},${p.b},${p.life * 0.15})`);
          rg.addColorStop(1, `rgba(${p.r},${p.g},${p.b},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = rg;
          ctx.fill();
          continue;
        }

        p.x += p.vx * dt;
        p.y += p.vy * dt;

        if (p.type === "burst") {
          p.vy += 0.14 * dt;
          p.vx *= Math.pow(0.965, dt);
          p.vy *= Math.pow(0.965, dt);
        } else {
          p.vx *= Math.pow(0.91, dt);
          p.vy *= Math.pow(0.91, dt);
        }

        const sz = p.type === "spark" ? p.size : Math.max(0.3, p.size * p.life);
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life * 0.92})`;
        ctx.fill();
      }

      // ---- CURSOR DOM ----
      const spd = Math.sqrt(velX * velX + velY * velY);
      const ringScale = Math.max(0.65, 1.15 - spd * 0.018);

      dot.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      outerRing.style.transform = `translate(${lerpX - 22}px, ${lerpY - 22}px) scale(${ringScale})`;
      crossH.style.transform = `translate(${lerpX - 18}px, ${lerpY - 1}px)`;
      crossV.style.transform = `translate(${lerpX - 1}px, ${lerpY - 18}px)`;

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.body.style.cursor = "";
      [dot, outerRing, crossH, crossV].forEach(el => el.remove());
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
