"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/scrollEngine";

export default function SmoothScroll() {
  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      setLenis(null);
      return;
    }

    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const compactViewport = window.matchMedia("(max-width: 1024px)").matches;

    if (coarsePointer || compactViewport) {
      setLenis(null);
      return;
    }

    let lenis: Lenis | null = null;

    try {
      lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
        touchMultiplier: 1.6,
        wheelMultiplier: 1,
        autoRaf: true,
        anchors: { offset: 90 },
      });
      setLenis(lenis);
    } catch {
      setLenis(null);
    }

    return () => {
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
