import { useEffect, useState } from "react";
import { PolypeptideScene } from "./PolypeptideScene";

const features = [
  {
    title: "Adaptive Intelligence",
    body: "Components that respond to context, intent, and motion — designed for the next decade of interfaces.",
  },
  {
    title: "Engineered Elegance",
    body: "Every interaction is meticulously calibrated. Restraint, rhythm, and clarity at every scale.",
  },
  {
    title: "Built for Scale",
    body: "From a first prototype to global production. Quietly powerful, effortlessly composable.",
  },
];

export const ShowcasePanel = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % features.length), 5200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-aurora">
      {/* Soft grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18] grid-fade"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--glacier-deep) / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--glacier-deep) / 0.18) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-32 -left-20 h-[28rem] w-[28rem] rounded-full bg-white/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-24 h-[32rem] w-[32rem] rounded-full bg-glacier-200/60 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 right-1/4 h-64 w-64 rounded-full bg-glacier-ice/70 blur-3xl" />

      {/* 3D scene */}
      <div className="absolute inset-0">
        <PolypeptideScene />
      </div>

      {/* Top corner status */}
      <div className="absolute top-8 left-8 z-10 flex items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium text-glacier-deep shadow-soft">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-glacier-500 opacity-75 animate-pulse-ring" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-glacier-600" />
        </span>
        Live · Helix v3.2
      </div>

      <div className="absolute top-8 right-8 z-10 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-glacier-700 shadow-soft">
        <span className="text-glacier-500">◇</span>
        Move cursor
      </div>

      {/* Bottom card */}
      <div className="absolute bottom-8 left-8 right-8 z-10">
        <div className="glass-strong rounded-2xl p-6 shadow-glacier">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-glacier-600">
              0{active + 1} / 0{features.length}
            </span>
            <div className="flex items-center gap-1.5">
              {features.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show feature ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === active ? "w-8 bg-glacier-deep" : "w-2 bg-glacier-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div key={active} className="animate-fade-up">
            <h3 className="text-xl font-semibold tracking-tight text-glacier-deep">
              {features[active].title}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
              {features[active].body}
            </p>
          </div>

          <div className="mt-5 flex items-center gap-6 border-t border-glacier-200/60 pt-4">
            <Stat label="Latency" value="12ms" />
            <Stat label="Render" value="60fps" />
            <Stat label="Atoms" value="106" />
            <Stat label="Bonds" value="103" />
          </div>
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col">
    <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    <span className="font-mono text-sm font-semibold text-glacier-deep">{value}</span>
  </div>
);

export default ShowcasePanel;
