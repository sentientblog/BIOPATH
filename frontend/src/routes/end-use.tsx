import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/end-use")({
  validateSearch: z.object({ endUse: z.string().optional() }),
  component: EndUsePage,
});

function EndUsePage() {
  return <div />;
}
