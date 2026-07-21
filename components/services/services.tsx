import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import {
  Activity,
  HeartPulse,
  Dumbbell,
  Apple,
  LineChart,
  Brain,
} from "lucide-react";

const services = [
  {
    icon: Activity,
    title: "Performance Assessment",
    description:
      "Comprehensive testing to evaluate speed, strength, endurance, and athletic performance.",
  },
  {
    icon: HeartPulse,
    title: "Injury Risk Screening",
    description:
      "Identify potential injury risks before they affect your performance.",
  },
  {
    icon: Dumbbell,
    title: "Strength & Conditioning",
    description:
      "Personalized training programs to maximize power and performance.",
  },
  {
    icon: Apple,
    title: "Sports Nutrition",
    description:
      "Science-backed nutrition plans to fuel performance and recovery.",
  },
  {
    icon: LineChart,
    title: "Biomechanical Analysis",
    description:
      "Movement analysis to improve efficiency and reduce injuries.",
  },
  {
    icon: Brain,
    title: "Recovery & Rehabilitation",
    description:
      "Evidence-based recovery strategies to return stronger and faster.",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-black text-white py-20">
      <Container>

        <div className="text-center max-w-4xl mx-auto mb-14">

          <p className="inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-orange-400 backdrop-blur-sm">
            Our Services
          </p>

          <h2 className="mt-6 text-3xl md:text-4xl font-bold leading-tight text-white">
            Sports Science Solutions
          </h2>

          <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-orange-500" />

          <p className="mt-4 text-base text-gray-400 leading-7 max-w-3xl mx-auto">
            Comprehensive services designed to improve performance, prevent injuries and accelerate recovery.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Card key={index}
                className="flex flex-col"
              >
                <Icon
                  size={48}
                  className="text-orange-500 mb-6"
                />

                <h3 className="text-2xl font-semibold mb-4">
                  {service.title}
                </h3>

                <p className="text-gray-400 leading-8">
                  {service.description}
                </p>

                <div className="mt-auto pt-8">
                  <Button variant="outline">
                   Learn More →
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>

      </Container>
    </section>
  );
}
