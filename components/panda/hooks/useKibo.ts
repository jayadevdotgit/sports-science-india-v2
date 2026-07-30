"use client";

import { useEffect, useState } from "react";

export interface KiboPosition {
  x: number;
  y: number;
}

export function useKibo() {
  const [position, setPosition] = useState<KiboPosition | null>(null);

  useEffect(() => {
    const DIST_FROM_RIGHT = 12;
    const DIST_FROM_BOTTOM = 12;
    setPosition({
      x: Math.max(0, window.innerWidth - DIST_FROM_RIGHT - 96),
      y: Math.max(0, window.innerHeight - DIST_FROM_BOTTOM - 96),
    });
  }, []);

  const savePosition = (pos: KiboPosition) => {
    setPosition(pos);
  };

  return {
    position,
    savePosition,
    ready: position !== null,
  };
}
