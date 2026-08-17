import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";
import Counter from "@/components/ui/Counter";
import { Activity, HeartPulse, Stethoscope, Dumbbell } from "lucide-react";

const stats = [
  { icon: HeartPulse, end: 45000, suffix: "+", label: "Patients Attended" },
  { icon: Activity, end: 10000, suffix: "+", label: "Sports Player Treated" },
  { icon: Stethoscope, end: 7500, suffix: "+", label: "Surgeries Conducted" },
  { icon: Dumbbell, end: 42000, suffix: "+", label: "Rehab Physio Clients" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-black via-[#080808] to-black py-14 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_45%)]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] sm:p-8"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                    <Icon size={22} className="text-orange-500" />
                  </div>
                  <h3 className="mt-3 bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                    <Counter end={stat.end} suffix={stat.suffix} />
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-300 sm:text-base">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
