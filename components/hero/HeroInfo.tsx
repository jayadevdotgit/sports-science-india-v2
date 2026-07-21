const metrics = [
  { label: "Movement quality", value: "92", width: "92%" },
  { label: "Strength output", value: "88", width: "88%" },
  { label: "Injury resilience", value: "95", width: "95%" },
];

export default function HeroInfo() {
  return (
    <div className="w-64 rounded-3xl border border-orange-300/15 bg-black/55 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-orange-400">Performance Lab</p>
          <h3 className="mt-2 text-xl font-bold text-white">Athlete Analysis</h3>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-orange-400/30 bg-orange-500/10 text-sm font-bold text-orange-300">
          94
        </div>
      </div>

      <div className="mt-5 border-t border-white/10 pt-4">
        <div className="mb-4 flex items-center justify-between text-xs text-gray-400">
          <span>READINESS SCORE</span>
          <span className="font-semibold text-orange-300">OPTIMAL</span>
        </div>

        <div className="space-y-4">
          {metrics.map((metric) => (
            <div key={metric.label}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span className="text-gray-200">{metric.label}</span>
                <span className="font-semibold text-white">{metric.value}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-orange-600 to-orange-300" style={{ width: metric.width }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
