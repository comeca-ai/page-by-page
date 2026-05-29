import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { OnboardingShell, Testimonial } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/brand")({
  head: () => ({ meta: [{ title: "Sua marca — Mencio" }] }),
  component: BrandStep,
});

function BrandStep() {
  const navigate = useNavigate();
  const [site, setSite] = useState("");

  return (
    <OnboardingShell
      step={4}
      back={{ to: "/onboarding/company" }}
      aside={
        <Testimonial
          quote="“A gente já usava SEO tradicional, mas faltava entender as buscas conversacionais. A Mencio trouxe esse outro lado — agora rodamos testes mais certeiros pra IA.”"
          name="Ana Beatriz Souza"
          role="Estrategista de SEO, Magazine Luiza"
          brand="Magalu"
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (site) navigate({ to: "/onboarding/analyzing" });
        }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Vamos começar pela sua marca
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Essa vai ser a primeira marca que você acompanha aqui — depois dá pra
          adicionar quantas quiser.
        </p>

        <label className="mt-8 block text-sm font-medium">Site</label>
        <input
          type="url"
          required
          value={site}
          onChange={(e) => setSite(e.target.value)}
          placeholder="https://suamarca.com.br"
          className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
        />

        <label className="mt-5 block text-sm font-medium">
          Conta um pouco da marca{" "}
          <span className="font-normal text-muted-foreground">(opcional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="O que vocês fazem? Pra quem? Em que regiões?"
          className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-foreground"
        />
        <p className="mt-2 text-xs text-muted-foreground">
          Quanto mais específico, melhores as respostas que vamos gerar.
        </p>

        <button
          type="submit"
          disabled={!site}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuar
        </button>
      </form>
    </OnboardingShell>
  );
}
