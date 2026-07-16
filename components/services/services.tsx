import Container from "@/components/ui/Container";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
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
    <section className="bg-black text-white py-28">
      <Container>

        <SectionHeading
          eyebrow="Our Services"
          title="Sports Science Solutions"
          description="Comprehensive services designed to improve performance, prevent injuries and accelerate recovery."
        />

        <div className="grid md:grid-cols-3 gap-8">
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