import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

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
        content: "Planos da Mencio: comece de graça e escale quando precisar.",
      },
    ],
  }),
  component: Pricing,
});

function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-foreground" />
            <span className="text-lg font-extrabold tracking-tight">Mencio</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="/#produto" className="hover:text-foreground">Produto</a>
            <a href="/#como-funciona" className="hover:text-foreground">Como funciona</a>
            <Link to="/pricing" className="text-foreground">Preços</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Entrar
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-foreground px-4 py-2 text-sm font-bold text-background hover:opacity-90"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-10">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          PRICING_v2 · sem letra miúda
        </div>
        <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-none tracking-tighter md:text-7xl">
          Pague pelo que <span className="text-muted-foreground">você mede.</span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted-foreground">
          Começa de graça. Vira plano pago quando suas menções valerem dinheiro
          de verdade — não antes.
        </p>
      </section>

      {/* Cards */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          <PlanCard
            name="BETA"
            price="R$ 0"
            priceDetail="enquanto durar o programa"
            description="Pra experimentar e ver o que a IA já fala da sua marca."
            features={[
              "1 marca monitorada",
              "10 prompts/mês",
              "Relatório básico de menções",
              "Acesso ao painel",
              "Suporte por email",
            ]}
            cta="Começar agora"
          />
          <PlanCard
            name="CRESCIMENTO"
            price="R$ 490"
            priceDetail="/mês · cobrado mensal"
            description="Para marcas que querem dominar as respostas das IAs de verdade."
            features={[
              "Até 3 marcas",
              "200 prompts/mês",
              "Relatórios completos com contexto",
              "Alertas em tempo real",
              "Recomendações de ação",
              "Suporte prioritário",
            ]}
            cta="Assinar"
            highlighted
          />
          <PlanCard
            name="AGÊNCIA"
            price="Sob consulta"
            priceDetail="conversa com nosso time"
            description="Para agências e grupos que gerenciam dezenas de marcas."
            features={[
              "Marcas ilimitadas",
              "Prompts ilimitados",
              "API e integrações",
              "White-label disponível",
              "Account manager dedicado",
              "SLA garantido",
            ]}
            cta="Falar com vendas"
          />
        </div>

        <p className="mt-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Sem cartão de crédito · cancela quando quiser · suporte em português
        </p>
      </section>

      {/* Compare strip */}
      <section className="border-y border-border bg-foreground py-16 text-background">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-3xl font-extrabold italic tracking-tight">
            O que entra em todo plano
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-xl bg-background/10 md:grid-cols-3">
            {[
              ["ChatGPT, Gemini & Perplexity", "Monitoramos os três modelos que importam no Brasil hoje."],
              ["Dashboard em tempo real", "Veja sua taxa de menção subir (ou cair) a cada varredura."],
              ["Exportação ilimitada", "CSV, PDF e link público — leva pra reunião."],
            ].map(([t, d]) => (
              <div key={t} className="bg-foreground p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-background/50">
                  INCLUSO
                </div>
                <h3 className="mt-3 text-lg font-bold">{t}</h3>
                <p className="mt-2 text-sm text-background/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-4xl font-black tracking-tighter md:text-5xl">
          Ainda na dúvida?
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          Cria a conta grátis. Em 5 minutos você vê o que a IA já diz sobre
          você — e decide depois.
        </p>
        <Link
          to="/signup"
          className="mt-8 inline-block rounded-xl bg-foreground px-10 py-4 text-base font-bold text-background transition-transform hover:scale-105 active:scale-95"
        >
          Criar conta grátis
        </Link>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-foreground" />
            <span className="font-bold text-foreground">Mencio</span>
          </div>
          <p>© {new Date().getFullYear()} Mencio. Feito no Brasil.</p>
          <div className="flex gap-6">
            <Link to="/" className="hover:text-foreground">Início</Link>
            <Link to="/login" className="hover:text-foreground">Entrar</Link>
            <a href="mailto:oi@mencio.com.br" className="hover:text-foreground">Contato</a>
          </div>
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
  highlighted = false,
}: {
  name: string;
  price: string;
  priceDetail: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col p-8 ${
        highlighted ? "bg-foreground text-background" : "bg-background"
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs tracking-[0.2em] opacity-70">{name}</span>
        {highlighted && (
          <span className="rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-widest text-accent-foreground">
            ESCOLHIDO
          </span>
        )}
      </div>
      <div className="mt-6 flex items-baseline gap-2">
        <span className="text-5xl font-black tracking-tighter">{price}</span>
      </div>
      <p className={`mt-1 font-mono text-xs ${highlighted ? "opacity-60" : "text-muted-foreground"}`}>
        {priceDetail}
      </p>
      <p className={`mt-5 text-sm ${highlighted ? "opacity-80" : "text-muted-foreground"}`}>
        {description}
      </p>
      <div className={`my-6 h-px ${highlighted ? "bg-background/15" : "bg-border"}`} />
      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm">
            <Check className={`mt-0.5 h-4 w-4 shrink-0 ${highlighted ? "opacity-80" : "opacity-60"}`} />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-8">
        <Link
          to="/signup"
          className={`inline-flex w-full items-center justify-center rounded-lg px-5 py-3 text-sm font-bold transition ${
            highlighted
              ? "bg-background text-foreground hover:opacity-90"
              : "border border-foreground hover:bg-foreground hover:text-background"
          }`}
        >
          {cta}
        </Link>
      </div>
    </div>
  );
}
