"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [visible, setVisible] = useState(false);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Don't show again in the same browser session
    if (sessionStorage.getItem("loaderShown")) {
      setHide(true);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);

      setTimeout(() => {
        sessionStorage.setItem("loaderShown", "true");
        setHide(true);
      }, 700);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (hide) return null;

  return (
    <div
      className={`
        fixed inset-0 z-[9999]
        flex flex-col items-center justify-center
        bg-[#050505]
        transition-all duration-700
        ${visible ? "opacity-100" : "opacity-0"}
      `}
    >
      {/* Orange Glow */}
      <div className="absolute h-72 w-72 rounded-full bg-orange-500/20 blur-[120px] animate-pulse" />

      {/* Logo */}
      <Image
        src="/images/logo/ssi-logo.png"
        alt="Sports Science India"
        width={260}
        height={100}
        priority
        className="relative z-10 object-contain animate-[fadeIn_0.8s_ease]"
      />

      <p className="mt-8 text-sm uppercase tracking-[0.35em] text-orange-400">
        Science • Performance • Excellence
      </p>

      {/* Progress */}
      <div className="mt-10 h-1 w-72 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-orange-500 animate-loader" />
      </div>

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

      <p className="mt-5 text-sm text-gray-500">
        Preparing Your Performance...
      </p>

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