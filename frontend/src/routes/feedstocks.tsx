import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Icon } from "@/components/common/icon";
import {
  PageHeader,
  SectionHeader,
  Panel,
  EmptyState,
  StatusPill,
} from "@/components/common/page";
import { MeasureValue } from "@/components/common/provenance";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { backendApi, type LiveFeedstock } from "@/data/backend-api";
import { FEEDSTOCK_CATEGORIES, SPOTLIGHT_IDS } from "@/data/feedstocks";
import { fmtCompact } from "@/lib/format";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/feedstocks")({
  validateSearch: z.object({ q: z.string().optional() }),
  component: FeedstocksPage,
});

function FeedstocksPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState(search.q ?? "");
  const [category, setCategory] = useState<string>("all");
  const [availability, setAvailability] = useState<string>("all");
  const [sort, setSort] = useState<string>("relevance");

  const [demo, setDemo] = useState<Awaited<
    ReturnType<typeof listFeedstocks>
  > | null>(null);
  const [live, setLive] = useState<LiveFeedstock[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [liveCreated, setLiveCreated] = useState(0);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([listFeedstocks(), backendApi.feedstocks.list()])
      .then(([d, l]) => {
        if (cancelled) return;
        setDemo(d);
        setLive(l);
        setError(null);
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e.message ?? e));
        setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reload, liveCreated]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (query !== (search.q ?? ""))
        navigate({
          search: (prev) => ({ ...prev, q: query || undefined }),
          replace: true,
        });
    }, 300);
    return () => clearTimeout(t);
  }, [query, search.q, navigate]);

  const q = query.trim().toLowerCase();
  const filteredDemo = useMemo(() => {
    if (!demo) return [];
    let rows = demo.filter((f) => {
      if (category !== "all" && f.category !== category) return false;
      if (availability !== "all" && f.availability !== availability)
        return false;
      if (!q) return true;
      return (
        f.name.toLowerCase().includes(q) ||
        f.summary.toLowerCase().includes(q) ||
        f.sourceType.toLowerCase().includes(q) ||
        f.category.toLowerCase().includes(q) ||
        f.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
    if (sort === "protein")
      rows = [...rows].sort(
        (a, b) => b.composition.protein.value - a.composition.protein.value,
      );
    if (sort === "volume")
      rows = [...rows].sort(
        (a, b) => b.annualVolume.value - a.annualVolume.value,
      );
    if (sort === "name")
      rows = [...rows].sort((a, b) => a.name.localeCompare(b.name));
    return rows;
  }, [demo, q, category, availability, sort]);

  const filteredLive = useMemo(() => {
    if (!live) return [];
    if (!q) return live;
    return live.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        (f.category ?? "").toLowerCase().includes(q) ||
        (f.description ?? "").toLowerCase().includes(q),
    );
  }, [live, q]);

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Intelligence"
        title="Feedstock Explorer"
        description="Search, filter and register feedstocks. Demo profiles carry composition, amino-acid and risk data; live feedstocks are registered in the workspace database."
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <Icon name="add" size={18} />
            Register feedstock
          </Button>
        }
      />

      {/* Filters */}
      <Panel className="space-y-4">
        <div className="flex flex-wrap gap-3">
          <div className="relative min-w-0 flex-1 sm:max-w-md">
            <Icon
              name="search"
              size={18}
              className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, source, tag…"
              className="pl-9"
              aria-label="Search feedstocks"
            />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-52" aria-label="Filter by category">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {FEEDSTOCK_CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={availability} onValueChange={setAvailability}>
            <SelectTrigger className="w-40" aria-label="Filter by availability">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any availability</SelectItem>
              <SelectItem value="Year-round">Year-round</SelectItem>
              <SelectItem value="Seasonal">Seasonal</SelectItem>
              <SelectItem value="Intermittent">Intermittent</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-44" aria-label="Sort results">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Sort: Relevance</SelectItem>
              <SelectItem value="protein">Sort: Protein (high→low)</SelectItem>
              <SelectItem value="volume">Sort: Volume (high→low)</SelectItem>
              <SelectItem value="name">Sort: Name (A→Z)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Panel>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Could not load feedstocks</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Live feedstocks */}
      <section aria-label="Workspace feedstocks" className="space-y-4">
        <SectionHeader
          title="Workspace feedstocks"
          description="Registered in the live database, linked to suppliers and collection batches."
          badge={
            <StatusPill tone="sage">{filteredLive.length} live</StatusPill>
          }
        />
        {loading ? (
          <Panel>
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12" />
              ))}
            </div>
          </Panel>
        ) : filteredLive.length === 0 ? (
          <EmptyState
            icon="eco"
            title="No workspace feedstocks yet"
            description="Register a feedstock to start tracking collection batches, suppliers and traceability."
            action={
              <Button onClick={() => setDialogOpen(true)}>
                <Icon name="add" size={18} />
                Register feedstock
              </Button>
            }
          />
        ) : (
          <Panel padded={false}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Batches</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLive.map((f) => (
                    <TableRow key={f.id}>
                      <TableCell>
                        <Link
                          to="/feedstocks/$feedstockId"
                          params={{ feedstockId: String(f.id) }}
                          className="font-medium text-brand-strong hover:underline"
                        >
                          {f.name}
                        </Link>
                        {f.description && (
                          <p className="mt-0.5 max-w-md truncate text-xs text-muted-foreground">
                            {f.description}
                          </p>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{f.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <span className="type-data">
                          {f.batches?.length ?? 0}
                        </span>
                      </TableCell>
                      <TableCell className="type-data text-xs text-muted-foreground">
                        {f.createdAt
                          ? new Date(f.createdAt).toLocaleDateString("en-GB")
                          : "—"}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={async () => {
                            if (
                              !confirm(
                                `Delete feedstock "${f.name}"? This also unlinks its batches.`,
                              )
                            )
                              return;
                            await backendApi.feedstocks.remove(f.id);
                            setReload((n) => n + 1);
                          }}
                          aria-label={`Delete ${f.name}`}
                        >
                          <Icon name="delete" size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        )}
      </section>

      {/* Demo feedstock grid */}
      <section aria-label="Demo feedstock profiles" className="space-y-4">
        <SectionHeader
          title="Demo feedstock profiles"
          description="Characterised reference profiles (simulated data) used for pathway analysis and allocation."
          badge={
            <StatusPill tone="amber">{filteredDemo.length} profiles</StatusPill>
          }
        />
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-xl" />
            ))}
          </div>
        ) : filteredDemo.length === 0 ? (
          <EmptyState
            title="No feedstocks match your filters"
            description="Try clearing the search or selecting a different category."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCategory("all");
                  setAvailability("all");
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredDemo.map((f) => {
              const spotlight = SPOTLIGHT_IDS.includes(f.id);
              return (
                <Link
                  key={f.id}
                  to="/feedstocks/$feedstockId"
                  params={{ feedstockId: f.id }}
                  className="block"
                >
                  <Card
                    className={cn(
                      "group h-full cursor-pointer overflow-hidden p-0 transition-shadow hover:shadow-float",
                      spotlight && "border-brand/30",
                    )}
                  >
                    <div className="relative h-28 overflow-hidden bg-surface-high">
                      {f.image ? (
                        <img
                          src={f.image}
                          alt=""
                          className="size-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.visibility =
                              "hidden";
                          }}
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-card/95 via-card/40 to-transparent" />
                      <div className="absolute right-3 bottom-3 flex gap-1.5">
                        {spotlight && (
                          <StatusPill tone="sage">Spotlight</StatusPill>
                        )}
                        <StatusPill tone="neutral">{f.availability}</StatusPill>
                      </div>
                    </div>
                    <div className="space-y-3 p-4">
                      <div>
                        <p className="font-semibold text-on-surface group-hover:text-brand-strong">
                          {f.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {f.category}
                        </p>
                      </div>
                      <p className="line-clamp-2 text-xs text-on-surface-variant">
                        {f.summary}
                      </p>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Protein</span>
                          <MeasureValue
                            m={f.composition.protein}
                            className="text-sm"
                          />
                        </div>
                        <div>
                          <span className="text-muted-foreground">Volume</span>
                          <span className="type-data text-sm text-on-surface">
                            {fmtCompact(f.annualVolume.value)}{" "}
                            {f.annualVolume.unit}
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {f.tags.slice(0, 3).map((t) => (
                          <Badge
                            key={t}
                            variant="outline"
                            className="text-[10px]"
                          >
                            {t}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <CreateFeedstockDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={() => setLiveCreated((n) => n + 1)}
      />
    </div>
  );
}

function CreateFeedstockDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!name.trim()) return setFormError("Name is required");
    if (!category) return setFormError("Category is required");
    setSubmitting(true);
    try {
      await backendApi.feedstocks.create({
        name: name.trim(),
        category,
        description: description.trim() || undefined,
      });
      onCreated();
      onOpenChange(false);
      setName("");
      setCategory("");
      setDescription("");
    } catch (err) {
      setFormError(String((err as Error).message ?? err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register feedstock</DialogTitle>
          <DialogDescription>
            Add a feedstock to the workspace database. It can then be linked to
            suppliers and collection batches.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fs-name">Name *</Label>
            <Input
              id="fs-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coffee pulp"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fs-category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="fs-category" className="w-full">
                <SelectValue placeholder="Choose a category" />
              </SelectTrigger>
              <SelectContent>
                {FEEDSTOCK_CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fs-desc">Description</Label>
            <Textarea
              id="fs-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Origin, generation process, seasonal notes…"
              rows={3}
            />
          </div>
          {formError && (
            <p role="alert" className="text-sm text-risk-ink">
              {formError}
            </p>
          )}
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving…" : "Save feedstock"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
