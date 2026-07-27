"use client";

import { useEffect, useRef, useState } from "react";
import KiboImage from "./KiboImage";
import { useKibo } from "./hooks/useKibo";

export default function Kibo() {
  const { position, savePosition, ready } = useKibo();
  const [dragging, setDragging] = useState(false);
  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: position?.x ?? 0, y: position?.y ?? 0 });
  const offsetRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (position) {
      posRef.current = position;
    }
  }, [position]);

  if (!ready) return null;

  function handlePointerDown(e: React.PointerEvent) {
    setDragging(true);
    const rect = elRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    elRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging || !position) return;
    const newX = Math.max(0, e.clientX - offsetRef.current.x);
    const newY = Math.max(0, e.clientY - offsetRef.current.y);
    posRef.current = { x: newX, y: newY };
    if (elRef.current) {
      elRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }

  function handlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    savePosition({ x: posRef.current.x, y: posRef.current.y });
  }

  return (
    <div
      ref={elRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        transform: `translate(${position!.x}px, ${position!.y}px)`,
        zIndex: 9999,
        touchAction: "none",
        userSelect: "none",
        cursor: dragging ? "grabbing" : "grab",
      }}
      className="group"
    >
      {/* Glow */}
      <div className="absolute inset-5 -z-10 rounded-full bg-orange-500/15 blur-2xl" />

      {/* Ground Shadow */}
      <div className="absolute bottom-2 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-black/30 blur-md" />

      <div className="transition-transform duration-200 group-hover:scale-105 group-active:scale-95 animate-float">
        <KiboImage />
      </div>
    </div>
  );
}
