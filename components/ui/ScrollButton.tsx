"use client";

import Button from "@/components/ui/Button";
import { ReactNode } from "react";

type Props = {
  target: string;
  variant?: "primary" | "outline" | "dark";
  className?: string;
  children: ReactNode;
};

export default function ScrollButton({
  target,
  variant = "primary",
  className = "",
  children,
}: Props) {
  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Button variant={variant} onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}