import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/mentions")({
  component: () => <Navigate to="/app/mentions" replace />,
});