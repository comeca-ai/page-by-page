import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Mail } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Recuperar senha — Mencio" },
      { name: "description", content: "Recupere o acesso à sua conta Mencio." },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-foreground" />
          <span className="text-lg font-semibold tracking-tight">Mencio</span>
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setSent(true);
              }}
            >
              <h1 className="text-3xl font-semibold tracking-tight">
                Esqueceu a senha?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Sem problema. A gente te manda um link pra criar uma nova em
                segundos.
              </p>

              <label className="mt-8 block text-sm font-medium">E-mail da conta</label>
              <div className="mt-2 flex items-center gap-2">
                <input
                  type="email"
                  required
                  autoFocus
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@empresa.com.br"
                  className="h-11 flex-1 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
                />
                <button
                  type="submit"
                  className="inline-flex h-11 items-center gap-1.5 rounded-lg bg-foreground px-4 text-sm font-medium text-background hover:opacity-90"
                >
                  Enviar
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <Link
                to="/login"
                className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
              >
                ← Voltar pro login
              </Link>
            </form>
          ) : (
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
                <Mail className="h-5 w-5" />
              </div>
              <h1 className="mt-6 text-3xl font-semibold tracking-tight">
                Confira seu e-mail
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Mandamos um link de recuperação pra{" "}
                <span className="font-medium text-foreground">{email}</span>.
                Pode demorar um minutinho pra chegar.
              </p>

              <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
                Não recebeu? Olha na caixa de spam ou{" "}
                <button
                  onClick={() => setSent(false)}
                  className="font-medium text-foreground underline-offset-4 hover:underline"
                >
                  tente outro e-mail
                </button>
                .
              </div>

              <Link
                to="/login"
                className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground"
              >
                ← Voltar pro login
              </Link>
            </div>
          )}
        </div>

        <div className="mx-auto w-full max-w-sm pt-8 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Fale com a gente</Link>
        </div>
      </div>

      <div className="relative hidden overflow-hidden bg-secondary/50 lg:block">
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, var(--color-muted-foreground) 1px, transparent 0)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative flex h-full items-center justify-center p-12">
          <div className="max-w-md space-y-6">
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Dica rápida
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight">
                Use um gerenciador de senhas
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                A gente recomenda 1Password ou Bitwarden pro seu time. Mais
                segurança, menos esquecimento.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <p className="text-sm leading-relaxed">
                “Recuperei meu acesso em menos de um minuto. Super tranquilo,
                igual ao resto da Mencio.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-foreground/10" />
                <div className="text-xs">
                  <div className="font-medium">Rafael Tonon</div>
                  <div className="text-muted-foreground">CMO, Granado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
