import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { OnboardingShell, Testimonial } from "@/components/onboarding/OnboardingShell";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/verify-email")({
  validateSearch: (search: Record<string, unknown>) => ({
    email: (search.email as string) || "",
  }),
  head: () => ({
    meta: [{ title: "Verificar e-mail — Mencio" }],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const { email } = Route.useSearch();
  const [sending, setSending] = useState(false);

  async function resend() {
    if (!email) return;
    setSending(true);
    const { error } = await supabase.auth.resend({ type: "signup", email });
    setSending(false);
    if (error) toast.error(error.message);
    else toast.success("E-mail reenviado");
  }

  return (
    <OnboardingShell
      step={2}
      totalSteps={2}
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
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
        <Mail className="h-5 w-5" />
      </div>
      <h1 className="mt-6 text-3xl font-semibold tracking-tight">Confirme seu e-mail</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Enviamos um link de confirmação{email ? <> pra <span className="font-medium text-foreground">{email}</span></> : ""}.
        Clique no link pra ativar sua conta e voltar pra cá automaticamente.
      </p>

      <div className="mt-8 rounded-lg border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
        Não recebeu? Olha na caixa de spam ou{" "}
        <button onClick={resend} disabled={sending || !email} className="font-medium text-foreground underline-offset-4 hover:underline disabled:opacity-50">
          {sending ? "enviando..." : "reenviar agora"}
        </button>.
      </div>

      <Link to="/login" className="mt-8 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← Voltar pro login
      </Link>
    </OnboardingShell>
  );
}
