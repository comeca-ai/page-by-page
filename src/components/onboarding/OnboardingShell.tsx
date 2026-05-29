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
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left */}
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-foreground" />
          <span className="text-lg font-semibold tracking-tight">Mencio</span>
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
      <div className="relative hidden overflow-hidden bg-secondary/50 lg:block">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex h-full items-center justify-center p-12">
          <div className="w-full max-w-md">{aside}</div>
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
    <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
      <p className="text-sm leading-relaxed">{quote}</p>
      <div className="mt-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-foreground/10" />
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
