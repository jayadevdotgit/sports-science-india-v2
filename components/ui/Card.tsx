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
        bg-[#111111]
        rounded-3xl
        p-8
        border
        border-gray-800
        hover:border-orange-500
        hover:-translate-y-2
        transition-all
        duration-300
        ${className}
      `}
    >
      {children}
    </div>
  );
}