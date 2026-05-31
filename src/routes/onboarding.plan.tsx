import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check } from "lucide-react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/plan")({
  head: () => ({ meta: [{ title: "Escolha seu plano — Mencio" }] }),
  component: PlanStep,
});

type Cycle = "monthly" | "yearly";

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    monthly: 150,
    yearly: 125, // 2 meses grátis
    description: "Pra quem tá começando a monitorar a marca nas IAs.",
    cta: "Assinar plano",
    highlight: false,
    features: [
      "50 perguntas únicas",
      "1 motor de resposta — ChatGPT",
      "1 marca",
      "Relatórios semanais",
      "1 usuário",
    ],
  },
  {
    id: "growth",
    name: "Crescimento",
    monthly: 390,
    yearly: 325,
    description: "Pra marcas que querem dominar as respostas das IAs.",
    cta: "Testar 7 dias grátis",
    highlight: true,
    badge: "Popular",
    features: [
      "200 perguntas únicas",
      "3 motores — ChatGPT, Perplexity e Google AI Overviews",
      "Até 3 marcas",
      "Alertas em tempo real",
      "Análise de concorrentes",
      "3 usuários",
    ],
  },
  {
    id: "agency",
    name: "Agência",
    monthly: 990,
    yearly: 825,
    description: "Pra agências e times que gerenciam várias marcas.",
    cta: "Falar com vendas",
    highlight: false,
    features: [
      "Perguntas ilimitadas",
      "Todos os motores de resposta",
      "Marcas ilimitadas",
      "API e webhooks",
      "Workspaces por cliente",
      "Gerente de conta dedicado",
    ],
  },
];

function PlanStep() {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <OnboardingShell
      step={7}
      back={{ to: "/onboarding/prompts" }}
      aside={
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="text-base font-semibold tracking-tight">
            O que vem incluso
          </div>
          <ul className="mt-5 space-y-4 text-sm">
            <Tip
              title="Pagamento em reais, NF-e na hora"
              body="Sem dor de cabeça com cartão internacional ou IOF."
            />
            <Tip
              title="Cancelamento quando quiser"
              body="Sem multa, sem fidelidade. Cancela em um clique."
            />
            <Tip
              title="Suporte humano em português"
              body="Time brasileiro respondendo em até 1 dia útil."
            />
          </ul>
        </div>
      }
    >
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          Escolha seu plano
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Comece grátis por 7 dias no Crescimento. Cancela quando quiser.
        </p>
      </div>

      <div className="mx-auto mt-6 inline-flex rounded-full border border-border bg-secondary/40 p-1 self-center">
        <button
          onClick={() => setCycle("monthly")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            cycle === "monthly" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
        >
          Mensal
        </button>
        <button
          onClick={() => setCycle("yearly")}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            cycle === "yearly" ? "bg-background shadow-sm" : "text-muted-foreground"
          }`}
        >
          Anual · 2 meses grátis
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {PLANS.map((p) => {
          const price = cycle === "monthly" ? p.monthly : p.yearly;
          return (
            <div
              key={p.id}
              className={`relative rounded-2xl border p-5 transition ${
                p.highlight
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background"
              }`}
            >
              {p.badge && (
                <span className="absolute -top-2.5 left-5 rounded-full bg-background px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground ring-1 ring-foreground">
                  {p.badge}
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <div className="text-base font-semibold">{p.name}</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-semibold tracking-tight">
                    R$ {price}
                  </span>
                  <span
                    className={`text-xs ${
                      p.highlight ? "opacity-70" : "text-muted-foreground"
                    }`}
                  >
                    /mês
                  </span>
                </div>
              </div>
              <p
                className={`mt-2 text-xs ${
                  p.highlight ? "opacity-80" : "text-muted-foreground"
                }`}
              >
                {p.description}
              </p>
              <ul className="mt-4 grid grid-cols-1 gap-1.5 text-xs sm:grid-cols-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-1.5">
                    <Check className="mt-0.5 h-3 w-3 flex-none" />
                    <span className={p.highlight ? "opacity-90" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => navigate({ to: "/app" })}
                className={`mt-5 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium ${
                  p.highlight
                    ? "bg-background text-foreground hover:opacity-90"
                    : "border border-border hover:bg-secondary"
                }`}
              >
                {p.cta}
              </button>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate({ to: "/app" })}
        className="mt-5 block w-full text-center text-xs text-muted-foreground hover:text-foreground"
      >
        Pular por agora · começar no Starter
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
