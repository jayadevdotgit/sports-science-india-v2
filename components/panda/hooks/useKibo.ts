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
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      setPosition(JSON.parse(saved));
      return;
    }

    setPosition({
      x: window.innerWidth - 140,
      y: window.innerHeight - 160,
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
