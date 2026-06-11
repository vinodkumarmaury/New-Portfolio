"use client";

import { useEffect, useRef } from "react";

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
    const COUNT = 75;
    const MAX_DIST = 160;

    interface Dot {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      pulse: number; pulseSpeed: number;
    }

    const dots: Dot[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 0.8 + Math.random() * 1.6,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.04,
    }));

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    let raf: number;

    function animate() {
      ctx.clearRect(0, 0, W, H);

      for (const d of dots) {
        d.pulse += d.pulseSpeed;
        d.x += d.vx;
        d.y += d.vy;

        if (d.x < 0) d.x = W;
        if (d.x > W) d.x = 0;
        if (d.y < 0) d.y = H;
        if (d.y > H) d.y = 0;

        // Gentle mouse repulsion
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0) {
          const force = (1 - dist / 110) * 0.25;
          d.vx += (dx / dist) * force;
          d.vy += (dy / dist) * force;
        }

        d.vx *= 0.992;
        d.vy *= 0.992;

        const s = Math.sqrt(d.vx * d.vx + d.vy * d.vy);
        if (s > 1.6) { d.vx *= 1.6 / s; d.vy *= 1.6 / s; }

        const brightness = 0.4 + Math.sin(d.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${brightness * 0.7})`;
        ctx.fill();
      }

      // Connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            // Color shifts toward purple near mouse
            const dmx = (dots[i].x + dots[j].x) / 2 - mx;
            const dmy = (dots[i].y + dots[j].y) / 2 - my;
            const mouseProximity = Math.max(0, 1 - Math.sqrt(dmx * dmx + dmy * dmy) / 300);
            const r = Math.round(168 * mouseProximity);
            const g = Math.round(229 - 144 * mouseProximity);

            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(${r},${g},255,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      raf = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
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
