type Props = {
  selected: string;
  onSelect: (id: string) => void;
};

const items = [
  "brain",
  "neck",
  "shoulder",
  "lungs",
  "heart",
  "elbow",
  "core",
  "spine",
  "wrist",
  "hip",
  "knee",
  "ankle",
];

export default function BodyMenu({ selected, onSelect }: Props) {
  return (
    <div className="space-y-5">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onSelect(item)}
          className={`
            w-full rounded-xl border px-5 py-4 text-left transition

            ${
              selected === item
                ? "border-orange-500 bg-orange-500/20 text-white"
                : "border-white/10 bg-white/5 text-gray-400 hover:border-orange-500"
            }
          `}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}