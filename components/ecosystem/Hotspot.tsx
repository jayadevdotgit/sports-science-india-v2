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
          h-5 w-5 sm:h-6 sm:w-6
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
          h-3 w-3 sm:h-4 sm:w-4
          rounded-full
          transition-all
          duration-300

          ${
            active
              ? `${c.active} scale-125 ${c.activeShadow}`
              : `bg-white ${c.hover} hover:scale-110`
          }
        `}
      />
    </button>
  );
}
