import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Preços — Mencio" },
      {
        name: "description",
        content:
          "Planos da Mencio: comece de graça no Beta, escale com o Crescimento ou vá com a Agência.",
      },
      { property: "og:title", content: "Preços — Mencio" },
      {
        property: "og:description",
        content:
          "Planos da Mencio: comece de graça no Beta, escale com o Crescimento ou vá com a Agência.",
      },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-foreground" />
            <span className="text-lg font-semibold tracking-tight">Mencio</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <Link to="/" className="hover:text-foreground">Produto</Link>
            <Link to="/" className="hover:text-foreground">Como funciona</Link>
            <Link to="/pricing" className="text-foreground font-medium">Preços</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Entrar
            </Link>
            <a
              href="mailto:oi@mencio.com.br"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Agendar demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Preços simples, sem surpresa
        </div>
        <h1 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Escolha o plano certo pra sua marca
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Comece de graça, escale quando tiver certeza. Todos os planos com
          suporte em português.
        </p>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-3">
          <PlanCard
            name="Beta"
            price="Grátis"
            priceDetail="Enquanto durar o programa"
            description="Perfeito pra experimentar e ver o que a IA fala da sua marca."
            features={[
              "1 marca",
              "10 prompts/mês",
              "Relatório básico de menções",
              "Acesso ao painel",
              "Suporte por email",
            ]}
            cta="Começar agora"
            ctaVariant="outline"
          />
          <PlanCard
            name="Crescimento"
            price="R$ 490"
            priceDetail="/mês"
            description="Para marcas que querem dominar as respostas das IAs de verdade."
            features={[
              "Até 3 marcas",
              "200 prompts/mês",
              "Relatórios completos com contexto",
              "Alertas de menções em tempo real",
              "Recomendações de ação",
              "Suporte prioritário",
            ]}
            cta="Assinar"
            ctaVariant="primary"
            highlighted
          />
          <PlanCard
            name="Agência"
            price="Sob consulta"
            priceDetail=""
            description="Para agências e grupos que gerenciam dezenas de marcas."
            features={[
              "Marcas ilimitadas",
              "Prompts ilimitados",
              "API e integrações customizadas",
              "White-label disponível",
              "Account manager dedicado",
              "SLA garantido",
            ]}
            cta="Falar com vendas"
            ctaVariant="outline"
          />
        </div>

        {/* FAQ teaser */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Tem dúvidas?{" "}
            <a href="mailto:oi@mencio.com.br" className="underline hover:text-foreground">
              Manda um email
            </a>{" "}
            que a gente responde em poucas horas.
          </p>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-foreground" />
            <span>Mencio</span>
          </div>
          <p>© {new Date().getFullYear()} Mencio. Feito no Brasil.</p>
        </div>
      </footer>
    </div>
  );
}

function PlanCard({
  name,
  price,
  priceDetail,
  description,
  features,
  cta,
  ctaVariant,
  highlighted = false,
}: {
  name: string;
  price: string;
  priceDetail: string;
  description: string;
  features: string[];
  cta: string;
  ctaVariant: "primary" | "outline";
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col rounded-xl border p-6 ${
        highlighted
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-background"
      }`}
    >
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-background px-3 py-0.5 text-xs font-medium text-foreground">
          Mais popular
        </span>
      )}
      <h3 className="text-sm font-medium uppercase tracking-wider opacity-70">
        {name}
      </h3>
      <div className="mt-3 flex items-baseline gap-1">
        <span className="text-3xl font-semibold tracking-tight">{price}</span>
        {priceDetail && (
          <span className={`text-sm ${highlighted ? "opacity-70" : "text-muted-foreground"}`}>
            {priceDetail}
          </span>
        )}
      </div>
      <p className={`mt-3 text-sm ${highlighted ? "opacity-80" : "text-muted-foreground"}`}>
        {description}
      </p>
      <ul className="mt-6 space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 opacity-70" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        {ctaVariant === "primary" ? (
          <Link
            to="/signup"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:opacity-90"
          >
            {cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            to="/signup"
            className={`inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium hover:opacity-90 ${
              highlighted
                ? "border-background/30 bg-transparent text-background"
                : "border-border hover:bg-secondary"
            }`}
          >
            {cta}
          </Link>
        )}
      </div>
    </div>
  );
}
