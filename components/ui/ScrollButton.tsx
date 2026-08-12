"use client";

import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
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
  const router = useRouter();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    if (target === "booking") {
      router.push("/booking");
      return;
    }
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.replaceState(null, "", `#${target}`);
    }
  }

  return (
    <Button type="button" variant={variant} onClick={handleClick} className={className}>
      {children}
    </Button>
  );
}
