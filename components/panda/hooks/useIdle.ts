"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const IDLE_DELAY = 7000;

export function useIdle() {
  const [idle, setIdle] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const markActive = useCallback(() => {
    setIdle(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setIdle(true), IDLE_DELAY);
  }, []);

  useEffect(() => {
    timerRef.current = setTimeout(() => setIdle(true), IDLE_DELAY);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return { idle, markActive };
}
