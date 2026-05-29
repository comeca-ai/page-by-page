import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { OnboardingShell, Testimonial } from "@/components/onboarding/OnboardingShell";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [{ title: "Verificar e-mail — Mencio" }],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [seconds, setSeconds] = useState(57);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const full = code.every((c) => c !== "");

  function setAt(i: number, v: string) {
    const c = v.replace(/\D/g, "").slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = c;
      return next;
    });
    if (c && i < 5) refs.current[i + 1]?.focus();
  }

  return (
    <OnboardingShell
      step={2}
      back={{ to: "/signup", label: "Voltar" }}
      aside={
        <Testimonial
          quote="“Com a Mencio, descobrimos como as IAs falavam (ou não) da nossa marca. Em duas semanas dobramos as menções positivas.”"
          name="Marina Alves"
          role="Head de Growth, Lupo"
          brand="Lupo"
        />
      }
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (full) navigate({ to: "/onboarding/company" });
        }}
      >
        <h1 className="text-3xl font-semibold tracking-tight">
          Verifique seu e-mail
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Mandamos um código de 6 dígitos pra você.
        </p>

        <div className="mt-8 flex gap-2">
          {code.map((c, i) => (
            <input
              key={i}
              ref={(el) => {
                refs.current[i] = el;
              }}
              value={c}
              onChange={(e) => setAt(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !c && i > 0) refs.current[i - 1]?.focus();
              }}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-lg border border-border bg-background text-center text-xl font-medium outline-none focus:border-foreground"
            />
          ))}
        </div>

        <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
          {seconds > 0 ? (
            <span>
              Reenviar em 00:{String(seconds).padStart(2, "0")}
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setSeconds(57)}
              className="text-foreground hover:underline"
            >
              Reenviar código
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!full}
          className="mt-7 inline-flex h-11 w-full items-center justify-center rounded-lg bg-foreground text-sm font-medium text-background transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Verificar
        </button>
      </form>
    </OnboardingShell>
  );
}
