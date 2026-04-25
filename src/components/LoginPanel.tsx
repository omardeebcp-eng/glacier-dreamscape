import { useState } from "react";
import { ArrowRight, Lock, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GithubIcon, GoogleIcon } from "./icons";

export const LoginPanel = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-gradient-soft px-6 py-8 sm:px-10 lg:px-16">
      {/* Logo / brand */}
      <header className="flex items-center justify-between animate-fade-up">
        <a href="/" className="flex items-center gap-2.5">
          <div className="relative">
            <div className="absolute inset-0 rounded-xl bg-glacier-300/40 blur-md" />
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-glacier-400 to-glacier-700 shadow-soft">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-4.5-9-10a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 5.5-9 10-9 10z" />
              </svg>
            </div>
          </div>
          <span className="text-base font-semibold tracking-tight text-glacier-deep">Lovable</span>
        </a>
        <a href="#" className="hidden items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-glacier-700 sm:flex">
          <span>Need help?</span>
          <ArrowRight className="h-3 w-3" />
        </a>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-sm space-y-8 animate-fade-up" style={{ animationDelay: "100ms" }}>
          {/* Eyebrow */}
          <div className="space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-glacier-200 bg-glacier-50 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-glacier-700">
              <Sparkles className="h-3 w-3" />
              Welcome back
            </span>
            <div className="space-y-2.5">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-glacier-deep sm:text-[2.6rem] sm:leading-[1.05]">
                Sign in to your workspace
              </h1>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Continue building beautiful, production-ready apps with the tools your team already loves.
              </p>
            </div>
          </div>

          {/* SSO buttons */}
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

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          {/* Email form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-xs font-medium text-glacier-deep">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 border-border bg-white text-sm transition-all placeholder:text-muted-foreground/70 focus-visible:border-glacier-400 focus-visible:ring-glacier-300/40"
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

          {/* Footnotes */}
          <div className="space-y-3 text-center">
            <p className="text-xs text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="font-medium text-glacier-700 underline-offset-4 transition hover:text-glacier-deep hover:underline">
                Create your account
              </a>
            </p>
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3 w-3" />
              SSO available on{" "}
              <a href="#" className="font-medium text-glacier-700 underline-offset-4 hover:underline">
                Business and Enterprise
              </a>{" "}
              plans
            </div>
          </div>

          {/* Trust chips */}
          <div className="flex items-center justify-center gap-4 border-t border-border/70 pt-6">
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-glacier-500" />
              SOC 2 Type II
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Zap className="h-3.5 w-3.5 text-glacier-500" />
              99.99% uptime
            </div>
            <div className="h-3 w-px bg-border" />
            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <Lock className="h-3.5 w-3.5 text-glacier-500" />
              GDPR
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-between gap-2 text-[11px] text-muted-foreground sm:flex-row">
        <span>© {new Date().getFullYear()} Lovable, Inc.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-glacier-700">Privacy</a>
          <a href="#" className="hover:text-glacier-700">Terms</a>
          <a href="#" className="hover:text-glacier-700">Status</a>
        </div>
      </footer>
    </div>
  );
};

export default LoginPanel;
