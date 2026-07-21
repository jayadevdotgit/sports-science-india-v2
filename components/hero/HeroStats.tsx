import FloatingCard from "./FloatingCard";

export default function HeroStats() {
  return (
    <div className="absolute inset-0 pointer-events-none">

      <div className="absolute top-28 right-12">
        <FloatingCard
          value="1000+"
          title="Athletes"
        />
      </div>

      <div className="absolute top-[45%] left-0">
        <FloatingCard
          value="15+"
          title="Years"
        />
      </div>

      <div className="absolute bottom-20 right-32">
        <FloatingCard
          value="50+"
          title="Sports"
        />
      </div>

    </div>
  );
}