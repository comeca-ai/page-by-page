import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Plus, Play } from "lucide-react";

export const Route = createFileRoute("/app/prompts")({
  head: () => ({ meta: [{ title: "Perguntas — Mencio" }] }),
  component: Prompts,
});

const PROMPTS = [
  {
    topic: "Automação de marketing",
    q: "Qual a melhor plataforma de automação de marketing pra PME no Brasil?",
    appears: 4,
    pos: "#9",
    sentiment: "Positivo",
  },
  {
    topic: "Automação de marketing",
    q: "Alternativa nacional ao HubSpot",
    appears: 3,
    pos: "#6",
    sentiment: "Positivo",
  },
  {
    topic: "CRM",
    q: "Melhor CRM brasileiro integrado com WhatsApp",
    appears: 2,
    pos: "#12",
    sentiment: "Neutro",
  },
  {
    topic: "LGPD",
    q: "Como garantir conformidade LGPD em ferramentas de marketing",
    appears: 0,
    pos: "—",
    sentiment: "—",
  },
  {
    topic: "Atribuição",
    q: "Como medir ROI entre canais pagos e orgânicos",
    appears: 1,
    pos: "#18",
    sentiment: "Neutro",
  },
];

function Prompts() {
  return (
    <>
      <PageHeader
        title="Perguntas que rodamos por você"
        subtitle="25 perguntas ativas · próxima execução em 4h"
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

      <div className="overflow-hidden rounded-2xl border border-border bg-background">
        <table className="w-full text-sm">
          <thead className="bg-secondary/40 text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-5 py-3 text-left font-medium">Pergunta</th>
              <th className="px-5 py-3 text-left font-medium">Tópico</th>
              <th className="px-5 py-3 text-left font-medium">Aparições</th>
              <th className="px-5 py-3 text-left font-medium">Posição</th>
              <th className="px-5 py-3 text-left font-medium">Sentimento</th>
            </tr>
          </thead>
          <tbody>
            {PROMPTS.map((p, i) => (
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
                  <span className="font-medium">{p.appears}</span>
                  <span className="text-muted-foreground">/5</span>
                </td>
                <td className="px-5 py-4 text-muted-foreground">{p.pos}</td>
                <td className="px-5 py-4 text-muted-foreground">{p.sentiment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
