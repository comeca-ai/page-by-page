import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/insights")({
  head: () => ({ meta: [{ title: "Sua visibilidade — Mencio" }] }),
  component: InsightsStep,
});

const RANK = [
  { pos: 1, name: "Resultados Digitais" },
  { pos: 2, name: "RD Station" },
  { pos: 3, name: "HubSpot Brasil" },
  { pos: 4, name: "Leadlovers" },
];

function InsightsStep() {
  const navigate = useNavigate();

  return (
    <OnboardingShell
      step={5}
      back={{ to: "/onboarding/brand" }}
      aside={
        <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
          <div className="text-xs uppercase tracking-widest text-muted-foreground">
            Marketing & Vendas B2B
          </div>
          <ul className="mt-4 space-y-3 text-sm">
            {RANK.map((r) => (
              <li key={r.pos} className="flex items-center gap-3">
                <span className="w-8 text-muted-foreground">#{r.pos}</span>
                <span>{r.name}</span>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-lg bg-secondary/60 px-3 py-3 -mx-3">
              <span className="w-8 font-medium">#14</span>
              <div className="h-6 w-6 rounded bg-foreground" />
              <span className="font-medium">Sua marca</span>
            </li>
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            Posição estimada nas respostas das principais IAs nos últimos 30
            dias.
          </p>
        </div>
      }
    >
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-xs font-semibold text-background">
          IA
        </div>
        <div className="text-sm">
          <div className="font-medium">suamarca.com.br</div>
          <div className="text-muted-foreground">Análise inicial</div>
        </div>
      </div>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight">
        Sua marca aparece menos que o esperado
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Tudo certo — esse é o ponto de partida. A gente já mapeou{" "}
        <span className="font-medium text-foreground">5 oportunidades</span>{" "}
        pra você ganhar espaço nas respostas das IAs.
      </p>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <Card label="Visibilidade" value="32%" delta="vs. 58% do líder" />
        <Card label="Menções/sem" value="14" delta="média do setor: 47" />
        <Card label="Sentimento" value="Neutro" delta="61% das menções" />
      </div>

      <button
        onClick={() => navigate({ to: "/onboarding/topics" })}
        className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background hover:opacity-90"
      >
        Ver as oportunidades
      </button>
    </OnboardingShell>
  );
}

function Card({ label, value, delta }: { label: string; value: string; delta: string }) {
  return (
    <div className="rounded-xl border border-border bg-background p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-xs text-muted-foreground">{delta}</div>
    </div>
  );
}
