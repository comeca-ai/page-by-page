import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  OnboardingShell,
  TestimonialCard,
  Hi,
} from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/onboarding/brand")({
  head: () => ({ meta: [{ title: "Sua marca — Mencio" }] }),
  component: BrandStep,
});

function BrandStep() {
  const navigate = useNavigate();
  const [site, setSite] = useState("");

  return (
    <OnboardingShell
      step={1}
      back={{ to: "/login", label: "Conta errada?" }}
      aside={
        <TestimonialCard
          quote={
            <>
              O <Hi>ChatGPT</Hi> já responde por 10% dos novos cadastros da
              Vercel — e esse número só cresce.
            </>
          }
          name="Guillermo Rauch"
          role="CEO, Vercel"
          brandLabel="▲ Vercel"
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (site) navigate({ to: "/onboarding/region" });
        }}
      >
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight">
          Comece a monitorar sua marca
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Essa vai ser a primeira marca que você acompanha no Mencio — depois
          dá pra adicionar quantas quiser.
        </p>

        <label className="mt-10 block text-sm font-medium">Site</label>
        <div className="mt-2 flex h-12 items-center rounded-lg border border-border bg-background pl-3 focus-within:border-foreground">
          <span className="select-none text-sm text-muted-foreground">
            https://
          </span>
          <input
            type="text"
            required
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="suamarca.com.br"
            className="h-full flex-1 bg-transparent px-1 text-sm outline-none"
          />
        </div>

        <label className="mt-6 block text-sm font-medium">
          Conta um pouco da marca{" "}
          <span className="font-normal text-muted-foreground">(opcional)</span>
        </label>
        <textarea
          rows={4}
          placeholder="Sobre sua marca..."
          className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-foreground"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          Quanto mais específico, melhor a gente acerta os resultados.
        </p>
        <ul className="mt-2 ml-4 list-disc space-y-1 text-xs text-muted-foreground">
          <li>Quais produtos ou serviços vocês oferecem?</li>
          <li>Atendem alguma região específica?</li>
        </ul>

        <button
          type="submit"
          disabled={!site}
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Continuar
        </button>
      </form>
    </OnboardingShell>
  );
}
