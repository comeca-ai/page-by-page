import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/region")({
  head: () => ({ meta: [{ title: "Região e idioma — Mencio" }] }),
  component: RegionStep,
});

const REGIONS = [
  { code: "BR", label: "Brasil", flag: "🇧🇷" },
  { code: "PT", label: "Portugal", flag: "🇵🇹" },
  { code: "US", label: "Estados Unidos", flag: "🇺🇸" },
  { code: "MX", label: "México", flag: "🇲🇽" },
  { code: "AR", label: "Argentina", flag: "🇦🇷" },
  { code: "ES", label: "Espanha", flag: "🇪🇸" },
];
const LANGS = [
  { code: "pt-BR", label: "Português (BR)" },
  { code: "pt-PT", label: "Português (PT)" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

function RegionStep() {
  const navigate = useNavigate();
  const [region, setRegion] = useState("BR");
  const [lang, setLang] = useState("pt-BR");

  return (
    <OnboardingShell
      step={2}
      brand={{ name: "Sua marca", url: "suamarca.com.br" }}
      back={{ to: "/onboarding/brand" }}
      aside={
        <div className="relative aspect-square w-full">
          <svg viewBox="0 0 400 400" className="h-full w-full text-foreground/30">
            <defs>
              <pattern id="dots" width="10" height="10" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.2" fill="currentColor" />
              </pattern>
              <mask id="globe">
                <circle cx="200" cy="200" r="170" fill="white" />
              </mask>
            </defs>
            <circle cx="200" cy="200" r="170" fill="url(#dots)" mask="url(#globe)" />
            <circle cx="200" cy="200" r="170" fill="none" stroke="currentColor" strokeOpacity="0.2" />
          </svg>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg">
            {REGIONS.find((r) => r.code === region)?.flag}{" "}
            {REGIONS.find((r) => r.code === region)?.label}
          </div>
        </div>
      }
    >
      <h1 className="text-3xl font-semibold tracking-tight">
        Em qual região você quer rodar as perguntas?
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Escolha a região do seu público pra gente trazer resultados mais
        relevantes pra sua marca.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/onboarding/topics" });
        }}
        className="mt-8 space-y-5"
      >
        <div>
          <label className="block text-sm font-medium">Região</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {REGIONS.map((r) => (
              <option key={r.code} value={r.code}>
                {r.flag} {r.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Idioma</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm"
          >
            {LANGS.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background hover:opacity-90"
        >
          Continuar
        </button>
      </form>
    </OnboardingShell>
  );
}
