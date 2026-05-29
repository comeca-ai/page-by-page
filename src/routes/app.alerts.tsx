import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Bell, TrendingUp, TrendingDown, Sparkles, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/app/alerts")({
  head: () => ({ meta: [{ title: "Alertas — Mencio" }] }),
  component: Alerts,
});

const ALERTS = [
  {
    type: "up",
    when: "há 1h",
    title: "Sua visibilidade subiu no ChatGPT",
    body: "Você passou a aparecer em mais 6 respostas sobre automação de marketing nas últimas 24h.",
    tag: "Visibilidade",
  },
  {
    type: "warn",
    when: "há 4h",
    title: "Menção negativa identificada",
    body: 'Perplexity citou sua marca em "ferramentas com onboarding confuso". Vale conferir.',
    tag: "Sentimento",
  },
  {
    type: "ai",
    when: "ontem",
    title: "Oportunidade: LGPD",
    body: "Encontramos 5 perguntas relevantes no seu setor em que você não aparece. Publicar conteúdo pode te colocar nas respostas.",
    tag: "Oportunidade",
  },
  {
    type: "down",
    when: "há 2 dias",
    title: "Queda de share no Gemini",
    body: "HubSpot ganhou 7 pontos de share na semana — vale revisar seus prompts de comparação.",
    tag: "Concorrência",
  },
];

const ICONS = {
  up: TrendingUp,
  down: TrendingDown,
  warn: AlertTriangle,
  ai: Sparkles,
};

function Alerts() {
  return (
    <>
      <PageHeader
        title="Alertas"
        subtitle="A gente te avisa quando algo importante muda nas IAs."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
            <Bell className="h-4 w-4" /> Preferências
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-3">
        {ALERTS.map((a, i) => {
          const Icon = ICONS[a.type as keyof typeof ICONS];
          return (
            <div
              key={i}
              className="flex gap-4 rounded-2xl border border-border bg-background p-5"
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
    </>
  );
}
