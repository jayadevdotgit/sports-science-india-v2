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
    <div className={`group relative h-24 w-24 origin-bottom sm:h-[130px] sm:w-[130px] ${motionClass}`}>
      <svg
        viewBox="0 0 360 380"
        role="img"
        aria-label="VIVI the Red Panda"
        className="h-full w-full overflow-visible"
        style={{ display: "block" }}
      >
        <defs />

        {/* Ground Shadow */}
        <ellipse cx="180" cy="358" rx="100" ry="8" fill="#C29A88" opacity="0.6"/>

        {/* Tail */}
        <g id="tail">
          <path d="M125 240 C50 220 20 280 45 320 C65 352 135 340 148 290 C155 265 140 245 125 240 Z" className="orange-fur"/>
          <path d="M42 225 C40 205 68 185 85 208 C70 215 50 220 42 225 Z" className="white-fur"/>
          <path d="M38 275 C24 250 52 230 78 250 C60 262 44 270 38 275 Z" className="white-fur"/>
          <path d="M52 315 C38 295 72 272 100 288 C82 302 62 310 52 315 Z" className="white-fur"/>
          <path d="M85 342 C68 330 102 308 128 320 C110 335 94 340 85 342 Z" className="white-fur"/>
        </g>

        {/* Ears */}
        <g id="ears">
          <path d="M72 130 C20 -10 80 -35 148 85 C122 105 95 120 72 130 Z" className="dark-fur"/>
          <path d="M84 120 C38 10 88 -10 134 92 C116 105 96 115 84 120 Z" className="white-fur"/>
          <path d="M288 130 C340 -10 280 -35 212 85 C238 105 265 120 288 130 Z" className="dark-fur"/>
          <path d="M276 120 C322 10 272 -10 226 92 C244 105 264 115 276 120 Z" className="white-fur"/>
        </g>

        {/* Body */}
        <g id="body">
          <path d="M110 190 C92 220 85 310 105 340 C125 360 235 360 255 340 C275 310 268 220 250 190 Z" className="orange-fur"/>
          <path d="M125 185 C120 220 140 245 180 248 C220 245 240 220 235 185 C210 210 150 210 125 185 Z" className="dark-fur"/>
          <path d="M142 225 C135 270 142 328 180 330 C218 328 225 270 218 225 C195 242 165 242 142 225 Z" className="white-fur"/>
          <path d="M122 255 C108 275 105 330 115 348 C130 355 158 355 162 342 C165 320 150 270 142 255 Z" className="dark-fur"/>
          <path d="M238 255 C252 275 255 330 245 348 C230 355 202 355 198 342 C195 320 210 270 218 255 Z" className="dark-fur"/>
        </g>

        {/* Paws - with hover raise animation */}
        <g id="paws">
          <g className="left-arm">
            <path d="M120 195 C105 220 110 265 142 270 C155 270 162 258 152 245 C138 230 130 212 120 195 Z" className="orange-fur"/>
            <ellipse cx="148" cy="256" rx="14" ry="16" className="dark-fur" transform="rotate(-15 148 256)"/>
            <path d="M142 264 L140 270 M148 266 L148 272 M154 264 L156 270" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </g>
          <g className="right-arm">
            <path d="M240 195 C255 220 250 265 218 270 C205 270 198 258 208 245 C222 230 230 212 240 195 Z" className="orange-fur"/>
            <ellipse cx="212" cy="256" rx="14" ry="16" className="dark-fur" transform="rotate(15 212 256)"/>
            <path d="M206 264 L204 270 M212 266 L212 272 M218 264 L220 270" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round"/>
          </g>
        </g>

        {/* Head & Face */}
        <g className="face">
          <path d="M78 145 C65 100 100 50 180 50 C260 50 295 100 282 145 C275 185 240 215 180 215 C120 215 85 185 78 145 Z" className="orange-fur"/>
          <path d="M78 155 C60 160 55 180 65 195 C72 200 80 195 85 185 Z" className="orange-fur"/>
          <path d="M282 155 C300 160 305 180 295 195 C288 200 280 195 275 185 Z" className="orange-fur"/>
          <path d="M152 58 L165 42 L175 56 L188 38 L198 56 Z" className="orange-fur"/>
          <path d="M88 155 C76 118 100 78 180 78 C260 78 284 118 272 155 C252 118 215 94 180 94 C145 94 108 118 88 155 Z" className="white-fur"/>
          <path d="M102 158 C90 180 110 210 140 210 C158 210 162 186 150 168 C135 158 115 156 102 158 Z" fill="#2D1B14"/>
          <path d="M258 158 C270 180 250 210 220 210 C202 210 198 186 210 168 C225 158 245 156 258 158 Z" fill="#2D1B14"/>
          <path d="M130 165 C122 195 140 215 180 215 C220 215 238 195 230 165 C212 175 196 180 180 180 C164 180 148 175 130 165 Z" className="white-fur"/>
        </g>

        {/* Eyes */}
        <g id="eyes">
          <circle cx="138" cy="148" r="16" className="dark-fur"/>
          <circle cx="222" cy="148" r="16" className="dark-fur"/>
          <circle cx="138" cy="148" r="15" className="dark-fur"/>
          <circle cx="133" cy="142" r="5" className="white-fur"/>
          <circle cx="222" cy="148" r="15" className="dark-fur"/>
          <circle cx="217" cy="142" r="5" className="white-fur"/>
          <g id="eyelids" fill="#FFFFFF" opacity={blinking ? "1" : "0"} style={{ transition: "opacity 0.08s" }}>
            <circle cx="138" cy="148" r="17"/>
            <circle cx="222" cy="148" r="17"/>
            <path d="M120 148 Q138 162 156 148" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round"/>
            <path d="M204 148 Q222 162 240 148" fill="none" stroke="#111111" strokeWidth="3" strokeLinecap="round"/>
          </g>
        </g>

        {/* Blush */}
        <g id="blush">
          <ellipse cx="112" cy="172" rx="10" ry="6" className="blush-pink"/>
          <ellipse cx="248" cy="172" rx="10" ry="6" className="blush-pink"/>
        </g>

        {/* Nose & Mouth */}
        <g id="face-details" strokeLinecap="round">
          <ellipse cx="180" cy="168" rx="9" ry="7" className="dark-fur"/>
          <ellipse cx="178" cy="165" rx="3" ry="2" fill="#FFFFFF" opacity="0.7"/>
          <path d="M168 178 C174 184 186 184 192 178" fill="none" stroke="#111111" strokeWidth="2.5"/>
        </g>
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
