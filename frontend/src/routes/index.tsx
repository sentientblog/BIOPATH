import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@/components/common/icon";
import { PageHeader } from "@/components/common/page";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboard } from "@/data/api";
import { backendApi, type LiveStats } from "@/data/backend-api";
import { FEEDSTOCKS } from "@/data/feedstocks";
import { fmtCompact, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function useDashboardData() {
  const [demo, setDemo] = useState<Awaited<
    ReturnType<typeof getDashboard>
  > | null>(null);
  const [live, setLive] = useState<LiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    Promise.all([getDashboard(), backendApi.stats.get()])
      .then(([d, s]) => {
        if (cancelled) return;
        setDemo(d);
        setLive(s);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { demo, live, loading };
}

const STAGE_COLOR: Record<string, string> = {
  "In Progress": "text-brand-strong bg-mint",
  "Pathway Review": "text-amber-ink bg-amber-soft",
  Fingerprinting: "text-on-surface-variant bg-surface-high",
};

function KpiCard({
  icon,
  label,
  value,
  sub,
  to,
  loading,
}: {
  icon: string;
  label: string;
  value: string | number;
  sub?: string;
  to?: string;
  loading?: boolean;
}) {
  const inner = (
    <div className="flex items-start gap-4 p-5">
      <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-high text-brand-strong">
        <Icon name={icon} size={20} />
      </div>
      <div className="min-w-0 flex-1">
        {loading ? (
          <Skeleton className="mb-1.5 h-7 w-16" />
        ) : (
          <p className="text-2xl font-bold tracking-tight text-on-surface">
            {value}
          </p>
        )}
        <p className="text-sm text-on-surface-variant">{label}</p>
        {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
      </div>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="block">
        <Card className="cursor-pointer transition-shadow hover:shadow-md">
          {inner}
        </Card>
      </Link>
    );
  }
  return <Card>{inner}</Card>;
}

function ActivityIcon({ name, tone }: { name: string; tone: string }) {
  const map: Record<string, string> = {
    fingerprint: "fingerprint",
    menu_book: "menu_book",
    alt_route: "alt_route",
    verified_user: "verified_user",
  };
  return (
    <div
      className={cn(
        "grid size-8 shrink-0 place-items-center rounded-lg",
        tone === "critical"
          ? "bg-risk/10 text-risk"
          : "bg-surface-high text-on-surface-variant",
      )}
    >
      <Icon name={map[name] ?? "circle"} size={16} />
    </div>
  );
}

function HomePage() {
  const { demo, live, loading } = useDashboardData();

  const liveSuppliers = live?.supplierCount ?? 0;
  const liveFeedstocks = live?.feedstockCount ?? 0;
  const liveBatches = live?.batchCount ?? 0;
  const demoFeedstocks = FEEDSTOCKS.length;

  return (
    <div className="space-y-10 pt-6">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="BIOPATH AI · Feedstock-to-Protein Intelligence"
      />

      {/* KPI Row */}
      <section aria-label="Key metrics">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiCard
            icon="eco"
            label="Demo feedstocks"
            value={demoFeedstocks}
            sub="22 profiled · 5 screening"
            to="/feedstocks"
            loading={loading}
          />
          <KpiCard
            icon="inventory_2"
            label="Live batches"
            value={loading ? "—" : liveBatches}
            sub={
              liveBatches > 0
                ? `${liveFeedstocks} feedstocks registered`
                : "Register batches to track supply"
            }
            to="/source-intelligence"
            loading={loading}
          />
          <KpiCard
            icon="alt_route"
            label="Pathways evaluated"
            value={
              loading
                ? "—"
                : demo
                  ? fmtCompact(demo.kpis.pathwaysEvaluated)
                  : "—"
            }
            sub="Across all profiled feedstocks"
            to="/pathways"
            loading={loading}
          />
          <KpiCard
            icon="people"
            label="Live suppliers"
            value={loading ? "—" : liveSuppliers}
            sub="Registered in this workspace"
            to="/source-intelligence"
            loading={loading}
          />
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-12">
        {/* Active projects */}
        <section
          aria-label="Active research projects"
          className="lg:col-span-7"
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-on-surface">Active projects</h2>
            <Link
              to="/feedstocks"
              className="text-sm text-brand-strong hover:underline"
            >
              View all feedstocks →
            </Link>
          </div>
          <div className="space-y-3">
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-24 rounded-xl" />
                ))
              : demo?.projects.map((p) => (
                  <Card key={p.id} className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="size-14 shrink-0 overflow-hidden rounded-lg bg-surface-high">
                        <img
                          src={p.image}
                          alt=""
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display =
                              "none";
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-start justify-between gap-2">
                          <Link
                            to="/feedstocks/$feedstockId"
                            params={{ feedstockId: p.feedstockId }}
                            className="font-medium text-on-surface hover:underline"
                          >
                            {p.title}
                          </Link>
                          <Badge
                            className={cn(
                              "shrink-0 text-xs",
                              STAGE_COLOR[p.stage] ?? "",
                            )}
                          >
                            {p.stage}
                          </Badge>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {p.updated}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <Progress
                            value={p.completion}
                            className="h-1.5 flex-1"
                          />
                          <span className="type-data text-xs text-muted-foreground">
                            {p.completion}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
          </div>
        </section>

        {/* Recent activity */}
        <section aria-label="Recent activity" className="lg:col-span-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-semibold text-on-surface">Recent activity</h2>
          </div>
          <Card className="divide-y divide-hairline">
            {loading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex gap-3 p-4">
                    <Skeleton className="size-8 shrink-0 rounded-lg" />
                    <div className="flex-1 space-y-1.5">
                      <Skeleton className="h-3.5 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))
              : demo?.activity.map((a) => (
                  <div key={a.id} className="flex gap-3 p-4">
                    <ActivityIcon name={a.icon} tone={a.tone} />
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-on-surface">
                        {a.title}
                      </p>
                      <p className="text-xs text-on-surface-variant">
                        {a.detail}
                      </p>
                    </div>
                    <span className="type-data shrink-0 text-xs text-muted-foreground">
                      {a.ago}
                    </span>
                  </div>
                ))}
          </Card>

          {/* Live batch activity */}
          {live && live.recentBatches.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-on-surface">
                  Latest collection batches
                </h3>
                <Link
                  to="/source-intelligence"
                  className="text-xs text-brand-strong hover:underline"
                >
                  View all →
                </Link>
              </div>
              <Card className="divide-y divide-hairline">
                {live.recentBatches.map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center gap-3 px-4 py-2.5"
                  >
                    <Icon
                      name="inventory_2"
                      size={16}
                      className="text-on-surface-variant"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium text-on-surface">
                        {b.batchCode}
                      </p>
                      <p className="text-[11px] text-muted-foreground">
                        {b.quantity} {b.quantityUnit}
                      </p>
                    </div>
                    <span className="type-data text-[11px] text-muted-foreground">
                      {fmtDate(b.collectionDate)}
                    </span>
                  </div>
                ))}
              </Card>
            </div>
          )}
        </section>
      </div>

      {/* Quick access */}
      <section aria-label="Quick access">
        <h2 className="mb-4 font-semibold text-on-surface">
          Explore BIOPATH AI
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: "eco",
              to: "/feedstocks",
              label: "Feedstock Explorer",
              desc: "Browse and search 22 characterised feedstocks with composition and risk data.",
              params: undefined,
            },
            {
              icon: "alt_route",
              to: "/pathways",
              label: "Pathway Optimizer",
              desc: "Rank conversion pathways against your chosen feedstock and target market.",
              params: undefined,
            },
            {
              icon: "fingerprint",
              to: "/fingerprinting",
              label: "Batch Fingerprinting",
              desc: "Statistical control charts and QC pass rates across all logged batches.",
              params: undefined,
            },
            {
              icon: "pie_chart",
              to: "/allocation",
              label: "Resource Allocation",
              desc: "Greedy allocation across feedstocks under water and energy caps.",
              params: undefined,
            },
            {
              icon: "category",
              to: "/end-use",
              label: "End-Use Intelligence",
              desc: "Food, feed and industrial suitability for each feedstock × pathway.",
              params: undefined,
            },
            {
              icon: "assessment",
              to: "/reports",
              label: "Reports",
              desc: "Pathway comparisons, QC summaries and allocation scenarios.",
              params: undefined,
            },
          ].map((item) => (
            <Link key={item.to} to={item.to as never}>
              <Card className="flex h-full cursor-pointer gap-4 p-5 transition-shadow hover:shadow-md">
                <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface-high text-brand-strong">
                  <Icon name={item.icon} size={20} />
                </div>
                <div>
                  <p className="font-medium text-on-surface">{item.label}</p>
                  <p className="mt-0.5 text-sm text-on-surface-variant">
                    {item.desc}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
