import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Icon } from "@/components/common/icon";
import {
  EmptyState,
  ErrorState,
  PageHeader,
  Panel,
  SectionHeader,
  StatusPill,
} from "@/components/common/page";
import { MeasureValue, ProvenanceTag } from "@/components/common/provenance";
import { RadarChart } from "@/components/charts/radar-chart";
import {
  ControlChart,
  type ControlPoint,
} from "@/components/charts/control-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeedstock } from "@/data/api";
import {
  backendApi,
  type LiveFeedstock,
  type LiveBatch,
} from "@/data/backend-api";
import { AMINO_ACID_LABELS, AA_REFERENCE } from "@/data/feedstocks";
import { rankPathways } from "@/lib/scoring";
import { aminoAcidScore } from "@/lib/scoring";
import { fmt, fmtDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feedstocks/$feedstockId")({
  component: FeedstockDetailPage,
});

const MONTH = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const FLAG_COLOR: Record<string, string> = {
  critical: "text-risk-ink bg-risk-soft border-risk/30",
  warning: "text-amber-ink bg-amber-soft border-amber/30",
  info: "text-on-surface-variant bg-surface-high border-hairline",
};

const STATUS_TONE: Record<
  string,
  React.ComponentProps<typeof StatusPill>["tone"]
> = {
  profiled: "sage",
  screening: "amber",
  pending: "neutral",
};

function FeedstockDetailPage() {
  const { feedstockId } = Route.useParams();
  const router = useRouter();

  // Try to load from demo data or live DB
  const isNumeric = /^\d+$/.test(feedstockId);

  const [demoData, setDemoData] = useState<Awaited<
    ReturnType<typeof getFeedstock>
  > | null>(null);
  const [liveData, setLiveData] = useState<{
    feedstock: LiveFeedstock;
    batches: LiveBatch[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (isNumeric) {
      Promise.all([
        backendApi.feedstocks.get(Number(feedstockId)),
        backendApi.batches.list({ feedstockId: Number(feedstockId) }),
      ])
        .then(([fs, batches]) => {
          if (cancelled) return;
          setLiveData({ feedstock: fs, batches });
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          if (cancelled) return;
          setError(String(e.message ?? e));
          setLoading(false);
        });
    } else {
      getFeedstock(feedstockId)
        .then((data) => {
          if (cancelled) return;
          if (!data) {
            setError("Feedstock not found");
            setLoading(false);
            return;
          }
          setDemoData(data);
          setError(null);
          setLoading(false);
        })
        .catch((e) => {
          if (cancelled) return;
          setError(String(e.message ?? e));
          setLoading(false);
        });
    }
    return () => {
      cancelled = true;
    };
  }, [feedstockId, isNumeric]);

  if (loading) return <DetailSkeleton />;
  if (error)
    return (
      <div className="pt-6">
        <ErrorState
          title="Feedstock not found"
          description={error}
          action={
            <Button variant="outline" onClick={() => router.history.back()}>
              Go back
            </Button>
          }
        />
      </div>
    );

  if (liveData) return <LiveFeedstockDetail data={liveData} />;
  if (demoData) return <DemoFeedstockDetail data={demoData} />;
  return null;
}

// ── Live feedstock (from DB) ───────────────────────────────────────────────

function LiveFeedstockDetail({
  data,
}: {
  data: { feedstock: LiveFeedstock; batches: LiveBatch[] };
}) {
  const { feedstock, batches } = data;

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Feedstock Explorer"
        title={feedstock.name}
        description={feedstock.description ?? feedstock.category}
        actions={
          <div className="flex gap-2">
            <Link to="/feedstocks">
              <Button variant="outline" size="sm">
                ← All feedstocks
              </Button>
            </Link>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Panel>
          <p className="mb-3 text-sm font-semibold text-on-surface">Details</p>
          <dl className="space-y-2.5 text-sm">
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Category</dt>
              <dd className="font-medium text-on-surface text-right">
                {feedstock.category}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Database ID</dt>
              <dd className="type-data text-on-surface">#{feedstock.id}</dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Registered</dt>
              <dd className="type-data text-on-surface">
                {feedstock.createdAt ? fmtDate(feedstock.createdAt) : "—"}
              </dd>
            </div>
            <div className="flex justify-between gap-2">
              <dt className="text-muted-foreground">Batches</dt>
              <dd className="type-data text-on-surface">{batches.length}</dd>
            </div>
          </dl>
        </Panel>

        <Panel className="lg:col-span-2">
          <SectionHeader
            title="Collection batches"
            description="All batches linked to this feedstock."
            badge={<StatusPill tone="sage">{batches.length}</StatusPill>}
          />
          {batches.length === 0 ? (
            <EmptyState
              className="mt-4"
              icon="inventory_2"
              title="No batches yet"
              description="Create batches in Source Intelligence to link them here."
            />
          ) : (
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch code</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batches.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.batchCode}
                      </TableCell>
                      <TableCell>{b.supplier?.name ?? "—"}</TableCell>
                      <TableCell className="type-data">
                        {b.quantity} {b.quantityUnit}
                      </TableCell>
                      <TableCell className="type-data text-xs text-muted-foreground">
                        {fmtDate(b.collectionDate)}
                      </TableCell>
                      <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                        {b.notes ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </Panel>
      </div>

      <Alert>
        <Icon name="info" size={18} />
        <AlertTitle>No composition data</AlertTitle>
        <AlertDescription>
          This feedstock is registered but has not been profiled yet. Use the{" "}
          <Link to="/fingerprinting" className="underline">
            Batch Fingerprinting
          </Link>{" "}
          module or reference a matching demo feedstock for pathway analysis.
        </AlertDescription>
      </Alert>
    </div>
  );
}

// ── Demo feedstock (from local data) ──────────────────────────────────────

function DemoFeedstockDetail({
  data,
}: {
  data: Awaited<ReturnType<typeof getFeedstock>> & object;
}) {
  const { feedstock: f, batches, evidence } = data!;
  const aaScore = aminoAcidScore(f);
  const rankings = rankPathways(f, {
    suitability: 5,
    yield: 4,
    water: 3,
    energy: 3,
    cost: 4,
    scalability: 2,
    endUse: 3,
  }).slice(0, 3);

  const controlPoints: ControlPoint[] = batches.map((b) => ({
    id: b.lot,
    label: b.sampledOn.slice(5),
    value: b.protein,
  }));
  const meanProt = f.composition.protein.value;
  const sdProt = (meanProt * f.variabilityCv) / 100;

  const aaAxes = Object.keys(AMINO_ACID_LABELS).map(
    (k) => AMINO_ACID_LABELS[k as keyof typeof AMINO_ACID_LABELS],
  );
  const aaVals = Object.keys(AMINO_ACID_LABELS).map((k) => {
    const kk = k as keyof typeof AMINO_ACID_LABELS;
    return Math.round(
      Math.min(100, (f.aminoAcids[kk] / (AA_REFERENCE[kk] * 1.5)) * 100),
    );
  });

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Feedstock Explorer"
        title={f.name}
        description={f.summary}
        actions={
          <div className="flex flex-wrap gap-2">
            <Link to="/feedstocks">
              <Button variant="outline" size="sm">
                ← All feedstocks
              </Button>
            </Link>
            <Link to="/pathways" search={{ focus: f.id }}>
              <Button size="sm">
                <Icon name="alt_route" size={18} />
                Analyse pathways
              </Button>
            </Link>
          </div>
        }
      />

      {/* Top row */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Profile card */}
        <Panel className="lg:col-span-5">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
            <div>
              <StatusPill tone={STATUS_TONE[f.status] ?? "neutral"}>
                {f.status}
              </StatusPill>
            </div>
            <div className="flex flex-wrap gap-1">
              {f.tags.map((t) => (
                <Badge key={t} variant="outline" className="text-[10px]">
                  {t}
                </Badge>
              ))}
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
            {[
              { l: "Category", v: f.category },
              { l: "Source", v: f.sourceType },
              { l: "Availability", v: f.availability },
              { l: "Transport", v: `${f.transportKm} km` },
              { l: "Batches", v: `${f.batchCount}` },
            ].map(({ l, v }) => (
              <div key={l}>
                <dt className="text-xs text-muted-foreground">{l}</dt>
                <dd className="font-medium text-on-surface">{v}</dd>
              </div>
            ))}
            <div>
              <dt className="text-xs text-muted-foreground">Annual volume</dt>
              <dd>
                <MeasureValue m={f.annualVolume} digits={0} />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Cost</dt>
              <dd>
                <MeasureValue m={f.cost} />
              </dd>
            </div>
          </dl>

          {/* Seasonality bar */}
          <div className="mt-4 space-y-1">
            <p className="text-xs text-muted-foreground">
              Seasonal availability
            </p>
            <div className="flex gap-0.5">
              {f.seasonality.map((v, i) => (
                <div
                  key={i}
                  title={MONTH[i]}
                  className="flex-1 rounded-sm transition-opacity"
                  style={{
                    height: 16,
                    background: `var(--brand)`,
                    opacity: 0.2 + v * 0.8,
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>Jan</span>
              <span>Jun</span>
              <span>Dec</span>
            </div>
          </div>

          {/* Risk flags */}
          {f.flags.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-xs text-muted-foreground">Risk flags</p>
              {f.flags.map((flag) => (
                <div
                  key={flag.id}
                  className={cn(
                    "rounded-lg border p-3 text-xs",
                    FLAG_COLOR[flag.severity],
                  )}
                >
                  <p className="font-semibold">{flag.label}</p>
                  <p className="mt-0.5 opacity-80">{flag.detail}</p>
                </div>
              ))}
            </div>
          )}
        </Panel>

        {/* Composition */}
        <Panel className="lg:col-span-7">
          <SectionHeader
            title="Proximate composition"
            badge={
              <ProvenanceTag kind={f.composition.protein.provenance} full />
            }
          />
          <div className="mt-4 space-y-3">
            {(
              [
                {
                  key: "moisture",
                  label: "Moisture",
                  m: f.composition.moisture,
                },
                {
                  key: "protein",
                  label: "Protein (DM)",
                  m: f.composition.protein,
                },
                { key: "lipid", label: "Lipid (DM)", m: f.composition.lipid },
                { key: "fibre", label: "Fibre (DM)", m: f.composition.fibre },
                { key: "ash", label: "Ash (DM)", m: f.composition.ash },
                {
                  key: "carb",
                  label: "Carbohydrate* (DM)",
                  m: f.composition.carbohydrate,
                },
              ] as const
            ).map(({ key, label, m }) => (
              <div
                key={key}
                className="grid grid-cols-[1fr_auto_auto] items-center gap-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-on-surface">
                      {label}
                    </span>
                    <MeasureValue m={m} />
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-surface-high">
                    <div
                      className="h-full rounded-full bg-brand transition-[width] duration-500"
                      style={{
                        width: `${Math.min(100, (m.value / (key === "moisture" ? 100 : 60)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            * Carbohydrate calculated by difference. All values are simulated
            indicative data.
          </p>
        </Panel>
      </div>

      <Tabs defaultValue="amino-acids">
        <TabsList>
          <TabsTrigger value="amino-acids">Amino acids</TabsTrigger>
          <TabsTrigger value="batches">
            Batch history ({batches.length})
          </TabsTrigger>
          <TabsTrigger value="pathways">Top pathways</TabsTrigger>
          <TabsTrigger value="evidence">
            Evidence ({evidence.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="amino-acids" className="mt-4">
          <Panel>
            <SectionHeader
              title="Indispensable amino acid profile"
              description="Relative to the FAO (2013) adult reference pattern. Values are simulated indicative data."
              badge={<ProvenanceTag kind={f.aminoAcidProvenance} full />}
            />
            <div className="mt-4 grid gap-6 lg:grid-cols-2">
              <div>
                <RadarChart
                  axes={aaAxes}
                  series={[
                    {
                      label: f.name,
                      color: "var(--brand)",
                      values: aaVals,
                    },
                  ]}
                  ariaLabel={`Amino acid profile of ${f.name}`}
                />
                <p className="mt-2 text-center text-xs text-muted-foreground">
                  Limiting:{" "}
                  <strong>{AMINO_ACID_LABELS[aaScore.limiting]}</strong> · DIAAS
                  proxy: {fmt(aaScore.score * 100, 0)}%
                </p>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Amino acid</TableHead>
                      <TableHead className="text-right">
                        g / 100g protein
                      </TableHead>
                      <TableHead className="text-right">Reference</TableHead>
                      <TableHead className="text-right">Ratio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {aaScore.ratios.map(({ key, ratio }) => (
                      <TableRow
                        key={key}
                        className={
                          aaScore.limiting === key ? "bg-amber-soft/40" : ""
                        }
                      >
                        <TableCell>{AMINO_ACID_LABELS[key]}</TableCell>
                        <TableCell className="type-data text-right">
                          {fmt(f.aminoAcids[key], 1)}
                        </TableCell>
                        <TableCell className="type-data text-right text-muted-foreground">
                          {fmt(AA_REFERENCE[key], 2)}
                        </TableCell>
                        <TableCell
                          className={cn(
                            "type-data text-right",
                            ratio < 1 ? "text-risk-ink" : "text-brand-strong",
                          )}
                        >
                          {fmt(ratio, 2)}
                          {aaScore.limiting === key && " ⬅ limiting"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="batches" className="mt-4">
          <Panel>
            {batches.length === 0 ? (
              <EmptyState icon="inventory_2" title="No batches recorded" />
            ) : (
              <div className="space-y-6">
                <SectionHeader
                  title="Protein control chart"
                  description="Batch-to-batch protein variation with ±2σ statistical limits."
                />
                <ControlChart
                  points={controlPoints}
                  mean={meanProt}
                  sd={sdProt}
                  unit="% DM"
                  ariaLabel={`Protein control chart for ${f.name}`}
                />
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Lot</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Protein %</TableHead>
                        <TableHead className="text-right">Moisture %</TableHead>
                        <TableHead className="text-right">Lipid %</TableHead>
                        <TableHead className="text-right">Ash %</TableHead>
                        <TableHead>QC</TableHead>
                        <TableHead>Lab</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {batches.slice(0, 20).map((b) => (
                        <TableRow key={b.lot}>
                          <TableCell className="type-data font-medium">
                            {b.lot}
                          </TableCell>
                          <TableCell className="type-data text-xs text-muted-foreground">
                            {b.sampledOn}
                          </TableCell>
                          <TableCell className="type-data text-right">
                            {fmt(b.protein, 2)}
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
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </Panel>
        </TabsContent>

        <TabsContent value="pathways" className="mt-4">
          <Panel>
            <SectionHeader
              title="Recommended conversion pathways"
              description="Heuristic ranking based on composition fit, resource intensity and scalability. Simulated estimates."
            />
            <div className="mt-4 space-y-4">
              {rankings.map((r, i) => (
                <div
                  key={r.pathway.id}
                  className="rounded-xl border border-hairline p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <span className="type-data mr-2 text-muted-foreground">
                        #{i + 1}
                      </span>
                      <span className="font-semibold text-on-surface">
                        {r.pathway.name}
                      </span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {r.pathway.family}
                      </Badge>
                    </div>
                    <span className="type-data text-lg font-bold text-brand-strong">
                      {r.total}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4">
                    {[
                      { l: "Suitability", v: `${r.suitability}%` },
                      { l: "Protein yield", v: `${r.proteinYield} kg/t DM` },
                      { l: "Water", v: `${r.water} m³/t DM` },
                      {
                        l: "Cost / kg prot.",
                        v: `$${fmt(r.costPerKgProtein, 2)}`,
                      },
                    ].map(({ l, v }) => (
                      <div key={l}>
                        <span className="text-muted-foreground">{l}: </span>
                        <span className="type-data font-medium text-on-surface">
                          {v}
                        </span>
                      </div>
                    ))}
                  </div>
                  {r.reasons.length > 0 && (
                    <ul className="mt-2 list-inside list-disc space-y-0.5 text-xs text-on-surface-variant">
                      {r.reasons.map((reason, ri) => (
                        <li key={ri}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="evidence" className="mt-4">
          <Panel>
            <SectionHeader
              title="Evidence register"
              description="Sources and provenance for data shown in this profile."
            />
            <div className="mt-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Kind</TableHead>
                    <TableHead>Scope</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {evidence.map((ev) => (
                    <TableRow key={ev.id}>
                      <TableCell className="type-data text-xs">
                        {ev.id}
                      </TableCell>
                      <TableCell>{ev.title}</TableCell>
                      <TableCell>
                        <ProvenanceTag kind={ev.kind} full />
                      </TableCell>
                      <TableCell className="max-w-xs text-xs text-muted-foreground">
                        {ev.scope}
                      </TableCell>
                      <TableCell className="type-data text-xs text-muted-foreground">
                        {ev.date}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function QcBadge({ qc }: { qc: "pass" | "review" | "fail" }) {
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

function DetailSkeleton() {
  return (
    <div className="space-y-8 pt-6">
      <div className="space-y-3">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-9 w-72" />
        <Skeleton className="h-4 w-96" />
      </div>
      <div className="grid gap-6 lg:grid-cols-12">
        <Skeleton className="h-96 rounded-xl lg:col-span-5" />
        <Skeleton className="h-96 rounded-xl lg:col-span-7" />
      </div>
    </div>
  );
}
