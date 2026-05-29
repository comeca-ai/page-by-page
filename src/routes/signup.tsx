import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { OnboardingShell, Testimonial } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Criar conta — Mencio" },
      { name: "description", content: "Crie sua conta Mencio e comece a monitorar sua marca nas IAs." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [agreed, setAgreed] = useState(false);

  return (
    <OnboardingShell
      step={1}
      footerLeft={
        <span>
          Já tem conta?{" "}
          <Link to="/login" className="text-foreground hover:underline">
            Entrar
          </Link>
        </span>
      }
      aside={
        <Testimonial
          quote="“A Mencio mostrou pra gente, em tempo real, como a marca aparecia (ou não) nas respostas do ChatGPT e Gemini. Mudou o jeito que pensamos posicionamento.”"
          name="Jay Douglas"
          role="Diretor de Marketing, 1840 & Company"
          brand="eighteen4orty"
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ to: "/verify-email" });
        }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Crie sua conta
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Pra começar a acompanhar a visibilidade da sua marca nas IAs.
        </p>

        <label className="mt-8 block text-sm font-medium">E-mail</label>
        <input
          type="email"
          required
          placeholder="voce@empresa.com.br"
          className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
        />

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Nome</label>
            <input
              required
              placeholder="Seu nome"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Sobrenome</label>
            <input
              required
              placeholder="Sobrenome"
              className="mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-foreground"
            />
          </div>
        </div>

        <label className="mt-5 block text-sm font-medium">Senha</label>
        <div className="relative mt-2">
          <input
            type={showPwd ? "text" : "password"}
            required
            placeholder="Mínimo de 12 caracteres"
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
        <p className="mt-2 text-xs text-muted-foreground">
          Use pelo menos 12 caracteres, com uma maiúscula e um número.
        </p>

        <label className="mt-5 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mt-0.5 h-4 w-4 rounded border-border"
          />
          <span className="text-muted-foreground">
            Concordo com os{" "}
            <a className="text-foreground underline-offset-4 hover:underline">
              termos de uso
            </a>{" "}
            e a{" "}
            <a className="text-foreground underline-offset-4 hover:underline">
              política de privacidade
            </a>
            .
          </span>
        </label>

        <button
          type="submit"
          disabled={!agreed}
          className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Criar conta
        </button>
      </form>
    </OnboardingShell>
  );
}
