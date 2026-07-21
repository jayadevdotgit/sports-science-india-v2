import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";

const stats = [
  {
    end: 500,
    suffix: "+",
    label: "Athletes Assessed",
  },
  {
    end: 25,
    suffix: "+",
    label: "Sports Supported",
  },
  {
    end: 98,
    suffix: "%",
    label: "Client Satisfaction",
  },
  {
    end: 10,
    suffix: "+",
    label: "Years of Experience",
  },
];

export default function Stats() {
  return (
    <section className="bg-[#0a0a0a] text-white py-20">
      <Container>

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            Our Impact
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Trusted by Athletes
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            Helping athletes improve performance through science-driven assessment and expert guidance.
          </p>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-14">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center bg-[#111111] rounded-3xl p-10 border border-gray-800 hover:border-orange-500 transition-all duration-300"
            >
              <h3 className="text-6xl font-extrabold text-orange-500">
        <Counter
            end={stat.end}
             suffix={stat.suffix}
            />
        </h3>

              <p className="text-gray-400 mt-4">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}