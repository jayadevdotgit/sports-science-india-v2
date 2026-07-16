import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  ClipboardCheck,
  Activity,
  BarChart3,
  FileCheck,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Book Assessment",
    description:
      "Schedule your sports science assessment with our experts.",
  },
  {
    number: "02",
    icon: Activity,
    title: "Comprehensive Evaluation",
    description:
      "Assess movement, strength, flexibility and injury risk.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Performance Analysis",
    description:
      "Analyze the collected data to identify strengths and areas for improvement.",
  },
  {
    number: "04",
    icon: FileCheck,
    title: "Personalized Plan",
    description:
      "Receive a customized training, nutrition and recovery plan.",
  },
  {
    number: "05",
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor improvements with periodic reassessments and expert guidance.",
  },
];

export default function Assessment() {
  return (
    <section className="bg-[#0b0b0b] text-white py-28">
      <Container>

        <SectionHeading
          eyebrow="How It Works"
          title="Our Assessment Process"
          description="A structured approach to maximize performance while minimizing injury risk."
        />

        <div className="grid md:grid-cols-5 gap-8 mt-20">
    {steps.map((step) => {
      const Icon = step.icon;

      return (
        <div
          key={step.number}
          className="relative bg-[#111111] rounded-3xl px-6 py-8 border border-gray-800 hover:border-orange-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 text-center"
        >
          {/* Number */}
          <div className="w-20 h-20 rounded-full bg-orange-500 text-black text-2xl font-bold flex items-center justify-center mx-auto shadow-lg shadow-orange-500/30 mb-6">
            {step.number}
          </div>

          {step.number !== "05" && (
        <div className="hidden md:block absolute top-10 left-full w-8 h-1 bg-orange-500"></div>
            )}

          {/* Icon */}
          <Icon
            size={42}
            className="text-orange-500 mx-auto mb-6"
          />

          {/* Title */}
          <h3 className="text-2xl font-bold mb-4">
            {step.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 leading-7">
            {step.description}
          </p>
        </div>
      );
    })}
  </div>
      </Container>
    </section>
  );
}