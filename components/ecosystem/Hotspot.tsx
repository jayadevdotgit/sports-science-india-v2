type Props = {
  id: string;
  top: string;
  left: string;
  selected: string;
  onSelect: (id: string) => void;
};

export default function Hotspot({
  id,
  top,
  left,
  selected,
  onSelect,
}: Props) {
  const active = selected === id;

  return (
    <button
      onClick={() => onSelect(id)}
      style={{
        top,
        left,
      }}
      className="
        absolute
        -translate-x-1/2
        -translate-y-1/2
        z-30
        touch-manipulation
      "
    >
      {/* Outer Pulse */}
      <span
        className={`
          absolute
          left-1/2
          top-1/2
          h-6 w-6 sm:h-8 sm:w-8
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          transition-all
          duration-500

          ${
            active
              ? "animate-ping bg-orange-500/30"
              : "opacity-0"
          }
        `}
      />

      {/* Middle Ring */}
      <span
        className={`
          absolute
          left-1/2
          top-1/2
          h-5 w-5 sm:h-6 sm:w-6
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          transition-all
          duration-300

          ${
            active
              ? "border-orange-400"
              : "border-transparent"
          }
        `}
      />

      {/* Main Dot */}
      <span
        className={`
          relative
          block
          h-3 w-3 sm:h-4 sm:w-4
          rounded-full
          transition-all
          duration-300

          ${
            active
              ? "bg-orange-500 scale-125 shadow-[0_0_20px_rgba(249,115,22,1)]"
              : "bg-white hover:bg-orange-500 hover:scale-110"
          }
        `}
      />
    </button>
  );
}
