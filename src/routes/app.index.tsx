import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Minus,
} from "lucide-react";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Visão geral — Mencio" }] }),
  component: Overview,
});

const MODELS = [
  { name: "ChatGPT", score: 72, delta: 8 },
  { name: "Gemini", score: 54, delta: 3 },
  { name: "Perplexity", score: 61, delta: -2 },
  { name: "Copilot", score: 48, delta: 5 },
  { name: "Claude", score: 39, delta: 1 },
];

const TOP_TOPICS = [
  { topic: "Automação de marketing", share: 64, trend: "up" as const },
  { topic: "CRM e WhatsApp", share: 48, trend: "up" as const },
  { topic: "Atribuição de canais", share: 31, trend: "flat" as const },
  { topic: "LGPD e governança", share: 12, trend: "down" as const },
  { topic: "Cases B2B grandes", share: 8, trend: "down" as const },
];

const TOP_SOURCES = [
  { name: "exame.com", cites: 42 },
  { name: "g1.globo.com", cites: 31 },
  { name: "startse.com", cites: 24 },
  { name: "olhardigital.com.br", cites: 18 },
  { name: "serpro.gov.br", cites: 11 },
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
        <Kpi label="Visibilidade" value="58%" delta="+12 pts vs. mês anterior" up />
        <Kpi label="Menções" value="284" delta="+47 vs. mês anterior" up />
        <Kpi label="Sentimento" value="Positivo" delta="68% positivo · 9% negativo" up />
        <Kpi label="Ranking médio" value="#9" delta="subiu 3 posições" up />
      </div>

      {/* Chart + models */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
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
            <g className="text-muted-foreground/30">
              {[40, 80, 120, 160].map((y) => (
                <line key={y} x1="0" x2="600" y1={y} y2={y} stroke="currentColor" strokeDasharray="2 4" />
              ))}
            </g>
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
          <div className="flex items-baseline justify-between">
            <div>
              <div className="text-sm font-medium">Por modelo de IA</div>
              <div className="text-xs text-muted-foreground">Sua presença em cada um</div>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
              vs. 30d
            </span>
          </div>
          <ul className="mt-5 space-y-4">
            {MODELS.map((m) => (
              <li key={m.name}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                    <span className="tabular-nums">{m.score}%</span>
                    <Delta value={m.delta} />
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

      {/* Recent + opportunity */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="text-sm font-medium">Últimas menções</div>
            <Link to="/app/mentions" className="text-xs text-muted-foreground hover:text-foreground">
              Ver tudo →
            </Link>
          </div>
          <ul className="space-y-3 text-sm">
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

        <div className="rounded-2xl border border-foreground bg-foreground p-6 text-background">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-70">
            <Sparkles className="h-3.5 w-3.5" /> Oportunidade da semana
          </div>
          <div className="mt-4 text-xl font-semibold tracking-tight">
            Sua marca não aparece em respostas sobre LGPD
          </div>
          <p className="mt-2 text-sm opacity-80">
            5 perguntas relevantes do seu setor não citam você. Publicar conteúdo sobre conformidade
            de dados pode te colocar nessas respostas em ~3 semanas.
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

      {/* Top topics + sources */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="mb-1 text-sm font-medium">Top tópicos</div>
          <div className="text-xs text-muted-foreground">
            Em quais assuntos sua marca está ganhando ou perdendo espaço
          </div>
          <ul className="mt-5 space-y-3.5 text-sm">
            {TOP_TOPICS.map((t) => (
              <li key={t.topic} className="flex items-center gap-3">
                <span className="flex-1 truncate font-medium">{t.topic}</span>
                <div className="h-1.5 w-32 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full bg-foreground" style={{ width: `${t.share}%` }} />
                </div>
                <span className="w-10 text-right text-xs tabular-nums text-muted-foreground">
                  {t.share}%
                </span>
                <TopicTrend trend={t.trend} />
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-border bg-background p-6">
          <div className="mb-1 text-sm font-medium">Fontes mais citadas pelas IAs</div>
          <div className="text-xs text-muted-foreground">
            Sites que as IAs usam pra falar do seu setor. Aparecer aqui ajuda.
          </div>
          <ul className="mt-5 divide-y divide-border text-sm">
            {TOP_SOURCES.map((s, i) => (
              <li key={s.name} className="flex items-center gap-3 py-2.5">
                <span className="w-6 text-xs text-muted-foreground tabular-nums">
                  #{i + 1}
                </span>
                <span className="flex-1 font-medium">{s.name}</span>
                <span className="text-xs text-muted-foreground tabular-nums">
                  {s.cites} citações
                </span>
              </li>
            ))}
          </ul>
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
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-2 inline-flex items-center gap-1 text-xs">
        {up ? (
          <ArrowUpRight className="h-3.5 w-3.5 text-foreground" />
        ) : (
          <ArrowDownRight className="h-3.5 w-3.5 text-foreground" />
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

function Delta({ value }: { value: number }) {
  if (value === 0) return <span className="font-['JetBrains_Mono'] text-[10px]">—</span>;
  const positive = value > 0;
  return (
    <span
      className={`inline-flex items-center gap-0.5 font-['JetBrains_Mono'] text-[10px] font-semibold ${
        positive ? "text-foreground" : "text-muted-foreground"
      }`}
    >
      {positive ? "+" : ""}
      {value}
    </span>
  );
}

function TopicTrend({ trend }: { trend: "up" | "down" | "flat" }) {
  if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-foreground" />;
  if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />;
  return <Minus className="h-3.5 w-3.5 text-muted-foreground/60" />;
}
