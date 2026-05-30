import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Check, Download, X } from "lucide-react";

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
  { id: "INV-2026-005", date: "01 mai 2026", value: "R$ 0,00", status: "Beta" },
  { id: "INV-2026-004", date: "01 abr 2026", value: "R$ 0,00", status: "Beta" },
  { id: "INV-2026-003", date: "01 mar 2026", value: "R$ 0,00", status: "Beta" },
];

function Billing() {
  return (
    <>
      <PageHeader
        title="Plano e cobrança"
        subtitle="Pagamento em reais, NF-e emitida automaticamente. Cancelamento na hora."
      />

      <div className="mb-8 rounded-2xl border border-border bg-background p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Plano atual
            </div>
            <div className="mt-1 text-2xl font-semibold tracking-tight">Starter · R$ 150/mês</div>
            <div className="mt-1 text-sm text-muted-foreground">
              34 de 50 perguntas usadas hoje · renova em 6h
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden h-2 w-48 overflow-hidden rounded-full bg-secondary md:block">
              <div className="h-full bg-foreground" style={{ width: "68%" }} />
            </div>
            <button className="h-9 rounded-lg bg-foreground px-4 text-sm font-medium text-background">
              Mudar plano
            </button>
          </div>
        </div>
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

      <div className="mt-10">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-base font-semibold">Faturas</div>
          <button className="text-xs text-muted-foreground hover:text-foreground">
            Baixar todas
          </button>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 text-left font-medium">Fatura</th>
                <th className="px-5 py-3 text-left font-medium">Data</th>
                <th className="px-5 py-3 text-left font-medium">Valor</th>
                <th className="px-5 py-3 text-left font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {INVOICES.map((inv) => (
                <tr key={inv.id} className="border-t border-border">
                  <td className="px-5 py-4 font-medium">{inv.id}</td>
                  <td className="px-5 py-4 text-muted-foreground">{inv.date}</td>
                  <td className="px-5 py-4">{inv.value}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                      <Download className="h-3.5 w-3.5" /> PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
