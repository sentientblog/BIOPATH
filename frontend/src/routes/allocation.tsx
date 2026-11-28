import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  EmptyState,
  PageHeader,
  Panel,
  RangeField,
  ScoreBar,
  SectionHeader,
  SegmentedControl,
  StatCard,
  StatusPill,
  scoreTone,
} from "@/components/common/page";
import { DemoChip } from "@/components/common/provenance";
import { GroupedBarChart } from "@/components/charts/bar-chart";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { listFeedstocks } from "@/data/api";
import { allocate, type AllocationInput } from "@/lib/scoring";
import { fmt, fmtCompact, fmtInt } from "@/lib/format";
import type { EndUseSector, Feedstock } from "@/data/types";

export const Route = createFileRoute("/allocation")({
  component: AllocationPage,
});

function AllocationPage() {
  const [feedstocks, setFeedstocks] = useState<Feedstock[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [availableShare, setAvailableShare] = useState(60);
  const [waterCap, setWaterCap] = useState(120_000);
  const [energyCap, setEnergyCap] = useState(8_000);
  const [minSuitability, setMinSuitability] = useState(40);
  const [objective, setObjective] = useState<"protein" | "water" | "cost">(
    "protein",
  );
  const [sector] = useState<EndUseSector | "Any">("Any");

  useEffect(() => {
    listFeedstocks().then((data) => {
      setFeedstocks(data);
      // Default: spotlight feedstocks
      const def = new Set(
        [
          "coffee-pulp",
          "brewers-spent-grain",
          "soy-okara",
          "cane-molasses",
          "fish-processing",
        ].filter((id) => data.some((f) => f.id === id)),
      );
      setSelected(def);
      setLoading(false);
    });
  }, []);

  const input: AllocationInput = useMemo(
    () => ({
      feedstockIds: [...selected],
      availableShare: availableShare / 100,
      waterCap,
      energyCap,
      objective,
      sector,
      minSuitability,
    }),
    [
      selected,
      availableShare,
      waterCap,
      energyCap,
      objective,
      sector,
      minSuitability,
    ],
  );

  const result = useMemo(
    () => (selected.size > 0 && feedstocks.length > 0 ? allocate(input) : null),
    [input, feedstocks, selected],
  );

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Bioconversion"
        title="Resource Allocation"
        description="Greedy allocation of feedstock volumes to pathways under water, energy and volume constraints. A transparent placeholder for an LP solver."
        actions={<DemoChip />}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Protein output"
          value={
            result ? `${fmtCompact(result.totals.protein * 1000)} kg` : "—"
          }
          icon="science"
          footnote="per year, dry-matter basis"
        />
        <StatCard
          label="Feedstock allocated"
          value={result ? `${fmtInt(result.totals.tonnesDm)} t` : "—"}
          icon="eco"
          delta={
            result
              ? `${fmt(Math.round((result.totals.tonnesDm / Math.max(1, result.totals.availableDm)) * 100))}%`
              : undefined
          }
          deltaTone="brand"
          footnote="of available dry matter"
        />
        <StatCard
          label="Water use"
          value={result ? `${fmtCompact(result.totals.water)} m³` : "—"}
          icon="water_drop"
          delta={result ? `cap ${fmtCompact(waterCap)} m³` : undefined}
          deltaTone={
            result && result.totals.water > waterCap * 0.95 ? "risk" : "muted"
          }
        />
        <StatCard
          label="Energy use"
          value={result ? `${fmtCompact(result.totals.energy)} MWh` : "—"}
          icon="bolt"
          delta={result ? `cap ${fmtCompact(energyCap)} MWh` : undefined}
          deltaTone={
            result && result.totals.energy > energyCap * 0.95 ? "risk" : "muted"
          }
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Inputs panel */}
        <Panel className="space-y-5 lg:col-span-5">
          <SectionHeader
            title="Scenario inputs"
            description="Select feedstocks and set constraints."
          />

          {loading ? (
            <Skeleton className="h-64" />
          ) : (
            <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
              {feedstocks.map((f) => (
                <label
                  key={f.id}
                  className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-high"
                >
                  <input
                    type="checkbox"
                    checked={selected.has(f.id)}
                    onChange={() => toggle(f.id)}
                    className="size-4 accent-brand"
                  />
                  <span className="flex-1 text-sm text-on-surface">
                    {f.name}
                  </span>
                  <span className="type-data text-xs text-muted-foreground">
                    {fmtCompact(f.annualVolume.value)} t/yr
                  </span>
                </label>
              ))}
            </div>
          )}

          <div className="space-y-4 border-t border-hairline pt-4">
            <RangeField
              id="alloc-share"
              label="Available share"
              value={availableShare}
              min={10}
              max={100}
              step={5}
              onChange={setAvailableShare}
              format={(v) => `${v}%`}
              hint="Fraction of each feedstock's annual volume diverted to protein production."
            />
            <RangeField
              id="alloc-water"
              label="Water cap"
              value={waterCap}
              min={20_000}
              max={500_000}
              step={10_000}
              onChange={setWaterCap}
              format={(v) => `${fmtCompact(v)} m³/yr`}
            />
            <RangeField
              id="alloc-energy"
              label="Energy cap"
              value={energyCap}
              min={1_000}
              max={50_000}
              step={500}
              onChange={setEnergyCap}
              format={(v) => `${fmtCompact(v)} MWh/yr`}
            />
            <RangeField
              id="alloc-suit"
              label="Min suitability"
              value={minSuitability}
              min={20}
              max={80}
              step={5}
              onChange={setMinSuitability}
              format={(v) => `${v}%`}
              hint="Discard feedstock × pathway pairs below this technical suitability."
            />
            <div className="space-y-2">
              <p className="text-sm font-medium text-on-surface">Objective</p>
              <SegmentedControl
                label="Optimisation objective"
                value={objective}
                onChange={setObjective}
                options={[
                  { value: "protein", label: "Max protein" },
                  { value: "water", label: "Water-efficient" },
                  { value: "cost", label: "Cost-efficient" },
                ]}
              />
            </div>
          </div>
        </Panel>

        {/* Results */}
        <div className="space-y-6 lg:col-span-7">
          {!result || result.lines.length === 0 ? (
            <EmptyState
              icon="pie_chart"
              title="No allocation"
              description={
                selected.size === 0
                  ? "Select at least one feedstock to run the allocation."
                  : "No feedstock × pathway pair meets the suitability threshold. Try lowering it."
              }
              action={
                selected.size === 0 ? null : (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setMinSuitability(Math.max(20, minSuitability - 10))
                    }
                  >
                    Lower threshold to {Math.max(20, minSuitability - 10)}%
                  </Button>
                )
              }
            />
          ) : (
            <>
              <Panel>
                <SectionHeader
                  title="Allocation result"
                  badge={
                    result.binding.length > 0 ? (
                      <StatusPill tone="amber">
                        Binding: {result.binding.join(" & ")}
                      </StatusPill>
                    ) : (
                      <StatusPill tone="sage">Within all caps</StatusPill>
                    )
                  }
                />
                <div className="mt-4 overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Feedstock</TableHead>
                        <TableHead>Pathway</TableHead>
                        <TableHead className="text-right">t DM</TableHead>
                        <TableHead className="text-right">Protein</TableHead>
                        <TableHead className="text-right">Water</TableHead>
                        <TableHead className="text-right">Suit.</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {result.lines.map((l, i) => (
                        <TableRow
                          key={`${l.feedstock.id}-${l.pathway.id}-${i}`}
                        >
                          <TableCell className="font-medium">
                            {l.feedstock.name}
                          </TableCell>
                          <TableCell>
                            <span className="text-xs text-muted-foreground">
                              {l.pathway.short}
                            </span>
                          </TableCell>
                          <TableCell className="type-data text-right">
                            {fmtInt(l.tonnesDm)}
                          </TableCell>
                          <TableCell className="type-data text-right">
                            {fmt(l.protein, 1)} t
                          </TableCell>
                          <TableCell className="type-data text-right">
                            {fmtCompact(l.water)} m³
                          </TableCell>
                          <TableCell className="text-right">
                            <ScoreBar
                              value={l.suitability}
                              tone={scoreTone(l.suitability)}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Panel>

              <Panel>
                <SectionHeader title="Protein output by feedstock" />
                <div className="mt-4">
                  <GroupedBarChart
                    ariaLabel="Protein output by feedstock"
                    categories={result.lines.map(
                      (l) => l.feedstock.name.split(" ")[0],
                    )}
                    series={[
                      {
                        key: "protein",
                        label: "Protein (t/yr)",
                        color: "var(--brand)",
                        values: result.lines.map(
                          (l) => Math.round(l.protein * 10) / 10,
                        ),
                      },
                    ]}
                    yFormat={(v) => `${v}t`}
                  />
                </div>
              </Panel>

              {result.unallocated.length > 0 && (
                <Panel>
                  <SectionHeader
                    title="Unallocated volume"
                    description="Feedstock volume that could not be allocated under the current constraints."
                  />
                  <ul className="mt-3 space-y-1.5 text-sm">
                    {result.unallocated.map((u) => (
                      <li
                        key={u.feedstock.id}
                        className="flex flex-wrap justify-between gap-2 rounded-lg bg-surface-low px-3 py-2"
                      >
                        <span className="text-on-surface">
                          {u.feedstock.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {fmtInt(u.tonnesDm)} t DM — {u.reason}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
