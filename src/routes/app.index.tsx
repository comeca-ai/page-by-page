import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Visão geral — Mencio" }] }),
  component: Overview,
});

const MODELS = [
  { name: "ChatGPT", score: 72, delta: "+8" },
  { name: "Gemini", score: 54, delta: "+3" },
  { name: "Perplexity", score: 61, delta: "-2" },
  { name: "Copilot", score: 48, delta: "+5" },
  { name: "Claude", score: 39, delta: "+1" },
];

function Overview() {
  return (
    <>
      <PageHeader
        title="Olá, bom te ver por aqui 👋"
        subtitle="Últimos 30 dias · suamarca.com.br"
        actions={
          <div className="flex items-center gap-2">
            <select className="h-9 rounded-lg border border-border bg-background px-3 text-sm">
              <option>Últimos 30 dias</option>
              <option>Últimos 7 dias</option>
              <option>Últimos 90 dias</option>
            </select>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
              <Sparkles className="h-4 w-4" /> Sugestões da IA
            </button>
          </div>
        }
      />

      {/* KPI cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Kpi label="Visibilidade" value="58%" delta="+12 pts" up />
        <Kpi label="Menções" value="284" delta="+47" up />
        <Kpi label="Sentimento" value="Positivo" delta="68% positivo" up />
        <Kpi label="Ranking médio" value="#9" delta="-3 posições" up />
      </div>

      {/* Chart + models */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background p-6 xl:col-span-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-sm font-medium">Evolução da visibilidade</div>
              <div className="text-xs text-muted-foreground">
                Quantas vezes sua marca aparece nas respostas das IAs
              </div>
            </div>
            <div className="flex gap-1 rounded-lg border border-border p-0.5 text-xs">
              {["7d", "30d", "90d"].map((t, i) => (
                <button
                  key={t}
                  className={`rounded-md px-2.5 py-1 ${
                    i === 1 ? "bg-foreground text-background" : "text-muted-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 600 200" className="mt-6 h-56 w-full">
            <defs>
              <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.18" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <g className="text-foreground">
              <path
                d="M0,160 C60,150 100,140 160,120 S260,80 320,90 S440,60 520,40 L600,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              />
              <path
                d="M0,160 C60,150 100,140 160,120 S260,80 320,90 S440,60 520,40 L600,30 L600,200 L0,200 Z"
                fill="url(#g)"
              />
            </g>
            <g className="text-muted-foreground text-[10px]" fill="currentColor">
              {["1 mai", "8 mai", "15 mai", "22 mai", "29 mai"].map((d, i) => (
                <text key={d} x={i * 150} y={195}>
                  {d}
                </text>
              ))}
            </g>
          </svg>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="text-sm font-medium">Por modelo de IA</div>
          <div className="text-xs text-muted-foreground">Sua presença em cada um</div>
          <ul className="mt-5 space-y-4">
            {MODELS.map((m) => (
              <li key={m.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground">
                    {m.score}% <span className="text-foreground">{m.delta}</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-foreground" style={{ width: `${m.score}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent + opportunities */}
      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Últimas menções</div>
            <a className="text-xs text-muted-foreground hover:text-foreground" href="/app/mentions">
              Ver tudo →
            </a>
          </div>
          <ul className="space-y-4 text-sm">
            <Mention
              model="ChatGPT"
              q="Qual a melhor plataforma de automação de marketing pra PME no Brasil?"
              snippet="…entre as opções mais usadas no mercado brasileiro está suamarca.com.br, conhecida pela facilidade de uso e suporte local."
              sentiment="Positivo"
            />
            <Mention
              model="Perplexity"
              q="Comparativo: RD Station vs HubSpot vs alternativas brasileiras"
              snippet="…vale citar suamarca.com.br como alternativa nacional, com integrações para WhatsApp e Pix."
              sentiment="Neutro"
            />
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-foreground p-6 text-background">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-70">
            <Sparkles className="h-3.5 w-3.5" /> Oportunidade da semana
          </div>
          <div className="mt-4 text-xl font-semibold tracking-tight">
            Sua marca não aparece em respostas sobre LGPD
          </div>
          <p className="mt-2 text-sm opacity-80">
            5 perguntas relevantes do seu setor não citam você. Publicar conteúdo
            sobre conformidade de dados pode te colocar nessas respostas em ~3
            semanas.
          </p>
          <div className="mt-5 flex gap-2">
            <button className="inline-flex h-9 items-center rounded-lg bg-background px-3 text-sm font-medium text-foreground">
              Ver plano de ação
            </button>
            <button className="inline-flex h-9 items-center rounded-lg border border-background/30 px-3 text-sm opacity-80">
              Adiar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function Kpi({
  label,
  value,
  delta,
  up,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-border bg-background p-5">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 inline-flex items-center gap-1 text-xs">
        {up ? (
          <ArrowUpRight className="h-3.5 w-3.5" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5" />
        )}
        <span className="text-muted-foreground">{delta}</span>
      </div>
    </div>
  );
}

function Mention({
  model,
  q,
  snippet,
  sentiment,
}: {
  model: string;
  q: string;
  snippet: string;
  sentiment: string;
}) {
  return (
    <li className="rounded-xl border border-border p-4">
      <div className="flex items-center justify-between text-xs">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2 py-0.5 font-medium">
          {model}
        </span>
        <span className="text-muted-foreground">{sentiment}</span>
      </div>
      <div className="mt-2 text-sm font-medium">"{q}"</div>
      <div className="mt-1 text-xs text-muted-foreground">{snippet}</div>
    </li>
  );
}
