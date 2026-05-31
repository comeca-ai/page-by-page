import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/team")({
  component: () => <Navigate to="/app/team" replace />,
});