import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { ExternalLink, Search, Download } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/app/mentions")({
  head: () => ({ meta: [{ title: "Menções — Mencio" }] }),
  component: Mentions,
});

type Sentiment = "Positivo" | "Neutro" | "Negativo";

const ITEMS: Array<{
  when: string;
  model: string;
  sentiment: Sentiment;
  q: string;
  snippet: string;
  sources: string[];
  topic: string;
}> = [
  {
    when: "há 2h",
    model: "ChatGPT",
    sentiment: "Positivo",
    q: "Qual a melhor plataforma de automação de marketing pra PME no Brasil?",
    snippet:
      "Entre as opções mais usadas no mercado brasileiro está suamarca.com.br, conhecida pela facilidade de uso e suporte local em português.",
    sources: ["g1.globo.com", "exame.com"],
    topic: "Automação de marketing",
  },
  {
    when: "há 6h",
    model: "Perplexity",
    sentiment: "Neutro",
    q: "Comparativo: RD Station vs HubSpot vs alternativas brasileiras",
    snippet:
      "Vale citar suamarca.com.br como alternativa nacional com integrações para WhatsApp e Pix, embora com menor base de plugins.",
    sources: ["startse.com", "olhardigital.com.br"],
    topic: "Comparativos",
  },
  {
    when: "ontem",
    model: "Gemini",
    sentiment: "Positivo",
    q: "Ferramentas de marketing que entendem LGPD",
    snippet:
      "Soluções como suamarca.com.br oferecem hospedagem nacional, o que ajuda na adequação à LGPD para empresas brasileiras.",
    sources: ["serpro.gov.br"],
    topic: "LGPD",
  },
  {
    when: "há 2 dias",
    model: "ChatGPT",
    sentiment: "Negativo",
    q: "Ferramentas com onboarding confuso",
    snippet:
      "Alguns usuários relatam que suamarca.com.br tem uma curva de aprendizado inicial maior que a média.",
    sources: ["reclameaqui.com.br"],
    topic: "Experiência",
  },
];

const COUNTS: Record<Sentiment | "Todos", number> = {
  Todos: ITEMS.length,
  Positivo: ITEMS.filter((i) => i.sentiment === "Positivo").length,
  Neutro: ITEMS.filter((i) => i.sentiment === "Neutro").length,
  Negativo: ITEMS.filter((i) => i.sentiment === "Negativo").length,
};

const colors: Record<Sentiment, string> = {
  Positivo: "bg-foreground text-background",
  Neutro: "bg-secondary text-foreground",
  Negativo: "border border-foreground text-foreground",
};

const MODELS = ["ChatGPT", "Gemini", "Perplexity", "Copilot", "Claude"];

function Mentions() {
  const [filter, setFilter] = useState<Sentiment | "Todos">("Todos");
  const [search, setSearch] = useState("");
  const [models, setModels] = useState<string[]>([]);

  const filtered = ITEMS.filter((m) => {
    if (filter !== "Todos" && m.sentiment !== filter) return false;
    if (models.length > 0 && !models.includes(m.model)) return false;
    if (search && !`${m.q} ${m.snippet}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <PageHeader
        title="Onde sua marca aparece"
        subtitle="Cada vez que uma IA cita você em uma resposta, registramos aqui."
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
            <Download className="h-4 w-4" /> Exportar CSV
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar filters */}
        <aside className="space-y-5 lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Sentimento
            </div>
            <ul className="space-y-1">
              {(["Todos", "Positivo", "Neutro", "Negativo"] as const).map((f) => (
                <li key={f}>
                  <button
                    onClick={() => setFilter(f)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                      filter === f
                        ? "bg-foreground text-background"
                        : "text-foreground/80 hover:bg-secondary"
                    }`}
                  >
                    <span>{f}</span>
                    <span
                      className={`text-xs tabular-nums ${
                        filter === f ? "opacity-80" : "text-muted-foreground"
                      }`}
                    >
                      {COUNTS[f]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-4">
            <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Modelo
            </div>
            <ul className="space-y-2 text-sm">
              {MODELS.map((m) => (
                <li key={m}>
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={models.includes(m)}
                      onChange={(e) =>
                        setModels((prev) =>
                          e.target.checked ? [...prev, m] : prev.filter((x) => x !== m),
                        )
                      }
                      className="h-4 w-4 rounded border-border accent-foreground"
                    />
                    <span>{m}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* List */}
        <div>
          <div className="relative mb-4">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Buscar dentro das menções…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-3 text-sm outline-none focus:border-foreground"
            />
          </div>

          <ul className="space-y-3">
            {filtered.map((m, i) => (
              <li key={i} className="rounded-2xl border border-border bg-background p-5">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-6 items-center rounded-full bg-secondary px-2.5 font-medium text-foreground">
                      {m.model}
                    </span>
                    <span className="inline-flex h-6 items-center rounded-full border border-border px-2.5 font-medium text-foreground">
                      {m.topic}
                    </span>
                    <span>{m.when}</span>
                  </div>
                  <span
                    className={`inline-flex h-6 items-center rounded-full px-2.5 text-xs font-medium ${colors[m.sentiment]}`}
                  >
                    {m.sentiment}
                  </span>
                </div>
                <div className="mt-3 text-sm font-medium">"{m.q}"</div>
                <p className="mt-2 rounded-lg bg-secondary/40 p-3 text-sm leading-relaxed">
                  {m.snippet}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  <span>Fontes citadas:</span>
                  {m.sources.map((s) => (
                    <a
                      key={s}
                      className="inline-flex items-center gap-1 hover:text-foreground"
                      href="#"
                    >
                      {s} <ExternalLink className="h-3 w-3" />
                    </a>
                  ))}
                </div>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                Nenhuma menção com esses filtros.
              </li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
