import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — Mencio" },
      { name: "description", content: "Acesse sua conta Mencio." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [step, setStep] = useState<"email" | "password">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* Left: form */}
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-foreground" />
          <span className="text-lg font-semibold tracking-tight">Mencio</span>
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          {step === "email" ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email) setStep("password");
              }}
            >
              <h1 className="text-3xl font-semibold tracking-tight">
                Qual é o seu e-mail?
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Crie sua conta ou faça login pra continuar.
              </p>

              <label className="mt-8 block text-sm font-medium">E-mail</label>
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
                  Continuar
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <h1 className="text-3xl font-semibold tracking-tight">
                Bem-vindo de volta!
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Insira a senha da sua conta pra continuar.
              </p>

              <label className="mt-8 block text-sm font-medium">E-mail</label>
              <input
                readOnly
                value={email}
                className="mt-2 h-11 w-full rounded-lg border border-border bg-secondary px-3 text-sm text-muted-foreground"
              />

              <div className="mt-5 flex items-center justify-between">
                <label className="block text-sm font-medium">Senha</label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                >
                  Esqueceu sua senha?
                </Link>
              </div>
              <div className="relative mt-2">
                <input
                  type={showPwd ? "text" : "password"}
                  required
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="h-11 w-full rounded-lg border border-border bg-background px-3 pr-10 text-sm outline-none focus:border-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              <button
                type="submit"
                className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background hover:opacity-90"
              >
                Entrar
              </button>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="mt-6 text-sm text-muted-foreground hover:text-foreground"
              >
                ← Voltar
              </button>
            </form>
          )}
        </div>

        <div className="mx-auto w-full max-w-sm pt-8 text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Fale com a gente</Link>
        </div>
      </div>

      {/* Right: testimonial / showcase */}
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
              <p className="text-sm leading-relaxed">
                “Com a Mencio a gente finalmente entendeu como o ChatGPT
                recomendava (ou não) a nossa marca. Em duas semanas dobramos
                as menções positivas.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-foreground/10" />
                <div className="text-xs">
                  <div className="font-medium">Marina Alves</div>
                  <div className="text-muted-foreground">Head de Growth, Lupo</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                Em breve
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight">
                Mencio Talks · SP
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Um encontro com as marcas brasileiras que estão liderando a
                nova busca por IA.
              </p>
              <div className="mt-4 text-xs text-muted-foreground">
                18 de junho · São Paulo
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
