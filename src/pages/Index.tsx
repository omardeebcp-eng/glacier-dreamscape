import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, FlaskConical, Microscope, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PolypeptideScene } from "@/components/PolypeptideScene";
import { PolypeptideBorder } from "@/components/PolypeptideBorder";
import { EvolutionStory } from "@/components/EvolutionStory";
import { EvolutionHeroVideo } from "@/components/EvolutionHeroVideo";
import {
  CatalogSection,
  QualitySection,
  DocumentationSection,
  ResearchersSection,
  ComplianceCTA,
} from "@/components/SiteSections";

const Index = () => {
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.title = "PaleoChems — Research-grade peptides for the laboratory";
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-soft text-glacier-deep">
      {/* ── Top Nav (always visible) ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "glass-strong border-glacier-200/80 shadow-soft"
            : "bg-glacier-deep/75 border-white/10 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-glacier-300/40 blur-md" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-glacier-400 to-glacier-700 shadow-soft">
                <FlaskConical className="h-5 w-5 text-white" />
              </div>
            </div>
            <span
              className={`text-base font-semibold tracking-tight transition-colors ${
                scrolled ? "text-glacier-deep" : "text-white"
              }`}
            >
              Paleo<span className="font-serif italic">Chems</span>
            </span>
          </a>
          <div
            className={`hidden items-center gap-9 text-[13px] font-medium md:flex transition-colors ${
              scrolled ? "text-glacier-deep/80" : "text-white/85"
            }`}
          >
            <a href="#catalog" className="hover:opacity-100 opacity-90 transition">Catalog</a>
            <a href="#quality" className="hover:opacity-100 opacity-90 transition">Quality</a>
            <a href="#documentation" className="hover:opacity-100 opacity-90 transition">Documentation</a>
            <a href="#researchers" className="hover:opacity-100 opacity-90 transition">Researchers</a>
          </div>
          <Button
            className={`h-9 rounded-full px-5 text-[13px] font-medium transition-colors ${
              scrolled
                ? "border border-glacier-deep/20 bg-transparent text-glacier-deep hover:bg-glacier-deep hover:text-white"
                : "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-glacier-deep"
            }`}
          >
            Open account
          </Button>
        </nav>
      </header>

      {/* ── Cinematic evolution hero video ── */}
      <EvolutionHeroVideo />

      {/* ── Hero with animated polypeptide border frame ── */}
      <section className="relative min-h-screen w-full overflow-hidden bg-gradient-aurora pt-16">
        {/* aurora blobs */}
        <div className="pointer-events-none absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-white/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-48 -right-32 h-[36rem] w-[36rem] rounded-full bg-glacier-200/60 blur-3xl" />
        <div className="pointer-events-none absolute top-1/3 right-1/4 h-72 w-72 rounded-full bg-glacier-ice/70 blur-3xl" />

        {/* soft grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.16] grid-fade"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--glacier-deep) / 0.18) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--glacier-deep) / 0.18) 1px, transparent 1px)",
            backgroundSize: "44px 44px",
          }}
        />

        {/* 3D scene as faint backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <PolypeptideScene />
        </div>

        {/* ── Animated polypeptide BORDERS ── */}
        <div className="pointer-events-none absolute inset-x-0 top-16 h-12 z-20">
          <PolypeptideBorder edge="top" hue={0.58} speed={1} phase={0} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 z-20">
          <PolypeptideBorder edge="bottom" hue={0.55} speed={0.85} phase={1.2} />
        </div>
        <div className="pointer-events-none absolute inset-y-16 left-0 w-12 z-20 hidden md:block">
          <PolypeptideBorder edge="left" hue={0.6} speed={0.95} phase={0.6} />
        </div>
        <div className="pointer-events-none absolute inset-y-16 right-0 w-12 z-20 hidden md:block">
          <PolypeptideBorder edge="right" hue={0.53} speed={1.1} phase={2.1} />
        </div>

        {/* corner status chips */}
        <div className="absolute top-24 left-8 z-30 hidden items-center gap-2.5 rounded-full glass px-3.5 py-1.5 text-[11px] font-medium text-glacier-deep shadow-soft md:flex">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-glacier-500 opacity-75 animate-pulse-ring" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-glacier-600" />
          </span>
          Lot QA · Helix v3.2
        </div>
        <div className="absolute top-24 right-8 z-30 hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-glacier-700 shadow-soft md:flex">
          <span className="text-glacier-500">◇</span>
          Move cursor
        </div>

        {/* Hero content — research account card */}
        <div className="relative z-30 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-6 py-12 lg:px-20">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left: hero copy */}
            <div className="animate-fade-up space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-glacier-700 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Research-use reagents
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
                Reference-grade <span className="italic font-serif text-aurora">peptides</span>,
                <br className="hidden sm:block" />
                <span className="text-aurora">characterized</span> per lot.
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
                PaleoChems supplies <span className="text-aurora font-medium">SPPS-synthesized</span> research peptides
                with HPLC and mass-spectrometry data on every <span className="text-aurora font-medium">lot</span>.
                For in-vitro and laboratory research only.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Microscope className="h-4 w-4 text-glacier-500" />
                  HPLC ≥ 98%
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <FlaskConical className="h-4 w-4 text-glacier-500" />
                  ESI-MS confirmed
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <ShieldAlert className="h-4 w-4 text-glacier-500" />
                  Research use only
                </div>
              </div>
            </div>

            {/* Right: research-account request card */}
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="glass-strong relative mx-auto w-full max-w-sm rounded-3xl p-7 shadow-glacier">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Open a research account</h2>
                    <p className="text-xs text-muted-foreground">
                      Verified accounts unlock pricing, bulk sizing and lot reservation.
                    </p>
                  </div>

                  <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5">
                      <Label htmlFor="institution" className="text-xs font-medium">Institution / Laboratory</Label>
                      <Input
                        id="institution"
                        type="text"
                        placeholder="e.g. Department of Biochemistry"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="h-11 border-border bg-white text-sm placeholder:text-muted-foreground/70 focus-visible:border-glacier-400 focus-visible:ring-glacier-300/40"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium">Research email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@institution.edu"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 border-border bg-white text-sm placeholder:text-muted-foreground/70 focus-visible:border-glacier-400 focus-visible:ring-glacier-300/40"
                      />
                    </div>

                    <label className="flex items-start gap-2 text-[11px] leading-relaxed text-muted-foreground">
                      <input type="checkbox" className="mt-0.5 h-3.5 w-3.5 rounded border-border accent-glacier-deep" />
                      I confirm I am 21+ and that all materials will be used for
                      laboratory research only. Not for human or veterinary use.
                    </label>

                    <Button
                      type="submit"
                      className="group relative h-11 w-full overflow-hidden bg-glacier-deep text-sm font-medium text-white shadow-soft transition-all hover:bg-glacier-700 hover:shadow-glacier"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Request access
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Button>
                  </form>

                  <p className="text-center text-xs text-muted-foreground">
                    Already verified?{" "}
                    <a href="#" className="font-medium text-glacier-700 underline-offset-4 hover:underline">Sign in</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Evolution story: Paleolithic → Peptides ── */}
      <div id="story">
        <EvolutionStory />
      </div>

      {/* ── Catalog ── */}
      <CatalogSection />

      {/* ── Quality ── */}
      <QualitySection />

      {/* ── Documentation ── */}
      <DocumentationSection />

      {/* ── Researchers ── */}
      <ResearchersSection />

      {/* ── Compliance + Contact CTA ── */}
      <ComplianceCTA />

      {/* ── Footer ── */}
      <footer className="border-t border-border/70 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] text-muted-foreground sm:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} PaleoChems. Research use only.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-glacier-700">Terms of Sale</a>
            <a href="#" className="hover:text-glacier-700">Compliance</a>
            <a href="#contact" className="hover:text-glacier-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
