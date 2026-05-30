import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, BarChart3, MessageSquareText } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mencio — Sua marca nas respostas das IAs" },
      {
        name: "description",
        content:
          "A Mencio mostra como sua marca aparece no ChatGPT, Gemini e outras IAs — e ajuda você a crescer nessas novas buscas.",
      },
      { property: "og:title", content: "Mencio — Sua marca nas respostas das IAs" },
      {
        property: "og:description",
        content:
          "Descubra como sua marca está sendo mencionada pelas IAs e ganhe espaço nas respostas que importam.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
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
            <a href="#produto" className="hover:text-foreground">Produto</a>
            <a href="#como-funciona" className="hover:text-foreground">Como funciona</a>
            <Link to="/pricing" className="hover:text-foreground">Preços</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Entrar
            </Link>
            <a
              href="#demo"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background hover:opacity-90"
            >
              Agendar demo
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-24 text-center">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Feito para marcas brasileiras
        </div>
        <h1 className="mx-auto max-w-3xl text-5xl font-semibold tracking-tight md:text-6xl">
          A sua marca também precisa aparecer{" "}
          <span className="italic text-muted-foreground">quando alguém pergunta pra IA.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
          A Mencio acompanha como o ChatGPT, o Gemini e outras IAs falam (ou
          esquecem) da sua marca — e mostra o caminho pra você ganhar espaço
          nessas respostas.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#demo"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background hover:opacity-90"
          >
            Quero ver minha marca
            <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium hover:bg-secondary"
          >
            Entrar na plataforma
          </Link>
        </div>

        <p className="mt-10 text-xs uppercase tracking-widest text-muted-foreground">
          Já confiam na Mencio
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-muted-foreground/70">
          <span>iFood</span>
          <span>Magalu</span>
          <span>Nubank</span>
          <span>Natura</span>
          <span>Stone</span>
        </div>
      </section>

      {/* Features */}
      <section id="produto" className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-px bg-border px-0 md:grid-cols-3">
          <Feature
            icon={<BarChart3 className="h-5 w-5" />}
            title="Monitore sua presença"
            text="Veja em quais perguntas a sua marca é citada — e em quais o concorrente leva a melhor."
          />
          <Feature
            icon={<MessageSquareText className="h-5 w-5" />}
            title="Entenda o contexto"
            text="Saiba o que as IAs estão dizendo sobre você: elogios, críticas, comparações e fontes."
          />
          <Feature
            icon={<Sparkles className="h-5 w-5" />}
            title="Ganhe espaço nas respostas"
            text="Receba recomendações práticas pra aparecer mais e melhor quando o cliente perguntar."
          />
        </div>
      </section>

      {/* How */}
      <section id="como-funciona" className="mx-auto max-w-4xl px-6 py-24">
        <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Simples como deveria ser.
        </h2>
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Sem dashboard confuso, sem jargão. Você conecta sua marca, escolhe os
          temas que importam, e a gente mostra o que tá acontecendo nas IAs em
          português claro.
        </p>
        <ol className="mt-10 space-y-6">
          {[
            ["1", "Cadastre sua marca", "Leva menos de um minuto. É só o nome e o site."],
            ["2", "A gente pergunta pelas IAs", "Rodamos centenas de perguntas reais dos seus clientes."],
            ["3", "Você recebe um plano", "Insights claros do que fazer essa semana pra melhorar."],
          ].map(([n, t, d]) => (
            <li key={n} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-sm">
                {n}
              </span>
              <div>
                <h3 className="font-medium">{t}</h3>
                <p className="text-sm text-muted-foreground">{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <section id="demo" className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            Bora descobrir o que a IA fala da sua marca?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Agende uma conversa de 20 minutos com nosso time. Sem compromisso,
            em português, e com exemplos da sua marca de verdade.
          </p>
          <a
            href="mailto:oi@mencio.com.br"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:opacity-90"
          >
            Agendar demo
            <ArrowRight className="h-4 w-4" />
          </a>
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

function Feature({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="bg-background p-8">
      <div className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-md border border-border text-foreground">
        {icon}
      </div>
      <h3 className="font-medium">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
