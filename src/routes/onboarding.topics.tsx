import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/topics")({
  head: () => ({ meta: [{ title: "Tópicos — Mencio" }] }),
  component: TopicsStep,
});

const SUGGESTED = [
  "Sua marca vs. concorrentes",
  "Melhor ferramenta de automação de marketing",
  "Plataformas de CRM no Brasil",
  "Inbound marketing para PMEs",
  "Atribuição de ROI entre canais",
  "Dashboards e BI de marketing",
  "Conformidade LGPD em dados de marketing",
  "IA para geração de insights",
  "Consolidação de CRM, mídia paga e analytics",
];

function TopicsStep() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(SUGGESTED.slice(0, 5));

  const toggle = (t: string) =>
    setSelected((s) => (s.includes(t) ? s.filter((x) => x !== t) : s.length < 10 ? [...s, t] : s));

  const pct = (selected.length / 10) * 100;

  return (
    <OnboardingShell
      step={5}
      back={{ to: "/onboarding/insights" }}
      aside={
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="text-base font-semibold tracking-tight">
            Dicas pra escolher bem
          </div>
          <ul className="mt-5 space-y-4 text-sm">
            <Tip
              title="Cada tópico gera 5 perguntas"
              body="Começamos com 5 tópicos e 25 perguntas. Dá pra adicionar mais depois."
            />
            <Tip
              title="Use palavras do dia a dia"
              body="Pensa nos termos que seu cliente usaria pra pedir uma recomendação pra IA."
            />
            <Tip
              title="Evite frases longas"
              body="Tópicos curtos funcionam melhor. Deixe perguntas pra etapa seguinte."
            />
          </ul>
        </div>
      }
    >
      <h1 className="text-3xl font-semibold tracking-tight">
        Sobre o que você quer ser encontrado?
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Escolha até 10 tópicos. A gente cria as perguntas que vão rodar todo
        dia nas IAs.
      </p>

      <div className="mt-6 flex items-center justify-between text-xs">
        <span className="font-medium">{selected.length} de 10 selecionados</span>
        <span className="text-muted-foreground">Recomendado: 5+</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-foreground transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-6 space-y-2">
        {SUGGESTED.map((t) => {
          const on = selected.includes(t);
          return (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggle(t)}
                className={`flex w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left text-sm transition ${
                  on
                    ? "border-foreground bg-secondary/60"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <span
                  className={`flex h-4 w-4 items-center justify-center rounded ${
                    on ? "bg-foreground text-background" : "border border-border"
                  }`}
                >
                  {on && <Check className="h-3 w-3" />}
                </span>
                {t}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            className="flex w-full items-center gap-2 rounded-lg border border-dashed border-border px-3 py-2.5 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
          >
            <Plus className="h-4 w-4" /> Adicionar tópico personalizado
          </button>
        </li>
      </ul>

      <button
        onClick={() => navigate({ to: "/onboarding/prompts" })}
        disabled={selected.length === 0}
        className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continuar com {selected.length} tópicos
      </button>
    </OnboardingShell>
  );
}

function Tip({ title, body }: { title: string; body: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-foreground text-background">
        <Check className="h-3 w-3" />
      </span>
      <div>
        <div className="font-medium">{title}</div>
        <div className="text-muted-foreground">{body}</div>
      </div>
    </li>
  );
}
