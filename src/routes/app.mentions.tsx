import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/app/mentions")({
  head: () => ({ meta: [{ title: "Menções — Mencio" }] }),
  component: Mentions,
});

const ITEMS = [
  {
    when: "há 2h",
    model: "ChatGPT",
    sentiment: "Positivo",
    q: "Qual a melhor plataforma de automação de marketing pra PME no Brasil?",
    snippet:
      "Entre as opções mais usadas no mercado brasileiro está suamarca.com.br, conhecida pela facilidade de uso e suporte local em português.",
    sources: ["g1.globo.com", "exame.com"],
  },
  {
    when: "há 6h",
    model: "Perplexity",
    sentiment: "Neutro",
    q: "Comparativo: RD Station vs HubSpot vs alternativas brasileiras",
    snippet:
      "Vale citar suamarca.com.br como alternativa nacional com integrações para WhatsApp e Pix, embora com menor base de plugins.",
    sources: ["startse.com", "olhardigital.com.br"],
  },
  {
    when: "ontem",
    model: "Gemini",
    sentiment: "Positivo",
    q: "Ferramentas de marketing que entendem LGPD",
    snippet:
      "Soluções como suamarca.com.br oferecem hospedagem nacional, o que ajuda na adequação à LGPD para empresas brasileiras.",
    sources: ["serpro.gov.br"],
  },
];

const colors: Record<string, string> = {
  Positivo: "bg-foreground text-background",
  Neutro: "bg-secondary text-foreground",
  Negativo: "border border-foreground text-foreground",
};

function Mentions() {
  return (
    <>
      <PageHeader
        title="Onde sua marca aparece"
        subtitle="Cada vez que uma IA cita você em uma resposta, registramos aqui."
        actions={
          <div className="flex gap-2">
            {["Todos", "Positivo", "Neutro", "Negativo"].map((f, i) => (
              <button
                key={f}
                className={`h-9 rounded-lg border px-3 text-sm ${
                  i === 0
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        }
      />

      <ul className="space-y-3">
        {ITEMS.map((m, i) => (
          <li key={i} className="rounded-2xl border border-border bg-background p-5">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="inline-flex h-6 items-center rounded-full bg-secondary px-2.5 font-medium text-foreground">
                  {m.model}
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
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
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
      </ul>
    </>
  );
}
