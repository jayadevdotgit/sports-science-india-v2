"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import KiboBubble from "./KiboBubble";
import KiboChat from "./KiboChat";
import ViviSVG from "./ViviSVG";
import { useKibo } from "./hooks/useKibo";
import { useBlink } from "./hooks/useBlink";
import { useIdle } from "./hooks/useIdle";
import { useWave } from "./hooks/useWave";

export default function Kibo() {
  const { position, savePosition, ready } = useKibo();

  const [dragging, setDragging] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [walking, setWalking] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const blinking = useBlink();
  const waving = useWave();
  const { idle, markActive } = useIdle();

  const elRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: position?.x ?? 0, y: position?.y ?? 0 });
  const offsetRef = useRef({ x: 0, y: 0 });
  const draggedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });
  const walkTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!position || !elRef.current) return;
    posRef.current = position;
    const el = elRef.current;
    el.dataset.vw = String(window.innerWidth);
    el.dataset.vh = String(window.innerHeight);

    function onOrientationChange() {
      if (!elRef.current) return;
      const newW = window.innerWidth;
      const newH = window.innerHeight;
      const oldW = parseInt(el.dataset.vw!, 10);
      const oldH = parseInt(el.dataset.vh!, 10);
      if (oldW === newW) return;
      const distRight = oldW - posRef.current.x;
      const distBottom = oldH - posRef.current.y;
      posRef.current.x = Math.max(0, Math.min(newW - distRight, newW - 20));
      posRef.current.y = Math.max(0, Math.min(newH - distBottom, newH - 20));
      elRef.current.style.transform = `translate(${posRef.current.x}px, ${posRef.current.y}px)`;
      elRef.current.dataset.vw = String(newW);
      elRef.current.dataset.vh = String(newH);
    }

    const mql = window.matchMedia("(orientation: portrait)");
    mql.addEventListener("change", onOrientationChange);
    return () => mql.removeEventListener("change", onOrientationChange);
  }, [position]);

  useEffect(() => {
    const showTimer = setTimeout(() => setShowBubble(true), 1200);
    const hideTimer = setTimeout(() => setShowBubble(false), 6000);
    return () => { clearTimeout(showTimer); clearTimeout(hideTimer); };
  }, []);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (idle && !dragging) {
      timers.push(setTimeout(() => {
        setWalking(true);
        timers.push(setTimeout(() => setWalking(false), 3000));
      }, 8000));
    } else {
      if (walkTimerRef.current) clearTimeout(walkTimerRef.current);
      timers.push(setTimeout(() => setWalking(false), 0));
    }
    return () => timers.forEach(clearTimeout);
  }, [idle, dragging]);

  const handleGlobalMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
  }, [handleGlobalMouseMove]);

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
    const maxX = window.innerWidth - 20;
    const maxY = window.innerHeight - 20;
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
    const defaultPosition = {
      x: Math.max(0, window.innerWidth - 108),
      y: Math.max(0, window.innerHeight - 108),
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
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
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
        <div className={`absolute inset-2 -z-10 rounded-full bg-orange-500/35 blur-xl transition-all duration-1000 group-hover:bg-orange-500/50 ${idle ? "animate-pulse" : ""}`} />

        <div className={`absolute bottom-0 left-1/2 h-4 w-20 -translate-x-1/2 rounded-full bg-black/30 blur-md ${walking ? "animate-vivi-shadow-walk" : ""}`} />

        <KiboBubble visible={showBubble} />

        <div className={`${idle && !walking ? "animate-float" : ""}`} onMouseEnter={markActive}>
          <ViviSVG
            blinking={blinking}
            thinking={thinking}
            idle={idle}
            waving={waving}
            bouncing={bouncing}
            walking={walking}
            hovering={hovering}
            mouseX={mouseX}
            mouseY={mouseY}
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
