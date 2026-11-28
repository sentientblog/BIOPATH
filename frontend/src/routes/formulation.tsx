import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import {
  EmptyState,
  PageHeader,
  Panel,
  RangeField,
  SectionHeader,
  StatusPill,
} from "@/components/common/page";
import { ProvenanceTag } from "@/components/common/provenance";
import { RadarChart } from "@/components/charts/radar-chart";
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
import { listFeedstocks } from "@/data/api";
import { AA_REFERENCE, AMINO_ACID_LABELS } from "@/data/feedstocks";
import type { AminoAcidKey, Feedstock } from "@/data/types";
import { fmt } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/formulation")({
  component: FormulationPage,
});

/* ── Archetypes ────────────────────────────────────────────────────────────
 * Target values are indicative planning numbers for prototype purposes,
 * NOT regulatory specifications. Sourced/estimated data is labelled as such.
 */

interface Archetype {
  id: string;
  name: string;
  minProtein: number;
  /** fraction of FAO reference pattern each indispensable AA should meet */
  aaTarget: number;
  maxCostPerKg: number;
  humanFood: boolean;
  description: string;
}

const ARCHETYPES: Archetype[] = [
  {
    id: "meat-analogue",
    name: "Meat analogue",
    minProtein: 40,
    aaTarget: 0.8,
    maxCostPerKg: 6.5,
    humanFood: true,
    description:
      "High-protein structuring ingredient for extruded or hydrated meat alternatives.",
  },
  {
    id: "protein-bar",
    name: "Protein bar",
    minProtein: 25,
    aaTarget: 0.7,
    maxCostPerKg: 4.0,
    humanFood: true,
    description:
      "Blended protein base for snack bars; moderate protein, cost-sensitive.",
  },
  {
    id: "fortified-staple",
    name: "Fortified staple",
    minProtein: 15,
    aaTarget: 0.6,
    maxCostPerKg: 1.8,
    humanFood: true,
    description:
      "Partial flour replacement in breads and porridges; low cost threshold.",
  },
  {
    id: "aqua-feed",
    name: "Aquaculture feed",
    minProtein: 30,
    aaTarget: 0.75,
    maxCostPerKg: 1.2,
    humanFood: false,
    description:
      "Feed meal replacing fish meal; lysine and methionine are the key amino acids.",
  },
];

const DEFAULT_SELECTION = [
  "soy-okara",
  "sunflower-cake",
  "brewers-spent-grain",
];

function FormulationPage() {
  const [loading, setLoading] = useState(true);
  const [feedstocks, setFeedstocks] = useState<Feedstock[]>([]);
  const [archetypeId, setArchetypeId] = useState(ARCHETYPES[0].id);
  const [selected, setSelected] = useState<string[]>(DEFAULT_SELECTION);
  const [shares, setShares] = useState<Record<string, number>>({});

  useEffect(() => {
    listFeedstocks().then((data) => {
      setFeedstocks(data);
      const init: Record<string, number> = {};
      DEFAULT_SELECTION.forEach((id, i) => {
        if (data.some((f) => f.id === id)) init[id] = [50, 30, 20][i];
      });
      setShares(init);
      setLoading(false);
    });
  }, []);

  const archetype = ARCHETYPES.find((a) => a.id === archetypeId)!;

  const ingredients = selected
    .map((id) => feedstocks.find((f) => f.id === id))
    .filter((f): f is Feedstock => Boolean(f));

  // Normalize shares to 100%
  const totalShare =
    ingredients.reduce((a, f) => a + (shares[f.id] ?? 0), 0) || 1;
  const normalized = useMemo(
    () =>
      new Map(
        ingredients.map((f) => [
          f.id,
          ((shares[f.id] ?? 0) / totalShare) * 100,
        ]),
      ),
    [ingredients, shares, totalShare],
  );

  const blend = useMemo(() => {
    if (ingredients.length === 0) return null;
    let protein = 0;
    let moisture = 0;
    let lipid = 0;
    let ash = 0;
    let cost = 0;
    const aaSum: Record<string, { w: number; p: number }> = {};
    for (const f of ingredients) {
      const w = normalized.get(f.id)! / 100;
      const dm = 1 - f.composition.moisture.value / 100;
      protein += f.composition.protein.value * w * dm;
      moisture += f.composition.moisture.value * w;
      lipid += f.composition.lipid.value * w * dm;
      ash += f.composition.ash.value * w * dm;
      cost += (f.cost.value / dm) * w; // cost per t DM, as-received share
      for (const k of Object.keys(AA_REFERENCE) as AminoAcidKey[]) {
        aaSum[k] ??= { w: 0, p: 0 };
        aaSum[k].w += w * f.composition.protein.value * dm;
        // AA is g/100g protein of this feedstock
        aaSum[k].p += w * f.composition.protein.value * dm * f.aminoAcids[k];
      }
    }
    const aminoAcids = {} as Record<AminoAcidKey, number>;
    for (const k of Object.keys(AA_REFERENCE) as AminoAcidKey[]) {
      aminoAcids[k] = aaSum[k].w > 0 ? aaSum[k].p / aaSum[k].w : 0;
    }
    const ratios = (Object.keys(AA_REFERENCE) as AminoAcidKey[]).map((k) => ({
      key: k,
      ratio: aminoAcids[k] / AA_REFERENCE[k],
    }));
    const limiting = ratios.reduce((a, b) => (b.ratio < a.ratio ? b : a));

    // protein fraction of total dry matter in the blend
    const dmTotal = 100 - moisture;
    const proteinDm = dmTotal > 0 ? (protein / dmTotal) * 100 : 0;

    // Blocking flags for human-food archetypes
    const blockers = ingredients
      .flatMap((f) => f.flags)
      .filter(
        (fl) =>
          archetype.humanFood &&
          ["mycotoxin", "gossypol", "metals", "cyanogenic"].includes(fl.id),
      )
      .map((fl) => fl.label);

    // cost is USD per 100 kg as-received blend; protein is kg per 100 kg
    const proteinKg = (protein / 100) * 100; // kg protein per 100 kg as received

    return {
      protein: proteinDm,
      moisture,
      lipid,
      ash,
      cost,
      aminoAcids,
      limiting,
      ratios,
      proteinKg,
      costPerKgProtein: proteinKg > 0 ? cost / proteinKg : Infinity,
      blockers,
    };
  }, [ingredients, normalized, archetype]);

  const toggle = (id: string) => {
    setSelected((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 5) return prev;
      return [...prev, id];
    });
  };

  const setShare = (id: string, v: number) =>
    setShares((prev) => ({ ...prev, [id]: v }));

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Product & Market"
        title="Formulation Workbench"
        description="Compare product archetypes, select ingredient streams and estimate blended composition, amino-acid quality and cost. All nutritional values are simulated indicative data; pathway-level processing effects are not modelled."
      />

      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-64 flex-1 sm:max-w-xs">
          <label className="mb-1.5 block text-sm font-medium text-on-surface">
            Product archetype
          </label>
          {loading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Select value={archetypeId} onValueChange={setArchetypeId}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ARCHETYPES.map((a) => (
                  <SelectItem key={a.id} value={a.id}>
                    {a.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
        {archetype && (
          <p className="flex-1 text-sm text-muted-foreground">
            {archetype.description} Target: ≥{archetype.minProtein}% protein, ≥
            {Math.round(archetype.aaTarget * 100)}% of reference AA pattern, ≤$
            {fmt(archetype.maxCostPerKg, 2)}/kg protein.
          </p>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Ingredient selection */}
        <Panel className="space-y-4 lg:col-span-5">
          <SectionHeader
            title="Ingredients"
            description="Select up to 5 feedstock streams and set inclusion shares."
            badge={
              <StatusPill tone={selected.length >= 5 ? "amber" : "sage"}>
                {selected.length}/5
              </StatusPill>
            }
          />
          {loading ? (
            <Skeleton className="h-64" />
          ) : (
            <div className="max-h-64 space-y-1 overflow-y-auto pr-1">
              {feedstocks.map((f) => (
                <label
                  key={f.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-high",
                    !selected.includes(f.id) &&
                      selected.length >= 5 &&
                      "opacity-50",
                  )}
                >
                  <input
                    type="checkbox"
                    checked={selected.includes(f.id)}
                    disabled={!selected.includes(f.id) && selected.length >= 5}
                    onChange={() => toggle(f.id)}
                    className="size-4 accent-brand"
                  />
                  <span className="flex-1 text-sm text-on-surface">
                    {f.name}
                  </span>
                  <span className="type-data text-xs text-muted-foreground">
                    {fmt(f.composition.protein.value, 0)}% prot.
                  </span>
                </label>
              ))}
            </div>
          )}

          {ingredients.length > 0 && (
            <div className="space-y-4 border-t border-hairline pt-4">
              {ingredients.map((f) => (
                <RangeField
                  key={f.id}
                  id={`inc-${f.id}`}
                  label={f.name}
                  value={shares[f.id] ?? 0}
                  min={0}
                  max={100}
                  step={5}
                  onChange={(v) => setShare(f.id, v)}
                  format={() => `${fmt(normalized.get(f.id) ?? 0, 0)}%`}
                  hint={`Raw share ${shares[f.id] ?? 0} — normalised to 100%`}
                />
              ))}
            </div>
          )}
        </Panel>

        {/* Results */}
        <div className="space-y-6 lg:col-span-7">
          {!blend || ingredients.length === 0 ? (
            <EmptyState
              icon="biotech"
              title="No ingredients selected"
              description="Pick at least one feedstock stream to estimate the formulation."
            />
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <Metric
                  label="Protein (DM)"
                  value={`${fmt(blend.protein, 1)}%`}
                  ok={blend.protein >= archetype.minProtein}
                  target={`≥ ${archetype.minProtein}%`}
                />
                <Metric
                  label="Limiting AA"
                  value={`${AMINO_ACID_LABELS[blend.limiting.key]} ${fmt(blend.limiting.ratio, 2)}×`}
                  ok={blend.limiting.ratio >= archetype.aaTarget}
                  target={`≥ ${fmt(archetype.aaTarget, 2)}× ref`}
                />
                <Metric
                  label="Cost"
                  value={`$${fmt(blend.costPerKgProtein, 2)}/kg prot.`}
                  ok={blend.costPerKgProtein <= archetype.maxCostPerKg}
                  target={`≤ $${fmt(archetype.maxCostPerKg, 2)}`}
                />
                <Metric
                  label="Moisture"
                  value={`${fmt(blend.moisture, 0)}%`}
                  ok={blend.moisture <= 30}
                  target="≤ 30%"
                />
              </div>

              {blend.blockers.length > 0 && (
                <div className="rounded-xl border border-risk/30 bg-risk-soft/40 p-4 text-sm text-risk-ink">
                  <p className="font-semibold">Blocking risks for human food</p>
                  <p className="mt-1">
                    {blend.blockers.join(" · ")} — these ingredients carry risk
                    flags that block food use until cleared by screening.
                  </p>
                </div>
              )}

              <Panel>
                <SectionHeader
                  title="Blended amino acid profile"
                  description="Weighted by each stream's protein contribution, against the FAO (2013) adult reference."
                  badge={<ProvenanceTag kind="estimated" full />}
                />
                <div className="mt-4 grid gap-6 lg:grid-cols-2">
                  <RadarChart
                    axes={(
                      Object.keys(AMINO_ACID_LABELS) as AminoAcidKey[]
                    ).map((k) => AMINO_ACID_LABELS[k])}
                    series={[
                      {
                        label: "Blend",
                        color: "var(--brand)",
                        values: blend.ratios.map((r) =>
                          Math.min(100, r.ratio * 66),
                        ),
                      },
                    ]}
                    ariaLabel="Blended amino acid profile"
                  />
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>AA</TableHead>
                          <TableHead className="text-right">
                            g/100g prot.
                          </TableHead>
                          <TableHead className="text-right">Ref</TableHead>
                          <TableHead className="text-right">Ratio</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {blend.ratios.map(({ key, ratio }) => (
                          <TableRow
                            key={key}
                            className={
                              blend.limiting.key === key
                                ? "bg-amber-soft/40"
                                : ""
                            }
                          >
                            <TableCell>{AMINO_ACID_LABELS[key]}</TableCell>
                            <TableCell className="type-data text-right">
                              {fmt(blend.aminoAcids[key], 1)}
                            </TableCell>
                            <TableCell className="type-data text-right text-muted-foreground">
                              {fmt(AA_REFERENCE[key], 2)}
                            </TableCell>
                            <TableCell
                              className={cn(
                                "type-data text-right",
                                ratio < archetype.aaTarget
                                  ? "text-risk-ink"
                                  : "text-brand-strong",
                              )}
                            >
                              {fmt(ratio, 2)}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </Panel>

              <Panel>
                <SectionHeader
                  title="Processing constraints & trade-offs"
                  description="Heuristic guidance based on blend properties."
                />
                <ul className="mt-4 space-y-2 text-sm text-on-surface-variant">
                  {blend.moisture > 60 && (
                    <li>
                      • High moisture ({fmt(blend.moisture, 0)}%) —
                      stabilisation (drying or ensiling) required before
                      storage.
                    </li>
                  )}
                  {blend.lipid > 10 && (
                    <li>
                      • Lipid {fmt(blend.lipid, 1)}% DM — defatting recommended
                      for concentrates; oxidation risk in storage.
                    </li>
                  )}
                  {blend.protein < archetype.minProtein && (
                    <li>
                      • Protein below the {archetype.name} target — consider a
                      concentration step (extraction/fermentation) or
                      higher-protein streams.
                    </li>
                  )}
                  {blend.limiting.ratio < archetype.aaTarget && (
                    <li>
                      • {AMINO_ACID_LABELS[blend.limiting.key]} is limiting —
                      blend with a stream rich in this amino acid (e.g., sesame
                      for methionine).
                    </li>
                  )}
                  {blend.costPerKgProtein > archetype.maxCostPerKg && (
                    <li>
                      • Cost above target — increase share of lower-cost streams
                      or reduce transport distance.
                    </li>
                  )}
                  {blend.moisture <= 60 &&
                    blend.lipid <= 10 &&
                    blend.protein >= archetype.minProtein && (
                      <li>
                        • Blend meets the archetype's headline targets on
                        protein, lipid and moisture.
                      </li>
                    )}
                </ul>
              </Panel>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  ok,
  target,
}: {
  label: string;
  value: string;
  ok: boolean;
  target: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4",
        ok ? "border-brand/30 bg-mint/30" : "border-amber/40 bg-amber-soft/40",
      )}
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-1 text-lg font-bold",
          ok ? "text-brand-strong" : "text-amber-ink",
        )}
      >
        {value}
      </p>
      <p className="text-xs text-muted-foreground">target {target}</p>
    </div>
  );
}
