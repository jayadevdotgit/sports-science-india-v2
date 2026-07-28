"use client";

import { useEffect, useState } from "react";

export interface KiboPosition {
  x: number;
  y: number;
}

const STORAGE_KEY = "kibo-position";

export function useKibo() {
  const [position, setPosition] = useState<KiboPosition | null>(null);

  useEffect(() => {
    try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
        setPosition(JSON.parse(saved));
        return;
    }
   } catch (error) {
    console.error("Failed to restore Kibo position:", error);
    localStorage.removeItem(STORAGE_KEY);
    }
    const MOBILE_BREAKPOINT = 768;
    const isMobile = window.innerWidth < MOBILE_BREAKPOINT;
    const DIST_FROM_BOTTOM = 100;
    const DIST_FROM_RIGHT = 40;
    setPosition({
      x: Math.max(0, window.innerWidth - DIST_FROM_RIGHT - 96),
      y: Math.max(0, window.innerHeight - DIST_FROM_BOTTOM),
    });
  }, []);

  const savePosition = (pos: KiboPosition) => {
    setPosition(pos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
  };

  return {
    position,
    savePosition,
    ready: position !== null,
  };
}
