import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Check, X } from "lucide-react";

export const Route = createFileRoute("/app/billing")({
  head: () => ({ meta: [{ title: "Plano e cobrança — Mencio" }] }),
  component: Billing,
});

const PLANS = [
  {
    name: "Starter",
    price: "R$ 150",
    sub: "/mês",
    description: "Pra quem tá começando a monitorar a marca nas IAs.",
    features: ["1 marca", "50 perguntas/dia", "3 modelos de IA", "Relatórios semanais"],
    pros: ["Barato pra validar", "Setup em 5 minutos", "Cancela quando quiser"],
    cons: ["Sem alertas em tempo real", "Sem comparação com concorrentes", "Suporte só por e-mail"],
    current: true,
  },
  {
    name: "Crescimento",
    price: "R$ 390",
    sub: "/mês",
    description: "Pra marcas que querem dominar as respostas das IAs.",
    features: [
      "Até 3 marcas",
      "200 perguntas/dia",
      "Todos os modelos de IA",
      "Alertas em tempo real",
      "Análise de concorrentes",
    ],
    pros: ["Melhor custo-benefício", "Alertas instantâneos", "Suporte prioritário"],
    cons: ["Limite de 3 marcas", "Sem API pública", "Sem white-label"],
    highlight: true,
  },
  {
    name: "Agência",
    price: "R$ 990",
    sub: "/mês",
    description: "Pra agências e times que gerenciam várias marcas.",
    features: [
      "Marcas ilimitadas",
      "Perguntas ilimitadas",
      "API e webhooks",
      "Workspaces por cliente",
      "Gerente de conta dedicado",
    ],
    pros: ["Escala sem teto", "API e integrações", "White-label disponível"],
    cons: ["Preço mais alto", "Exige onboarding técnico", "Compromisso mínimo de 3 meses"],
  },
];


const INVOICES = [
  { date: "01 Mai 2026", amount: "R$ 150,00", status: "Pago", id: "INV-2026-005" },
  { date: "01 Abr 2026", amount: "R$ 150,00", status: "Pago", id: "INV-2026-004" },
  { date: "01 Mar 2026", amount: "R$ 150,00", status: "Pago", id: "INV-2026-003" },
];

function Billing() {
  return (
    <>
      <PageHeader
        title="Plano e cobrança"
        subtitle="Pagamento em reais, NF-e emitida automaticamente. Cancelamento na hora."
      />

      {/* Usage */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <UsageCard label="Perguntas hoje" used={32} total={50} hint="Reseta em 6h" />
        <UsageCard label="Marcas ativas" used={1} total={1} hint="Starter limita a 1 marca" />
        <UsageCard label="Modelos monitorados" used={3} total={3} hint="ChatGPT, Gemini, Perplexity" />
      </div>

      <div className="mb-4 text-center">
        <div className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Planos
        </div>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">Escolha o seu</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {PLANS.map((p) => (
          <div
            key={p.name}
            className={`rounded-2xl border p-6 ${
              p.highlight
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-background"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <div className="text-base font-semibold">{p.name}</div>
              {p.current && (
                <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-wide text-foreground">
                  Seu plano
                </span>
              )}
            </div>
            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight">{p.price}</span>
              <span className={`text-xs ${p.highlight ? "opacity-70" : "text-muted-foreground"}`}>
                {p.sub}
              </span>
            </div>
            <p className={`mt-3 text-sm ${p.highlight ? "opacity-80" : "text-muted-foreground"}`}>
              {p.description}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 flex-none" />
                  <span className={p.highlight ? "opacity-90" : ""}>{f}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 grid grid-cols-2 gap-3 border-t border-border/40 pt-4">
              <div>
                <div
                  className={`mb-2 text-[10px] font-medium uppercase tracking-wider ${
                    p.highlight ? "opacity-70" : "text-muted-foreground"
                  }`}
                >
                  Prós
                </div>
                <ul className="space-y-1.5 text-xs">
                  {p.pros.map((pro) => (
                    <li key={pro} className="flex items-start gap-1.5">
                      <Check className="mt-0.5 h-3 w-3 flex-none text-emerald-500" />
                      <span className={p.highlight ? "opacity-90" : ""}>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div
                  className={`mb-2 text-[10px] font-medium uppercase tracking-wider ${
                    p.highlight ? "opacity-70" : "text-muted-foreground"
                  }`}
                >
                  Contras
                </div>
                <ul className="space-y-1.5 text-xs">
                  {p.cons.map((con) => (
                    <li key={con} className="flex items-start gap-1.5">
                      <X className="mt-0.5 h-3 w-3 flex-none text-rose-500" />
                      <span className={p.highlight ? "opacity-80" : "text-muted-foreground"}>
                        {con}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className={`mt-6 h-10 w-full rounded-lg text-sm font-medium ${
                p.highlight
                  ? "bg-background text-foreground"
                  : p.current
                  ? "border border-border text-muted-foreground"
                  : "bg-foreground text-background"
              }`}
              disabled={p.current}
            >
              {p.current ? "Plano atual" : "Mudar pra esse plano"}
            </button>
          </div>
        ))}
      </div>

      {/* Invoices */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div>
            <div className="text-sm font-semibold">Faturas</div>
            <div className="text-xs text-muted-foreground">Histórico dos últimos pagamentos</div>
          </div>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            Ver todas →
          </button>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Data</th>
              <th className="px-5 py-3 text-left font-medium">ID</th>
              <th className="px-5 py-3 text-left font-medium">Valor</th>
              <th className="px-5 py-3 text-left font-medium">Status</th>
              <th className="w-20 px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id} className="border-t border-border">
                <td className="px-5 py-3">{inv.date}</td>
                <td className="px-5 py-3 font-['JetBrains_Mono'] text-xs text-muted-foreground">
                  {inv.id}
                </td>
                <td className="px-5 py-3 font-medium tabular-nums">{inv.amount}</td>
                <td className="px-5 py-3">
                  <span className="inline-flex h-6 items-center rounded-full bg-foreground px-2.5 text-xs font-medium text-background">
                    {inv.status}
                  </span>
                </td>
                <td className="px-5 py-3 text-right">
                  <button className="text-xs text-muted-foreground hover:text-foreground">
                    Baixar PDF
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function UsageCard({
  label,
  used,
  total,
  hint,
}: {
  label: string;
  used: number;
  total: number;
  hint: string;
}) {
  const pct = Math.min(100, Math.round((used / total) * 100));
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="flex items-baseline justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="text-xs tabular-nums text-muted-foreground">
          {used} / {total}
        </div>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div className="h-full bg-foreground" style={{ width: `${pct}%` }} />
      </div>
      <div className="mt-2 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}

