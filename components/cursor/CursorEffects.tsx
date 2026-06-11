"use client";

import { useEffect } from "react";

export default function CursorEffects() {
  useEffect(() => {
    const count = 12;
    const container = document.createElement("div");
    container.className = "cursor-trail-container";
    document.body.appendChild(container);

    const dots: { el: HTMLDivElement; x: number; y: number }[] = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      d.className = "cursor-dot";
      d.style.opacity = String(1 - (i / count) * 0.85);
      container.appendChild(d);
      dots.push({ el: d, x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    let raf = 0;
    const animate = () => {
      let x = mouseX;
      let y = mouseY;
      for (let i = 0; i < dots.length; i++) {
        const t = dots[i];
        t.x = lerp(t.x, x, 0.22 + i * 0.02);
        t.y = lerp(t.y, y, 0.22 + i * 0.02);
        const scale = 1 - i * 0.03;
        t.el.style.transform = `translate3d(${t.x - 8}px, ${t.y - 8}px, 0) scale(${scale})`;
        x = t.x;
        y = t.y;
      }
      raf = requestAnimationFrame(animate);
    };

    const onClick = (e: MouseEvent) => {
      const r = document.createElement("div");
      // reuse existing click-ripple styles
      r.className = "click-ripple";
      r.style.left = `${e.clientX}px`;
      r.style.top = `${e.clientY}px`;
      container.appendChild(r);
      setTimeout(() => {
        r.remove();
      }, 900);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      container.remove();
    };
  }, []);

  return null;
}
