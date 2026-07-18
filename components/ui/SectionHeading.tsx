interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="text-center max-w-4xl mx-auto mb-24">

      <p
        className="
          inline-block
          rounded-full
          border
          border-orange-500/30
          bg-orange-500/10
          px-5
          py-2
          text-sm
          font-semibold
          uppercase
          tracking-[3px]
          text-orange-400
          backdrop-blur-sm
        "
      >
        {eyebrow}
      </p>

      <h2
        className="
          mt-8
          text-4xl
          md:text-5xl
          lg:text-6xl
          font-bold
          leading-tight
          text-white
        "
      >
        {title}
      </h2>

      {/* Orange Divider */}
      <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-orange-500" />

      <p
        className="
          mt-6
          text-lg
          text-gray-400
          leading-8
          max-w-3xl
          mx-auto
        "
      >
        {description}
      </p>

    </div>
  );
}