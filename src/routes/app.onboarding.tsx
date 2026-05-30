import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getUserAgencies, createAgency, getPendingInvitations, acceptInvitation } from "@/lib/agency.functions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export const Route = createFileRoute("/app/onboarding")({
  component: OnboardingPage,
});

function OnboardingPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fetchAgencies = useServerFn(getUserAgencies);
  const fetchInvitations = useServerFn(getPendingInvitations);
  const createAgencyFn = useServerFn(createAgency);
  const acceptInvFn = useServerFn(acceptInvitation);

  const { data: agenciesData } = useQuery({ queryKey: ["user-agencies"], queryFn: fetchAgencies });
  const { data: invitationsData } = useQuery({ queryKey: ["pending-invitations"], queryFn: fetchInvitations });

  const agencies = agenciesData?.agencies ?? [];
  const invitations = invitationsData?.invitations ?? [];

  if (agencies.length > 0) {
    navigate({ to: "/app/a/$slug", params: { slug: agencies[0].slug } });
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Crie sua agência</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Crie uma agência ou aceite um convite para começar.
          </p>
        </div>

        {invitations.length > 0 && (
          <div className="space-y-3 rounded-lg border p-4">
            <h2 className="font-semibold">Convites pendentes</h2>
            {invitations.map((inv: any) => (
              <InvitationCard key={inv.id} invitation={inv} acceptInvFn={acceptInvFn} queryClient={queryClient} navigate={navigate} />
            ))}
          </div>
        )}

        <CreateAgencyForm createAgencyFn={createAgencyFn} queryClient={queryClient} navigate={navigate} />
      </div>
    </div>
  );
}

function InvitationCard({ invitation, acceptInvFn, queryClient, navigate }: any) {
  const [loading, setLoading] = useState(false);

  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptInvFn({ data: { token: invitation.token } });
      toast.success("Convite aceito!");
      await queryClient.invalidateQueries({ queryKey: ["user-agencies"] });
      navigate({ to: "/app/a/$slug", params: { slug: invitation.agencies.slug } });
    } catch (e: any) {
      toast.error(e.message || "Erro ao aceitar convite");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-between rounded-md bg-muted p-3">
      <div>
        <p className="font-medium">{invitation.agencies.name}</p>
        <p className="text-xs text-muted-foreground">Cargo: {invitation.role}</p>
      </div>
      <Button size="sm" onClick={handleAccept} disabled={loading}>
        {loading ? "..." : "Aceitar"}
      </Button>
    </div>
  );
}

function CreateAgencyForm({ createAgencyFn, queryClient, navigate }: any) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) return;
    setLoading(true);
    try {
      const result = await createAgencyFn({ data: { name: name.trim(), slug: slug.trim().toLowerCase() } });
      toast.success("Agência criada!");
      await queryClient.invalidateQueries({ queryKey: ["user-agencies"] });
      navigate({ to: "/app/a/$slug", params: { slug: result.agency.slug } });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar agência");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border p-4">
      <h2 className="font-semibold">Nova agência</h2>
      <div className="space-y-2">
        <label className="text-sm font-medium">Nome da agência</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ex: Acme Digital" required />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Slug (URL)</label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value.replace(/[^a-z0-9-]/g, ""))}
          placeholder="acme-digital"
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Criando..." : "Criar agência"}
      </Button>
    </form>
  );
}
