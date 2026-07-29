"use client";

type Props = {
  blinking: boolean;
  thinking: boolean;
  idle: boolean;
  waving: boolean;
  bouncing: boolean;
};

export default function KiboImage({
  blinking,
  thinking,
  idle,
  waving,
  bouncing,
}: Props) {
  const motionClass = bouncing
    ? "animate-[kibo-bounce_0.45s_ease-out]"
    : waving
      ? "animate-[kibo-wave_0.7s_ease-in-out_2]"
      : idle
        ? "animate-[kibo-breathe_3.8s_ease-in-out_infinite]"
        : "";

  return (
    <div className={`group relative origin-bottom ${motionClass}`}>
      <svg
        viewBox="0 0 64 64"
        width="100%"
        height="100%"
        style={{ display: "block", maxWidth: 130, maxHeight: 130 }}
      >
        {/* Tail */}
        <path d="M50 40c6 4 10 10 8 14s-8 4-14 0-10-10-8-14 8-4 14 0z" fill="#d2691e" stroke="#000" strokeWidth="1"/>
        <path d="M50 40c-2 1-4 3-6 4" stroke="#fff" strokeWidth="2"/>
        <path d="M54 44c-2 1-4 3-6 4" stroke="#fff" strokeWidth="2"/>

        {/* Body */}
        <ellipse cx="32" cy="40" rx="14" ry="10" fill="#d2691e" stroke="#000" strokeWidth="1"/>

        {/* Head */}
        <circle cx="32" cy="24" r="10" fill="#d2691e" stroke="#000" strokeWidth="1"/>

        {/* Face mask */}
        <path d="M24 22c2 4 12 4 16 0" fill="#fff"/>

        {/* Eyes */}
        <circle cx="28" cy="24" r="1.5" fill="#000"/>
        <circle cx="36" cy="24" r="1.5" fill="#000"/>

        {/* Blink eyelids */}
        <g opacity={blinking ? "1" : "0"} style={{ transition: "opacity 0.08s" }}>
          <rect x="26" y="22" width="4" height="4" rx="1" fill="#d2691e"/>
          <rect x="34" y="22" width="4" height="4" rx="1" fill="#d2691e"/>
        </g>

        {/* Nose */}
        <circle cx="32" cy="28" r="1" fill="#000"/>

        {/* Ears */}
        <polygon points="24,16 20,10 26,14" fill="#fff" stroke="#000" strokeWidth="1"/>
        <polygon points="40,16 44,10 38,14" fill="#fff" stroke="#000" strokeWidth="1"/>
      </svg>

      {/* Thinking indicator */}
      {thinking && (
        <span className="absolute -right-1 -top-2 rounded-full bg-orange-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white shadow-[0_0_12px_rgba(249,115,22,0.7)] animate-pulse">
          ···
        </span>
      )}
    </div>
  );
}
