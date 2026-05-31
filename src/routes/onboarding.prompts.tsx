import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/prompts")({
  head: () => ({ meta: [{ title: "Pronto — Mencio" }] }),
  component: PromptsStep,
});

function PromptsStep() {
  const navigate = useNavigate();

  return (
    <OnboardingShell
      step={6}
      back={{ to: "/onboarding/topics" }}
      aside={
        <div className="space-y-4">
          {/* chat bubble (question) */}
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm animate-fade-in">
            <div className="flex items-start gap-2">
              <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-foreground/10 text-[10px]">
                💬
              </div>
              <p className="text-sm leading-relaxed">
                Qual a melhor plataforma de automação de marketing pra uma
                empresa brasileira de médio porte?
              </p>
            </div>
          </div>

          {/* IA logos row */}
          <div className="rounded-2xl border border-border bg-background p-4 shadow-sm">
            <div className="flex items-center gap-2">
              {["GPT", "G", "✦", "C", "P"].map((m, i) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-secondary/60 text-[11px] font-semibold"
                >
                  {m}
                </div>
              ))}
              <div className="flex h-8 items-center rounded-full border border-dashed border-border px-3 text-[11px] text-muted-foreground">
                + mais
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
              <div className="h-5 w-5 rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
              <span className="text-xs">Rodando as perguntas…</span>
            </div>
          </div>

          {/* visibility */}
          <div className="rounded-2xl border border-border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Visibilidade da marca</span>
              <span className="font-medium text-emerald-600">+ 5%</span>
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">65%</div>
            <svg viewBox="0 0 200 60" className="mt-3 h-16 w-full">
              <path
                d="M0,45 L40,42 L80,35 L120,28 L160,22 L200,18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-foreground"
              />
              <path
                d="M0,45 L40,42 L80,35 L120,28 L160,22 L200,18 L200,60 L0,60 Z"
                className="fill-foreground/10"
              />
            </svg>
            <div className="mt-1 text-xs text-muted-foreground">
              Projeção dos próximos 30 dias
            </div>
          </div>
        </div>
      }
    >
      <h1 className="text-3xl font-semibold tracking-tight">
        A gente roda suas perguntas todos os dias
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Procuramos sua marca nas respostas, citações e menções pra você
        entender como está aparecendo no ChatGPT, Gemini, Perplexity, Copilot
        e mais.
      </p>

      <ul className="mt-8 space-y-3 text-sm">
        <Step n="1" title="Rodamos suas 25 perguntas diariamente" />
        <Step n="2" title="Analisamos sentimento, citações e concorrentes" />
        <Step n="3" title="Você acompanha tudo no painel — e age" />
      </ul>

      <button
        onClick={() => navigate({ to: "/onboarding/plan" })}
        className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background hover:opacity-90"
      >
        Ir pro meu painel
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sua primeira análise completa fica pronta em até 24h.
      </p>
    </OnboardingShell>
  );
}

function Step({ n, title }: { n: string; title: string }) {
  return (
    <li className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
      <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-foreground text-xs font-medium text-background">
        {n}
      </span>
      <span className="pt-1">{title}</span>
    </li>
  );
}
