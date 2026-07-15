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
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <p className="text-orange-500 uppercase tracking-widest mb-3">
            Our Services
          </p>

          <h2 className="text-5xl font-bold">
            Sports Science Solutions
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Comprehensive services designed to help athletes maximize
            performance, prevent injuries, and recover faster.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="bg-[#111111] rounded-3xl p-8 border border-gray-800
                           hover:border-orange-500 hover:-translate-y-2
                           transition-all duration-300"
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

                <button className="mt-8 text-orange-500 font-semibold hover:underline">
                  Learn More →
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}