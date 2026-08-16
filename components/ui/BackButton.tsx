"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ className = "" }: { className?: string }) {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={`group inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-300 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/40 hover:text-orange-400 ${className}`}
    >
      <ArrowLeft size={14} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
      Back
    </button>
  );
}
