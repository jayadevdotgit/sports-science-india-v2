import { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
  children?: ReactNode;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  children,
}: SectionHeadingProps) {
  const center = align === "center";

  return (
    <div
      className={`max-w-4xl ${center ? "mx-auto text-center" : "text-left"} mb-14`}
    >
      <div className={`${center ? "inline-block" : "inline-block"} animate-[fadeIn_0.6s_ease-out]`}>
        <p className="inline-flex items-center gap-2.5 rounded-full border border-orange-500/40 bg-orange-500/10 px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-orange-400 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/60 hover:shadow-[0_0_30px_rgba(249,115,22,0.25)] hover:scale-105">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-discover-ping rounded-full bg-orange-400/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.9)]" />
          </span>
          {eyebrow}
        </p>
      </div>

      <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white animate-[fadeIn_0.8s_ease-out_0.15s_both]">
        {title}
      </h2>

      <div className={`relative mt-6 w-24 ${center ? "mx-auto" : ""}`}>
        <div className="absolute inset-0 h-1 w-24 rounded-full bg-orange-500/40 blur-md animate-pulse" />
        <div className="relative h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-orange-500 to-transparent" />
      </div>

      {description && (
        <p
          className={`mt-6 max-w-3xl text-base leading-7 text-gray-300 animate-[fadeIn_1s_ease-out_0.3s_both] ${
            center ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}

      {children}
    </div>
  );
}