import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/modules/$moduleId")({
  component: ModulePage,
});

function ModulePage() {
  return <div />;
}
