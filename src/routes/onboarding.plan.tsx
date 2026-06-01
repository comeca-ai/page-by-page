import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, FileText, ShieldCheck, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/onboarding/plan")({
  head: () => ({ meta: [{ title: "Escolha seu plano — Mencio" }] }),
  component: PlanStep,
});

type Cycle = "monthly" | "yearly";

type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  cta: string;
  highlight: boolean;
  badge?: string;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 150,
    yearly: 125,
    description: "Pra quem tá começando a monitorar a marca nas IAs.",
    cta: "Assinar Starter",
    highlight: false,
    features: [
      "50 perguntas únicas",
      "1 motor — ChatGPT",
      "1 marca · 1 usuário",
      "Relatórios semanais",
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
      "3 motores — ChatGPT, Perplexity, Gemini",
      "Até 3 marcas · 3 usuários",
      "Alertas em tempo real",
      "Análise de concorrentes",
    ],
  },
  {
    id: "agency",
    name: "Agência",
    monthly: 990,
    yearly: 825,
    description: "Pra agências e times com várias marcas.",
    cta: "Falar com vendas",
    highlight: false,
    features: [
      "Perguntas ilimitadas",
      "Todos os motores",
      "Marcas ilimitadas",
      "API e webhooks",
      "Gerente dedicado",
    ],
  },
];

function PlanStep() {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <div className="min-h-screen w-full bg-background text-foreground">
      {/* Top bar — mesma linguagem do AppShell */}
      <header className="flex items-center justify-between border-b border-border bg-background px-6 py-4 md:px-10">
        <Link to="/" className="flex items-center gap-2">
          <span className="relative flex h-6 w-6 items-center justify-center">
            <span className="absolute inset-0 rounded-md bg-foreground" />
            <span className="absolute inset-[3px] rounded-[3px] bg-background" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-foreground" />
          </span>
          <span className="text-[17px] font-semibold tracking-tight">Mencio</span>
        </Link>
        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-2 text-xs text-muted-foreground md:flex">
            <span className="tabular-nums">Passo 7 de 7</span>
            <span className="ml-1 inline-flex gap-1">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="h-1 w-1 rounded-full bg-foreground/40" />
              ))}
              <span className="h-1 w-5 rounded-full bg-foreground" />
            </span>
          </div>
          <Link
            to="/onboarding/prompts"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            ← Voltar
          </Link>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-12">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Escolha seu plano
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece agora e escale conforme sua marca cresce nas IAs.
            </p>
          </div>

          <div className="inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5 text-xs">
            <button
              onClick={() => setCycle("monthly")}
              className={`rounded-md px-3 py-1.5 transition ${
                cycle === "monthly"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={`rounded-md px-3 py-1.5 transition ${
                cycle === "yearly"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual <span className="ml-1 opacity-70">−20%</span>
            </button>
          </div>
        </div>

        {/* KPIs / planos */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {PLANS.map((p) => (
            <PlanCard
              key={p.id}
              plan={p}
              price={cycle === "monthly" ? p.monthly : p.yearly}
              onClick={() => navigate({ to: "/app" })}
            />
          ))}
        </div>

        {/* Garantias */}
        <div className="mt-4 rounded-2xl border border-border bg-background p-6">
          <div className="mb-1 text-sm font-medium">Incluso em todos os planos</div>
          <div className="text-xs text-muted-foreground">
            Sem letras miúdas. Tudo pronto pra começar.
          </div>
          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
            <Guarantee
              icon={<FileText className="h-4 w-4" />}
              title="NF-e automática"
              body="Nota fiscal emitida em todo pagamento, direto no seu e-mail."
            />
            <Guarantee
              icon={<ShieldCheck className="h-4 w-4" />}
              title="Sem fidelidade"
              body="Cancele a assinatura quando quiser, sem multa nem burocracia."
            />
            <Guarantee
              icon={<MessageSquare className="h-4 w-4" />}
              title="Suporte no Brasil"
              body="Atendimento humano em português, em até 1 dia útil."
            />
          </div>
        </div>

        <button
          onClick={() => navigate({ to: "/app" })}
          className="mt-6 block w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          Pular por agora · começar no Starter
        </button>
      </main>
    </div>
  );
}

function PlanCard({
  plan,
  price,
  onClick,
}: {
  plan: Plan;
  price: number;
  onClick: () => void;
}) {
  const highlight = plan.highlight;
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-6 ${
        highlight
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background"
      }`}
    >
      {plan.badge && (
        <span
          className={`absolute right-4 top-4 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
            highlight ? "bg-background text-foreground" : "bg-secondary text-foreground"
          }`}
        >
          {plan.badge}
        </span>
      )}

      <div
        className={`text-xs uppercase tracking-wider ${
          highlight ? "text-background/70" : "text-muted-foreground"
        }`}
      >
        {plan.name}
      </div>

      <div className="mt-2 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight">R${price}</span>
        <span
          className={`text-sm ${
            highlight ? "text-background/60" : "text-muted-foreground"
          }`}
        >
          /mês
        </span>
      </div>

      <p
        className={`mt-2 text-xs ${
          highlight ? "text-background/70" : "text-muted-foreground"
        }`}
      >
        {plan.description}
      </p>

      <ul className="mt-6 flex-grow space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <Check
              className={`mt-0.5 h-4 w-4 flex-none ${
                highlight ? "text-background" : "text-foreground"
              }`}
            />
            <span className={highlight ? "text-background/90" : "text-foreground/85"}>
              {f}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={onClick}
        className={`mt-8 inline-flex h-10 w-full items-center justify-center rounded-lg text-sm font-medium transition ${
          highlight
            ? "bg-background text-foreground hover:bg-background/90"
            : "border border-border text-foreground hover:border-foreground"
        }`}
      >
        {plan.cta}
      </button>
    </div>
  );
}

function Guarantee({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
