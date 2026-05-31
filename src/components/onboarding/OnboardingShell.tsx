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
      <div className="relative hidden overflow-hidden border-l border-border bg-secondary lg:block">
        {/* dot grid */}
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/40" />

        <div className="relative flex h-full flex-col justify-between p-10">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>ONBOARDING_FLOW</span>
            <span>STEP_{String(step).padStart(2, "0")}</span>
          </div>

          <div className="w-full max-w-md self-center">{aside}</div>

          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Mencio · visibilidade de marca em IA
          </div>
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
    <ChatMock
      question="Como sua marca aparece nas respostas das IAs?"
      answer={
        <>
          A maioria das marcas brasileiras já é citada por modelos como{" "}
          <Hi>ChatGPT</Hi> e <Hi>Perplexity</Hi>. O time da{" "}
          <Hi>{brand ?? "sua marca"}</Hi> entrou aqui pra entender exatamente em
          que respostas ela aparece — e em quais ainda não.
        </>
      }
      footer={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-foreground/25 to-foreground/5" />
            <div className="text-xs">
              <div className="font-semibold">{name}</div>
              <div className="text-muted-foreground">{role}</div>
            </div>
          </div>
          {brand && (
            <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              {brand}
            </div>
          )}
          <span className="sr-only">{quote}</span>
        </div>
      }
    />
  );
}

function Hi({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-accent px-1 font-semibold text-accent-foreground">
      {children}
    </span>
  );
}

export function ChatMock({
  question,
  answer,
  footer,
  source = "PERPLEXITY_AI",
}: {
  question: string;
  answer: React.ReactNode;
  footer?: React.ReactNode;
  source?: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-30px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="h-2.5 w-2.5 rounded-full bg-border" />
        <span className="ml-2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground">
          {source}
        </span>
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Pergunta
          </div>
          <div className="mt-1.5 text-[15px] font-medium leading-snug">
            {question}
          </div>
        </div>
        <div className="h-px bg-border" />
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Resposta da IA
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/85">
            {answer}
          </p>
        </div>
      </div>
      {footer && <div className="mt-6 border-t border-border pt-5">{footer}</div>}
    </div>
  );
}

