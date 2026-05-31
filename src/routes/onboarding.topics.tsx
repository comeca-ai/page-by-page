import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { OnboardingShell, TipsCard } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/topics")({
  head: () => ({ meta: [{ title: "Tópicos — Mencio" }] }),
  component: TopicsStep,
});

const SUGGESTED = [
  "Análise de dados com IA",
  "Treino e deploy de modelos de ML",
  "Modelos de machine learning na nuvem",
  "Consultoria de iniciativas de ML",
  "Soluções de IA para instituições financeiras",
  "IA aplicada a marketing analytics",
  "Otimização de cadeia de suprimentos com IA",
  "People analytics com IA",
  "IA aplicada à saúde",
];

function TopicsStep() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string[]>(SUGGESTED.slice(0, 6));
  const [custom, setCustom] = useState("");
  const [addingCustom, setAddingCustom] = useState(false);

  const toggle = (t: string) =>
    setSelected((s) =>
      s.includes(t) ? s.filter((x) => x !== t) : s.length < 10 ? [...s, t] : s,
    );

  const addCustom = () => {
    const v = custom.trim();
    if (v && !selected.includes(v) && selected.length < 10) {
      setSelected([...selected, v]);
    }
    setCustom("");
    setAddingCustom(false);
  };

  const pct = (selected.length / 10) * 100;

  return (
    <OnboardingShell
      step={3}
      brand={{ name: "Sua marca", url: "suamarca.com.br" }}
      back={{ to: "/onboarding/region" }}
      aside={
        <TipsCard
          title="Dicas pra escolher tópicos"
          tips={[
            {
              title: "Cada tópico vira 5 perguntas pra monitorar",
              body: "Começamos com 5 tópicos e 25 perguntas — dá pra adicionar mais depois.",
            },
            {
              title: "Use palavras de busca tradicional",
              body: "Termos comuns que representam sua marca ou que você já trabalha em SEO.",
            },
            {
              title: "Evite frases longas",
              body: "Aqui são tópicos, não perguntas. Mantenha curto.",
            },
          ]}
        />
      }
    >
      <h1 className="text-[32px] font-semibold leading-tight tracking-tight">
        Sobre o que você quer gerar perguntas?
      </h1>

      <div className="mt-10 text-sm font-medium">
        Selecione até 10 tópicos
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-foreground transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="mt-6 space-y-2">
        {SUGGESTED.map((t) => {
          const on = selected.includes(t);
          return (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggle(t)}
                className={`flex w-full items-center gap-3 rounded-xl border bg-background px-4 py-3 text-left text-[14px] transition ${
                  on
                    ? "border-foreground"
                    : "border-border hover:border-foreground/40"
                }`}
              >
                <span
                  className={`flex h-4 w-4 flex-none items-center justify-center rounded ${
                    on ? "bg-foreground text-background" : "border border-border"
                  }`}
                >
                  {on && <Check className="h-3 w-3" strokeWidth={3} />}
                </span>
                {t}
              </button>
            </li>
          );
        })}

        {selected
          .filter((s) => !SUGGESTED.includes(s))
          .map((t) => (
            <li key={t}>
              <button
                type="button"
                onClick={() => toggle(t)}
                className="flex w-full items-center gap-3 rounded-xl border border-foreground bg-background px-4 py-3 text-left text-[14px]"
              >
                <span className="flex h-4 w-4 flex-none items-center justify-center rounded bg-foreground text-background">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </button>
            </li>
          ))}

        <li>
          {addingCustom ? (
            <div className="flex items-center gap-2 rounded-xl border border-foreground/40 bg-background px-3 py-2">
              <input
                autoFocus
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustom()}
                placeholder="Seu tópico personalizado"
                className="h-8 flex-1 bg-transparent text-sm outline-none"
              />
              <button
                type="button"
                onClick={addCustom}
                className="rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background"
              >
                Adicionar
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setAddingCustom(true)}
              className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border px-4 py-3 text-sm text-muted-foreground hover:border-foreground/40 hover:text-foreground"
            >
              <Plus className="h-4 w-4" /> Adicionar personalizado
            </button>
          )}
        </li>
      </ul>

      <button
        onClick={() => navigate({ to: "/onboarding/review-prompts" })}
        disabled={selected.length === 0}
        className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Continuar com {selected.length} tópicos
      </button>
    </OnboardingShell>
  );
}
