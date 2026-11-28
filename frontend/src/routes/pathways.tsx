import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Icon } from "@/components/common/icon";
import {
  EmptyState,
  PageHeader,
  Panel,
  RangeField,
  ScoreBar,
  SectionHeader,
  SegmentedControl,
  scoreTone,
} from "@/components/common/page";
import { ProvenanceTag } from "@/components/common/provenance";
import { RadarChart } from "@/components/charts/radar-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { listFeedstocks } from "@/data/api";
import { PATHWAYS } from "@/data/pathways";
import {
  rankPathways,
  CRITERIA,
  DEFAULT_WEIGHTS,
  type Weights,
  type RankedPathway,
} from "@/lib/scoring";
import type { EndUseSector, Feedstock } from "@/data/types";
import { fmt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pathways")({
  validateSearch: z.object({ focus: z.string().optional() }),
  component: PathwaysPage,
});

const SECTORS: Array<{ value: EndUseSector | "Any"; label: string }> = [
  { value: "Any", label: "Any sector" },
  { value: "Human food", label: "Human food" },
  { value: "Animal feed", label: "Animal feed" },
  { value: "Pet food", label: "Pet food" },
  { value: "Industrial", label: "Industrial" },
];

const CAPEX_COLOR = {
  Low: "text-brand-strong",
  Medium: "text-amber-ink",
  High: "text-risk-ink",
};
const TRL_COLOR = (n: number) =>
  n >= 7
    ? "bg-mint text-on-mint"
    : n >= 5
      ? "bg-amber-soft text-amber-ink"
      : "bg-surface-high text-on-surface-variant";

function PathwaysPage() {
  const { focus } = Route.useSearch();

  const [feedstocks, setFeedstocks] = useState<Feedstock[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedstockId, setFeedstockId] = useState<string>(focus ?? "");
  const [sector, setSector] = useState<EndUseSector | "Any">("Any");
  const [weights, setWeights] = useState<Weights>({ ...DEFAULT_WEIGHTS });
  const [view, setView] = useState<"table" | "radar">("table");

  useEffect(() => {
    listFeedstocks().then((data) => {
      setFeedstocks(data);
      if (!feedstockId && data.length > 0) setFeedstockId(data[0].id);
      setLoading(false);
    });
    // feedstockId intentionally excluded: we only want to set a default on
    // the initial data load; subsequent feedstockId changes come from the user.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const feedstock = feedstocks.find((f) => f.id === feedstockId);

  const rankings: RankedPathway[] = useMemo(() => {
    if (!feedstock) return [];
    return rankPathways(feedstock, weights, sector);
  }, [feedstock, weights, sector]);

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Bioconversion"
        title="Pathway Optimizer"
        description="Rank conversion pathways against a chosen feedstock using weighted multi-criteria scoring. Estimates are heuristic — not engineering data."
      />

      {/* Controls */}
      <Panel className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-48">
            <label className="mb-1.5 block text-sm font-medium text-on-surface">
              Feedstock
            </label>
            {loading ? (
              <Skeleton className="h-10 w-full" />
            ) : (
              <Select value={feedstockId} onValueChange={setFeedstockId}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select feedstock" />
                </SelectTrigger>
                <SelectContent>
                  {feedstocks.map((f) => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.name} · {f.category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
          <div className="min-w-40">
            <label className="mb-1.5 block text-sm font-medium text-on-surface">
              Target market
            </label>
            <Select
              value={sector}
              onValueChange={(v) => setSector(v as typeof sector)}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SECTORS.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <SegmentedControl
              label="View as"
              value={view}
              onChange={setView}
              options={[
                {
                  value: "table",
                  label: (
                    <>
                      <Icon name="table_rows" size={16} />
                      Table
                    </>
                  ),
                },
                {
                  value: "radar",
                  label: (
                    <>
                      <Icon name="radar" size={16} />
                      Radar
                    </>
                  ),
                },
              ]}
            />
          </div>
        </div>

        {/* Weights */}
        <Accordion type="single" collapsible>
          <AccordionItem value="weights" className="border-none">
            <AccordionTrigger className="text-sm font-medium text-on-surface-variant hover:no-underline">
              Scoring weights
            </AccordionTrigger>
            <AccordionContent>
              <div className="mt-2 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {CRITERIA.map((c) => (
                  <RangeField
                    key={c.id}
                    id={`w-${c.id}`}
                    label={c.label}
                    hint={c.hint}
                    value={weights[c.id]}
                    min={0}
                    max={10}
                    step={1}
                    onChange={(v) =>
                      setWeights((prev) => ({ ...prev, [c.id]: v }))
                    }
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="mt-3"
                onClick={() => setWeights({ ...DEFAULT_WEIGHTS })}
              >
                Reset to defaults
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Panel>

      {!feedstock ? (
        loading ? (
          <Skeleton className="h-96 rounded-xl" />
        ) : (
          <EmptyState icon="alt_route" title="No feedstocks loaded" />
        )
      ) : (
        <div className="space-y-6">
          {/* Feedstock header */}
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
            <span className="text-sm text-muted-foreground">
              Protein {fmt(feedstock.composition.protein.value, 1)}% DM ·{" "}
              {feedstock.availability}
            </span>
            <ProvenanceTag kind={feedstock.composition.protein.provenance} />
          </div>

          {view === "table" ? (
            <PathwayTable rankings={rankings} />
          ) : (
            <PathwayRadar rankings={rankings} />
          )}
        </div>
      )}

      {/* Pathway library */}
      <section className="space-y-4">
        <SectionHeader
          title="Pathway library"
          description="All conversion pathways in the BIOPATH reference set."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PATHWAYS.map((p) => (
            <Card key={p.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-on-surface">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.family}</p>
                </div>
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                    TRL_COLOR(p.trl),
                  )}
                >
                  TRL {p.trl}
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">{p.description}</p>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                <div>
                  <span className="text-muted-foreground">
                    Product protein:{" "}
                  </span>
                  <span className="type-data font-medium">
                    {p.productProtein[0]}–{p.productProtein[1]}%
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Capex: </span>
                  <span
                    className={cn(
                      "type-data font-medium",
                      CAPEX_COLOR[p.capex],
                    )}
                  >
                    {p.capex}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Water: </span>
                  <span className="type-data font-medium">
                    {p.waterM3PerT} m³/t
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Energy: </span>
                  <span className="type-data font-medium">
                    {p.energyKwhPerT} kWh/t
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function PathwayTable({ rankings }: { rankings: RankedPathway[] }) {
  return (
    <div className="space-y-3">
      {rankings.map((r, i) => (
        <Card
          key={r.pathway.id}
          className={cn("p-5", i === 0 && "border-brand/40")}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="type-data w-5 text-center text-muted-foreground">
                #{i + 1}
              </span>
              <div>
                <p className="font-semibold text-on-surface">
                  {r.pathway.name}
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-[10px]">
                    {r.pathway.family}
                  </Badge>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium",
                      TRL_COLOR(r.pathway.trl),
                    )}
                  >
                    TRL {r.pathway.trl}
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span
                className={cn(
                  "text-2xl font-bold",
                  scoreTone(r.total) === "brand"
                    ? "text-brand-strong"
                    : scoreTone(r.total) === "amber"
                      ? "text-amber-ink"
                      : "text-risk-ink",
                )}
              >
                {r.total}
              </span>
              <p className="text-xs text-muted-foreground">composite score</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-3 lg:grid-cols-6">
            {CRITERIA.map((c) => (
              <div key={c.id}>
                <p className="mb-1 text-xs text-muted-foreground">{c.label}</p>
                <ScoreBar
                  value={r.normalized[c.id]}
                  tone={scoreTone(r.normalized[c.id])}
                  label={c.label}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-1 text-xs sm:grid-cols-4">
            {[
              { l: "Suitability", v: `${r.suitability}%` },
              { l: "Protein yield", v: `${r.proteinYield} kg/t DM` },
              { l: "Water", v: `${r.water} m³/t DM` },
              { l: "Cost / kg prot.", v: `$${fmt(r.costPerKgProtein, 2)}` },
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
        </Card>
      ))}
    </div>
  );
}

function PathwayRadar({ rankings }: { rankings: RankedPathway[] }) {
  const top3 = rankings.slice(0, 3);
  const COLORS = ["var(--brand)", "var(--forest)", "var(--amber)"];
  const axes = CRITERIA.map((c) => c.label);
  const series = top3.map((r, i) => ({
    label: r.pathway.short,
    color: COLORS[i],
    values: CRITERIA.map((c) => r.normalized[c.id]),
  }));

  return (
    <Panel>
      <SectionHeader
        title="Multi-criteria radar (top 3 pathways)"
        description="Normalised scores per criterion — wider polygon is better overall."
      />
      <div className="mt-4 flex flex-col gap-6 lg:flex-row">
        <RadarChart
          axes={axes}
          series={series}
          size={360}
          ariaLabel="Pathway comparison radar chart"
        />
        <div className="flex-1 space-y-3">
          {top3.map((r, i) => (
            <div key={r.pathway.id} className="flex items-center gap-3">
              <div
                className="size-3 rounded-sm"
                style={{ background: COLORS[i] }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-on-surface">
                    {r.pathway.short}
                  </span>
                  <span className="type-data text-brand-strong">{r.total}</span>
                </div>
                <ScoreBar
                  value={r.total}
                  tone={scoreTone(r.total)}
                  showValue={false}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  );
}
