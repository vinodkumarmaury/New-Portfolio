"use client";
import { useRef, useCallback, ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface Props {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  maxTilt?: number;
  glare?: boolean;
  scale?: number;
}

export default function TiltCard3D({
  children,
  className = "",
  style,
  maxTilt = 15,
  glare = true,
  scale = 1.04,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const glareX = useMotionValue(50);
  const glareY = useMotionValue(50);

  const rotateX = useSpring(useTransform(rawY, [-1, 1], [maxTilt, -maxTilt]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-1, 1], [-maxTilt, maxTilt]), { stiffness: 200, damping: 20 });
  const scaleVal = useSpring(1, { stiffness: 200, damping: 20 });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    rawX.set(nx);
    rawY.set(ny);
    glareX.set(((e.clientX - rect.left) / rect.width) * 100);
    glareY.set(((e.clientY - rect.top) / rect.height) * 100);
  }, [rawX, rawY, glareX, glareY]);

  const onMouseEnter = useCallback(() => { scaleVal.set(scale); }, [scaleVal, scale]);

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    scaleVal.set(1);
  }, [rawX, rawY, scaleVal]);

  const glareOpacity = useTransform(
    [rawX, rawY],
    ([x, y]: number[]) => Math.min(Math.sqrt(x * x + y * y) * 0.25, 0.25)
  );

  return (
    <motion.div
      ref={cardRef}
      className={className}
      style={{
        ...style,
        rotateX,
        rotateY,
        scale: scaleVal,
        transformStyle: "preserve-3d",
        perspective: 800,
        transformPerspective: 800,
        willChange: "transform",
      }}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}

      {/* Glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
          style={{ zIndex: 2 }}
        >
          <motion.div
            className="absolute inset-0"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]: number[]) =>
                  `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.18) 0%, transparent 60%)`
              ),
              opacity: glareOpacity,
              borderRadius: "inherit",
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
