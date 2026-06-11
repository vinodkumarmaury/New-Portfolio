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

    type PType = "move" | "burst" | "spark" | "ring" | "glow" | "orbit";

    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      life: number; decay: number;
      size: number;
      r: number; g: number; b: number;
      type: PType;
      curR?: number; maxR?: number;
      angle?: number; angleSpeed?: number; dist?: number;
    }

    const particles: Particle[] = [];

    // Orbit satellites that circle the cursor
    const ORBIT_COUNT = 6;
    const orbits: { angle: number; dist: number; speed: number; size: number; phase: number }[] = Array.from(
      { length: ORBIT_COUNT },
      (_, i) => ({
        angle: (i / ORBIT_COUNT) * Math.PI * 2,
        dist: 22 + Math.random() * 8,
        speed: 0.025 + Math.random() * 0.02,
        size: 1.2 + Math.random() * 1.2,
        phase: Math.random() * Math.PI * 2,
      })
    );

    function spawnMoveSparks(x: number, y: number, spd: number) {
      const count = Math.floor(spd * 0.4 + 1);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const vel = 0.8 + Math.random() * 2.5;
        const isCyan = Math.random() > 0.35;
        particles.push({
          x: x + (Math.random() - 0.5) * 6,
          y: y + (Math.random() - 0.5) * 6,
          vx: Math.cos(angle) * vel,
          vy: Math.sin(angle) * vel - 0.5,
          life: 0.7 + Math.random() * 0.3,
          decay: 0.035 + Math.random() * 0.02,
          size: 1 + Math.random() * 2,
          r: isCyan ? 0 : 168,
          g: isCyan ? 229 : 85,
          b: 255,
          type: "move",
        });
      }
    }

    function spawnBurst(x: number, y: number) {
      // Shockwave rings
      const rings = [
        { r: 0, g: 229, b: 255, maxR: 55, size: 2.5 },
        { r: 168, g: 85, b: 247, maxR: 88, size: 1.8 },
        { r: 255, g: 255, b: 255, maxR: 120, size: 1.2 },
      ];
      rings.forEach(({ r, g, b, maxR, size }) => {
        particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.017, size, r, g, b, type: "ring", curR: 2, maxR });
      });

      // Glow flash
      particles.push({ x, y, vx: 0, vy: 0, life: 1, decay: 0.08, size: 40, r: 0, g: 229, b: 255, type: "glow" });

      // Radial burst
      for (let i = 0; i < 30; i++) {
        const angle = (i / 30) * Math.PI * 2 + Math.random() * 0.15;
        const spd = 2 + Math.random() * 9;
        const col =
          i % 3 === 0 ? { r: 251, g: 191, b: 36 }
          : i % 2 === 0 ? { r: 0, g: 229, b: 255 }
          : { r: 168, g: 85, b: 247 };
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 1, decay: 0.02,
          size: 2 + Math.random() * 3.5,
          r: col.r, g: col.g, b: col.b,
          type: "burst",
        });
      }

      // White sparks
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spd = 5 + Math.random() * 16;
        particles.push({
          x, y,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd,
          life: 0.6 + Math.random() * 0.4,
          decay: 0.04,
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

    let moveSpeed = 0;
    let idleTime = 0;

    const onMove = (e: MouseEvent) => {
      prevX = mx; prevY = my;
      mx = e.clientX; my = e.clientY;
      const dx = mx - prevX, dy = my - prevY;
      moveSpeed = Math.sqrt(dx * dx + dy * dy);
      idleTime = 0;

      if (moveSpeed > 2) {
        spawnMoveSparks(mx, my, moveSpeed);
      }
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

    document.documentElement.style.cursor = "none";
    document.body.style.cursor = "none";

    let prevT = performance.now();
    let raf: number;
    let frame = 0;

    function render(now: number) {
      const dt = Math.min((now - prevT) / 16, 3.5);
      prevT = now;
      frame++;

      ctx.clearRect(0, 0, W, H);

      // Lerp cursor follower
      lerpX += (mx - lerpX) * 0.14 * dt;
      lerpY += (my - lerpY) * 0.14 * dt;
      idleTime += dt;

      // ---- ORBIT SATELLITES ----
      const idlePulse = Math.sin(now * 0.002) * 0.5 + 0.5;
      orbits.forEach((o, i) => {
        // Orbit faster when moving, slower when idle
        const speedMult = idleTime < 5 ? 1.5 : 0.6;
        o.angle += o.speed * dt * speedMult;

        // Distance stretches when moving (elliptical orbit)
        const stretch = idleTime < 5 ? 1 + moveSpeed * 0.04 : 1;
        const ox = lerpX + Math.cos(o.angle) * o.dist * stretch;
        const oy = lerpY + Math.sin(o.angle) * o.dist;

        const brightness = 0.5 + Math.sin(now * 0.003 + o.phase) * 0.3;
        const isCyan = i % 2 === 0;

        // Draw satellite dot with glow
        const rg = ctx.createRadialGradient(ox, oy, 0, ox, oy, o.size * 2.5);
        rg.addColorStop(0, isCyan ? `rgba(0,229,255,${brightness})` : `rgba(168,85,247,${brightness})`);
        rg.addColorStop(1, "rgba(0,0,0,0)");

        ctx.beginPath();
        ctx.arc(ox, oy, o.size * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = rg;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(ox, oy, o.size, 0, Math.PI * 2);
        ctx.fillStyle = isCyan ? `rgba(0,229,255,${brightness * 0.95})` : `rgba(168,85,247,${brightness * 0.95})`;
        ctx.fill();

        // Connect to cursor with faint line when idle
        if (idleTime > 8) {
          const lineA = Math.max(0, (1 - (idleTime - 8) / 20)) * 0.12;
          if (lineA > 0.01) {
            ctx.beginPath();
            ctx.moveTo(lerpX, lerpY);
            ctx.lineTo(ox, oy);
            ctx.strokeStyle = isCyan ? `rgba(0,229,255,${lineA})` : `rgba(168,85,247,${lineA})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

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
          rg.addColorStop(0.5, `rgba(${p.r},${p.g},${p.b},${p.life * 0.15})`);
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
          p.vy += 0.13 * dt;
          p.vx *= Math.pow(0.965, dt);
          p.vy *= Math.pow(0.965, dt);
        } else if (p.type === "spark") {
          p.vx *= Math.pow(0.91, dt);
          p.vy *= Math.pow(0.91, dt);
        } else {
          // move sparks float upward slightly
          p.vy -= 0.03 * dt;
          p.vx *= Math.pow(0.96, dt);
          p.vy *= Math.pow(0.96, dt);
        }

        const sz = p.type === "spark" ? p.size : Math.max(0.3, p.size * Math.sqrt(p.life));
        ctx.beginPath();
        ctx.arc(p.x, p.y, sz, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.r},${p.g},${p.b},${p.life * 0.9})`;
        ctx.fill();
      }

      // ---- CURSOR DOM UPDATE ----
      const ringScale = Math.max(0.7, 1.2 - moveSpeed * 0.015);
      dot.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      outerRing.style.transform = `translate(${lerpX - 22}px, ${lerpY - 22}px) scale(${ringScale})`;

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      document.documentElement.style.cursor = "";
      document.body.style.cursor = "";
      [dot, outerRing].forEach(el => el.remove());
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
