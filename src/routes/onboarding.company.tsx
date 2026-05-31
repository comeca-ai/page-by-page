import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, Testimonial } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/company")({
  head: () => ({ meta: [{ title: "Sua empresa — Mencio" }] }),
  component: CompanyStep,
});

const SIZES = ["1–10", "11–100", "101–500", "501–1.000", "1.000+"];

function CompanyStep() {
  const navigate = useNavigate();
  const [size, setSize] = useState<string | null>(null);
  const [agency, setAgency] = useState(false);

  return (
    <OnboardingShell
      step={1}
      back={{ to: "/verify-email" }}
      aside={
        <Testimonial
          quote="“A Mencio nos deu insights práticos sobre como a marca aparece nas IAs. Dá pra ver a visibilidade subindo e entender quais citações afetam o score.”"
          name="Camila Reis"
          role="Diretora de Marketing, Osklen"
          brand="Osklen"
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (size) navigate({ to: "/onboarding/brand" });
        }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Conta um pouco da sua empresa
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Isso ajuda a gente a personalizar sua experiência.
        </p>

        <label className="mt-8 block text-sm font-medium">
          Qual o tamanho da equipe?
        </label>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {SIZES.map((s) => (
            <button
              type="button"
              key={s}
              onClick={() => setSize(s)}
              className={`h-12 rounded-lg border text-sm transition ${
                size === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-background hover:border-foreground/50"
              }`}
            >
              {s} pessoas
            </button>
          ))}
        </div>

        <label className="mt-8 block text-sm font-medium">
          Você é uma agência?
        </label>
        <label className="mt-3 flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-3 text-sm">
          <input
            type="checkbox"
            checked={agency}
            onChange={(e) => setAgency(e.target.checked)}
            className="h-4 w-4 rounded border-border"
          />
          Sim, atendemos outras marcas
        </label>

        <button
          type="submit"
          disabled={!size}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuar
        </button>
      </form>
    </OnboardingShell>
  );
}
