"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const alreadyShown =
    typeof window !== "undefined" && Boolean(sessionStorage.getItem("loaderShown"));

  const [visible, setVisible] = useState(!alreadyShown);
  const [hide, setHide] = useState(alreadyShown);

  useEffect(() => {
    if (alreadyShown) return;

    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        sessionStorage.setItem("loaderShown", "true");
        setHide(true);
      }, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, [alreadyShown]);

  if (hide) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex items-center justify-center
        bg-[#050505]
        overflow-hidden
        transition-opacity duration-700
        ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}
      `}
    >
      {/* Background Glow */}
      <div className="absolute h-56 w-56 sm:h-64 sm:w-64 md:h-72 md:w-72 rounded-full bg-orange-500/20 blur-[100px] sm:blur-[120px] animate-pulse" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 -translate-y-4">

        {/* Logo */}
        <Image
          src="/images/logo/ssi-logo.png"
          alt="Sports Science India"
          width={260}
          height={100}
          priority
          className="
            w-44
            sm:w-52
            md:w-64
            h-auto
            object-contain
            animate-[fadeIn_0.8s_ease]
          "
        />

        {/* Tagline */}
        <p className="mt-6 text-center text-[11px] sm:text-sm uppercase tracking-[0.35em] text-orange-400">
          Science • Performance • Excellence
        </p>

        {/* Progress Bar */}
        <div className="mt-8 h-1 w-48 sm:w-64 md:w-72 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-orange-500 animate-loader" />
        </div>

        {/* Dots */}
        <div className="mt-6 flex gap-2">
          <span className="h-2 w-2 rounded-full bg-orange-500 animate-bounce" />
          <span
            className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-orange-500 animate-bounce"
            style={{ animationDelay: "0.4s" }}
          />
        </div>

        {/* Loading Text */}
        <p className="mt-5 text-center text-xs sm:text-sm text-gray-500">
          Preparing Your Performance...
        </p>

      </div>

      <style jsx>{`
        .animate-loader {
          width: 0%;
          animation: loader 2.4s ease forwards;
        }

        @keyframes loader {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.92);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}