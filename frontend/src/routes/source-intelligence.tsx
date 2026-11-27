import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/source-intelligence")({
  component: SourceIntelligencePage,
});

function SourceIntelligencePage() {
  return <div />;
}
