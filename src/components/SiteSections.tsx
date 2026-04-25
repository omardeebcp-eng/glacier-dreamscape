import { ArrowRight, FlaskConical, Microscope, FileText, ShieldAlert, Beaker, Atom, Thermometer, Droplet, Scale, ClipboardList, Mail } from "lucide-react";
import { SimplePeptideBackdrop } from "./SimplePeptideBackdrop";

/* ────────────────────────────────────────────────────────────
   Shared simple section header
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
    <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-glacier-700 backdrop-blur">
      {eyebrow}
    </span>
    <h2 className="text-balance text-3xl font-semibold tracking-tight text-glacier-deep sm:text-4xl lg:text-5xl">
      {title}{" "}
      <span className="italic font-serif text-aurora">{italicWord}</span>{" "}
      {trailing}
    </h2>
    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
      {subtitle}
    </p>
  </div>
);

/* Wrapper that places a low-opacity reactive peptide chain behind the section */
const PeptideSection = ({
  id,
  hue = 0.57,
  children,
  className = "",
}: {
  id?: string;
  hue?: number;
  children: React.ReactNode;
  className?: string;
}) => (
  <section id={id} className={`relative overflow-hidden ${className}`}>
    <div className="absolute inset-0 opacity-40">
      <SimplePeptideBackdrop hue={hue} />
    </div>
    {/* legibility wash */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/70 via-white/55 to-white/80" />
    <div className="relative">{children}</div>
  </section>
);

/* ────────────────────────────────────────────────────────────
   CATALOG — research peptides for laboratory use
   ──────────────────────────────────────────────────────────── */
const catalog = [
  { code: "BPC-157", purity: "≥ 99.0%", mw: "1419.5 g/mol", sizes: "5 mg · 10 mg" },
  { code: "TB-500", purity: "≥ 99.2%", mw: "4963.4 g/mol", sizes: "2 mg · 5 mg · 10 mg" },
  { code: "GHK-Cu", purity: "≥ 98.5%", mw: "402.9 g/mol", sizes: "50 mg · 100 mg" },
  { code: "Epitalon", purity: "≥ 99.0%", mw: "390.4 g/mol", sizes: "10 mg · 20 mg" },
  { code: "Semax", purity: "≥ 98.8%", mw: "813.9 g/mol", sizes: "10 mg · 30 mg" },
  { code: "Selank", purity: "≥ 98.5%", mw: "751.9 g/mol", sizes: "5 mg · 10 mg" },
  { code: "CJC-1295 (no DAC)", purity: "≥ 99.1%", mw: "3367.9 g/mol", sizes: "2 mg · 5 mg" },
  { code: "Ipamorelin", purity: "≥ 99.3%", mw: "711.9 g/mol", sizes: "2 mg · 5 mg" },
  { code: "Thymosin α-1", purity: "≥ 98.9%", mw: "3108.4 g/mol", sizes: "5 mg · 10 mg" },
];

export const CatalogSection = () => (
  <PeptideSection id="catalog" hue={0.57}>
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeader
        eyebrow="Catalog"
        title="Reference-grade research"
        italicWord="peptides"
        trailing="."
        subtitle="Lyophilized powders synthesized by SPPS, characterized by HPLC and mass spectrometry. For in-vitro and laboratory research use only."
      />

      <div className="overflow-hidden rounded-3xl border border-glacier-200 bg-white/90 shadow-soft backdrop-blur">
        <div className="grid grid-cols-12 border-b border-glacier-100 bg-glacier-50/60 px-6 py-3 text-[10px] font-mono uppercase tracking-[0.22em] text-glacier-700">
          <div className="col-span-4">Compound</div>
          <div className="col-span-2">Purity (HPLC)</div>
          <div className="col-span-3">Molecular weight</div>
          <div className="col-span-2">Available sizes</div>
          <div className="col-span-1 text-right">Spec</div>
        </div>
        {catalog.map((c, i) => (
          <a
            key={c.code}
            href="#"
            className={`group grid grid-cols-12 items-center px-6 py-4 text-sm transition-colors hover:bg-glacier-50/80 ${
              i !== catalog.length - 1 ? "border-b border-glacier-100" : ""
            }`}
          >
            <div className="col-span-4 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-glacier-deep text-white">
                <Atom className="h-4 w-4" />
              </span>
              <span className="font-medium text-glacier-deep">{c.code}</span>
            </div>
            <div className="col-span-2 font-mono text-[12px] text-glacier-700">{c.purity}</div>
            <div className="col-span-3 font-mono text-[12px] text-glacier-700">{c.mw}</div>
            <div className="col-span-2 text-[12px] text-glacier-deep/70">{c.sizes}</div>
            <div className="col-span-1 flex justify-end">
              <ArrowRight className="h-4 w-4 text-glacier-500 transition-transform group-hover:translate-x-0.5" />
            </div>
          </a>
        ))}
      </div>

      <p className="mt-6 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
        Not for human consumption · Not a drug, food or cosmetic · Research use only
      </p>
    </div>
  </PeptideSection>
);

/* ────────────────────────────────────────────────────────────
   QUALITY — analytical and handling specs
   ──────────────────────────────────────────────────────────── */
const quality = [
  {
    icon: Microscope,
    title: "HPLC verified",
    body: "Every lot ≥ 98% by reverse-phase HPLC. Chromatograms supplied with each shipment.",
  },
  {
    icon: FlaskConical,
    title: "MS confirmed",
    body: "Identity confirmed by ESI-MS. Theoretical and observed masses recorded per lot.",
  },
  {
    icon: Thermometer,
    title: "Cold-chain shipping",
    body: "Lyophilized peptides shipped with insulation; stored at -20°C upon receipt.",
  },
  {
    icon: Droplet,
    title: "Reconstitution guides",
    body: "Solubility data for bacteriostatic water, acetic acid and DMSO included with COA.",
  },
  {
    icon: Scale,
    title: "Accurate fill weights",
    body: "Net peptide content stated. No proprietary blends, no undisclosed excipients.",
  },
  {
    icon: ShieldAlert,
    title: "Endotoxin tested",
    body: "Select compounds available in low-endotoxin format on request for sensitive assays.",
  },
];

export const QualitySection = () => (
  <PeptideSection id="quality" hue={0.55}>
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeader
        eyebrow="Quality"
        title="Analytical rigor on"
        italicWord="every"
        trailing="lot."
        subtitle="Synthesis is only the beginning. Characterization is what makes a reagent trustworthy in your assay."
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quality.map((q) => {
          const Icon = q.icon;
          return (
            <div
              key={q.title}
              className="group rounded-2xl border border-glacier-100 bg-white/90 p-7 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-0.5 hover:shadow-glacier"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-glacier-deep text-white">
                <Icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-glacier-deep">
                {q.title}
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-glacier-deep/70">
                {q.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  </PeptideSection>
);

/* ────────────────────────────────────────────────────────────
   DOCUMENTATION — COA, SDS, references
   ──────────────────────────────────────────────────────────── */
const docs = [
  {
    icon: FileText,
    kicker: "Per lot",
    title: "Certificate of Analysis",
    body: "HPLC purity, mass spec confirmation, peptide content and counter-ion data.",
  },
  {
    icon: ClipboardList,
    kicker: "Per compound",
    title: "Safety Data Sheet",
    body: "GHS-aligned handling, storage and disposal information for laboratory use.",
  },
  {
    icon: Beaker,
    kicker: "Reference",
    title: "Reconstitution Notes",
    body: "Solvent compatibility, working concentrations and stability windows.",
  },
];

export const DocumentationSection = () => (
  <PeptideSection id="documentation" hue={0.6}>
    <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
      <SectionHeader
        eyebrow="Documentation"
        title="Every reagent ships with"
        italicWord="paperwork"
        trailing="that holds up."
        subtitle="COA, SDS and reconstitution data are downloadable before purchase and packed with every order."
      />
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {docs.map((d) => {
          const Icon = d.icon;
          return (
            <article
              key={d.title}
              className="group rounded-3xl border border-glacier-100 bg-white/90 p-8 shadow-soft backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:shadow-glacier"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl bg-glacier-deep text-white shadow-soft">
                <Icon className="h-5 w-5" />
              </div>
              <p className="mb-1 text-[10px] font-mono uppercase tracking-[0.22em] text-glacier-700">
                {d.kicker}
              </p>
              <h3 className="text-xl font-semibold tracking-tight text-glacier-deep">
                {d.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-glacier-deep/70">
                {d.body}
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-glacier-deep">
                Download sample
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </PeptideSection>
);

/* ────────────────────────────────────────────────────────────
   ACCOUNTS — researcher / institution sign-up
   ──────────────────────────────────────────────────────────── */
export const ResearchersSection = () => {
  const items = [
    "Tiered pricing for academic and institutional accounts",
    "Bulk and custom-sized orders by quotation",
    "PO terms available for verified institutions",
    "Dedicated point of contact for ongoing programs",
  ];
  return (
    <PeptideSection id="researchers" hue={0.58}>
      <div className="mx-auto max-w-7xl px-6 py-28 lg:px-10">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/80 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-glacier-700 backdrop-blur">
              Researchers
            </span>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-tight text-glacier-deep sm:text-5xl">
              Built for{" "}
              <span className="italic font-serif text-aurora">laboratory</span>{" "}
              workflows.
            </h2>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
              PaleoChems supplies academic labs, contract research organizations
              and independent investigators. Verified research-use accounts
              unlock pricing, bulk sizing and reservation of specific lots.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full bg-glacier-deep px-6 py-3 text-sm font-medium text-white shadow-glacier hover:bg-glacier-700"
              >
                Apply for a research account
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-glacier-deep underline-offset-4 hover:underline"
              >
                Request a quotation →
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-3">
            {items.map((it) => (
              <li
                key={it}
                className="flex items-start gap-3 rounded-2xl border border-glacier-100 bg-white/90 p-5 shadow-soft backdrop-blur"
              >
                <span className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-glacier-deep text-[11px] font-semibold text-white">
                  ✓
                </span>
                <span className="text-sm text-glacier-deep/85">{it}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PeptideSection>
  );
};

/* ────────────────────────────────────────────────────────────
   COMPLIANCE / CONTACT — closing band
   ──────────────────────────────────────────────────────────── */
export const ComplianceCTA = () => (
  <section id="contact" className="relative overflow-hidden">
    <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
      <div className="relative overflow-hidden rounded-[2rem] border border-glacier-deep/20 bg-glacier-deep px-8 py-16 text-white shadow-glacier sm:px-14">
        <div className="absolute inset-0 opacity-30">
          <SimplePeptideBackdrop hue={0.57} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-glacier-deep/60 via-glacier-deep/40 to-glacier-deep/80" />

        <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 backdrop-blur">
              Compliance
            </span>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Sold strictly for{" "}
              <span className="italic font-serif bg-gradient-to-r from-amber-300 via-emerald-200 to-glacier-200 bg-clip-text text-transparent">
                research
              </span>{" "}
              use.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
              All compounds distributed by PaleoChems are supplied for in-vitro
              experimentation and laboratory research only. They are not
              intended for human or veterinary use, diagnostic procedures, food
              applications, or any clinical purpose. Purchasers must be 21+ and
              affirm research-use only at checkout.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="mailto:research@paleochems.com"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-glacier-deep hover:bg-glacier-50"
            >
              <Mail className="h-4 w-4" />
              research@paleochems.com
            </a>
            <a
              href="#researchers"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white hover:bg-white/10"
            >
              Open a research account
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
);
