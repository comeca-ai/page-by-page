import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/competitors")({
  component: () => <Navigate to="/app/competitors" replace />,
});