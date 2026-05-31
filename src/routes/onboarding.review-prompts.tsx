import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Pencil, Trash2, Plus, X, Check } from "lucide-react";
import { OnboardingShell, TipsCard } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/review-prompts")({
  head: () => ({ meta: [{ title: "Revisar perguntas — Mencio" }] }),
  component: ReviewPromptsStep,
});

type Prompt = { id: string; topic: string; text: string };

const INITIAL: Prompt[] = [
  // Análise de dados com IA
  { id: "1", topic: "Análise de dados com IA", text: "Quais as melhores plataformas de análise de dados com IA pra empresas brasileiras?" },
  { id: "2", topic: "Análise de dados com IA", text: "Como escolher uma ferramenta de data analytics com IA pra PME?" },
  { id: "3", topic: "Análise de dados com IA", text: "Alternativas brasileiras a Tableau e Power BI com IA generativa" },
  { id: "4", topic: "Análise de dados com IA", text: "Plataformas de BI com IA que integram com Pix e WhatsApp" },
  { id: "5", topic: "Análise de dados com IA", text: "Custo médio de uma plataforma de data analytics com IA no Brasil" },
  // Treino e deploy de ML
  { id: "6", topic: "Treino e deploy de modelos de ML", text: "Empresas brasileiras que ajudam com treino e deploy de modelos de ML" },
  { id: "7", topic: "Treino e deploy de modelos de ML", text: "Plataformas pra colocar modelos de ML em produção no Brasil" },
  { id: "8", topic: "Treino e deploy de modelos de ML", text: "Como montar pipeline de MLOps em uma empresa de médio porte" },
  { id: "9", topic: "Treino e deploy de modelos de ML", text: "Consultorias de MLOps no Brasil" },
  { id: "10", topic: "Treino e deploy de modelos de ML", text: "Quanto custa treinar um modelo de ML customizado no Brasil" },
  // Modelos de ML na nuvem
  { id: "11", topic: "Modelos de ML na nuvem", text: "Melhores provedores de modelos de ML na nuvem pra empresas brasileiras" },
  { id: "12", topic: "Modelos de ML na nuvem", text: "Comparativo de custos: rodar IA na AWS, GCP ou nuvem nacional" },
  { id: "13", topic: "Modelos de ML na nuvem", text: "Empresas brasileiras que oferecem modelos de IA com soberania de dados" },
  { id: "14", topic: "Modelos de ML na nuvem", text: "Cloud nacional pra rodar workloads de IA e atender LGPD" },
  { id: "15", topic: "Modelos de ML na nuvem", text: "Como escolher entre LLM open-source na nuvem vs API fechada" },
  // Consultoria de ML
  { id: "16", topic: "Consultoria de iniciativas de ML", text: "Consultorias de IA e ML mais reconhecidas no Brasil" },
  { id: "17", topic: "Consultoria de iniciativas de ML", text: "Como contratar uma consultoria de IA pra meu primeiro projeto" },
  { id: "18", topic: "Consultoria de iniciativas de ML", text: "Quanto custa uma consultoria de ML no Brasil" },
  { id: "19", topic: "Consultoria de iniciativas de ML", text: "Casos de sucesso de consultorias de IA no varejo brasileiro" },
  { id: "20", topic: "Consultoria de iniciativas de ML", text: "Diferenças entre consultoria de IA e fábrica de software com IA" },
  // IA pra financeiro
  { id: "21", topic: "Soluções de IA para instituições financeiras", text: "Soluções de IA pra bancos e fintechs brasileiras" },
  { id: "22", topic: "Soluções de IA para instituições financeiras", text: "Como bancos brasileiros estão usando IA pra antifraude" },
  { id: "23", topic: "Soluções de IA para instituições financeiras", text: "Empresas que fornecem IA pra crédito e score no Brasil" },
  { id: "24", topic: "Soluções de IA para instituições financeiras", text: "IA generativa em atendimento bancário no Brasil" },
  { id: "25", topic: "Soluções de IA para instituições financeiras", text: "Conformidade Bacen e LGPD pra IA em instituições financeiras" },
];

function ReviewPromptsStep() {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState<Prompt[]>(INITIAL);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [filter, setFilter] = useState<string | "Todos">("Todos");
  const [adding, setAdding] = useState<string | null>(null);
  const [newText, setNewText] = useState("");

  const topics = Array.from(new Set(prompts.map((p) => p.topic)));
  const visible =
    filter === "Todos" ? prompts : prompts.filter((p) => p.topic === filter);

  const remove = (id: string) => setPrompts(prompts.filter((p) => p.id !== id));
  const startEdit = (p: Prompt) => {
    setEditingId(p.id);
    setDraft(p.text);
  };
  const saveEdit = () => {
    if (editingId && draft.trim()) {
      setPrompts(prompts.map((p) => (p.id === editingId ? { ...p, text: draft.trim() } : p)));
    }
    setEditingId(null);
    setDraft("");
  };
  const addPrompt = (topic: string) => {
    if (newText.trim()) {
      setPrompts([
        ...prompts,
        { id: crypto.randomUUID(), topic, text: newText.trim() },
      ]);
    }
    setAdding(null);
    setNewText("");
  };

  return (
    <OnboardingShell
      step={4}
      brand={{ name: "Sua marca", url: "suamarca.com.br" }}
      back={{ to: "/onboarding/topics" }}
      aside={
        <TipsCard
          title="Como escolher boas perguntas"
          tips={[
            {
              title: "Pense como seu cliente",
              body: "São as perguntas que ele faria pra uma IA antes de decidir comprar.",
            },
            {
              title: "Inclua a intenção",
              body: "“Melhor X pra Y no Brasil” funciona melhor que só “melhor X”.",
            },
            {
              title: "Dá pra editar depois",
              body: "Você pode adicionar, remover ou ajustar perguntas a qualquer momento.",
            },
          ]}
        />
      }
    >
      <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
        Revise as perguntas que vamos rodar
      </h1>
      <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
        Geramos {prompts.length} perguntas a partir dos seus tópicos. A gente
        roda elas todo dia nas principais IAs e te mostra como sua marca
        aparece — ou não.
      </p>

      {/* topic filter */}
      <div className="mt-7 flex flex-wrap gap-1.5">
        <FilterChip active={filter === "Todos"} onClick={() => setFilter("Todos")}>
          Todos · {prompts.length}
        </FilterChip>
        {topics.map((t) => (
          <FilterChip
            key={t}
            active={filter === t}
            onClick={() => setFilter(t)}
          >
            {t} · {prompts.filter((p) => p.topic === t).length}
          </FilterChip>
        ))}
      </div>

      {/* prompts list */}
      <ul className="mt-5 space-y-2">
        {visible.map((p) => (
          <li
            key={p.id}
            className="group rounded-xl border border-border bg-background p-3.5 transition hover:border-foreground/40"
          >
            {editingId === p.id ? (
              <div className="flex items-start gap-2">
                <textarea
                  autoFocus
                  rows={2}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="flex-1 resize-none rounded-md border border-border bg-background p-2 text-sm outline-none focus:border-foreground"
                />
                <div className="flex flex-col gap-1">
                  <button
                    onClick={saveEdit}
                    className="rounded-md bg-foreground p-1.5 text-background"
                    aria-label="Salvar"
                  >
                    <Check className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setDraft("");
                    }}
                    className="rounded-md border border-border p-1.5 text-muted-foreground"
                    aria-label="Cancelar"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {p.topic}
                  </div>
                  <div className="mt-1 text-sm leading-snug">{p.text}</div>
                </div>
                <div className="flex flex-none items-center gap-1 opacity-0 transition group-hover:opacity-100">
                  <button
                    onClick={() => startEdit(p)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label="Editar"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => remove(p.id)}
                    className="rounded-md p-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    aria-label="Remover"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}

        {/* add new prompt */}
        <li>
          {adding ? (
            <div className="rounded-xl border border-foreground/40 bg-background p-3">
              <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                {adding}
              </div>
              <div className="mt-2 flex items-start gap-2">
                <input
                  autoFocus
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addPrompt(adding)}
                  placeholder="Sua nova pergunta…"
                  className="h-9 flex-1 rounded-md border border-border bg-background px-2 text-sm outline-none focus:border-foreground"
                />
                <button
                  onClick={() => addPrompt(adding)}
                  className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setAdding(null);
                    setNewText("");
                  }}
                  className="rounded-md border border-border px-2 py-1.5 text-xs text-muted-foreground"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() =>
                setAdding(filter === "Todos" ? topics[0] ?? "Geral" : filter)
              }
              className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            >
              <Plus className="h-4 w-4" /> Adicionar pergunta
              {filter !== "Todos" && (
                <span className="text-xs text-muted-foreground/70">
                  em “{filter}”
                </span>
              )}
            </button>
          )}
        </li>
      </ul>

      <button
        onClick={() => navigate({ to: "/onboarding/analyzing" })}
        disabled={prompts.length === 0}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Rodar essas {prompts.length} perguntas
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Sua primeira análise completa fica pronta em até 24h.
      </p>
    </OnboardingShell>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-2.5 py-1 text-[11px] transition ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background text-muted-foreground hover:border-foreground/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
