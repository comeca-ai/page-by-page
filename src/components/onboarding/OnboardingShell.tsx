import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface OnboardingShellProps {
  step: number; // 1-based
  totalSteps?: number;
  back?: { to: string; label?: string };
  children: ReactNode;
  aside: ReactNode;
  footerLeft?: ReactNode;
}

export function OnboardingShell({
  step,
  totalSteps = 7,
  back,
  children,
  aside,
  footerLeft,
}: OnboardingShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.05fr]">
      {/* Left */}
      <div className="flex flex-col px-6 py-8 md:px-16 md:py-10">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="relative flex h-7 w-7 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-foreground" />
            <span className="absolute inset-[3px] rounded-[3px] bg-background" />
            <span className="relative h-2 w-2 rounded-full bg-foreground" />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">Mencio</span>
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">
          {children}
        </div>

        <div className="mx-auto flex w-full max-w-md items-center justify-between text-xs text-muted-foreground">
          <div>
            {back ? (
              <Link to={back.to} className="hover:text-foreground">
                ← {back.label ?? "Voltar"}
              </Link>
            ) : (
              footerLeft ?? <Link to="/" className="hover:text-foreground">Fale com a gente</Link>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="mr-2 text-[11px] tabular-nums text-muted-foreground/80">
              {String(step).padStart(2, "0")} / {String(totalSteps).padStart(2, "0")}
            </span>
            {Array.from({ length: totalSteps }).map((_, i) => {
              const active = i + 1 === step;
              const done = i + 1 < step;
              return (
                <span
                  key={i}
                  className={
                    active
                      ? "h-1.5 w-6 rounded-full bg-foreground"
                      : done
                      ? "h-1.5 w-1.5 rounded-full bg-foreground/60"
                      : "h-1.5 w-1.5 rounded-full bg-border"
                  }
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden overflow-hidden bg-secondary/40 lg:block">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        {/* radial glow */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 80% at 50% 0%, color-mix(in oklab, var(--color-foreground) 8%, transparent) 0%, transparent 60%)",
          }}
        />
        {/* subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/30" />

        <div className="relative flex h-full items-center justify-center p-12">
          <div className="w-full max-w-md">{aside}</div>
        </div>

        {/* footer brand line */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
          Mencio · Visibilidade de marca em IA
        </div>
      </div>
    </div>
  );
}

export function Testimonial({
  quote,
  name,
  role,
  brand,
}: {
  quote: string;
  name: string;
  role: string;
  brand?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background/95 p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_20px_40px_-20px_rgba(0,0,0,0.15)] backdrop-blur">
      <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        Quem já usa
      </div>
      <p className="mt-3 text-sm leading-relaxed">{quote}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5" />
          <div className="text-xs">
            <div className="font-medium">{name}</div>
            <div className="text-muted-foreground">{role}</div>
          </div>
        </div>
        {brand && (
          <div className="text-xs font-semibold tracking-tight text-muted-foreground">
            {brand}
          </div>
        )}
      </div>
    </div>
  );
}
