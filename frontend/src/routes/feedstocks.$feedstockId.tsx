import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/feedstocks/$feedstockId")({
  component: FeedstockDetailPage,
});

function FeedstockDetailPage() {
  return <div />;
}
