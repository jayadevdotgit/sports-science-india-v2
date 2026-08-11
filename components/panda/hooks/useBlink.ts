"use client";

import { useEffect, useState } from "react";

const MIN_DELAY = 3000;
const MAX_DELAY = 8000;
const BLINK_DURATION = 150;

/** Creates an irregular 3–8 second blink rhythm. */
export function useBlink() {
  const [blinking, setBlinking] = useState(false);

  useEffect(() => {
    let blinkTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const scheduleBlink = () => {
      const delay = MIN_DELAY + Math.random() * (MAX_DELAY - MIN_DELAY);
      nextTimer = setTimeout(() => {
        if (cancelled) return;
        setBlinking(true);
        blinkTimer = setTimeout(() => {
          setBlinking(false);
          if (Math.random() < 0.28) {
            blinkTimer = setTimeout(() => {
              setBlinking(true);
              blinkTimer = setTimeout(() => {
                setBlinking(false);
                scheduleBlink();
              }, BLINK_DURATION);
            }, 150);
          } else {
            scheduleBlink();
          }
        }, BLINK_DURATION);
      }, delay);
    };

    scheduleBlink();
    return () => {
      cancelled = true;
      clearTimeout(nextTimer);
      clearTimeout(blinkTimer);
    };
  }, []);

  return blinking;
}
