import { bodyData } from "./bodyData";
import Link from "next/link";

type Props = {
  selected: string;
};

export default function InfoPanel({ selected }: Props) {
  const info =
    bodyData.find((item) => item.id === selected) || bodyData[0];

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
        text-white
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
      "
    >
      <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
        {info.subtitle}
      </p>

      <h3 className="mt-3 text-4xl font-bold">
        {info.title}
      </h3>

      <p className="mt-6 text-gray-400 leading-8">
        {info.description}
      </p>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          Performance Testing
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          Athlete Monitoring
        </div>

        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-orange-500"></div>
          Evidence-Based Training
        </div>

      </div>

      <Link
        href={info.link}
        className="
          mt-10
          inline-flex
          rounded-xl
          bg-orange-500
          px-6
          py-3
          font-semibold
          transition
          hover:bg-orange-600
        "
      >
        Learn More →
      </Link>
    </div>
  );
}