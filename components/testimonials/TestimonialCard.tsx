import { Star, Quote, BadgeCheck } from "lucide-react";
import GoogleIcon from "@/components/ui/GoogleIcon";

interface TestimonialCardProps {
  name: string;
  sport: string;
  review: string;
  rating: number;
}

export default function TestimonialCard({
  name,
  sport,
  review,
  rating,
}: TestimonialCardProps) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="group flex w-full flex-col rounded-3xl border-2 border-orange-500/20 bg-[#0d0d0d] p-8 transition-all duration-500 hover:-translate-y-2 hover:border-orange-500">

      <div className="flex items-center justify-between">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:border-orange-500/40 group-hover:shadow-[0_0_25px_rgba(249,115,22,0.3)]">
          <Quote
            size={24}
            className="text-orange-400"
          />
        </div>
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className="fill-orange-500 text-orange-500"
            />
          ))}
        </div>
      </div>

      <p className="mt-5 flex-1 text-[15px] leading-7 text-gray-300">
        {review}
      </p>

      <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500/15 text-sm font-semibold text-orange-400">
            {initials}
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{name}</p>
            <p className="text-xs text-orange-400">{sport}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <GoogleIcon size={16} />
          <div className="leading-tight">
            <p className="flex items-center gap-1 text-xs text-gray-300">
              Google
              <BadgeCheck size={12} className="fill-orange-500 text-black" />
            </p>
            <p className="text-xs text-gray-300">Verified</p>
          </div>
        </div>

      </div>
    </div>
  );
}