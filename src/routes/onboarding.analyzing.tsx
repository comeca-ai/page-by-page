import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Globe } from "lucide-react";

export const Route = createFileRoute("/onboarding/analyzing")({
  head: () => ({ meta: [{ title: "Analisando — Mencio" }] }),
  component: AnalyzingStep,
});

const STEPS = [
  "Conectando aos modelos de IA",
  "Coletando menções no ChatGPT",
  "Cruzando com Gemini e Perplexity",
  "Calculando seu score de visibilidade",
];

function AnalyzingStep() {
  const navigate = useNavigate();
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setI((p) => {
        if (p >= STEPS.length - 1) {
          clearInterval(t);
          setTimeout(() => navigate({ to: "/onboarding/insights" }), 900);
          return p;
        }
        return p + 1;
      });
    }, 1100);
    return () => clearInterval(t);
  }, [navigate]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <div
        className="absolute inset-0 opacity-[0.25]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <div className="relative flex w-full max-w-md flex-col items-center px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 -m-4 animate-ping rounded-full bg-foreground/10" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-background shadow-sm">
            <Globe className="h-7 w-7 text-foreground" />
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-semibold tracking-tight">
          Analisando suamarca.com.br
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Em alguns segundos vamos te mostrar como sua marca aparece nas IAs.
        </p>

        <ul className="mt-10 w-full space-y-3 text-left">
          {STEPS.map((s, idx) => {
            const done = idx < i;
            const active = idx === i;
            return (
              <li
                key={s}
                className={`flex items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                  active
                    ? "border-foreground/40 bg-secondary/60"
                    : "border-border"
                }`}
              >
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${
                    done
                      ? "bg-foreground text-background"
                      : active
                      ? "border border-foreground"
                      : "border border-border text-muted-foreground"
                  }`}
                >
                  {done ? "✓" : idx + 1}
                </span>
                <span className={done ? "text-muted-foreground line-through" : ""}>
                  {s}
                </span>
                {active && (
                  <span className="ml-auto inline-block h-2 w-2 animate-pulse rounded-full bg-foreground" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
