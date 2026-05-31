import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Search,
  Sparkle,
  TrendingUp,
  Bot,
  Target,
  Bell,
  Quote,
  Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mencio — Sua marca nas respostas das IAs" },
      {
        name: "description",
        content:
          "Monitore como ChatGPT, Gemini e Perplexity citam sua marca. Descubra menções, sentimento e oportunidades de AI-SEO em tempo real.",
      },
      { property: "og:title", content: "Mencio — Sua marca nas respostas das IAs" },
      {
        property: "og:description",
        content:
          "A próxima geração de buscas já começou. Saiba o que as IAs estão respondendo sobre você.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen w-full bg-background text-foreground antialiased">
      <TopNav />
      <Hero />
      <LogoStrip />
      <Problem />
      <Features />
      <HowItWorks />
      <Testimonials />
      <PricingTeaser />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}

/* ---------- NAV ---------- */
function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground">
            <Sparkle className="h-3.5 w-3.5 text-background" />
          </div>
          <span className="text-base font-semibold tracking-tight">Mencio</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#produto" className="hover:text-foreground">Produto</a>
          <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
          <a href="#depoimentos" className="hover:text-foreground">Clientes</a>
          <Link to="/pricing" className="hover:text-foreground">Preços</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:inline"
          >
            Entrar
          </Link>
          <Link
            to="/signup"
            className="inline-flex items-center gap-1.5 rounded-lg bg-foreground px-4 py-2 text-sm font-semibold text-background transition hover:bg-foreground/90"
          >
            Começar grátis <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ---------- HERO ---------- */
function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:radial-gradient(circle_at_1px_1px,oklch(0.85_0.01_260)_1px,transparent_0)] [background-size:24px_24px] opacity-40"
      />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 pt-20 pb-24 lg:grid-cols-[1.05fr_1fr] lg:pt-28 lg:pb-28">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium">
            <span className="flex h-1.5 w-1.5 rounded-full bg-green-500" />
            Ao vivo: monitorando 4 modelos em tempo real
          </div>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            As IAs já estão respondendo
            <span className="block text-muted-foreground">sobre a sua marca.</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Mencio é a plataforma de <strong className="text-foreground">AI-SEO</strong> que mostra
            como ChatGPT, Gemini, Claude e Perplexity citam seu negócio — e o que fazer pra virar a
            resposta padrão.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/signup"
              className="group inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition hover:bg-foreground/90"
            >
              Começar monitoramento grátis
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="#produto"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-sm font-semibold transition hover:border-foreground/40"
            >
              Ver o produto
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> Setup em 2 minutos
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> 25 perguntas/dia no plano grátis
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-foreground" /> Sem cartão de crédito
            </li>
          </ul>
        </div>

        <HeroMock />
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative">
      {/* Chat mock */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_20px_60px_-20px_oklch(0_0_0/0.18)]">
        <div className="mb-5 flex items-center gap-2 border-b border-border pb-4">
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
          <span className="ml-2 font-['JetBrains_Mono'] text-[10px] tracking-widest text-muted-foreground">
            CHATGPT · gpt-5
          </span>
        </div>
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Pergunta monitorada
        </div>
        <p className="mt-2 text-base font-medium">
          Qual a melhor plataforma de logística para e-commerce no Brasil?
        </p>
        <div className="my-5 h-px w-full bg-border" />
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Resposta da IA
        </div>
        <p className="mt-2 leading-relaxed text-foreground/90">
          As principais opções incluem{" "}
          <mark className="rounded bg-accent/70 px-1 font-semibold text-foreground">
            [Sua Marca]
          </mark>
          , reconhecida por sua cobertura nacional e integração com marketplaces, além de Loggi e
          Mandaê. Muitos lojistas mencionam que a{" "}
          <mark className="rounded bg-accent/70 px-1 font-semibold text-foreground">
            [Sua Marca]
          </mark>{" "}
          oferece o melhor custo-benefício para o Nordeste.
        </p>
      </div>

      {/* Floating score card */}
      <div className="absolute -bottom-8 -left-6 hidden rounded-xl border border-border bg-card p-4 shadow-xl md:block">
        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Visibility Score
        </div>
        <div className="mt-1 text-3xl font-semibold tracking-tight">78.4%</div>
        <div className="font-['JetBrains_Mono'] text-xs font-semibold text-green-600">
          +12.4pts esta semana
        </div>
      </div>

      {/* Floating mentions card */}
      <div className="absolute -top-6 -right-6 hidden rounded-xl border border-border bg-card p-3 shadow-xl md:block">
        <div className="flex items-center gap-2">
          <Quote className="h-4 w-4 text-foreground" />
          <span className="text-xs font-semibold">142 menções / 24h</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- LOGO STRIP ---------- */
function LogoStrip() {
  const logos = ["iFood", "Nubank", "Magalu", "Mercado Livre", "QuintoAndar", "Stone"];
  return (
    <section className="border-y border-border/60 bg-secondary/30 py-10">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          Equipes de marketing que confiam no Mencio
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 opacity-70">
          {logos.map((l) => (
            <span key={l} className="text-lg font-semibold tracking-tight text-foreground/70">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- PROBLEM ---------- */
function Problem() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          O novo Google é uma conversa
        </span>
        <h2 className="mt-4 text-4xl font-semibold tracking-tight md:text-5xl">
          Em 2026, <span className="text-muted-foreground">70%</span> das buscas vão acontecer
          dentro de uma IA.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          Seu site pode ser o #1 no Google e mesmo assim estar invisível pro ChatGPT. O AI-SEO é o
          novo campo de batalha — e quem não medir, perde.
        </p>
      </div>
    </section>
  );
}

/* ---------- FEATURES ---------- */
function Features() {
  const items = [
    {
      icon: TrendingUp,
      title: "Visibility Score",
      text: "Saiba em quantos % das respostas sua marca aparece versus concorrentes — por modelo, idioma e tópico.",
    },
    {
      icon: Bot,
      title: "Monitoramento multi-modelo",
      text: "ChatGPT, Gemini, Claude e Perplexity rastreados diariamente nas perguntas que importam pro seu negócio.",
    },
    {
      icon: Target,
      title: "Análise de sentimento",
      text: "Descubra se a IA é favorável, neutra ou crítica — e identifique alucinações antes que viralizem.",
    },
    {
      icon: Search,
      title: "Gap analysis",
      text: "Compare-se com concorrentes pergunta a pergunta e veja onde você está perdendo espaço.",
    },
    {
      icon: Bell,
      title: "Alertas inteligentes",
      text: "Receba notificações quando sua marca cair de posição, surgir um concorrente novo ou aparecer erro factual.",
    },
    {
      icon: Sparkle,
      title: "Recomendações de AI-SEO",
      text: "Conteúdo, schema e PR sob medida pra IAs te citarem corretamente. Da estratégia ao prompt.",
    },
  ];

  return (
    <section id="produto" className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Produto
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Tudo o que sua marca precisa pra dominar as respostas das IAs.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-border bg-card p-7 transition hover:border-foreground/40"
            >
              <div className="mb-5 grid h-10 w-10 place-items-center rounded-lg bg-foreground text-background">
                <f.icon className="h-4.5 w-4.5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- HOW IT WORKS ---------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      title: "Conecte sua marca",
      text: "Diga seu site, tópicos e concorrentes. A IA gera 25 perguntas estratégicas em segundos.",
    },
    {
      n: "02",
      title: "A gente roda a varredura",
      text: "Todo dia, nossos bots simulam buscas reais em ChatGPT, Gemini, Claude e Perplexity.",
    },
    {
      n: "03",
      title: "Aja com confiança",
      text: "Score, sentimento, gap e recomendações práticas — tudo em um painel simples e exportável.",
    },
  ];

  return (
    <section id="como-funciona" className="bg-foreground py-24 text-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-widest text-background/60">
            Como funciona
          </span>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">
            Da configuração ao insight em menos de 5 minutos.
          </h2>
        </div>
        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="relative pt-10">
              <div className="absolute left-0 top-0 font-['JetBrains_Mono'] text-sm font-bold text-background/40">
                {s.n}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-background/70">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- TESTIMONIALS ---------- */
function Testimonials() {
  return (
    <section id="depoimentos" className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            quote:
              "Em 3 semanas, nossa marca passou de 12% pra 41% de visibilidade no ChatGPT. Mudou nossa estratégia de conteúdo do zero.",
            name: "Ana Vilela",
            role: "Head de Growth, FintechBR",
          },
          {
            quote:
              "Descobri que o ChatGPT estava confundindo meu produto com um concorrente. Corrigimos em 2 dias e voltamos ao topo.",
            name: "Diego Lemos",
            role: "Founder, Logspace",
          },
          {
            quote:
              "É o Google Search Console da era das IAs. Não dá pra rodar marketing sério sem isso em 2026.",
            name: "Camila Souza",
            role: "CMO, MarketCloud",
          },
        ].map((t) => (
          <figure
            key={t.name}
            className="flex flex-col justify-between rounded-2xl border border-border bg-card p-7"
          >
            <div>
              <div className="flex gap-0.5 text-foreground">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="mt-4 text-base leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
            </div>
            <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="h-9 w-9 rounded-full bg-secondary" />
              <div className="text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------- PRICING TEASER ---------- */
function PricingTeaser() {
  return (
    <section className="bg-secondary/30 py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="overflow-hidden rounded-3xl border border-border bg-card">
          <div className="grid md:grid-cols-[1.2fr_1fr]">
            <div className="p-10">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Plano Beta · grátis por tempo limitado
              </span>
              <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                Comece a medir hoje. Pague só quando crescer.
              </h3>
              <p className="mt-4 text-muted-foreground">
                25 perguntas monitoradas, 4 modelos, alertas e exportação — sem limite de usuários
                durante o beta.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 rounded-xl bg-foreground px-6 py-3 text-sm font-semibold text-background hover:bg-foreground/90"
                >
                  Criar conta grátis <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-semibold hover:border-foreground/40"
                >
                  Ver planos completos
                </Link>
              </div>
            </div>
            <ul className="space-y-3 border-t border-border bg-secondary/40 p-10 text-sm md:border-l md:border-t-0">
              {[
                "25 perguntas/dia em 4 modelos",
                "Visibility Score e sentimento",
                "Comparação com concorrentes",
                "Alertas por e-mail e Slack",
                "Suporte direto pelo WhatsApp",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 flex-none text-foreground" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- FAQ ---------- */
function FAQ() {
  const items = [
    {
      q: "Como o Mencio coleta os dados?",
      a: "Rodamos automaticamente as perguntas configuradas em ChatGPT, Gemini, Claude e Perplexity todo dia, com prompts padronizados. Os resultados são processados pra extrair menções, sentimento e ranking.",
    },
    {
      q: "Preciso integrar com meu site?",
      a: "Não. Basta informar seu domínio e tópicos. Quem quiser, pode conectar Google Search Console pra cruzar dados de SEO tradicional com AI-SEO.",
    },
    {
      q: "Quanto tempo até ver resultados?",
      a: "A primeira varredura completa fica pronta em até 24h. A maioria dos clientes vê movimento no Visibility Score em 2 a 4 semanas após aplicar as recomendações.",
    },
    {
      q: "Funciona pra agências?",
      a: "Sim. Você pode gerenciar várias marcas/clientes na mesma conta, com permissões por equipe e relatórios white-label.",
    },
  ];
  return (
    <section className="mx-auto max-w-3xl px-6 py-24">
      <div className="mb-10 text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Dúvidas frequentes
        </span>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Tudo o que você precisa saber.
        </h2>
      </div>
      <div className="divide-y divide-border rounded-2xl border border-border bg-card">
        {items.map((it) => (
          <details key={it.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
              {it.q}
              <span className="grid h-6 w-6 flex-none place-items-center rounded-full border border-border text-xs transition group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

/* ---------- FINAL CTA ---------- */
function FinalCTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-foreground px-10 py-16 text-center text-background md:py-20">
        <h2 className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight md:text-5xl">
          Pare de adivinhar.
          <br />
          Comece a aparecer.
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-background/70">
          A próxima geração de buscas já decidiu o que dizer sobre sua marca. Você ainda pode mudar
          a resposta.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-background px-7 py-3.5 text-sm font-semibold text-foreground transition hover:bg-background/90"
          >
            Criar conta grátis <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 rounded-xl border border-background/30 px-7 py-3.5 text-sm font-semibold text-background hover:bg-background/10"
          >
            Ver planos
          </Link>
        </div>
        <p className="mt-6 font-['JetBrains_Mono'] text-xs text-background/50">
          Sem cartão de crédito · Setup em 2 min
        </p>
      </div>
    </section>
  );
}

/* ---------- FOOTER ---------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-md bg-foreground">
              <Sparkle className="h-3.5 w-3.5 text-background" />
            </div>
            <span className="text-base font-semibold tracking-tight">Mencio</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            A plataforma de AI-SEO feita no Brasil pra equipes que querem dominar as respostas das
            IAs.
          </p>
        </div>
        <FooterCol
          title="Produto"
          links={[
            { label: "Recursos", href: "#produto" },
            { label: "Como funciona", href: "#como-funciona" },
            { label: "Preços", href: "/pricing", to: true },
          ]}
        />
        <FooterCol
          title="Conta"
          links={[
            { label: "Entrar", href: "/login", to: true },
            { label: "Criar conta", href: "/signup", to: true },
          ]}
        />
        <FooterCol
          title="Contato"
          links={[
            { label: "oi@mencio.com.br", href: "mailto:oi@mencio.com.br" },
            { label: "WhatsApp", href: "https://wa.me/" },
          ]}
        />
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-xs text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Mencio. Feito no Brasil 🇧🇷</p>
          <p>Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; to?: boolean }[];
}) {
  return (
    <div>
      <div className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {links.map((l) =>
          l.to ? (
            <li key={l.label}>
              <Link to={l.href as "/pricing"} className="text-foreground/80 hover:text-foreground">
                {l.label}
              </Link>
            </li>
          ) : (
            <li key={l.label}>
              <a href={l.href} className="text-foreground/80 hover:text-foreground">
                {l.label}
              </a>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
