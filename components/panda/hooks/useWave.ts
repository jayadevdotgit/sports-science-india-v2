"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "kibo-welcomed-v2";

/** Returns true only for Kibo's first visit in this browser. */
export function useWave() {
  const [waving, setWaving] = useState(false);

  useEffect(() => {
    if (localStorage.getItem(STORAGE_KEY)) return;

    let stopTimer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(() => {
      setWaving(true);
      localStorage.setItem(STORAGE_KEY, "true");
      stopTimer = setTimeout(() => setWaving(false), 2600);
    }, 500);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(stopTimer);
    };
  }, []);

  return waving;
}
