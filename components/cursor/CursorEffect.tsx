"use client";

import React, { useEffect, useRef } from "react";

export default function CursorEffect() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let lastX = mouseX;
    let lastY = mouseY;
    let rafId = 0;

    function onMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (ring) {
        ring.style.left = `${mouseX}px`;
        ring.style.top = `${mouseY}px`;
      }
    }

    function loop() {
      lastX += (mouseX - lastX) * 0.18;
      lastY += (mouseY - lastY) * 0.18;
      if (dot) {
        dot.style.transform = `translate(${lastX}px, ${lastY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    }

    function onClick(e: MouseEvent) {
      const ripple = document.createElement("div");
      ripple.className = "click-ripple";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      document.body.appendChild(ripple);
      setTimeout(() => ripple.remove(), 900);
      if (ring) {
        ring.classList.add("ring-click");
        setTimeout(() => ring.classList.remove("ring-click"), 420);
      }
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("click", onClick);
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
