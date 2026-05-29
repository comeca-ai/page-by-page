import { createFileRoute, Outlet } from "@tanstack/react-router";
import { AppShell } from "@/components/app/AppShell";

export const Route = createFileRoute("/app")({
  head: () => ({ meta: [{ title: "Painel — Mencio" }] }),
  component: () => (
    <AppShell>
      <Outlet />
    </AppShell>
  ),
});
