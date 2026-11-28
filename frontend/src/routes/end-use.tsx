import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Icon } from "@/components/common/icon";
import {
  EmptyState,
  PageHeader,
  Panel,
  SectionHeader,
  StatusPill,
  scoreTone,
} from "@/components/common/page";
import { MeasureValue } from "@/components/common/provenance";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listFeedstocks, listEndUses } from "@/data/api";
import { assessEndUses, type EndUseAssessment } from "@/lib/scoring";
import type { EndUse, EndUseSector, Feedstock } from "@/data/types";
import { fmt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/end-use")({
  validateSearch: z.object({ endUse: z.string().optional() }),
  component: EndUsePage,
});

const SECTOR_COLORS: Record<EndUseSector, string> = {
  "Human food": "bg-mint text-on-mint",
  "Animal feed": "bg-amber-soft text-amber-ink",
  "Pet food": "bg-surface-high text-on-surface-variant",
  Industrial: "bg-surface-low text-on-surface-variant",
  Agriculture: "bg-sage text-forest",
};

function EndUsePage() {
  const [feedstocks, setFeedstocks] = useState<Feedstock[]>([]);
  const [endUses, setEndUses] = useState<EndUse[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedstockId, setFeedstockId] = useState("");
  const [sectorFilter, setSectorFilter] = useState<EndUseSector | "All">("All");

  useEffect(() => {
    Promise.all([listFeedstocks(), listEndUses()]).then(([fs, eu]) => {
      setFeedstocks(fs);
      setEndUses(eu);
      if (fs.length > 0) setFeedstockId(fs[0].id);
      setLoading(false);
    });
  }, []);

  const feedstock = feedstocks.find((f) => f.id === feedstockId);
  const assessments: EndUseAssessment[] = useMemo(
    () => (feedstock ? assessEndUses(feedstock) : []),
    [feedstock],
  );

  const filtered = useMemo(
    () =>
      sectorFilter === "All"
        ? assessments
        : assessments.filter((a) => a.endUse.sector === sectorFilter),
    [assessments, sectorFilter],
  );

  const sectors = useMemo(
    () => Array.from(new Set(endUses.map((e) => e.sector))),
    [endUses],
  );

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Product & Market"
        title="End-Use Intelligence"
        description="Evaluate feedstock × pathway suitability for food, feed, pet food and industrial applications. Fit scores are expert-style heuristic judgements."
      />

      {/* Controls */}
      <Panel className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-48">
          <label className="mb-1.5 block text-sm font-medium text-on-surface">
            Feedstock
          </label>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select value={feedstockId} onValueChange={setFeedstockId}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {feedstocks.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="min-w-40">
          <label className="mb-1.5 block text-sm font-medium text-on-surface">
            Sector
          </label>
          <Select
            value={sectorFilter}
            onValueChange={(v) => setSectorFilter(v as typeof sectorFilter)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All sectors</SelectItem>
              {sectors.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </Panel>

      {!feedstock ? (
        loading ? (
          <Skeleton className="h-96 rounded-xl" />
        ) : (
          <EmptyState icon="category" title="No feedstocks loaded" />
        )
      ) : (
        <>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/feedstocks/$feedstockId"
              params={{ feedstockId: feedstock.id }}
              className="flex items-center gap-2 text-brand-strong hover:underline"
            >
              <Icon name="eco" size={18} />
              <span className="font-medium">{feedstock.name}</span>
            </Link>
            <Badge variant="outline">{feedstock.category}</Badge>
            {feedstock.flags.map((f) => (
              <Badge
                key={f.id}
                variant="outline"
                className={cn(
                  "text-xs",
                  f.severity === "critical"
                    ? "border-risk/40 text-risk-ink"
                    : f.severity === "warning"
                      ? "border-amber/40 text-amber-ink"
                      : "",
                )}
              >
                {f.severity === "critical" && (
                  <Icon name="warning" size={12} className="mr-1 text-risk" />
                )}
                {f.label}
              </Badge>
            ))}
          </div>

          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-xl" />
              ))
            ) : filtered.length === 0 ? (
              <EmptyState title="No end uses match the selected sector" />
            ) : (
              filtered.map((a) => (
                <EndUseCard
                  key={a.endUse.id}
                  assessment={a}
                  feedstock={feedstock}
                />
              ))
            )}
          </div>
        </>
      )}

      {/* End-use catalogue */}
      <section className="space-y-4">
        <SectionHeader
          title="End-use catalogue"
          description="All product categories with minimum protein requirements and pathway compatibility."
        />
        <div className="overflow-x-auto rounded-xl border border-hairline bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>End use</TableHead>
                <TableHead>Sector</TableHead>
                <TableHead>Min protein</TableHead>
                <TableHead>Value tier</TableHead>
                <TableHead>Price (est.)</TableHead>
                <TableHead>Blocking flags</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {endUses.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>
                    <p className="font-medium">{e.name}</p>
                    <p className="text-xs text-muted-foreground max-w-xs">
                      {e.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        SECTOR_COLORS[e.sector],
                      )}
                    >
                      {e.sector}
                    </span>
                  </TableCell>
                  <TableCell className="type-data">{e.minProtein}%</TableCell>
                  <TableCell>
                    <StatusPill
                      tone={
                        e.valueTier === "High"
                          ? "sage"
                          : e.valueTier === "Medium"
                            ? "amber"
                            : "neutral"
                      }
                    >
                      {e.valueTier}
                    </StatusPill>
                  </TableCell>
                  <TableCell>
                    <MeasureValue m={e.indicativePrice} />
                  </TableCell>
                  <TableCell className="max-w-xs text-xs text-muted-foreground">
                    {e.blockingFlags.join(", ")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function EndUseCard({
  assessment,
  feedstock,
}: {
  assessment: EndUseAssessment;
  feedstock: Feedstock;
}) {
  const { endUse: eu, score, bestPathway, blocked, evidence } = assessment;
  const blocked_bool = blocked.length > 0;

  return (
    <Card className={cn("p-5", blocked_bool && "opacity-70")}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-semibold text-on-surface">{eu.name}</p>
            <span
              className={cn(
                "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                SECTOR_COLORS[eu.sector],
              )}
            >
              {eu.sector}
            </span>
            <StatusPill
              tone={
                eu.valueTier === "High"
                  ? "sage"
                  : eu.valueTier === "Medium"
                    ? "amber"
                    : "neutral"
              }
            >
              {eu.valueTier} value
            </StatusPill>
            <Badge variant="outline" className="text-xs">
              Evidence: {evidence}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-on-surface-variant">
            {eu.description}
          </p>
        </div>
        <div className="text-right">
          <span
            className={cn(
              "text-2xl font-bold",
              scoreTone(score) === "brand"
                ? "text-brand-strong"
                : scoreTone(score) === "amber"
                  ? "text-amber-ink"
                  : "text-risk-ink",
            )}
          >
            {score}
          </span>
          <p className="text-xs text-muted-foreground">fit score</p>
        </div>
      </div>

      <div className="mt-3 grid gap-x-6 gap-y-2 text-xs sm:grid-cols-3">
        <div>
          <span className="text-muted-foreground">Best pathway: </span>
          <span className="font-medium text-on-surface">
            {bestPathway.name}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Min protein: </span>
          <span className="type-data font-medium">
            {eu.minProtein}% · feedstock has{" "}
            {fmt(feedstock.composition.protein.value, 1)}%
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Price: </span>
          <MeasureValue m={eu.indicativePrice} />
        </div>
      </div>

      {blocked_bool && (
        <div className="mt-3 rounded-lg border border-risk/30 bg-risk-soft/40 px-3 py-2 text-xs text-risk-ink">
          <strong>Blocked:</strong> {blocked.join(" · ")}
          <span className="ml-2 text-muted-foreground">
            — these risk flags must be resolved before use in this application.
          </span>
        </div>
      )}

      {eu.regulatory && (
        <p className="mt-2 text-xs text-muted-foreground">
          <Icon name="gavel" size={12} className="mr-1 inline-block" />
          {eu.regulatory}
        </p>
      )}
    </Card>
  );
}
