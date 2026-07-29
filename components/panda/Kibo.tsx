"use client";

import { useEffect, useRef, useState } from "react";
import KiboBubble from "./KiboBubble";
import KiboChat from "./KiboChat";
import KiboSVG from "./KiboSVG";
import { useKibo } from "./hooks/useKibo";
import { useBlink } from "./hooks/useBlink";
import { useIdle } from "./hooks/useIdle";
import { useWave } from "./hooks/useWave";

const KIBO_SIZE = 250;

export default function Kibo() {
  const { position, savePosition, ready } = useKibo();

  const [dragging, setDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const blinking = useBlink();
  const waving = useWave();
  const { idle, markActive } = useIdle();

  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: position?.x ?? 0, y: position?.y ?? 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const draggedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!position) return;
    posRef.current = position;

    function snapToCorner() {
      const newX = Math.max(0, window.innerWidth - KIBO_SIZE - 40);
      const newY = Math.max(0, window.innerHeight - 100);
      posRef.current = { x: newX, y: newY };
      savePosition({ x: newX, y: newY });
      if (elRef.current) {
        elRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
    }

    window.addEventListener("resize", snapToCorner);
    return () => window.removeEventListener("resize", snapToCorner);
  }, [position, savePosition]);

  // Show welcome bubble on every page load
  useEffect(() => {
    const showTimer = setTimeout(() => setShowBubble(true), 1200);
    const hideTimer = setTimeout(() => setShowBubble(false), 6000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  if (!ready || !position) return null;

  function handlePointerDown(e: React.PointerEvent) {
    markActive();
    draggedRef.current = false;
    setDragging(true);
    startPosRef.current = { x: e.clientX, y: e.clientY };
    const rect = elRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    elRef.current?.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!dragging) return;
    const dx = Math.abs(e.clientX - startPosRef.current.x);
    const dy = Math.abs(e.clientY - startPosRef.current.y);
    if (dx < 5 && dy < 5) return;
    draggedRef.current = true;
    const maxX = window.innerWidth - KIBO_SIZE;
    const maxY = window.innerHeight - KIBO_SIZE;
    const newX = Math.min(maxX, Math.max(0, e.clientX - offsetRef.current.x));
    const newY = Math.min(maxY, Math.max(0, e.clientY - offsetRef.current.y));
    posRef.current = { x: newX, y: newY };
    if (elRef.current) {
      elRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
    }
  }

  function handlePointerUp() {
    if (!dragging) return;
    setDragging(false);
    if (!draggedRef.current) {
      setBouncing(true);
      setTimeout(() => setBouncing(false), 450);
      setShowBubble(false);
      setChatOpen(true);
      return;
    }
    savePosition({ x: posRef.current.x, y: posRef.current.y });
  }

  function resetPosition() {
    const isMobile = window.innerWidth < 768;
    const defaultPosition = {
      x: isMobile ? window.innerWidth - 100 : window.innerWidth - 140,
      y: isMobile ? window.innerHeight - 120 : window.innerHeight - 160,
    };
    posRef.current = defaultPosition;
    savePosition(defaultPosition);
    if (elRef.current) {
      elRef.current.style.transform = `translate(${defaultPosition.x}px, ${defaultPosition.y}px)`;
    }
  }

  return (
    <>
      <div
        ref={elRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onDoubleClick={resetPosition}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          transform: `translate(${position.x}px, ${position.y}px)`,
          zIndex: 9999,
          touchAction: "none",
          userSelect: "none",
          cursor: dragging ? "grabbing" : "grab",
        }}
        className="group isolate"
      >
        {/* Glow */}
        <div className="absolute inset-2 -z-10 rounded-full bg-orange-500/35 blur-xl animate-pulse transition-all duration-1000 group-hover:bg-orange-500/50" />

        {/* Ground Shadow */}
        <div className="absolute bottom-0 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-black/30 blur-md" />

        {/* Welcome Bubble */}
        <KiboBubble visible={showBubble} />

        {/* Kibo */}
        <div className="animate-float" onMouseEnter={markActive}>
          <KiboSVG
            blinking={blinking}
            thinking={thinking}
            idle={idle}
            waving={waving}
            bouncing={bouncing}
          />
        </div>
      </div>

      <KiboChat
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        onThinkingChange={setThinking}
      />
    </>
  );
}
