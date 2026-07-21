type Props = {
  title: string;
  value: string;
};

export default function FloatingCard({ title, value }: Props) {
  return (
    <div
      className="
        backdrop-blur-xl
        bg-white/10
        border
        border-white/10
        rounded-2xl
        px-6
        py-4
        shadow-[0_20px_60px_rgba(0,0,0,0.4)]
        hover:scale-105
        transition-all
        duration-500
      "
    >
      <p className="text-3xl font-bold text-orange-400">
        {value}
      </p>

      <p className="mt-1 text-sm text-gray-300">
        {title}
      </p>
    </div>
  );
}