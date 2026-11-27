import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/fingerprinting")({
  component: FingerprintingPage,
});

function FingerprintingPage() {
  return <div />;
}
