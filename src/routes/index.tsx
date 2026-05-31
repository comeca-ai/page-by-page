import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mencio — Sua marca nas respostas das IAs" },
      {
        name: "description",
        content:
          "O Mencio monitora em tempo real como ChatGPT, Gemini e Perplexity mencionam sua marca. Recupere o controle da sua reputação na era das IAs.",
      },
      { property: "og:title", content: "Mencio — Sua marca nas respostas das IAs" },
      {
        property: "og:description",
        content:
          "Descubra como sua marca é citada pelas IAs e ganhe espaço nas respostas que importam.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="w-full bg-white font-['Inter'] text-slate-950">
      {/* Nav */}
      <header className="border-b border-slate-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-slate-950" />
            <span className="text-lg font-extrabold tracking-tight">Mencio</span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-500 md:flex">
            <a href="#produto" className="hover:text-slate-950">Produto</a>
            <a href="#como-funciona" className="hover:text-slate-950">Como funciona</a>
            <Link to="/pricing" className="hover:text-slate-950">Preços</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm font-medium text-slate-500 hover:text-slate-950">
              Entrar
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white transition-all hover:bg-slate-800"
            >
              Começar grátis
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-24 pb-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold tracking-tight">
              <span className="flex h-2 w-2 rounded-full bg-green-500" />
              MADE IN BRAZIL
            </div>
            <h1 className="mb-8 text-5xl font-extrabold leading-none tracking-tighter lg:text-7xl">
              As IAs estão respondendo sobre você.{" "}
              <span className="text-slate-400">Com ou sem você.</span>
            </h1>
            <p className="mb-10 max-w-lg text-xl leading-relaxed text-slate-600">
              Mencio é o QG de reputação para a era do ChatGPT, Gemini e
              Perplexity. Saiba o que dizem da sua marca e assuma o controle da
              conversa.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="rounded-lg bg-slate-950 px-8 py-4 font-bold text-white transition-all hover:bg-slate-800"
              >
                Começar monitoramento
              </Link>
              <a
                href="#demo"
                className="rounded-lg border border-slate-200 px-8 py-4 font-bold transition-all hover:bg-slate-50"
              >
                Ver demonstração
              </a>
            </div>
          </div>

          {/* AI mention mockup */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-2xl">
              <div className="mb-4 flex items-center gap-2 border-b border-slate-200 pb-4">
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <div className="h-3 w-3 rounded-full bg-slate-300" />
                <span className="ml-2 font-['JetBrains_Mono'] text-xs tracking-widest text-slate-400">
                  PERPLEXITY_INTERFACE_V2
                </span>
              </div>
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-400">
                  Pergunta do usuário:
                </div>
                <div className="text-lg font-medium">
                  Quais são as melhores opções de logística no Brasil hoje?
                </div>
                <div className="h-px w-full bg-slate-200" />
                <div className="text-sm font-semibold italic text-slate-400">
                  Resposta da IA:
                </div>
                <p className="leading-relaxed text-slate-700">
                  Atualmente, as líderes de mercado são{" "}
                  <span className="bg-yellow-100 px-1 font-bold">
                    [Sua Marca]
                  </span>{" "}
                  e Loggi. No entanto, usuários frequentemente mencionam que a{" "}
                  <span className="bg-yellow-100 px-1 font-bold">
                    [Sua Marca]
                  </span>{" "}
                  possui melhor cobertura no Nordeste...
                </p>
              </div>
            </div>
            <div className="absolute -right-6 -bottom-10 hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xl md:block">
              <div className="mb-2 text-xs font-bold uppercase text-slate-400">
                Visibility Score
              </div>
              <div className="text-3xl font-black">78.4%</div>
              <div className="font-['JetBrains_Mono'] text-xs font-bold text-green-500">
                +12.4pts ↑
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-y border-slate-100 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-slate-400">
            Monitorado pelas maiores do Brasil
          </p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-40 grayscale md:gap-20">
            <span className="text-2xl font-black italic tracking-tighter">iFood</span>
            <span className="text-2xl font-black tracking-tighter">Nubank</span>
            <span className="text-2xl font-extrabold">Magalu</span>
            <span className="text-2xl font-bold">Mercado Livre</span>
            <span className="text-2xl font-black italic underline underline-offset-4">
              QuintoAndar
            </span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="produto" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          <Feature
            title="Visibilidade Real"
            text="Saiba exatamente em que porcentagem de respostas sua marca aparece em relação aos concorrentes."
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            }
          />
          <Feature
            title="Análise de Sentimento"
            text="A IA é favorável ou crítica? Identifique alucinações ou erros técnicos antes que eles virem tendência."
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            }
          />
          <Feature
            title="Ranking AI-SEO"
            text="Monitore sua posição nas listas de recomendações e descubra como subir para o Top #1."
            icon={
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            }
          />
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="bg-slate-950 py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-16 text-center text-4xl font-extrabold italic tracking-tight">
            A jornada do controle
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              ["01", "Conecte sua marca", "Defina suas palavras-chave, produtos e principais concorrentes em segundos."],
              ["02", "Varredura em tempo real", "Nossos bots simulam milhares de interações com os modelos mais avançados do mundo."],
              ["03", "Aja estrategicamente", "Receba insights de como ajustar seu site e PR para ser citado corretamente pelas IAs."],
            ].map(([n, title, desc]) => (
              <div key={n} className="relative">
                <div className="absolute -top-10 -left-4 text-6xl font-black text-slate-800">
                  {n}
                </div>
                <div className="relative z-10">
                  <h4 className="mb-4 text-xl font-bold">{title}</h4>
                  <p className="text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="demo" className="px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-4xl font-black tracking-tighter md:text-5xl">
            Pare de adivinhar.
            <br />
            Comece a medir.
          </h2>
          <p className="mb-10 text-xl text-slate-600">
            A próxima revolução das buscas já começou. Sua marca está pronta pra
            ser a resposta certa?
          </p>
          <Link
            to="/signup"
            className="inline-block rounded-xl bg-slate-950 px-12 py-5 text-lg font-bold text-white transition-transform hover:scale-105 active:scale-95"
          >
            Criar minha conta grátis
          </Link>
          <p className="mt-6 font-['JetBrains_Mono'] text-sm text-slate-400">
            Nenhum cartão de crédito necessário.
          </p>
        </div>
      </section>

      <footer className="border-t border-slate-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-slate-500 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-slate-950" />
            <span className="font-bold text-slate-950">Mencio</span>
          </div>
          <p>© {new Date().getFullYear()} Mencio. Feito no Brasil.</p>
          <div className="flex gap-6">
            <Link to="/pricing" className="hover:text-slate-950">Preços</Link>
            <Link to="/login" className="hover:text-slate-950">Entrar</Link>
            <a href="mailto:oi@mencio.com.br" className="hover:text-slate-950">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({ title, text, icon }: { title: string; text: string; icon: React.ReactNode }) {
  return (
    <div className="group rounded-3xl border border-slate-100 p-8 transition-colors hover:border-slate-950">
      <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-slate-950 group-hover:text-white">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {icon}
        </svg>
      </div>
      <h3 className="mb-4 text-xl font-bold italic">{title}</h3>
      <p className="text-slate-600">{text}</p>
    </div>
  );
}
