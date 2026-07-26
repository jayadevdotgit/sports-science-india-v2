"use client";

import { useState, useEffect } from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

interface CounterProps {
  end: number;
  suffix?: string;
}

export default function Counter({
  end,
  suffix = "",
}: CounterProps) {
  const [mounted, setMounted] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={ref}>
      {mounted && inView ? (
        <CountUp end={end} duration={2.5} suffix={suffix} />
      ) : (
        `${end}${suffix}`
      )}
    </div>
  );
}