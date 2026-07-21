type CardProps = {
  value: string;
  label: string;
  className: string;
};

function StatCard({ value, label, className }: CardProps) {
  return (
    <div
      className={`
        absolute
        ${className}
        rounded-2xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        px-6
        py-4
        shadow-[0_20px_60px_rgba(0,0,0,0.35)]
        transition-all
        duration-500
        hover:scale-105
      `}
    >
      <h3 className="text-3xl font-bold text-orange-400">
        {value}
      </h3>

      <p className="mt-1 text-sm text-gray-300">
        {label}
      </p>
    </div>
  );
}

export default function FloatingStats() {
  return (
    <>
      <StatCard
        value="1000+"
        label="Athletes"
        className="top-10 -left-10"
      />

      <StatCard
        value="15+"
        label="Years"
        className="bottom-16 -left-12"
      />

      <StatCard
        value="50+"
        label="Sports"
        className="top-1/2 -right-10"
      />
    </>
  );
}