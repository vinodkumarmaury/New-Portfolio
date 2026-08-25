"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SKILLS = [
  { name: "React",         cat: 0, level: 90 },
  { name: "Next.js",       cat: 0, level: 88 },
  { name: "TypeScript",    cat: 0, level: 85 },
  { name: "JavaScript",    cat: 0, level: 92 },
  { name: "Tailwind CSS",  cat: 0, level: 87 },
  { name: "HTML5",         cat: 0, level: 95 },
  { name: "CSS3",          cat: 0, level: 90 },
  { name: "Framer Motion", cat: 0, level: 82 },
  { name: "Redux",         cat: 0, level: 75 },
  { name: "Node.js",       cat: 1, level: 84 },
  { name: "Python",        cat: 1, level: 88 },
  { name: "Django",        cat: 1, level: 82 },
  { name: "FastAPI",       cat: 1, level: 80 },
  { name: "Express.js",    cat: 1, level: 78 },
  { name: "REST API",      cat: 1, level: 88 },
  { name: "GraphQL",       cat: 1, level: 70 },
  { name: "C++",           cat: 1, level: 82 },
  { name: "PostgreSQL",    cat: 2, level: 80 },
  { name: "MongoDB",       cat: 2, level: 78 },
  { name: "Redis",         cat: 2, level: 72 },
  { name: "MySQL",         cat: 2, level: 78 },
  { name: "Firebase",      cat: 2, level: 75 },
  { name: "Supabase",      cat: 2, level: 72 },
  { name: "Docker",        cat: 3, level: 75 },
  { name: "AWS",           cat: 3, level: 70 },
  { name: "Git",           cat: 3, level: 92 },
  { name: "Linux",         cat: 3, level: 80 },
  { name: "CI/CD",         cat: 3, level: 72 },
  { name: "Nginx",         cat: 3, level: 68 },
  { name: "TensorFlow",    cat: 4, level: 72 },
  { name: "PyTorch",       cat: 4, level: 70 },
  { name: "Scikit-learn",  cat: 4, level: 78 },
  { name: "Pandas",        cat: 4, level: 82 },
  { name: "NumPy",         cat: 4, level: 80 },
  { name: "OpenCV",        cat: 4, level: 68 },
  { name: "DSA",           cat: 5, level: 88 },
  { name: "System Design", cat: 5, level: 80 },
  { name: "Java",          cat: 5, level: 75 },
  { name: "Go",            cat: 5, level: 65 },
  { name: "LeetCode 1688", cat: 5, level: 85 },
];

const CAT_COLORS = ["#00e5ff", "#a855f7", "#22c55e", "#fbbf24", "#f97316", "#ec4899"];
const CAT_NAMES  = ["Frontend", "Backend", "Database", "DevOps/Cloud", "ML / AI", "CS & DSA"];

interface Point {
  ox: number; oy: number; oz: number; // original position
  name: string; cat: number; level: number;
}

// Fibonacci sphere distribution
function fibonacciSphere(n: number): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
}

// Rotate a 3D point by rotX (pitch) and rotY (yaw)
function rotate(x: number, y: number, z: number, rx: number, ry: number): [number, number, number] {
  // yaw (Y axis)
  const x1 = x * Math.cos(ry) + z * Math.sin(ry);
  const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
  // pitch (X axis)
  const y2 = y * Math.cos(rx) - z1 * Math.sin(rx);
  const z2 = y * Math.sin(rx) + z1 * Math.cos(rx);
  return [x1, y2, z2];
}

export default function Skills3DGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    rotX: 0.3, rotY: 0,
    velX: 0, velY: 0.003,
    dragging: false,
    lastMx: 0, lastMy: 0,
    zoom: 1,
    hoverIdx: -1,
    clickIdx: -1,
    raf: 0,
  });
  const [selected, setSelected] = useState<{ name: string; cat: number; level: number; sx: number; sy: number } | null>(null);
  const [hovered, setHovered] = useState<string>("");
  /** CSS-pixel size of the canvas — layout maths use this, not the DPR-scaled backing store. */
  const [cssSize, setCssSize] = useState(0);

  const points = useRef<Point[]>([]);

  useEffect(() => {
    const positions = fibonacciSphere(SKILLS.length);
    points.current = SKILLS.map((s, i) => ({
      ox: positions[i][0], oy: positions[i][1], oz: positions[i][2],
      name: s.name, cat: s.cat, level: s.level,
    }));

    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const state = stateRef.current;

    // Layout maths run in CSS pixels; the backing store is scaled by DPR so
    // the globe stays crisp on retina phones and laptops.
    let size = 0;

    function resize() {
      const container = containerRef.current;
      if (!container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = Math.max(220, Math.min(container.clientWidth, 520));
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      setCssSize(size);
    }
    resize();
    window.addEventListener("resize", resize);

    // ── Mouse/touch drag ──
    function onMouseDown(e: MouseEvent) {
      state.dragging = true;
      state.lastMx = e.clientX;
      state.lastMy = e.clientY;
      state.velX = 0; state.velY = 0;
    }
    function onMouseMove(e: MouseEvent) {
      if (!state.dragging) {
        // check hover
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        state.hoverIdx = getHitIndex(mx, my);
        setHovered(state.hoverIdx >= 0 ? points.current[state.hoverIdx].name : "");
        return;
      }
      const dx = e.clientX - state.lastMx;
      const dy = e.clientY - state.lastMy;
      state.velY = dx * 0.004;
      state.velX = dy * 0.004;
      state.rotY += dx * 0.004;
      state.rotX += dy * 0.004;
      state.lastMx = e.clientX;
      state.lastMy = e.clientY;
    }
    function onMouseUp(e: MouseEvent) {
      if (state.dragging) {
        state.dragging = false;
        // check click (if barely moved)
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const idx = getHitIndex(mx, my);
        if (idx >= 0) {
          const p = points.current[idx];
          const [rx, ry, rz] = rotate(p.ox, p.oy, p.oz, state.rotX, state.rotY);
          const W = size, H = size;
          const dist = 2.5 / state.zoom;
          const scale = (W * 0.38) / (dist + rz);
          const sx = W / 2 + rx * scale;
          const sy = H / 2 + ry * scale;
          setSelected({ name: p.name, cat: p.cat, level: p.level, sx, sy });
        } else {
          setSelected(null);
        }
      }
    }
    function onWheel(e: WheelEvent) {
      e.preventDefault();
      state.zoom = Math.max(0.5, Math.min(2.5, state.zoom - e.deltaY * 0.001));
    }

    // Touch support
    let lastTouchX = 0, lastTouchY = 0;
    let touchStartX = 0, touchStartY = 0;
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 1) {
        state.dragging = true;
        lastTouchX = e.touches[0].clientX;
        lastTouchY = e.touches[0].clientY;
        touchStartX = lastTouchX;
        touchStartY = lastTouchY;
        state.velX = 0; state.velY = 0;
      }
    }
    function onTouchMove(e: TouchEvent) {
      if (!state.dragging || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - lastTouchX;
      const dy = e.touches[0].clientY - lastTouchY;
      state.rotY += dx * 0.005;
      state.rotX += dy * 0.005;
      state.velY = dx * 0.005;
      state.velX = dy * 0.005;
      lastTouchX = e.touches[0].clientX;
      lastTouchY = e.touches[0].clientY;
    }
    function onTouchEnd(e: TouchEvent) {
      state.dragging = false;
      const t = e.changedTouches[0];
      if (!t) return;
      // A tap, not a drag — select the skill under the finger.
      if (Math.hypot(t.clientX - touchStartX, t.clientY - touchStartY) > 10) return;

      const rect = canvas.getBoundingClientRect();
      const idx = getHitIndex(t.clientX - rect.left, t.clientY - rect.top);
      if (idx < 0) {
        setSelected(null);
        return;
      }
      const p = points.current[idx];
      const [rx, ry, rz] = rotate(p.ox, p.oy, p.oz, state.rotX, state.rotY);
      const scale = (size * 0.38) / (2.5 / state.zoom + rz);
      setSelected({
        name: p.name,
        cat: p.cat,
        level: p.level,
        sx: size / 2 + rx * scale,
        sy: size / 2 + ry * scale,
      });
    }

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("wheel", onWheel, { passive: false });
    canvas.addEventListener("touchstart", onTouchStart);
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchend", onTouchEnd);

    function getHitIndex(mx: number, my: number): number {
      const W = size, H = size;
      const dist = 2.5 / state.zoom;
      let best = -1, bestDist = 999;
      points.current.forEach((p, i) => {
        const [rx, ry, rz] = rotate(p.ox, p.oy, p.oz, state.rotX, state.rotY);
        if (rz < -0.5) return; // behind
        const scale = (W * 0.38) / (dist + rz);
        const sx = W / 2 + rx * scale;
        const sy = H / 2 + ry * scale;
        const r = 4 + (rz + 1) * 4;
        const d = Math.hypot(sx - mx, sy - my);
        if (d < r + 12 && d < bestDist) { bestDist = d; best = i; }
      });
      return best;
    }

    // ── Render loop ──
    function render() {
      const W = size, H = size;
      ctx.clearRect(0, 0, W, H);
      const dist = 2.5 / state.zoom;

      // auto-rotate inertia
      if (!state.dragging) {
        state.velY += (0.003 - state.velY) * 0.012;
        state.velX += (0 - state.velX) * 0.04;
        state.rotY += state.velY;
        state.rotX += state.velX;
      }

      // Compute projected positions
      const projected = points.current.map((p, i) => {
        const [rx, ry, rz] = rotate(p.ox, p.oy, p.oz, state.rotX, state.rotY);
        const scale = (W * 0.38) / (dist + rz);
        const sx = W / 2 + rx * scale;
        const sy = H / 2 + ry * scale;
        const depth = (rz + 1) / 2; // 0 = back, 1 = front
        return { sx, sy, rz, depth, p, i };
      });

      // Sort back-to-front
      projected.sort((a, b) => a.rz - b.rz);

      // Draw connections (only between close nodes in 3D space, front half)
      ctx.save();
      projected.forEach(a => {
        if (a.depth < 0.2) return;
        projected.forEach(b => {
          if (b.i <= a.i || b.depth < 0.2) return;
          const d3 = Math.hypot(a.p.ox - b.p.ox, a.p.oy - b.p.oy, a.p.oz - b.p.oz);
          if (d3 > 0.6) return;
          const alpha = Math.min(a.depth, b.depth) * 0.12;
          const color = CAT_COLORS[a.p.cat];
          const [r, g, b2] = hexToRgb(color);
          ctx.beginPath();
          ctx.moveTo(a.sx, a.sy);
          ctx.lineTo(b.sx, b.sy);
          ctx.strokeStyle = `rgba(${r},${g},${b2},${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        });
      });
      ctx.restore();

      // Draw nodes
      projected.forEach(({ sx, sy, depth, p, i }) => {
        if (depth < 0.05) return;
        const color = CAT_COLORS[p.cat];
        const [r, g, b2] = hexToRgb(color);
        const isHover = state.hoverIdx === i;
        const isSelected = selected?.name === p.name;
        const radius = 3 + depth * 5 + (isHover ? 4 : 0) + (isSelected ? 3 : 0);
        const alpha = 0.3 + depth * 0.7;

        // glow halo
        if (depth > 0.3 || isHover) {
          const haloR = isHover ? radius * 4 : radius * 2.5;
          const grd = ctx.createRadialGradient(sx, sy, 0, sx, sy, haloR);
          grd.addColorStop(0, `rgba(${r},${g},${b2},${alpha * (isHover ? 0.5 : 0.2)})`);
          grd.addColorStop(1, `rgba(${r},${g},${b2},0)`);
          ctx.beginPath();
          ctx.arc(sx, sy, haloR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        // node circle
        ctx.beginPath();
        ctx.arc(sx, sy, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b2},${alpha})`;
        ctx.fill();
        if (isHover || isSelected) {
          ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.9})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // label (front nodes or hovered)
        if (depth > 0.55 || isHover) {
          const labelAlpha = isHover ? 1 : (depth - 0.55) * 2.2;
          ctx.font = `${isHover ? "bold " : ""}${11 + depth * 3}px Inter,sans-serif`;
          ctx.textAlign = "center";
          ctx.fillStyle = `rgba(255,255,255,${labelAlpha * 0.95})`;
          ctx.fillText(p.name, sx, sy - radius - 5);
          if (isHover) {
            ctx.font = `10px Inter,sans-serif`;
            ctx.fillStyle = `rgba(${r},${g},${b2},0.85)`;
            ctx.fillText(`${CAT_NAMES[p.cat]} · ${p.level}%`, sx, sy - radius - 18);
          }
        }
      });

      // Equator ring hint
      const ringGrd = ctx.createRadialGradient(W / 2, H / 2, W * 0.3, W / 2, H / 2, W * 0.42);
      ringGrd.addColorStop(0, "rgba(0,229,255,0)");
      ringGrd.addColorStop(0.85, "rgba(0,229,255,0.025)");
      ringGrd.addColorStop(1, "rgba(0,229,255,0)");
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, W * 0.38 * state.zoom, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0,229,255,0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      state.raf = requestAnimationFrame(render);
    }

    state.raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(state.raf);
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("touchstart", onTouchStart);
      canvas.removeEventListener("touchmove", onTouchMove);
      canvas.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={containerRef} className="relative w-full flex flex-col items-center">
      {/* Ambient glow behind globe */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div style={{
          width: "min(420px, 100%)", aspectRatio: "1", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, rgba(168,85,247,0.04) 50%, transparent 70%)",
          filter: "blur(20px)"
        }} />
      </div>

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="relative z-10 rounded-full"
        style={{
          cursor: hovered ? "pointer" : "grab",
          userSelect: "none",
          touchAction: "none",
          boxShadow: "0 0 60px rgba(0,229,255,0.08), 0 0 120px rgba(168,85,247,0.05)"
        }}
      />

      {/* Hint label */}
      <p className="mt-4 text-[0.62rem] sm:text-xs text-muted-foreground tracking-[0.15em] sm:tracking-widest uppercase select-none text-center px-2">
        <span className="hidden sm:inline">Drag to rotate · Scroll to zoom · Click a skill</span>
        <span className="sm:hidden">Swipe to rotate · Tap a skill</span>
      </p>

      {/* Selected skill card */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute z-20 rounded-xl border p-4 w-[min(200px,60vw)]"
            style={{
              top: (selected.sy / (cssSize || 500)) * 100 + "%",
              left: selected.sx > (cssSize || 500) / 2 ? "auto" : "55%",
              right: selected.sx > (cssSize || 500) / 2 ? "55%" : "auto",
              background: "rgba(5,5,20,0.92)",
              backdropFilter: "blur(12px)",
              borderColor: CAT_COLORS[selected.cat] + "60",
              boxShadow: `0 0 30px ${CAT_COLORS[selected.cat]}30`,
              transform: "translateY(-50%)"
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className="absolute top-2 right-2 text-muted-foreground hover:text-white text-xs"
              onClick={() => setSelected(null)}
            >✕</button>
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: CAT_COLORS[selected.cat] }}>
              {CAT_NAMES[selected.cat]}
            </p>
            <p className="font-bold text-base mb-3">{selected.name}</p>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden mb-1">
              <motion.div
                className="h-full rounded-full"
                style={{ background: CAT_COLORS[selected.cat], boxShadow: `0 0 8px ${CAT_COLORS[selected.cat]}` }}
                initial={{ width: 0 }}
                animate={{ width: `${selected.level}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Proficiency: <span className="font-bold" style={{ color: CAT_COLORS[selected.cat] }}>{selected.level}%</span></p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3 mt-5">
        {CAT_NAMES.map((name, i) => (
          <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: CAT_COLORS[i], boxShadow: `0 0 6px ${CAT_COLORS[i]}` }} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const m = hex.match(/rgba?\((\d+),(\d+),(\d+)/);
  if (m) return [+m[1], +m[2], +m[3]];
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
