"use client";

import { useEffect, useState } from "react";

export default function IndependenceDayBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const independenceDay = new Date(now.getFullYear(), 7, 15);
    setShow(today.getTime() === independenceDay.getTime());
  }, []);

  if (!show) return null;

  return (
    <div className="fixed left-1/2 top-20 sm:top-24 z-[70] -translate-x-1/2 pointer-events-none">
      <div className="flex items-center gap-3 rounded-full border border-white/15 bg-black/80 px-4 py-2.5 sm:px-6 sm:py-3 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
        <span className="flex h-8 w-2 overflow-hidden rounded-full" aria-hidden="true">
          <span className="h-1/3 w-full bg-[#FF9933]" />
          <span className="h-1/3 w-full bg-white" />
          <span className="h-1/3 w-full bg-[#138808]" />
        </span>
        <div className="leading-tight">
          <p className="text-xs sm:text-sm font-bold text-white">
            Happy Independence Day
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400">
            India at 79 — Joy of Freedom, Spirit of Sport
          </p>
        </div>
        <span className="text-lg sm:text-xl" aria-hidden="true">
          🇮🇳
        </span>
      </div>
    </div>
  );
}
