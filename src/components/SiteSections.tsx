import { ArrowRight, Atom, Activity, Waves, FlaskConical, Dna, HeartPulse, Microscope, Stethoscope, BookOpen, MessageCircle, ShieldCheck, Sparkles, Users, GraduationCap, LineChart, Boxes } from "lucide-react";

/* ────────────────────────────────────────────────────────────
   Reusable section heading
   ──────────────────────────────────────────────────────────── */
const SectionHeader = ({
  eyebrow,
  title,
  italicWord,
  trailing,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  italicWord: string;
  trailing: string;
  subtitle: string;
}) => (
  <div className="mb-14 flex flex-col items-center text-center">
    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-glacier-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-glacier-700">
      {eyebrow}
    </span>
    <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
      {title}{" "}
      <span className="italic font-serif text-aurora">{italicWord}</span>{" "}
      {trailing}
    </h2>
    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
      {subtitle}
    </p>
  </div>
);

/* ────────────────────────────────────────────────────────────
   PRODUCTS — peptide protocol catalog
   ──────────────────────────────────────────────────────────── */
const products = [
  {
    name: "Helix Recover",
    tag: "BPC-157 · TB-500",
    desc: "Tissue repair and recovery signaling for athletes and post-surgical protocols.",
    icon: Activity,
    accent: "from-amber-200/60 to-glacier-50",
    dot: "hsl(28 95% 58%)",
  },
  {
    name: "Helix Vital",
    tag: "GHK-Cu · Epitalon",
    desc: "Cellular renewal and longevity signaling — the conversation cells were built to have.",
    icon: HeartPulse,
    accent: "from-emerald-200/60 to-glacier-50",
    dot: "hsl(165 70% 45%)",
  },
  {
    name: "Helix Cognita",
    tag: "Semax · Selank",
    desc: "Neuro-modulating peptides for focus, resilience and clean cognitive endurance.",
    icon: Atom,
    accent: "from-cyan-200/60 to-glacier-50",
    dot: "hsl(195 85% 55%)",
  },
  {
    name: "Helix Metabolic",
    tag: "Tirzepatide · CJC-1295",
    desc: "Metabolic recalibration and body-composition support, dosed with practitioner oversight.",
    icon: LineChart,
    accent: "from-glacier-200/60 to-glacier-50",
    dot: "hsl(215 85% 35%)",
  },
  {
    name: "Helix Defender",
    tag: "Thymosin α-1",
    desc: "Immune signaling for the seasons your body asks for a little more.",
    icon: ShieldCheck,
    accent: "from-violet-200/60 to-glacier-50",
    dot: "hsl(265 70% 55%)",
  },
  {
    name: "Helix Sleep",
    tag: "DSIP · Pinealon",
    desc: "Restorative sleep architecture and circadian alignment, gently calibrated.",
    icon: Waves,
    accent: "from-indigo-200/60 to-glacier-50",
    dot: "hsl(225 70% 55%)",
  },
];

export const ProductsSection = () => (
  <section id="products" className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
    <SectionHeader
      eyebrow="Products"
      title="Six protocols, one"
      italicWord="biological"
      trailing="language."
      subtitle="Each formulation is a precise sentence the body already knows how to read — designed with clinicians, made under cGMP, dosed with care."
    />
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((p) => {
        const Icon = p.icon;
        return (
          <article
            key={p.name}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${p.accent} p-7 ring-1 ring-white/60 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-glacier`}
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/40 blur-2xl transition-transform duration-700 group-hover:scale-125" />
            <div className="relative">
              <div
                className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-soft"
                style={{ background: p.dot }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.22em] text-glacier-700">
                {p.tag}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-glacier-deep">
                {p.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-glacier-deep/70">
                {p.desc}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-glacier-deep">
                View protocol
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </article>
        );
      })}
    </div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   DISCOVER — science / education
   ──────────────────────────────────────────────────────────── */
const discoverItems = [
  {
    kicker: "Library",
    title: "The Peptide Atlas",
    body: "A growing reference of every peptide in our formulary — mechanism, evidence, dosing, contraindications.",
    icon: BookOpen,
    span: "lg:col-span-2",
  },
  {
    kicker: "Research",
    title: "Trials & Data",
    body: "Independent and partnered clinical work — published, peer-reviewed, openly cited.",
    icon: Microscope,
  },
  {
    kicker: "Story",
    title: "From Stone to Signal",
    body: "Our long-form essay on 2.5M years of human biology and the return to first principles.",
    icon: Dna,
  },
  {
    kicker: "Lab Notes",
    title: "Behind the Bench",
    body: "Short dispatches from formulation, QC and stability testing — what changed, why it matters.",
    icon: FlaskConical,
    span: "lg:col-span-2",
  },
];

export const DiscoverSection = () => (
  <section id="discover" className="relative bg-gradient-to-b from-white to-glacier-50/60">
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeader
        eyebrow="Discover"
        title="Where curiosity"
        italicWord="becomes"
        trailing="evidence."
        subtitle="Read the science the way it was meant to be read — slowly, with citations, and with respect for what we still don't know."
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {discoverItems.map((d) => {
          const Icon = d.icon;
          return (
            <article
              key={d.title}
              className={`group relative overflow-hidden rounded-3xl bg-white p-8 ring-1 ring-glacier-100 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-glacier ${d.span ?? ""}`}
            >
              <div className="absolute inset-0 -z-0 bg-gradient-to-br from-glacier-50/0 via-glacier-50/0 to-glacier-100/60 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative flex h-full flex-col justify-between gap-8">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-glacier-deep text-white shadow-soft">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.22em] text-glacier-700">
                    {d.kicker}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-tight text-glacier-deep">
                    {d.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-glacier-deep/70">
                    {d.body}
                  </p>
                  <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-glacier-deep">
                    Read more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   SUPPORT — help center / contact
   ──────────────────────────────────────────────────────────── */
const supportTiles = [
  {
    title: "Help Center",
    body: "Searchable answers on dosing, storage, shipping and account questions.",
    icon: BookOpen,
    cta: "Browse articles",
  },
  {
    title: "Talk to a Human",
    body: "Real people, real fast. Average response under 4 minutes during business hours.",
    icon: MessageCircle,
    cta: "Open chat",
  },
  {
    title: "Clinical Concierge",
    body: "Speak with a licensed practitioner about whether a protocol is right for you.",
    icon: Stethoscope,
    cta: "Book a call",
  },
];

export const SupportSection = () => (
  <section id="support" className="relative">
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeader
        eyebrow="Support"
        title="Quiet, careful,"
        italicWord="human"
        trailing="support."
        subtitle="No bots pretending to be people. No tier-one scripts. Real practitioners and real specialists, every time."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {supportTiles.map((t) => {
          const Icon = t.icon;
          return (
            <article
              key={t.title}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-glacier-50 to-white p-8 ring-1 ring-glacier-100 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-glacier"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-glacier-deep text-white shadow-soft">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold tracking-tight text-glacier-deep">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-glacier-deep/70">
                {t.body}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-glacier-deep">
                {t.cta}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          );
        })}
      </div>

      {/* Trust band */}
      <div className="mt-16 grid grid-cols-2 gap-6 rounded-3xl bg-glacier-deep px-8 py-10 text-white sm:grid-cols-4">
        {[
          { k: "<4 min", v: "Avg. response" },
          { k: "24 / 7", v: "Order tracking" },
          { k: "98%", v: "Practitioner CSAT" },
          { k: "SOC 2", v: "Type II certified" },
        ].map((s) => (
          <div key={s.v} className="text-center">
            <p className="font-serif text-3xl italic tracking-tight sm:text-4xl">
              {s.k}
            </p>
            <p className="mt-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/60">
              {s.v}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   PRACTITIONER — clinician portal pitch
   ──────────────────────────────────────────────────────────── */
export const PractitionerSection = () => {
  const features = [
    {
      icon: Users,
      title: "Patient management",
      body: "Build cohorts, track adherence, message securely, all in one HIPAA-aligned workspace.",
    },
    {
      icon: Boxes,
      title: "Custom protocols",
      body: "Compose multi-peptide protocols with dosing schedules and patient-facing instructions.",
    },
    {
      icon: GraduationCap,
      title: "Continuing education",
      body: "On-demand CME modules co-authored with clinicians actively working in peptide medicine.",
    },
    {
      icon: ShieldCheck,
      title: "Compliance built-in",
      body: "Audit trails, signed consent, e-prescribing — the boring parts handled correctly.",
    },
  ];

  return (
    <section
      id="practitioner"
      className="relative overflow-hidden bg-gradient-to-b from-glacier-50/60 via-white to-white"
    >
      {/* decorative aurora */}
      <div className="pointer-events-none absolute -top-24 left-1/3 h-96 w-96 rounded-full bg-glacier-200/50 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-glacier-700 backdrop-blur">
              <Sparkles className="h-3 w-3" />
              For practitioners
            </span>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.05]">
              A clinic-grade workspace for{" "}
              <span className="italic font-serif text-aurora">peptide</span> medicine.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              Everything you need to design, prescribe and follow up on peptide
              protocols — with the rigor your patients deserve and the speed
              your practice requires.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-glacier-deep px-6 py-3 text-sm font-medium text-white shadow-glacier hover:bg-glacier-700"
              >
                Apply for access
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="text-sm font-medium text-glacier-deep underline-offset-4 hover:underline"
              >
                Download the clinical brief →
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="glass-strong rounded-2xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-0.5 hover:shadow-glacier"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-glacier-deep text-white">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-glacier-deep">
                    {f.title}
                  </h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-glacier-deep/70">
                    {f.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ────────────────────────────────────────────────────────────
   FINAL CTA
   ──────────────────────────────────────────────────────────── */
export const FinalCTA = () => (
  <section className="relative overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-glacier-deep px-8 py-20 text-center text-white shadow-glacier sm:px-16">
        <div className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-glacier-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl" />
        <div className="relative">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur">
            Begin
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
            The next sentence in your{" "}
            <span className="italic font-serif bg-gradient-to-r from-amber-300 via-emerald-200 to-glacier-200 bg-clip-text text-transparent">
              biology
            </span>{" "}
            is yours to write.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/70">
            Create your account, talk to a clinician, and start a protocol
            designed around the body you actually have.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-glacier-deep hover:bg-glacier-50"
            >
              Create your account
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#practitioner"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              I'm a practitioner
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
