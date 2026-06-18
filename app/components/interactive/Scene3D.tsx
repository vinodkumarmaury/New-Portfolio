"use client";
import { useEffect, useRef } from "react";

interface Cube {
  x: number; y: number; z: number;
  vx: number; vy: number; vz: number;
  rx: number; ry: number; rz: number;
  dRx: number; dRy: number; dRz: number;
  size: number;
  color: string;
  alpha: number;
}

function project(
  x: number, y: number, z: number,
  cx: number, cy: number, dist: number
): [number, number, number] {
  const scale = dist / (dist + z);
  return [cx + x * scale, cy + y * scale, scale];
}

function rotatePt(
  x: number, y: number, z: number,
  rx: number, ry: number, rz: number
): [number, number, number] {
  // Rotate around Z
  let x1 = x * Math.cos(rz) - y * Math.sin(rz);
  let y1 = x * Math.sin(rz) + y * Math.cos(rz);
  let z1 = z;
  // Rotate around X
  let x2 = x1;
  let y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
  let z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);
  // Rotate around Y
  let x3 = x2 * Math.cos(ry) + z2 * Math.sin(ry);
  let y3 = y2;
  let z3 = -x2 * Math.sin(ry) + z2 * Math.cos(ry);
  return [x3, y3, z3];
}

const COLORS = ["#00e5ff", "#a855f7", "#22c55e", "#fbbf24", "#f97316", "#ec4899"];

export default function Scene3D({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.offsetWidth;
    let H = canvas.offsetHeight;
    canvas.width = W;
    canvas.height = H;

    let mx = W / 2, my = H / 2;
    let scrollFrac = 0;

    // Build cubes
    const cubes: Cube[] = Array.from({ length: 18 }, (_, i) => ({
      x: (Math.random() - 0.5) * W * 0.7,
      y: (Math.random() - 0.5) * H * 0.7,
      z: (Math.random() - 0.5) * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      vz: (Math.random() - 0.5) * 0.2,
      rx: Math.random() * Math.PI * 2,
      ry: Math.random() * Math.PI * 2,
      rz: Math.random() * Math.PI * 2,
      dRx: (Math.random() - 0.5) * 0.015,
      dRy: (Math.random() - 0.5) * 0.018,
      dRz: (Math.random() - 0.5) * 0.012,
      size: 18 + Math.random() * 38,
      color: COLORS[i % COLORS.length],
      alpha: 0.15 + Math.random() * 0.25,
    }));

    function drawCube(
      ctx: CanvasRenderingContext2D,
      cx: number, cy: number, cz: number,
      size: number, rx: number, ry: number, rz: number,
      color: string, alpha: number
    ) {
      const s = size / 2;
      const corners: [number, number, number][] = [
        [-s,-s,-s],[s,-s,-s],[s,s,-s],[-s,s,-s],
        [-s,-s, s],[s,-s, s],[s,s, s],[-s,s, s],
      ];

      const dist = 600;
      const projCorners = corners.map(([x, y, z]) => {
        const [rx2, ry2, rz2] = rotatePt(x, y, z, rx, ry, rz);
        return project(cx + rx2, cy + ry2, cz + rz2, W / 2, H / 2, dist);
      });

      const faces = [
        [0,1,2,3], [4,5,6,7],
        [0,1,5,4], [2,3,7,6],
        [0,3,7,4], [1,2,6,5],
      ];

      const [, , avgScale] = project(cx, cy, cz, W / 2, H / 2, dist);
      const faceAlpha = alpha * Math.min(avgScale * 2, 1);
      if (faceAlpha < 0.02) return;

      const [r, g, b] = hexToRgb(color);

      faces.forEach(face => {
        const pts = face.map(i => projCorners[i]);
        ctx.beginPath();
        ctx.moveTo(pts[0][0], pts[0][1]);
        pts.forEach(([px, py]) => ctx.lineTo(px, py));
        ctx.closePath();
        ctx.strokeStyle = `rgba(${r},${g},${b},${faceAlpha * 0.9})`;
        ctx.lineWidth = 1;
        ctx.fillStyle = `rgba(${r},${g},${b},${faceAlpha * 0.06})`;
        ctx.fill();
        ctx.stroke();
      });
    }

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onScroll = () => { scrollFrac = window.scrollY / (document.body.scrollHeight - window.innerHeight || 1); };
    const onResize = () => {
      W = canvas.offsetWidth; H = canvas.offsetHeight;
      canvas.width = W; canvas.height = H;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    let raf: number;
    function render() {
      ctx.clearRect(0, 0, W, H);

      const driftX = (mx - W / 2) * 0.00015;
      const driftY = (my - H / 2) * 0.00015;

      cubes.forEach(c => {
        c.rx += c.dRx + driftY;
        c.ry += c.dRy + driftX;
        c.rz += c.dRz;
        c.x += c.vx;
        c.y += c.vy;
        c.z += c.vz;
        // bounce
        if (Math.abs(c.x) > W * 0.55) c.vx *= -1;
        if (Math.abs(c.y) > H * 0.55) c.vy *= -1;
        if (Math.abs(c.z) > 200) c.vz *= -1;

        const scrollBoost = 1 + scrollFrac * 0.5;
        drawCube(ctx, c.x, c.y, c.z, c.size * scrollBoost, c.rx, c.ry, c.rz, c.color, c.alpha);
      });

      raf = requestAnimationFrame(render);
    }
    raf = requestAnimationFrame(render);

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
      className={`pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
