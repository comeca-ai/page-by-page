import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";
import { Plus, ArrowUp, ArrowDown } from "lucide-react";

export const Route = createFileRoute("/app/competitors")({
  head: () => ({ meta: [{ title: "Concorrentes — Mencio" }] }),
  component: Competitors,
});

const ROWS = [
  { pos: 1, name: "RD Station", share: 78, change: 2, you: false },
  { pos: 2, name: "HubSpot Brasil", share: 71, change: 0, you: false },
  { pos: 3, name: "Resultados Digitais", share: 64, change: -1, you: false },
  { pos: 4, name: "Leadlovers", share: 52, change: 3, you: false },
  { pos: 5, name: "ActiveCampaign", share: 46, change: 1, you: false },
  { pos: 9, name: "Sua marca", share: 32, change: 4, you: true },
  { pos: 14, name: "Pipedrive", share: 21, change: -2, you: false },
];

function Competitors() {
  return (
    <>
      <PageHeader
        title="Como você se compara"
        subtitle="Categoria: Marketing & Vendas B2B · 14 marcas monitoradas"
        actions={
          <button className="inline-flex h-9 items-center gap-2 rounded-lg bg-foreground px-3 text-sm font-medium text-background">
            <Plus className="h-4 w-4" /> Adicionar concorrente
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-background p-6 lg:col-span-2">
          <div className="text-sm font-medium">Share of voice nas IAs</div>
          <div className="text-xs text-muted-foreground">
            Quem aparece mais nas respostas do seu setor
          </div>

          <ul className="mt-6 space-y-4">
            {ROWS.map((r) => (
              <li key={r.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="w-8 text-muted-foreground">#{r.pos}</span>
                    <span className={r.you ? "font-semibold" : "font-medium"}>
                      {r.name}
                      {r.you && (
                        <span className="ml-2 rounded-full bg-foreground px-2 py-0.5 text-[10px] uppercase tracking-wide text-background">
                          você
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="font-medium text-foreground">{r.share}%</span>
                    <span
                      className={`inline-flex items-center gap-0.5 ${
                        r.change > 0
                          ? "text-foreground"
                          : r.change < 0
                          ? "text-muted-foreground"
                          : "text-muted-foreground/60"
                      }`}
                    >
                      {r.change > 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : r.change < 0 ? (
                        <ArrowDown className="h-3 w-3" />
                      ) : null}
                      {r.change === 0 ? "—" : Math.abs(r.change)}
                    </span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full ${r.you ? "bg-foreground" : "bg-foreground/40"}`}
                    style={{ width: `${r.share}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">
              Gap pra próxima posição
            </div>
            <div className="mt-3 text-3xl font-semibold tracking-tight">14 pts</div>
            <p className="mt-2 text-sm text-muted-foreground">
              Faltam 14 pontos de share pra você ultrapassar a ActiveCampaign no
              #5.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6">
            <div className="text-sm font-medium">Onde você perde</div>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex justify-between">
                <span>LGPD e governança</span>
                <span className="text-muted-foreground">–32 pts</span>
              </li>
              <li className="flex justify-between">
                <span>Integrações nativas</span>
                <span className="text-muted-foreground">–18 pts</span>
              </li>
              <li className="flex justify-between">
                <span>Cases B2B grandes</span>
                <span className="text-muted-foreground">–11 pts</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
