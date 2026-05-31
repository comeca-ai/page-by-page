import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/prompts")({
  component: () => <Navigate to="/app/prompts" replace />,
});