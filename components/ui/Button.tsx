import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "outline" | "dark";
}

export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      "bg-orange-500 hover:bg-orange-600 text-white",

    outline:
      "border border-white text-white hover:bg-white hover:text-black",

    dark:
      "bg-black text-white hover:bg-gray-900",
  };

  return (
    <button
      {...props}
      className={`
        ${styles[variant]}
        px-6
        py-3
        lg:px-8
        lg:py-4
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