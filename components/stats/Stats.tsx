import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Activity, HeartPulse, Stethoscope, Dumbbell, ArrowRight } from "lucide-react";

const stats = [
  {
    icon: HeartPulse,
    end: 45000,
    suffix: "+",
    label: "Patients Attended",
    text: "text-orange-400",
    ring: "border-orange-500/25",
    chipBg: "from-orange-500/20 to-transparent",
    glow: "group-hover:bg-orange-500/40",
    numGlow: "drop-shadow-[0_0_22px_rgba(249,115,22,0.35)]",
    line: "via-orange-500/80",
    labelHover: "group-hover:text-orange-300/90",
    boxBorder: "border-orange-500/80 group-hover:border-orange-400",
    boxBg: "bg-orange-500/[0.05] group-hover:bg-orange-500/[0.12]",
    boxShadow: "group-hover:shadow-[0_16px_48px_rgba(249,115,22,0.16)]",
    bracket: "border-orange-400/60",
  },
  {
    icon: Activity,
    end: 10000,
    suffix: "+",
    label: "Sports Player Treated",
    text: "text-rose-400",
    ring: "border-rose-500/25",
    chipBg: "from-rose-500/20 to-transparent",
    glow: "group-hover:bg-rose-500/40",
    numGlow: "drop-shadow-[0_0_22px_rgba(244,63,94,0.35)]",
    line: "via-rose-500/80",
    labelHover: "group-hover:text-rose-300/90",
    boxBorder: "border-rose-500/80 group-hover:border-rose-400",
    boxBg: "bg-rose-500/[0.05] group-hover:bg-rose-500/[0.12]",
    boxShadow: "group-hover:shadow-[0_16px_48px_rgba(244,63,94,0.16)]",
    bracket: "border-rose-400/60",
  },
  {
    icon: Stethoscope,
    end: 7500,
    suffix: "+",
    label: "Surgeries Conducted",
    text: "text-violet-400",
    ring: "border-violet-500/25",
    chipBg: "from-violet-500/20 to-transparent",
    glow: "group-hover:bg-violet-500/40",
    numGlow: "drop-shadow-[0_0_22px_rgba(139,92,246,0.35)]",
    line: "via-violet-500/80",
    labelHover: "group-hover:text-violet-300/90",
    boxBorder: "border-violet-500/80 group-hover:border-violet-400",
    boxBg: "bg-violet-500/[0.05] group-hover:bg-violet-500/[0.12]",
    boxShadow: "group-hover:shadow-[0_16px_48px_rgba(139,92,246,0.16)]",
    bracket: "border-violet-400/60",
  },
  {
    icon: Dumbbell,
    end: 42000,
    suffix: "+",
    label: "Rehab Physio Clients",
    text: "text-emerald-400",
    ring: "border-emerald-500/25",
    chipBg: "from-emerald-500/20 to-transparent",
    glow: "group-hover:bg-emerald-500/40",
    numGlow: "drop-shadow-[0_0_22px_rgba(16,185,129,0.35)]",
    line: "via-emerald-500/80",
    labelHover: "group-hover:text-emerald-300/90",
    boxBorder: "border-emerald-500/80 group-hover:border-emerald-400",
    boxBg: "bg-emerald-500/[0.05] group-hover:bg-emerald-500/[0.12]",
    boxShadow: "group-hover:shadow-[0_16px_48px_rgba(16,185,129,0.16)]",
    bracket: "border-emerald-400/60",
  },
];

export default function Stats() {
  return (
    <section className="relative -mt-4 overflow-hidden bg-[#050505] pb-10 text-white sm:-mt-6">
      <Container className="relative z-10">
        <Reveal>
          <div className="relative mx-auto max-w-6xl grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="group relative">
                  <div className={`relative flex flex-col items-center gap-1.5 rounded-2xl border ${stat.boxBorder} ${stat.boxBg} px-2.5 py-3.5 transition-all duration-500 ${stat.boxShadow} sm:px-4 sm:py-4`}>
                    {/* Corner brackets */}
                    <span className={`pointer-events-none absolute left-1.5 top-1.5 h-2 w-2 border-l border-t ${stat.bracket} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                    <span className={`pointer-events-none absolute bottom-1.5 right-1.5 h-2 w-2 border-b border-r ${stat.bracket} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

                    {/* Icon */}
                    <div className="relative">
                      <div className={`absolute inset-0 rounded-full ${stat.glow} blur-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />
                      <div className={`relative flex h-8 w-8 items-center justify-center rounded-lg border ${stat.ring} bg-gradient-to-br ${stat.chipBg} sm:h-9 sm:w-9`}>
                        <Icon size={15} className={`${stat.text} transition-colors duration-500 sm:size-[17px]`} />
                      </div>
                    </div>

                    {/* Number */}
                    <div className="relative text-center">
                      <div className={`bg-gradient-to-b from-white via-white/85 to-white/40 bg-clip-text text-xl font-black tabular-nums tracking-tight text-transparent ${stat.numGlow} sm:text-2xl lg:text-3xl`}>
                        <Counter end={stat.end} suffix={stat.suffix} />
                      </div>
                      {/* Under-glow line */}
                      <span className={`absolute -bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-to-r from-transparent ${stat.line} to-transparent transition-all duration-500 group-hover:w-3/5`} />
                    </div>

                    {/* Label */}
                    <p className={`text-[9px] font-semibold uppercase tracking-[0.18em] text-gray-400 transition-colors duration-500 ${stat.labelHover} sm:text-[10px]`}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="mb-6 text-gray-400">
              Your performance journey starts with a comprehensive sports science assessment.
            </p>

            <Link href="/booking">
              <Button size="md" className="group/btn relative overflow-hidden bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 hover:shadow-orange-500/60">
                <span className="absolute inset-0 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100" />
                <span className="relative flex items-center gap-2">
                  Begin Your Assessment
                  <ArrowRight size={16} className="transition-transform duration-500 group-hover/btn:translate-x-1" />
                </span>
              </Button>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
