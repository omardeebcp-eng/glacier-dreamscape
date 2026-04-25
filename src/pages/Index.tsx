import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Lock, Activity, Atom, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, GoogleIcon } from "@/components/icons";
import { PolypeptideScene } from "@/components/PolypeptideScene";
import { PolypeptideBorder } from "@/components/PolypeptideBorder";
import { EvolutionStory } from "@/components/EvolutionStory";
import { EvolutionHeroVideo } from "@/components/EvolutionHeroVideo";
import {
  ProductsSection,
  DiscoverSection,
  SupportSection,
  PractitionerSection,
  FinalCTA,
} from "@/components/SiteSections";

const cards = [
  {
    eyebrow: "Adaptive Intelligence",
    title: ["Peptide-Powered ", "Workflows"],
    body: "Components that respond to context, intent, and motion — designed for the next decade of interfaces.",
    icon: Atom,
    tone: "from-glacier-200/70 to-glacier-50",
  },
  {
    eyebrow: "Engineered Elegance",
    title: ["Out-of-this-World ", "Recovery"],
    body: "Every interaction meticulously calibrated. Restraint, rhythm, and clarity at every scale.",
    icon: Waves,
    tone: "from-glacier-100/80 to-white",
  },
  {
    eyebrow: "Built for Scale",
    title: ["Recharge ", "Your Build"],
    body: "From first prototype to global production. Quietly powerful, effortlessly composable.",
    icon: Activity,
    tone: "from-glacier-300/60 to-glacier-100/60",
  },
];

const Index = () => {
  const [email, setEmail] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-soft text-glacier-deep">
      {/* ── Top Nav ── */}
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 border-b ${
          scrolled
            ? "glass-strong border-glacier-200/80 shadow-soft"
            : "bg-glacier-deep/70 border-white/10 backdrop-blur-md"
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="/" className="flex items-center gap-2.5">
            <div className="relative">
              <div className="absolute inset-0 rounded-xl bg-glacier-300/40 blur-md" />
              <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-glacier-400 to-glacier-700 shadow-soft">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21s-7-4.5-9-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5.5-9 10-9 10z" />
                </svg>
              </div>
            </div>
            <span
              className={`text-base font-semibold tracking-tight transition-colors ${
                scrolled ? "text-glacier-deep" : "text-white"
              }`}
            >
              Lovable
            </span>
          </a>
          <div
            className={`hidden items-center gap-9 text-[13px] font-medium md:flex transition-colors ${
              scrolled ? "text-glacier-deep/80" : "text-white/85"
            }`}
          >
            <a href="#products" className="hover:opacity-100 opacity-90 transition">Products</a>
            <a href="#discover" className="hover:opacity-100 opacity-90 transition">Discover</a>
            <a href="#support" className="hover:opacity-100 opacity-90 transition">Support</a>
            <a href="#practitioner" className="hover:opacity-100 opacity-90 transition">Practitioner</a>
          </div>
          <Button
            className={`h-9 rounded-full px-5 text-[13px] font-medium transition-colors ${
              scrolled
                ? "border border-glacier-deep/20 bg-transparent text-glacier-deep hover:bg-glacier-deep hover:text-white"
                : "border border-white/40 bg-white/10 text-white backdrop-blur hover:bg-white hover:text-glacier-deep"
            }`}
          >
            Get started
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
          Live · Helix v3.2
        </div>
        <div className="absolute top-24 right-8 z-30 hidden items-center gap-2 rounded-full glass px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-glacier-700 shadow-soft md:flex">
          <span className="text-glacier-500">◇</span>
          Move cursor
        </div>

        {/* Hero content — centered login card */}
        <div className="relative z-30 mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center px-6 py-12 lg:px-20">
          <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
            {/* Left: hero copy */}
            <div className="animate-fade-up space-y-6 text-center lg:text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-white/70 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-glacier-700 backdrop-blur">
                <Sparkles className="h-3 w-3" />
                Welcome back
              </span>
              <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
                For a <span className="italic font-serif text-aurora">long build</span>,
                <br className="hidden sm:block" />
                <span className="text-aurora">well-shipped</span>.
              </h1>
              <p className="mx-auto max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
                Sign in to your <span className="text-aurora font-medium">workspace</span> and continue building
                <span className="text-aurora font-medium"> beautiful</span>, production-ready apps with the tools your team already loves.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2 lg:justify-start">
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-glacier-500" />
                  SOC 2 Type II
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Zap className="h-4 w-4 text-glacier-500" />
                  99.99% uptime
                </div>
                <div className="h-3 w-px bg-border" />
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <Lock className="h-4 w-4 text-glacier-500" />
                  GDPR
                </div>
              </div>
            </div>

            {/* Right: login card */}
            <div className="animate-fade-up" style={{ animationDelay: "120ms" }}>
              <div className="glass-strong relative mx-auto w-full max-w-sm rounded-3xl p-7 shadow-glacier">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <h2 className="text-xl font-semibold tracking-tight">Sign in</h2>
                    <p className="text-xs text-muted-foreground">Use your work email or a social provider.</p>
                  </div>

                  <div className="space-y-2.5">
                    <Button variant="outline" className="group h-11 w-full justify-center gap-2.5 border-border bg-white text-sm font-medium text-glacier-deep transition-all hover:border-glacier-300 hover:bg-glacier-50/70 hover:shadow-soft">
                      <GoogleIcon />
                      Continue with Google
                    </Button>
                    <Button variant="outline" className="group h-11 w-full justify-center gap-2.5 border-border bg-white text-sm font-medium text-glacier-deep transition-all hover:border-glacier-300 hover:bg-glacier-50/70 hover:shadow-soft">
                      <GithubIcon />
                      Continue with GitHub
                    </Button>
                  </div>

                  <div className="relative flex items-center">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                    <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">or</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
                  </div>

                  <form className="space-y-3.5" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="text-xs font-medium">Email address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-11 border-border bg-white text-sm placeholder:text-muted-foreground/70 focus-visible:border-glacier-400 focus-visible:ring-glacier-300/40"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="group relative h-11 w-full overflow-hidden bg-glacier-deep text-sm font-medium text-white shadow-soft transition-all hover:bg-glacier-700 hover:shadow-glacier"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Continue
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                    </Button>
                  </form>

                  <p className="text-center text-xs text-muted-foreground">
                    Don't have an account?{" "}
                    <a href="#" className="font-medium text-glacier-700 underline-offset-4 hover:underline">Create your account</a>
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

      {/* ── Products ── */}
      <ProductsSection />

      {/* ── Discover ── */}
      <DiscoverSection />

      {/* ── Support ── */}
      <SupportSection />

      {/* ── Practitioner ── */}
      <PractitionerSection />

      {/* ── Final CTA ── */}
      <FinalCTA />

      {/* ── 3-up category cards (kept as foundational pillars) ── */}
      <section id="pillars" className="relative mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mb-14 flex flex-col items-center text-center">
          <span className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-glacier-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-glacier-700">
            Foundation
          </span>
          <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Built on a <span className="italic font-serif text-aurora">living</span> foundation.
          </h2>
          <p className="mt-3 max-w-xl text-sm text-muted-foreground">
            Three pillars hold the platform together — engineered with the same care as a folded protein.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <article
                key={c.eyebrow}
                className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${c.tone} p-8 shadow-soft ring-1 ring-white/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-glacier`}
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-white/40 blur-2xl transition-transform duration-700 group-hover:scale-125" />
                <div className="relative flex h-72 flex-col justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/70 text-glacier-deep shadow-soft backdrop-blur">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-glacier-700">
                      {c.eyebrow}
                    </p>
                    <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                      {c.title[0]}
                      <span className="italic font-serif text-aurora">{c.title[1]}</span>
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-glacier-deep/70">{c.body}</p>
                    <div className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-glacier-deep">
                      Explore
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-border/70 bg-white/60 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[11px] text-muted-foreground sm:flex-row lg:px-10">
          <span>© {new Date().getFullYear()} Lovable, Inc.</span>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-glacier-700">Privacy</a>
            <a href="#" className="hover:text-glacier-700">Terms</a>
            <a href="#" className="hover:text-glacier-700">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
