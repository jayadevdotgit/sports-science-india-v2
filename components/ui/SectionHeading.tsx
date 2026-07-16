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
    <div className="text-center mb-16">
      <p className="text-orange-500 uppercase tracking-widest mb-3">
        {eyebrow}
      </p>

      <h2 className="text-5xl font-bold">
        {title}
      </h2>

      <p className="text-gray-400 mt-5 max-w-2xl mx-auto leading-8">
        {description}
      </p>
    </div>
  );
}