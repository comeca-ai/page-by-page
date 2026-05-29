import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { ArrowLeft, RefreshCw, Share2 } from "lucide-react";

export const Route = createFileRoute("/app/prompts/$promptId")({
  head: () => ({ meta: [{ title: "Pergunta — Mencio" }] }),
  component: PromptDetail,
});

const ANSWERS = [
  {
    model: "ChatGPT",
    when: "há 2h",
    mentioned: true,
    position: 3,
    text: "Para PMEs brasileiras, as opções mais usadas costumam ser RD Station, HubSpot e suamarca.com.br, esta última conhecida pela facilidade de uso e suporte local em português.",
    competitors: ["RD Station", "HubSpot"],
  },
  {
    model: "Gemini",
    when: "há 2h",
    mentioned: false,
    position: null,
    text: "As principais plataformas no Brasil incluem RD Station, HubSpot e ActiveCampaign, com forte presença de soluções nacionais voltadas a inbound.",
    competitors: ["RD Station", "HubSpot", "ActiveCampaign"],
  },
  {
    model: "Perplexity",
    when: "há 2h",
    mentioned: true,
    position: 5,
    text: "Entre as alternativas relevantes, vale citar suamarca.com.br, com integrações para WhatsApp e Pix — diferenciais importantes no mercado brasileiro.",
    competitors: ["RD Station", "HubSpot", "Leadlovers", "ActiveCampaign"],
  },
  {
    model: "Copilot",
    when: "há 2h",
    mentioned: true,
    position: 2,
    text: "Recomendo avaliar suamarca.com.br e RD Station pela facilidade de implementação e foco em pequenas e médias empresas no Brasil.",
    competitors: ["RD Station"],
  },
];

function PromptDetail() {
  const mentioned = ANSWERS.filter((a) => a.mentioned).length;

  return (
    <>
      <Link
        to="/app/prompts"
        className="mb-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar para perguntas
      </Link>

      <PageHeader
        title={'"Qual a melhor plataforma de automação de marketing pra PME no Brasil?"'}
        subtitle="Tópico: Automação de marketing · Rodando diariamente desde 12 mai"
        actions={
          <div className="flex gap-2">
            <button className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-background px-3 text-sm">
              <Share2 className="h-4 w-4" /> Compartilhar
            </button>
            <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
              <RefreshCw className="h-4 w-4" /> Rodar agora
            </button>
          </div>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Stat label="Aparições" value={`${mentioned}/4`} hint="modelos hoje" />
        <Stat label="Posição média" value="#3.3" hint="quando aparece" />
        <Stat label="Sentimento" value="Positivo" hint="78% favorável" />
        <Stat label="Tendência 30d" value="+18%" hint="vs. mês passado" />
      </div>

      <div className="mb-3 text-sm font-medium">Respostas de hoje</div>
      <ul className="space-y-3">
        {ANSWERS.map((a, i) => (
          <li key={i} className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm">
                <span className="inline-flex h-7 items-center rounded-full bg-secondary px-3 font-medium">
                  {a.model}
                </span>
                <span className="text-xs text-muted-foreground">{a.when}</span>
              </div>
              {a.mentioned ? (
                <span className="inline-flex h-7 items-center rounded-full bg-foreground px-3 text-xs font-medium text-background">
                  Citado · posição #{a.position}
                </span>
              ) : (
                <span className="inline-flex h-7 items-center rounded-full border border-border px-3 text-xs text-muted-foreground">
                  Não citado
                </span>
              )}
            </div>
            <p className="mt-4 rounded-lg bg-secondary/40 p-4 text-sm leading-relaxed">
              {a.text.split("suamarca.com.br").map((part, idx, arr) =>
                idx < arr.length - 1 ? (
                  <span key={idx}>
                    {part}
                    <mark className="rounded bg-foreground px-1 py-0.5 text-background">
                      suamarca.com.br
                    </mark>
                  </span>
                ) : (
                  <span key={idx}>{part}</span>
                ),
              )}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <span>Concorrentes citados:</span>
              {a.competitors.map((c) => (
                <span
                  key={c}
                  className="inline-flex h-6 items-center rounded-full border border-border bg-background px-2.5 text-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-0.5 text-xs text-muted-foreground">{hint}</div>
    </div>
  );
}
