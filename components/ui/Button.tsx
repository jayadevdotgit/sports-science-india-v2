import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
  size?: "sm" | "md" | "lg";
  color?: "orange" | "indigo" | "rose" | "cyan";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  color = "orange",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary: {
      orange: "bg-orange-500 hover:bg-orange-600 text-white",
      indigo: "bg-indigo-500 hover:bg-indigo-600 text-white",
      rose: "bg-rose-500 hover:bg-rose-600 text-white",
      cyan: "bg-cyan-500 hover:bg-cyan-600 text-white",
    },
    outline: "border border-white text-white hover:bg-white hover:text-black",
    dark: "bg-black text-white hover:bg-gray-900",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      {...props}
      className={`
        ${typeof styles[variant] === "string" ? styles[variant] : styles[variant as "primary"][color]}
        ${sizes[size]}
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        font-semibold
        transition-all
        duration-300
        hover:scale-105
        shadow-lg
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}