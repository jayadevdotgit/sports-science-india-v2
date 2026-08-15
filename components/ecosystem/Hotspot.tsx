import { bodyData } from "./bodyData";
import { bodyColorMap, defaultBodyColor } from "./bodyColors";

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
  const entry = bodyData.find((item) => item.id === id);
  const c = bodyColorMap[entry?.badgeColor ?? ""] ?? defaultBodyColor;

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
        pointer-events-auto
      "
    >
      {/* Outer Pulse */}
      <span
        className={`
          absolute
          left-1/2
          top-1/2
          h-4 w-4 sm:h-5 sm:w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          transition-all
          duration-500

          ${
            active
              ? c.pulse
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
          h-4 w-4 sm:h-5 sm:w-5
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          border
          transition-all
          duration-300

          ${
            active
              ? c.ring
              : "border-transparent"
          }
        `}
      />

      {/* Main Dot */}
      <span
        className={`
          relative
          block
          h-3 w-3 sm:h-3.5 sm:w-3.5
          rounded-full
          transition-all
          duration-300

          ${
            active
              ? `${c.active} scale-110`
              : `bg-white ${c.hover} hover:scale-110`
          }
        `}
      />
    </button>
  );
}
