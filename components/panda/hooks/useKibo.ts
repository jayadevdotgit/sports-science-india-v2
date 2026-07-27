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
    setPosition({
      x: isMobile ? window.innerWidth - 100 : window.innerWidth - 140,
      y: isMobile ? window.innerHeight - 120 : window.innerHeight - 160,
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
