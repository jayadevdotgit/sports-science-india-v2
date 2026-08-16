"use client";

import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  const mouse = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (reducedMotion || coarsePointer) return;

    mouse.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    current.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    let animationFrame: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const stopLoop = () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    };

    const animate = () => {
      if (
        Math.abs(current.current.x - mouse.current.x) < 0.1 &&
        Math.abs(current.current.y - mouse.current.y) < 0.1
      ) {
        current.current.x = mouse.current.x;
        current.current.y = mouse.current.y;
        if (glowRef.current) {
          glowRef.current.style.transform = `translate3d(${mouse.current.x - 175}px, ${mouse.current.y - 175}px, 0)`;
        }
        return;
      }

      current.current.x += (mouse.current.x - current.current.x) * 0.08;
      current.current.y += (mouse.current.y - current.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(
          ${current.current.x - 175}px,
          ${current.current.y - 175}px,
          0
        )`;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (animationFrame !== null) return;
      animationFrame = requestAnimationFrame(animate);
      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(stopLoop, 2000);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      startLoop();
    };

    window.addEventListener("mousemove", handleMouseMove);
    startLoop();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (idleTimer) clearTimeout(idleTimer);
      stopLoop();
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="
        pointer-events-none
        fixed
        hidden
        lg:block
        left-0
        top-0
        z-10
        h-[350px]
        w-[350px]
        rounded-full
        bg-orange-500/5
        blur-[120px]
        mix-blend-screen
        will-change-transform
      "
    />
  );
}
