import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/AppShell";

export const Route = createFileRoute("/app/a/$slug")({
  component: AgencyWorkspace,
});

function AgencyWorkspace() {
  const { slug } = Route.useParams();
  return (
    <div>
      <PageHeader title={`Agência: ${slug}`} subtitle="Workspace da agência" />
      <p className="text-muted-foreground">Dashboard da agência em construção.</p>
    </div>
  );
}
