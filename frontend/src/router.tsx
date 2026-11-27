import { createRouter } from "@tanstack/react-router";
import { RouteErrorPage } from "@/components/error-pages";
import { PageSkeleton } from "@/components/common/skeletons";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

// Create a new router instance
export const getRouter = () => {
  const router = createRouter({
    routeTree,
    defaultErrorComponent: RouteErrorPage,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPreload: "intent",
    defaultPendingComponent: () => <PageSkeleton />,
    defaultPendingMs: 150,
    defaultPendingMinMs: 300,
  });

  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
