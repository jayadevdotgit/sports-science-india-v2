import Container from "@/components/ui/Container";
import Reveal from "@/components/animations/Reveal";

const stats = [
  { value: "45,000+", label: "Patients Attended" },
  { value: "10,000+", label: "Sports Player Treated" },
  { value: "7,500+", label: "Surgeries Conducted" },
  { value: "42,000+", label: "Rehab Physio Client" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-gradient-to-b from-black via-[#080808] to-black py-14 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.1),transparent_45%)]" />
      <Container className="relative z-10">
        <Reveal>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-orange-500/40 hover:bg-white/[0.06] hover:shadow-[0_20px_60px_rgba(249,115,22,0.15)] sm:p-8"
              >
                <h3 className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-3xl font-black tracking-tight text-transparent sm:text-4xl lg:text-5xl">
                  {stat.value}
                </h3>
                <p className="mt-2 text-sm font-medium text-gray-300 sm:text-base">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
