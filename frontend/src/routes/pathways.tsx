import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/pathways")({
  validateSearch: z.object({ focus: z.string().optional() }),
  component: PathwaysPage,
});

function PathwaysPage() {
  return <div />;
}
