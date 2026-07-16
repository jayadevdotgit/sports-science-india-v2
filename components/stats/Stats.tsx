import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section className="bg-[#0a0a0a] text-white py-28">
      <Container>

        <SectionHeading
          eyebrow="Our Impact"
          title="Trusted by Athletes"
          description="Helping athletes improve performance through science-driven assessment and expert guidance."
        />

        <div className="grid md:grid-cols-4 gap-8 mt-20">
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