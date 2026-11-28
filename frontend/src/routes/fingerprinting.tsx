import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/common/icon";
import {
  EmptyState,
  PageHeader,
  Panel,
  SectionHeader,
  StatCard,
  StatusPill,
} from "@/components/common/page";
import {
  ControlChart,
  type ControlPoint,
} from "@/components/charts/control-chart";
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
import { listBatches } from "@/data/api";
import { FEEDSTOCKS } from "@/data/feedstocks";
import { fmt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fingerprinting")({
  component: FingerprintingPage,
});

function FingerprintingPage() {
  const [feedstockId, setFeedstockId] = useState("");
  const [batches, setBatches] = useState<Awaited<
    ReturnType<typeof listBatches>
  > | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listBatches().then((data) => {
      setBatches(data);
      // pick the feedstock with most batches by default
      const counts = new Map<string, number>();
      data.forEach((b) =>
        counts.set(b.feedstockId, (counts.get(b.feedstockId) ?? 0) + 1),
      );
      const top = [...counts.entries()].sort((a, b) => b[1] - a[1])[0];
      setFeedstockId(top?.[0] ?? FEEDSTOCKS[0].id);
      setLoading(false);
    });
  }, []);

  const profiled = FEEDSTOCKS.filter((f) => f.batchCount > 0);
  const feedstock = FEEDSTOCKS.find((f) => f.id === feedstockId);
  const feedstockBatches = useMemo(
    () => (batches ?? []).filter((b) => b.feedstockId === feedstockId),
    [batches, feedstockId],
  );

  const mean = feedstock ? feedstock.composition.protein.value : 0;
  const sd = feedstock ? (mean * feedstock.variabilityCv) / 100 : 1;
  const passRate =
    feedstockBatches.length > 0
      ? feedstockBatches.filter((b) => b.qc === "pass").length /
        feedstockBatches.length
      : 0;

  const controlPoints: ControlPoint[] = feedstockBatches
    .slice()
    .reverse()
    .map((b) => ({
      id: b.lot,
      label: b.sampledOn.slice(5),
      value: b.protein,
    }));

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Intelligence"
        title="Batch Fingerprinting"
        description="Batch-to-batch composition monitoring with statistical process control. Values are simulated indicative data."
      />

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-64 flex-1 sm:max-w-sm">
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
                {profiled.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.name} ({f.batchCount} batches)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {feedstock && (
          <Link
            to="/feedstocks/$feedstockId"
            params={{ feedstockId: feedstock.id }}
            className="flex items-center gap-1.5 text-sm text-brand-strong hover:underline"
          >
            View profile <Icon name="arrow_forward" size={14} />
          </Link>
        )}
      </div>

      {loading ? (
        <Skeleton className="h-96 rounded-xl" />
      ) : !feedstock || feedstockBatches.length === 0 ? (
        <EmptyState
          icon="fingerprint"
          title="No batches for this feedstock"
          description="Choose a feedstock with recorded batch history."
        />
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Batches"
              value={feedstockBatches.length}
              icon="inventory_2"
            />
            <StatCard
              label="Mean protein"
              value={`${fmt(mean, 1)}% DM`}
              icon="science"
            />
            <StatCard
              label="Variability (CV)"
              value={`${fmt(feedstock.variabilityCv, 1)}%`}
              icon="monitoring"
              deltaTone={feedstock.variabilityCv > 15 ? "risk" : "brand"}
            />
            <StatCard
              label="QC pass rate"
              value={`${fmt(passRate * 100, 0)}%`}
              icon="verified"
              deltaTone={
                passRate >= 0.9 ? "brand" : passRate >= 0.75 ? "amber" : "risk"
              }
            />
          </div>

          <Panel>
            <SectionHeader
              title="Protein individuals control chart"
              description="Mean and ±2σ control limits. Points outside limits are out of control and trigger investigation."
            />
            <div className="mt-4">
              <ControlChart
                points={controlPoints}
                mean={mean}
                sd={sd}
                unit="% DM"
                ariaLabel={`Protein control chart for ${feedstock.name}`}
              />
            </div>
          </Panel>

          <Panel padded={false}>
            <div className="flex items-center justify-between border-b border-hairline px-5 py-4">
              <SectionHeader
                title="Batch records"
                description="Composition values per batch, with QC verdict."
                as="h3"
              />
              <StatusPill tone="sage">
                {feedstockBatches.length} lots
              </StatusPill>
            </div>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Lot</TableHead>
                    <TableHead>Sampled</TableHead>
                    <TableHead className="text-right">Protein %</TableHead>
                    <TableHead className="text-right">z-score</TableHead>
                    <TableHead className="text-right">Moisture %</TableHead>
                    <TableHead className="text-right">Lipid %</TableHead>
                    <TableHead className="text-right">Ash %</TableHead>
                    <TableHead>QC</TableHead>
                    <TableHead>Lab</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {feedstockBatches.map((b) => {
                    const z = (b.protein - mean) / sd;
                    return (
                      <TableRow
                        key={b.lot}
                        className={Math.abs(z) > 2 ? "bg-risk-soft/30" : ""}
                      >
                        <TableCell className="type-data font-medium">
                          {b.lot}
                        </TableCell>
                        <TableCell className="type-data text-xs text-muted-foreground">
                          {b.sampledOn}
                        </TableCell>
                        <TableCell className="type-data text-right">
                          {fmt(b.protein, 2)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "type-data text-right",
                            Math.abs(z) > 2
                              ? "font-bold text-risk-ink"
                              : "text-muted-foreground",
                          )}
                        >
                          {fmt(z, 2)}
                        </TableCell>
                        <TableCell className="type-data text-right">
                          {fmt(b.moisture, 1)}
                        </TableCell>
                        <TableCell className="type-data text-right">
                          {fmt(b.lipid, 2)}
                        </TableCell>
                        <TableCell className="type-data text-right">
                          {fmt(b.ash, 2)}
                        </TableCell>
                        <TableCell>
                          <QcBadge qc={b.qc} />
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {b.lab}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </>
      )}
    </div>
  );
}

function QcBadge({ qc }: { qc: string }) {
  const cls =
    qc === "pass"
      ? "bg-mint text-on-mint"
      : qc === "review"
        ? "bg-amber-soft text-amber-ink"
        : "bg-risk-soft text-risk-ink";
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
        cls,
      )}
    >
      {qc}
    </span>
  );
}
