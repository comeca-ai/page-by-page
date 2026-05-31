import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Globe } from "lucide-react";

interface OnboardingShellProps {
  step: number; // 1-based
  totalSteps?: number;
  back?: { to: string; label?: string };
  brand?: { name: string; url: string } | null;
  children: ReactNode;
  aside: ReactNode;
}

export function OnboardingShell({
  step,
  totalSteps = 6,
  back,
  brand,
  children,
  aside,
}: OnboardingShellProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left */}
      <div className="relative flex flex-col px-6 py-8 md:px-16 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          {brand ? (
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-foreground">
                <Globe className="h-3.5 w-3.5" />
              </span>
              <span className="text-[15px] font-semibold tracking-tight">
                {brand.name}
              </span>
              <span className="text-muted-foreground/40">|</span>
              <span className="text-sm text-muted-foreground">{brand.url}</span>
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2">
              <span className="relative flex h-6 w-6 items-center justify-center">
                <span className="absolute inset-0 rounded-md bg-foreground" />
                <span className="absolute inset-[3px] rounded-[3px] bg-background" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-foreground" />
              </span>
              <span className="text-[17px] font-semibold tracking-tight">
                Mencio
              </span>
            </Link>
          )}
          {back && (
            <Link
              to={back.to}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              ← {back.label ?? "Voltar"}
            </Link>
          )}
        </div>

        {/* Body */}
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-14">
          {children}
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between text-[12px] text-muted-foreground">
          <Link to="/" className="hover:text-foreground">
            Fale com a gente
          </Link>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, i) => {
              const active = i + 1 === step;
              const done = i + 1 < step;
              return (
                <span
                  key={i}
                  className={
                    active
                      ? "h-1 w-5 rounded-full bg-foreground"
                      : done
                      ? "h-1 w-1 rounded-full bg-foreground/50"
                      : "h-1 w-1 rounded-full bg-border"
                  }
                />
              );
            })}
            <span className="ml-3 tabular-nums text-muted-foreground/70">
              {step}/{totalSteps}
            </span>
          </div>
        </div>
      </div>

      {/* Right */}
      <div className="relative hidden overflow-hidden border-l border-border bg-secondary/40 lg:block">
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
            backgroundSize: "22px 22px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 80%)",
          }}
        />
        <div className="relative flex h-full items-center justify-center p-10">
          <div className="w-full max-w-md">{aside}</div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ Aside primitives ------------------------------ */

export function Hi({ children }: { children: ReactNode }) {
  return (
    <span className="bg-accent px-1 font-semibold text-accent-foreground">
      {children}
    </span>
  );
}

export function TestimonialCard({
  quote,
  name,
  role,
  brandLabel,
}: {
  quote: ReactNode;
  name: string;
  role: string;
  brandLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-8 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-40px_rgba(0,0,0,0.2)]">
      <p className="text-[22px] font-medium leading-snug tracking-tight text-foreground">
        “{quote}”
      </p>
      <div className="mt-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-foreground/30 to-foreground/5" />
          <div className="text-xs leading-tight">
            <div className="font-semibold text-foreground">{name}</div>
            <div className="text-muted-foreground">{role}</div>
          </div>
        </div>
        {brandLabel && (
          <span className="text-sm font-semibold tracking-tight text-foreground">
            {brandLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function TipsCard({
  title,
  tips,
}: {
  title: string;
  tips: { title: string; body: string }[];
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-7 shadow-[0_1px_0_rgba(0,0,0,0.02),0_30px_60px_-40px_rgba(0,0,0,0.2)]">
      <div className="text-center text-[15px] font-semibold tracking-tight">
        {title}
      </div>
      <ul className="mt-6 space-y-5">
        {tips.map((t) => (
          <li key={t.title} className="flex gap-3">
            <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-foreground/5 text-foreground">
              <svg viewBox="0 0 12 12" className="h-3 w-3">
                <path
                  d="M2.5 6.2l2.2 2.2L9.5 3.6"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <div className="text-sm leading-relaxed">
              <div className="font-semibold">{t.title}</div>
              <div className="text-muted-foreground">{t.body}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* Backwards-compat exports (old screens still import these) */
export function Testimonial(props: {
  quote: string;
  name: string;
  role: string;
  brand?: string;
}) {
  return (
    <TestimonialCard
      quote={props.quote.replace(/^[“"]|[”"]$/g, "")}
      name={props.name}
      role={props.role}
      brandLabel={props.brand}
    />
  );
}

export function ChatMock({
  question,
  answer,
}: {
  question: string;
  answer: ReactNode;
  footer?: ReactNode;
  source?: string;
}) {
  return (
    <div className="rounded-2xl border border-border/70 bg-background p-6">
      <div className="text-xs font-medium text-muted-foreground">
        Pergunta
      </div>
      <div className="mt-1 text-[15px] font-medium">{question}</div>
      <div className="mt-4 border-t border-border pt-4 text-sm text-foreground/85">
        {answer}
      </div>
    </div>
  );
}
