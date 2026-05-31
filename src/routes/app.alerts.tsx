import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Bell, TrendingUp, TrendingDown, Sparkles, AlertTriangle, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({ meta: [{ title: "Alertas — Mencio" }] }),
  component: Alerts,
});

type AlertType = "up" | "down" | "warn" | "ai";

const ALERTS: Array<{
  type: AlertType;
  when: string;
  day: "Hoje" | "Ontem" | "Esta semana";
  title: string;
  body: string;
  tag: string;
  read: boolean;
}> = [
  {
    type: "up",
    when: "há 1h",
    day: "Hoje",
    title: "Sua visibilidade subiu no ChatGPT",
    body: "Você passou a aparecer em mais 6 respostas sobre automação de marketing nas últimas 24h.",
    tag: "Visibilidade",
    read: false,
  },
  {
    type: "warn",
    when: "há 4h",
    day: "Hoje",
    title: "Menção negativa identificada",
    body: 'Perplexity citou sua marca em "ferramentas com onboarding confuso". Vale conferir.',
    tag: "Sentimento",
    read: false,
  },
  {
    type: "ai",
    when: "ontem",
    day: "Ontem",
    title: "Oportunidade: LGPD",
    body: "Encontramos 5 perguntas relevantes no seu setor em que você não aparece. Publicar conteúdo pode te colocar nas respostas.",
    tag: "Oportunidade",
    read: false,
  },
  {
    type: "down",
    when: "há 2 dias",
    day: "Esta semana",
    title: "Queda de share no Gemini",
    body: "HubSpot ganhou 7 pontos de share na semana — vale revisar seus prompts de comparação.",
    tag: "Concorrência",
    read: true,
  },
];

const ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  warn: AlertTriangle,
  ai: Sparkles,
};

const TABS = ["Todos", "Não lidos", "Oportunidades"] as const;
type Tab = (typeof TABS)[number];

function Alerts() {
  const [tab, setTab] = useState<Tab>("Todos");

  const filtered = ALERTS.filter((a) => {
    if (tab === "Não lidos") return !a.read;
    if (tab === "Oportunidades") return a.type === "ai";
    return true;
  });

  const counts: Record<Tab, number> = {
    Todos: ALERTS.length,
    "Não lidos": ALERTS.filter((a) => !a.read).length,
    Oportunidades: ALERTS.filter((a) => a.type === "ai").length,
  };

  // Group by day
  const grouped = filtered.reduce<Record<string, typeof filtered>>((acc, a) => {
    (acc[a.day] ??= []).push(a);
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Alertas"
        subtitle="A gente te avisa quando algo importante muda nas IAs."
        actions={
          <div className="flex gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
              <Check className="h-4 w-4" /> Marcar todos como lidos
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
              <Bell className="h-4 w-4" /> Preferências
            </button>
          </div>
        }
      />

      {/* Tabs */}
      <div className="mb-4 inline-flex gap-1 rounded-lg border border-border bg-background p-1 text-sm">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 transition ${
              tab === t
                ? "bg-foreground text-background"
                : "text-foreground/70 hover:text-foreground"
            }`}
          >
            {t}
            <span
              className={`rounded-full px-1.5 text-[10px] tabular-nums ${
                tab === t ? "bg-background/20" : "bg-secondary"
              }`}
            >
              {counts[t]}
            </span>
          </button>
        ))}
      </div>

      {Object.entries(grouped).map(([day, items]) => (
        <section key={day} className="mb-6">
          <div className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {day}
          </div>
          <div className="grid grid-cols-1 gap-3">
            {items.map((a, i) => {
              const Icon = ICONS[a.type];
              return (
                <div
                  key={i}
                  className={`flex gap-4 rounded-2xl border p-5 ${
                    a.read
                      ? "border-border bg-background"
                      : "border-foreground/15 bg-background shadow-[0_1px_0_oklch(0.92_0_0)]"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 flex-none items-center justify-center rounded-xl ${
                      a.type === "warn" || a.type === "down"
                        ? "bg-secondary"
                        : "bg-foreground text-background"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="rounded-full bg-secondary px-2 py-0.5 text-foreground">
                        {a.tag}
                      </span>
                      <span>{a.when}</span>
                      {!a.read && (
                        <span className="ml-1 inline-flex items-center gap-1 text-foreground">
                          <span className="h-1.5 w-1.5 rounded-full bg-foreground" /> Novo
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 text-sm font-medium">{a.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{a.body}</div>
                  </div>
                  <div className="flex items-start">
                    <button className="text-xs text-muted-foreground hover:text-foreground">
                      Marcar como lido
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
          Nenhum alerta por aqui. Boa hora pra revisar seus prompts.
        </div>
      )}
    </>
  );
}
