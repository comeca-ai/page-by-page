import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Plus, Play, Search, Filter, MoreHorizontal } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/prompts")({
  head: () => ({ meta: [{ title: "Perguntas — Mencio" }] }),
  component: Prompts,
});

type Prompt = {
  topic: string;
  q: string;
  appears: number;
  pos: string;
  sentiment: "Positivo" | "Neutro" | "Negativo" | "—";
  trend: number[];
};

const PROMPTS: Prompt[] = [
  {
    topic: "Automação de marketing",
    q: "Qual a melhor plataforma de automação de marketing pra PME no Brasil?",
    appears: 4,
    pos: "#9",
    sentiment: "Positivo",
    trend: [10, 14, 18, 22, 28, 36, 44],
  },
  {
    topic: "Automação de marketing",
    q: "Alternativa nacional ao HubSpot",
    appears: 3,
    pos: "#6",
    sentiment: "Positivo",
    trend: [22, 30, 34, 32, 38, 44, 52],
  },
  {
    topic: "CRM",
    q: "Melhor CRM brasileiro integrado com WhatsApp",
    appears: 2,
    pos: "#12",
    sentiment: "Neutro",
    trend: [12, 10, 14, 16, 14, 18, 22],
  },
  {
    topic: "LGPD",
    q: "Como garantir conformidade LGPD em ferramentas de marketing",
    appears: 0,
    pos: "—",
    sentiment: "—",
    trend: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    topic: "Atribuição",
    q: "Como medir ROI entre canais pagos e orgânicos",
    appears: 1,
    pos: "#18",
    sentiment: "Neutro",
    trend: [4, 6, 5, 8, 7, 9, 11],
  },
  {
    topic: "Atribuição",
    q: "Ferramentas de modelo de atribuição multi-touch no Brasil",
    appears: 2,
    pos: "#14",
    sentiment: "Positivo",
    trend: [8, 10, 12, 11, 13, 16, 19],
  },
];

const TOPICS = ["Todos", "Automação de marketing", "CRM", "LGPD", "Atribuição"];

function Prompts() {
  const [topic, setTopic] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = PROMPTS.filter(
    (p) =>
      (topic === "Todos" || p.topic === topic) &&
      (search === "" || p.q.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Perguntas que rodamos por você"
        subtitle={`${PROMPTS.length} perguntas ativas · próxima execução em 4h`}
        actions={
          <div className="flex gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
              <Play className="h-4 w-4" /> Rodar agora
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
              <Plus className="h-4 w-4" /> Nova pergunta
            </button>
          </div>
        }
      />

      {/* Filters bar */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px] max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            placeholder="Buscar pergunta…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {TOPICS.map((t) => (
            <button
              key={t}
              onClick={() => setTopic(t)}
              className={`h-9 rounded-lg px-3 text-sm transition ${
                topic === t
                  ? "bg-foreground text-background"
                  : "border border-border bg-background text-foreground/80 hover:border-foreground/40"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        <button className="ml-auto inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" /> Mais filtros
        </button>
      </div>

      {/* Stats row */}
      <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        <MiniStat label="Ativas" value={`${PROMPTS.length}`} />
        <MiniStat label="Com menção" value={`${PROMPTS.filter((p) => p.appears > 0).length}`} />
        <MiniStat label="Sem aparição" value={`${PROMPTS.filter((p) => p.appears === 0).length}`} />
        <MiniStat label="Sentimento positivo" value="62%" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Pergunta</th>
              <th className="px-5 py-3 text-left font-medium">Tópico</th>
              <th className="px-5 py-3 text-left font-medium">Aparições</th>
              <th className="px-5 py-3 text-left font-medium">Posição</th>
              <th className="px-5 py-3 text-left font-medium">Sentimento</th>
              <th className="px-5 py-3 text-left font-medium">7d</th>
              <th className="w-10 px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="border-t border-border hover:bg-secondary/30">
                <td className="max-w-md px-5 py-4 font-medium">
                  <Link
                    to="/app/prompts/$promptId"
                    params={{ promptId: String(i + 1) }}
                    className="hover:underline"
                  >
                    {p.q}
                  </Link>
                </td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs">
                    {p.topic}
                  </span>
                </td>
                <td className="px-5 py-4">
                  <span className="font-medium tabular-nums">{p.appears}</span>
                  <span className="text-muted-foreground">/5</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground tabular-nums">{p.pos}</td>
                <td className="px-5 py-4">
                  <SentimentPill sentiment={p.sentiment} />
                </td>
                <td className="px-5 py-4">
                  <Sparkline values={p.trend} />
                </td>
                <td className="px-5 py-4 text-right">
                  <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center text-sm text-muted-foreground">
                  Nenhuma pergunta com esse filtro.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-background px-4 py-3">
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-lg font-semibold tabular-nums">{value}</div>
    </div>
  );
}

function SentimentPill({ sentiment }: { sentiment: Prompt["sentiment"] }) {
  if (sentiment === "—")
    return <span className="text-xs text-muted-foreground/60">—</span>;
  const styles =
    sentiment === "Positivo"
      ? "bg-foreground text-background"
      : sentiment === "Negativo"
        ? "border border-foreground text-foreground"
        : "bg-secondary text-foreground";
  return (
    <span className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${styles}`}>
      {sentiment}
    </span>
  );
}

function Sparkline({ values }: { values: number[] }) {
  if (values.every((v) => v === 0)) {
    return <span className="text-xs text-muted-foreground/60">—</span>;
  }
  const max = Math.max(...values, 1);
  const w = 80;
  const h = 24;
  const step = w / (values.length - 1);
  const points = values.map((v, i) => `${i * step},${h - (v / max) * h}`).join(" ");
  return (
    <svg width={w} height={h} className="text-foreground">
      <polyline
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        points={points}
      />
    </svg>
  );
}
