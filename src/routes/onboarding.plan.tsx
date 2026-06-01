import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, FileText, ShieldCheck, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/onboarding/plan")({
  head: () => ({ meta: [{ title: "Escolha seu plano — Mencio" }] }),
  component: PlanStep,
});

type Cycle = "monthly" | "yearly";

const MONO = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' } as const;

type Plan = {
  id: string;
  name: string;
  monthly: number;
  yearly: number;
  description: string;
  cta: string;
  highlight: boolean;
  badge?: string;
  features: { label: string; muted?: boolean }[];
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
      { label: "50 perguntas únicas" },
      { label: "1 motor — ChatGPT" },
      { label: "1 marca · 1 usuário" },
      { label: "Relatórios semanais" },
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
      { label: "200 perguntas únicas" },
      { label: "3 motores — ChatGPT, Perplexity, Gemini" },
      { label: "Até 3 marcas · 3 usuários" },
      { label: "Alertas em tempo real" },
      { label: "Análise de concorrentes" },
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
      { label: "Perguntas ilimitadas" },
      { label: "Todos os motores" },
      { label: "Marcas ilimitadas" },
      { label: "API e webhooks" },
      { label: "Gerente dedicado" },
    ],
  },
];

function PlanStep() {
  const navigate = useNavigate();
  const [cycle, setCycle] = useState<Cycle>("monthly");

  return (
    <div className="min-h-screen w-full bg-secondary/30 text-foreground">
      {/* Top bar */}
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
          <div className="hidden items-center gap-1.5 text-xs text-muted-foreground md:flex">
            <span className="tabular-nums">Passo 7 de 7</span>
            <span className="ml-2 inline-flex gap-1">
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

      <main className="mx-auto w-full max-w-6xl px-6 py-10 md:px-10 md:py-14">
        {/* Header & toggle */}
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Escolha seu plano
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Comece agora e escale conforme sua marca cresce nas IAs.
            </p>
          </div>

          <div className="inline-flex items-center gap-1 rounded-lg border border-border bg-background p-1">
            <button
              onClick={() => setCycle("monthly")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                cycle === "monthly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setCycle("yearly")}
              className={`rounded-md px-4 py-1.5 text-sm font-medium transition ${
                cycle === "yearly"
                  ? "bg-foreground text-background shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Anual <span className="ml-1 opacity-70">−20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Pricing cards */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:col-span-3">
            {PLANS.map((p) => {
              const price = cycle === "monthly" ? p.monthly : p.yearly;
              return p.highlight ? (
                <HighlightedCard
                  key={p.id}
                  plan={p}
                  price={price}
                  onClick={() => navigate({ to: "/app" })}
                />
              ) : (
                <StandardCard
                  key={p.id}
                  plan={p}
                  price={price}
                  onClick={() => navigate({ to: "/app" })}
                />
              );
            })}
          </div>

          {/* Aside */}
          <aside className="space-y-10 border-t border-border pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <h3 className="mb-6 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                Incluso em todos
              </h3>
              <div className="space-y-7">
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
                  body="Atendimento humano 100% em português, em até 1 dia útil."
                />
              </div>
            </div>

            <div className="rounded-xl border border-border bg-background p-4">
              <p className="text-xs leading-relaxed text-foreground">
                Precisa de algo sob medida?
                <br />
                <a href="#" className="font-semibold underline underline-offset-2">
                  Fale com nossos especialistas.
                </a>
              </p>
            </div>
          </aside>
        </div>

        <button
          onClick={() => navigate({ to: "/app" })}
          className="mt-10 block w-full text-center text-xs text-muted-foreground hover:text-foreground"
        >
          Pular por agora · começar no Starter
        </button>
      </main>
    </div>
  );
}

function StandardCard({
  plan,
  price,
  onClick,
}: {
  plan: Plan;
  price: number;
  onClick: () => void;
}) {
  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-background p-8 transition-all hover:border-foreground/40">
      <span className="mb-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">
        {plan.name}
      </span>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight" style={MONO}>
          R${price}
        </span>
        <span className="text-sm text-muted-foreground">/mês</span>
      </div>
      <p className="mb-8 text-xs leading-relaxed text-muted-foreground">
        {plan.description}
      </p>
      <ul className="mb-10 flex-grow space-y-4">
        {plan.features.map((f) => (
          <li
            key={f.label}
            className="flex items-center gap-3 text-sm text-foreground/80"
          >
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-foreground/30" />
            {f.label}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="w-full rounded-xl border border-foreground py-3 text-sm font-semibold transition-colors group-hover:bg-foreground group-hover:text-background"
      >
        {plan.cta}
      </button>
    </div>
  );
}

function HighlightedCard({
  plan,
  price,
  onClick,
}: {
  plan: Plan;
  price: number;
  onClick: () => void;
}) {
  return (
    <div className="relative flex flex-col overflow-hidden rounded-2xl bg-foreground p-8 text-background shadow-[0_30px_60px_-30px_rgba(0,0,0,0.45)] ring-4 ring-foreground/10">
      {plan.badge && (
        <div className="absolute right-4 top-4">
          <span className="rounded bg-background px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-foreground">
            {plan.badge}
          </span>
        </div>
      )}
      <span className="mb-4 text-xs font-bold uppercase tracking-widest text-background/50">
        {plan.name}
      </span>
      <div className="mb-2 flex items-baseline gap-1">
        <span className="text-4xl font-bold tracking-tight" style={MONO}>
          R${price}
        </span>
        <span className="text-sm text-background/50">/mês</span>
      </div>
      <p className="mb-8 text-xs leading-relaxed text-background/70">
        {plan.description}
      </p>
      <ul className="mb-10 flex-grow space-y-4">
        {plan.features.map((f) => (
          <li key={f.label} className="flex items-center gap-3 text-sm">
            <Check className="h-4 w-4 flex-none" strokeWidth={2.5} />
            {f.label}
          </li>
        ))}
      </ul>
      <button
        onClick={onClick}
        className="w-full rounded-xl bg-background py-3 text-sm font-bold text-foreground transition-colors hover:bg-background/90"
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
    <div className="flex gap-4">
      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg border border-border bg-secondary text-foreground">
        {icon}
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}
