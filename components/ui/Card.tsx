import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        group
        relative
        overflow-hidden

        rounded-3xl
        border
        border-white/10

        bg-[#0d0d0d]/80
        backdrop-blur-xl

        p-8

        transition-all
        duration-500
        ease-out

        hover:-translate-y-3
        hover:border-orange-500/40
        hover:shadow-[0_25px_60px_rgba(249,115,22,0.25)]

        ${className}
      `}
    >
      {/* Orange Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-[radial-gradient(circle_at_top,rgba(249,115,22,0.12),transparent_70%)]
          pointer-events-none
        "
      />

      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}