import Link from "next/link";
import Image from "next/image";

type Props = {
  height?: string;  
  category: string;
  title: string;
  description: string;
  image: string;
  link: string;
  button: string;

  stats1: string;
  label1: string;

  stats2: string;
  label2: string;

  badgeColor: string;
};

export default function PlatformCard({
  category,
  title,
  description,
  image,
  link,
  button,
  stats1,
  label1,
  stats2,
  label2,
  badgeColor,
  height = "h-[360px]",
}: Props) {
  return (
    <Link href={link}>
      <div
        className={`
        group
        relative
        overflow-hidden
        rounded-3xl
        ${height}
        cursor-pointer
        border
        border-white/10
        bg-white/5
        backdrop-blur-md
        hover:border-orange-500
        transition-all
        duration-500
        hover:-translate-y-3
        hover:rotate-[0.5deg]
        hover:shadow-[0_0_50px_rgba(249,115,22,0.35)]
        `}
      >
        {/* Background */}

        <Image
        src={image}
        alt={title}
        fill
        unoptimized
        className="
            absolute
            inset-0
            object-cover
            duration-1000
            ease-out
            group-hover:scale-105
            group-hover:border-orange-400
            group-hover:rotate-1
            "
        />

        {/* Dark Overlay */}

        <div
        className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/60
            to-black/20
            transition-all
            duration-700
            group-hover:from-black/80
            group-hover:via-black/30
            group-hover:to-transparent
        "
        />

        {/* Status */}

        <div className="absolute top-6 right-6">
          <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-xs text-emerald-400 backdrop-blur-sm">
            ● ACTIVE
          </span>
        </div>

        {/* Content */}

        <div
        className="
            relative
            z-10
            flex
            h-full
            flex-col
            p-8
            transition-all
            duration-500
            group-hover:-translate-y-2
        "
        >

          {/* Category */}

          <span
            className={`
                w-fit
                rounded-full
                px-4
                py-1
                text-xs
                font-semibold
                tracking-[2px]
                backdrop-blur-sm
                ${
                badgeColor === "orange"
                    ? "bg-orange-500/15 border border-orange-500/30 text-orange-400"
                    : badgeColor === "blue"
                    ? "bg-blue-500/15 border border-blue-500/30 text-blue-400"
                    : badgeColor === "gold"
                    ? "bg-yellow-500/15 border border-yellow-500/30 text-yellow-300"
                    : badgeColor === "purple"
                    ? "bg-purple-500/15 border border-purple-500/30 text-purple-300"
                    : badgeColor === "cyan"
                    ? "bg-cyan-500/15 border border-cyan-500/30 text-cyan-300"
                    : badgeColor === "green"
                    ? "bg-green-500/15 border border-green-500/30 text-green-300"
                    : "bg-emerald-500/15 border border-emerald-500/30 text-emerald-300"
                }
            `}
            >
            {category}
          </span>

          {/* Title */}

          <h3
            className="
                mt-5
                text-3xl
                font-bold
                text-white
                transition-all
                duration-500
                group-hover:text-orange-400
            "
            >
            {title}
            </h3>

          {/* Description */}

          <p
            className="
                mt-4
                text-gray-300
                leading-7
            "
            >
            {description}
            </p>


         {/* Spacer */}

        {/* Footer Section */}

<div className="mt-auto">

  <div className="mb-5 h-px bg-gradient-to-r from-orange-500 via-orange-400 to-transparent" />

  <div className="flex items-center justify-between">

    <div className="flex gap-6 text-center">

      <div>
        <p className="text-xl font-bold text-white">{stats1}</p>
        <p className="text-xs text-gray-400">{label1}</p>
      </div>

      <div>
        <p className="text-xl font-bold text-white">{stats2}</p>
        <p className="text-xs text-gray-400">{label2}</p>
      </div>

    </div>

    <span
      className="
        flex
        items-center
        whitespace-nowrap
        gap-2
        font-semibold
        text-orange-400
        transition-all
        duration-500
        group-hover:gap-4
      "
    >
      {button}

      <span className="transition-transform duration-500 group-hover:translate-x-2">
        →
      </span>

       </span>

  </div>

</div>

        </div>
      </div>
    </Link>
  );
}

 