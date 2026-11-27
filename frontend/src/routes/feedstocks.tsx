import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feedstocks")({
  component: FeedstocksPage,
});

function FeedstocksPage() {
  return <div />;
}
