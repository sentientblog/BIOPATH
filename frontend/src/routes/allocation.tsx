import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/allocation")({
  component: AllocationPage,
});

function AllocationPage() {
  return <div />;
}
