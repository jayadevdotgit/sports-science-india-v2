import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "outline";
}

export default function Button({
  children,
  variant = "primary",
}: ButtonProps) {
  const styles =
    variant === "primary"
      ? "bg-orange-500 hover:bg-orange-600 text-white"
      : "border border-white text-white hover:bg-white hover:text-black";

  return (
    <button
      className={`${styles} px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105`}
    >
      {children}
    </button>
  );
}