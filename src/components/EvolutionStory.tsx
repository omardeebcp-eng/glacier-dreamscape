import { useEffect, useRef, useState } from "react";
import { Flame, Wheat, FlaskConical, Dna, Sparkles, ArrowRight } from "lucide-react";

/**
 * Animated "Paleolithic → Peptides" timeline.
 * Each chapter pins into view as the user scrolls; an animated SVG helix
 * threads through the chapters, gradient-shifting from amber (fire) through
 * teal (science) to glacier blue (the present).
 */

const chapters = [
  {
    era: "2.5M – 10,000 BCE",
    label: "Paleolithic",
    title: ["Fire, ", "muscle, ", "instinct."],
    body: "Hominids walked, hunted, and adapted. The body learned to thrive on scarcity, motion, and protein from the hunt. Our biology was forged here.",
    icon: Flame,
    accent: "from-amber-400/70 via-orange-300/40 to-transparent",
    dot: "hsl(28 95% 58%)",
  },
  {
    era: "10,000 BCE – 1700s",
    label: "Agriculture",
    title: ["Settlement, ", "abundance, ", "cycles."],
    body: "Grain, dairy, and fermentation rewired our microbiome. New diets meant new diseases — and the first slow turn toward modern medicine.",
    icon: Wheat,
    accent: "from-yellow-300/60 via-emerald-200/40 to-transparent",
    dot: "hsl(45 90% 55%)",
  },
  {
    era: "1800 – 1950",
    label: "Biochemistry",
    title: ["Vitamins, ", "vaccines, ", "hormones."],
    body: "Insulin in 1921. Penicillin in 1928. The molecule became the unit of healing — humans first speaking the body's own chemical language.",
    icon: FlaskConical,
    accent: "from-emerald-300/60 via-teal-300/40 to-transparent",
    dot: "hsl(165 70% 45%)",
  },
  {
    era: "1953 – 2010",
    label: "Genome era",
    title: ["DNA, ", "decoded ", "blueprint."],
    body: "The double helix gave us the source code. Sequencing turned biology into information — and the human body into something we could read.",
    icon: Dna,
    accent: "from-cyan-300/60 via-glacier-200/50 to-transparent",
    dot: "hsl(195 85% 55%)",
  },
  {
    era: "Now",
    label: "Peptide age",
    title: ["Targeted ", "signals ", "for longevity."],
    body: "Short chains of amino acids — peptides — speak directly to the cells that built us. We've returned to first principles, with the precision of code.",
    icon: Sparkles,
    accent: "from-glacier-300/70 via-glacier-100/60 to-transparent",
    dot: "hsl(215 85% 35%)",
  },
];

export const EvolutionStory = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0 → 1 across the section
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // total scrollable distance of the section
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      setProgress(p);
      setActiveIdx(Math.min(chapters.length - 1, Math.floor(p * chapters.length + 0.001)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Helix path generation (vertical S-curve with sin wave for the "strand")
  // viewBox: 200 wide x 1000 tall. We render once and CSS-scale.
  const helixPath = (() => {
    const pts: string[] = [];
    const turns = 9;
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const y = t * 1000;
      const x = 100 + Math.sin(t * Math.PI * 2 * turns) * 60 + Math.sin(t * Math.PI) * 18;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return pts.join(" ");
  })();
  const helixPathMirror = (() => {
    const pts: string[] = [];
    const turns = 9;
    for (let i = 0; i <= 200; i++) {
      const t = i / 200;
      const y = t * 1000;
      const x = 100 - Math.sin(t * Math.PI * 2 * turns) * 60 - Math.sin(t * Math.PI) * 18;
      pts.push(`${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return pts.join(" ");
  })();

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-gradient-to-b from-[hsl(28_60%_96%)] via-white to-[hsl(200_75%_95%)]"
      style={{ height: `${chapters.length * 100}vh` }}
      aria-label="The story of human biology, from the Paleolithic era to the peptide age"
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Aurora wash that morphs with progress (warm → cool) */}
        <div
          className="pointer-events-none absolute inset-0 transition-[background] duration-700"
          style={{
            background: `radial-gradient(ellipse at ${30 + progress * 40}% ${20 + progress * 20}%,
              hsl(${28 + progress * 190} 80% ${94 - progress * 6}% / 0.85) 0%,
              transparent 55%),
              radial-gradient(ellipse at ${80 - progress * 30}% 80%,
              hsl(${190 + progress * 25} 80% 92% / 0.7) 0%,
              transparent 60%)`,
          }}
        />

        {/* Soft grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--glacier-deep) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--glacier-deep) / 0.3) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />

        {/* Section header */}
        <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2 text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-glacier-700 backdrop-blur">
            A Story of Human Biology
          </span>
          <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            From <span className="italic font-serif text-aurora">stone</span> to{" "}
            <span className="italic font-serif text-aurora">signal</span>.
          </h2>
        </div>

        {/* Center vertical helix */}
        <svg
          className="pointer-events-none absolute left-1/2 top-0 h-full -translate-x-1/2"
          viewBox="0 0 200 1000"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden
        >
          <defs>
            <linearGradient id="strandGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(28 95% 58%)" />
              <stop offset="25%" stopColor="hsl(45 90% 55%)" />
              <stop offset="50%" stopColor="hsl(165 70% 50%)" />
              <stop offset="75%" stopColor="hsl(195 85% 55%)" />
              <stop offset="100%" stopColor="hsl(215 85% 35%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background faded full strands */}
          <path d={helixPath} stroke="hsl(215 30% 80% / 0.35)" strokeWidth="1.5" fill="none" />
          <path d={helixPathMirror} stroke="hsl(215 30% 80% / 0.35)" strokeWidth="1.5" fill="none" />

          {/* Animated revealed strands (drawn by progress) */}
          <path
            d={helixPath}
            stroke="url(#strandGrad)"
            strokeWidth="2.4"
            fill="none"
            filter="url(#glow)"
            strokeDasharray="2400"
            strokeDashoffset={2400 * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />
          <path
            d={helixPathMirror}
            stroke="url(#strandGrad)"
            strokeWidth="2.4"
            fill="none"
            filter="url(#glow)"
            strokeDasharray="2400"
            strokeDashoffset={2400 * (1 - progress)}
            style={{ transition: "stroke-dashoffset 0.15s linear" }}
          />

          {/* Rungs (peptide bonds) — appear as progress passes */}
          {Array.from({ length: 60 }).map((_, i) => {
            const t = i / 59;
            const y = t * 1000;
            const turns = 9;
            const x1 = 100 + Math.sin(t * Math.PI * 2 * turns) * 60 + Math.sin(t * Math.PI) * 18;
            const x2 = 100 - Math.sin(t * Math.PI * 2 * turns) * 60 - Math.sin(t * Math.PI) * 18;
            const visible = progress > t - 0.02;
            const hue = 28 + t * 187;
            return (
              <line
                key={i}
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke={`hsl(${hue} 80% 55%)`}
                strokeWidth="1"
                opacity={visible ? 0.7 : 0}
                style={{ transition: "opacity 0.4s ease" }}
              />
            );
          })}

          {/* Chapter dots positioned along the strand */}
          {chapters.map((c, i) => {
            const t = (i + 0.5) / chapters.length;
            const y = t * 1000;
            return (
              <g key={i}>
                <circle cx="100" cy={y} r="14" fill="white" opacity="0.9" />
                <circle
                  cx="100"
                  cy={y}
                  r="7"
                  fill={c.dot}
                  opacity={progress > t - 0.1 ? 1 : 0.35}
                  style={{ transition: "opacity 0.4s ease" }}
                />
                {activeIdx === i && (
                  <circle
                    cx="100"
                    cy={y}
                    r="14"
                    fill="none"
                    stroke={c.dot}
                    strokeWidth="1.5"
                    opacity="0.5"
                  >
                    <animate attributeName="r" from="14" to="26" dur="1.8s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="1.8s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}
        </svg>

        {/* Chapter cards — only the active one is shown, alternating sides */}
        {chapters.map((c, i) => {
          const Icon = c.icon;
          const isActive = i === activeIdx;
          const isLeft = i % 2 === 0;
          return (
            <div
              key={c.label}
              className={`absolute top-1/2 z-10 w-full max-w-md -translate-y-1/2 px-6 transition-all duration-700 ease-out
                ${isLeft ? "left-0 lg:left-[8%]" : "right-0 lg:right-[8%]"}
                ${isActive ? "opacity-100 translate-x-0" : `opacity-0 pointer-events-none ${isLeft ? "-translate-x-8" : "translate-x-8"}`}
              `}
              aria-hidden={!isActive}
            >
              <div className={`absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br ${c.accent} blur-2xl`} />
              <div className="glass-strong rounded-3xl p-7 shadow-glacier">
                <div className="mb-4 flex items-center gap-3">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-soft"
                    style={{ background: c.dot }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.22em] text-muted-foreground">
                      {c.era}
                    </p>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-glacier-deep">
                      {c.label}
                    </p>
                  </div>
                </div>
                <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                  {c.title[0]}
                  <span className="italic font-serif" style={{ color: c.dot }}>{c.title[1]}</span>
                  {c.title[2]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-glacier-deep/75">{c.body}</p>
                <div className="mt-5 flex items-center justify-between border-t border-glacier-200/60 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Chapter 0{i + 1} / 0{chapters.length}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {chapters.map((_, j) => (
                      <span
                        key={j}
                        className="h-1 rounded-full transition-all duration-500"
                        style={{
                          width: j === i ? "24px" : "6px",
                          background: j <= i ? c.dot : "hsl(200 40% 88%)",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Bottom CTA when story ends */}
        <div
          className="absolute bottom-10 left-1/2 z-20 -translate-x-1/2 text-center transition-all duration-500"
          style={{
            opacity: progress > 0.85 ? 1 : 0,
            transform: `translate(-50%, ${progress > 0.85 ? "0" : "12px"})`,
          }}
        >
          <a
            href="#discover"
            className="group inline-flex items-center gap-2 rounded-full bg-glacier-deep px-5 py-2.5 text-xs font-medium text-white shadow-glacier hover:bg-glacier-700"
          >
            Continue the story
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-glacier-100">
          <div
            className="h-full"
            style={{
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg, hsl(28 95% 58%), hsl(45 90% 55%), hsl(165 70% 50%), hsl(195 85% 55%), hsl(215 85% 35%))",
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default EvolutionStory;
