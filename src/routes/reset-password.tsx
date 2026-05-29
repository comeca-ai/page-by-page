import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Redefinir senha — Mencio" },
      { name: "description", content: "Crie uma nova senha pra sua conta Mencio." },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  const rules = useMemo(
    () => [
      { label: "Pelo menos 12 caracteres", ok: password.length >= 12 },
      { label: "Uma letra maiúscula", ok: /[A-Z]/.test(password) },
      { label: "Um número ou símbolo", ok: /[\d\W]/.test(password) },
      { label: "As duas senhas conferem", ok: !!password && password === confirm },
    ],
    [password, confirm],
  );

  const allOk = rules.every((r) => r.ok);

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col px-6 py-10 md:px-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-foreground" />
          <span className="text-lg font-semibold tracking-tight">Mencio</span>
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <h1 className="text-3xl font-semibold tracking-tight">
              Crie sua nova senha
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Quase lá. Escolha algo forte que você consiga lembrar.
            </p>

            <label className="mt-8 block text-sm font-medium">Nova senha</label>
            <div className="relative mt-2">
              <input
                type={showPwd ? "text" : "password"}
                required
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Digite sua nova senha"
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

            <label className="mt-5 block text-sm font-medium">
              Confirme a nova senha
            </label>
            <input
              type={showPwd ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repita a senha"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
            />

            <ul className="mt-5 space-y-1.5">
              {rules.map((r) => (
                <li key={r.label} className="flex items-center gap-2 text-xs">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full transition-colors ${
                      r.ok
                        ? "bg-foreground text-background"
                        : "border border-border bg-background"
                    }`}
                  >
                    {r.ok && <Check className="h-3 w-3" />}
                  </span>
                  <span
                    className={
                      r.ok ? "text-foreground" : "text-muted-foreground"
                    }
                  >
                    {r.label}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              disabled={!allOk}
              className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Salvar nova senha
            </button>

            <Link
              to="/login"
              className="mt-6 inline-block text-sm text-muted-foreground hover:text-foreground"
            >
              ← Voltar pro login
            </Link>
          </form>
        </div>

        <div className="mx-auto w-full max-w-sm pt-8 text-xs text-muted-foreground">
          Protegido com criptografia ponta a ponta.
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
                Segurança Mencio
              </div>
              <div className="mt-2 text-xl font-semibold tracking-tight">
                Sua senha nunca é vista por ninguém
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Armazenamos só um hash criptográfico. Nem o nosso time
                consegue ler.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background p-6 shadow-sm">
              <p className="text-sm leading-relaxed">
                “A Mencio leva privacidade a sério — dá pra sentir isso em
                cada detalhe do produto.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-foreground/10" />
                <div className="text-xs">
                  <div className="font-medium">Camila Reis</div>
                  <div className="text-muted-foreground">CTO, Osklen</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
