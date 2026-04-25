import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import heroVideo from "@/assets/evolution-hero.mp4.asset.json";

/**
 * Cinematic full-bleed hero video tracing human biology from the Paleolithic
 * era to the modern peptide age. Auto-plays muted, loops, and overlays
 * editorial typography with synced era markers.
 */
const eras = [
  { t: 0, label: "Paleolithic", note: "2.5M BCE" },
  { t: 0.2, label: "Agriculture", note: "10,000 BCE" },
  { t: 0.4, label: "Biochemistry", note: "1800s" },
  { t: 0.6, label: "Genome", note: "1953" },
  { t: 0.82, label: "Peptide age", note: "Now" },
];

export const EvolutionHeroVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTime = () => {
      if (v.duration) setProgress(v.currentTime / v.duration);
    };
    v.addEventListener("timeupdate", onTime);
    return () => v.removeEventListener("timeupdate", onTime);
  }, []);

  const activeIdx = eras.reduce((acc, e, i) => (progress >= e.t ? i : acc), 0);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-glacier-deep text-white">
      {/* Background video */}
      <video
        ref={videoRef}
        src={heroVideo.url}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden
      />

      {/* Cinematic vignette + gradient wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/80" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30" />

      {/* Film grain & subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
        }}
      />

      {/* Top eyebrow */}
      <div className="absolute left-1/2 top-24 z-20 -translate-x-1/2 text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur-md">
          <Sparkles className="h-3 w-3" />
          A Story of Human Biology
        </span>
      </div>

      {/* Main hero text — bottom-left editorial */}
      <div className="absolute inset-x-0 bottom-0 z-20 px-6 pb-24 lg:px-16 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/70">
            {eras[activeIdx].note} · Chapter 0{activeIdx + 1} / 0{eras.length}
          </p>
          <h1 className="max-w-4xl text-balance text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.5rem]">
            From <span className="italic font-serif bg-gradient-to-r from-amber-300 via-emerald-200 to-glacier-200 bg-clip-text text-transparent">stone</span>
            <br />
            to <span className="italic font-serif bg-gradient-to-r from-glacier-200 via-cyan-200 to-white bg-clip-text text-transparent">signal</span>.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 lg:text-lg">
            Two and a half million years of human biology — from firelight and
            instinct to the precision of <span className="italic">peptide signaling</span>.
            One continuous conversation with the cells that built us.
          </p>

          {/* Era timeline */}
          <div className="mt-10 max-w-3xl">
            <div className="relative h-px w-full bg-white/15">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-amber-400 via-emerald-300 via-cyan-300 to-glacier-200"
                style={{ width: `${progress * 100}%`, transition: "width 0.2s linear" }}
              />
              {eras.map((e, i) => (
                <div
                  key={e.label}
                  className="absolute -top-1.5 -translate-x-1/2"
                  style={{ left: `${e.t * 100}%` }}
                >
                  <span
                    className={`block h-3 w-3 rounded-full border transition-all duration-500 ${
                      i <= activeIdx
                        ? "border-white bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
                        : "border-white/40 bg-white/10"
                    }`}
                  />
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-between text-[10px] font-mono uppercase tracking-[0.18em]">
              {eras.map((e, i) => (
                <span
                  key={e.label}
                  className={`transition-colors duration-500 ${
                    i === activeIdx ? "text-white" : "text-white/45"
                  }`}
                >
                  {e.label}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#discover"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-glacier-deep shadow-glacier hover:bg-glacier-50"
            >
              Begin the journey
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#story"
              className="text-sm font-medium text-white/80 underline-offset-4 hover:text-white hover:underline"
            >
              Watch the full story ↓
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 text-[10px] font-mono uppercase tracking-[0.3em] text-white/60">
        Scroll
      </div>
    </section>
  );
};

export default EvolutionHeroVideo;
