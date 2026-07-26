"use client";

import {
  Activity,
  HeartPulse,
  ScanSearch,
  Timer,
  Dumbbell,
  BarChart3,
  ChevronRight,
} from "lucide-react";

type TechnologyItem = {
  id: number;
  title: string;
};

type Props = {
  items: TechnologyItem[];
  active: number;
  setActive: (index: number) => void;
};

export default function TechnologyTabs({
  items,
  active,
  setActive,
}: Props) {
  const icons = [
    <Activity key="1" size={18} />,
    <ScanSearch key="2" size={18} />,
    <HeartPulse key="3" size={18} />,
    <Dumbbell key="4" size={18} />,
    <BarChart3 key="5" size={18} />,
    <Timer key="6" size={18} />,
  ];

  return (
    <div className="relative mt-12">
      <div className="flex overflow-x-auto overflow-y-hidden pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:justify-center">
        <div className="flex min-w-max gap-4">

        {items.map((item, index) => (

          <button
            key={item.id}
            onClick={() => setActive(index)}
            className={`
              group
              flex
              items-center
              gap-3
              whitespace-nowrap
              rounded-full
              px-5
              py-3
              transition-all
              duration-300
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-orange-400
              focus-visible:ring-offset-2
              focus-visible:ring-offset-[#050505]
              ${
                active === index
                  ? "bg-orange-500 text-white"
                  : "bg-transparent text-gray-300 hover:bg-white/[0.04] hover:text-orange-400"
              }
            `}
          >
            {icons[index]}

            <span className="font-medium">
              {item.title}
            </span>

          </button>

        ))}

        </div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 flex w-14 items-center justify-end bg-gradient-to-l from-[#050505] via-[#050505]/85 to-transparent sm:hidden" aria-hidden="true">
        <ChevronRight size={20} className="animate-pulse text-orange-400" />
      </div>
    </div>
  );
}
