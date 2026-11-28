import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Icon } from "@/components/common/icon";
import {
  EmptyState,
  PageHeader,
  Panel,
  StatusPill,
} from "@/components/common/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import {
  backendApi,
  type LiveSupplier,
  type LiveFeedstock,
  type LiveBatch,
} from "@/data/backend-api";
import { FEEDSTOCK_CATEGORIES } from "@/data/feedstocks";
import { fmtDate } from "@/lib/format";

export const Route = createFileRoute("/source-intelligence")({
  component: SourceIntelligencePage,
});

function useSourceData(reload: number) {
  const [suppliers, setSuppliers] = useState<LiveSupplier[]>([]);
  const [feedstocks, setFeedstocks] = useState<LiveFeedstock[]>([]);
  const [batches, setBatches] = useState<LiveBatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([
      backendApi.suppliers.list(),
      backendApi.feedstocks.list(),
      backendApi.batches.list(),
    ])
      .then(([s, f, b]) => {
        if (cancelled) return;
        setSuppliers(s);
        setFeedstocks(f);
        setBatches(b);
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
  }, [reload]);

  return { suppliers, feedstocks, batches, loading, error };
}

// ── Main page ──────────────────────────────────────────────────────────────

function SourceIntelligencePage() {
  const [reload, setReload] = useState(0);
  const refresh = () => setReload((n) => n + 1);
  const { suppliers, feedstocks, batches, loading, error } =
    useSourceData(reload);

  const [supplierDialogOpen, setSupplierDialogOpen] = useState(false);
  const [feedstockDialogOpen, setFeedstockDialogOpen] = useState(false);
  const [batchDialogOpen, setBatchDialogOpen] = useState(false);

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Intelligence"
        title="Source Intelligence"
        description="Register suppliers, record collection batches and maintain full traceability from field to process."
        actions={
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              onClick={() => setSupplierDialogOpen(true)}
            >
              <Icon name="business" size={18} />
              Add supplier
            </Button>
            <Button
              variant="outline"
              onClick={() => setFeedstockDialogOpen(true)}
            >
              <Icon name="eco" size={18} />
              Add feedstock
            </Button>
            <Button onClick={() => setBatchDialogOpen(true)}>
              <Icon name="add" size={18} />
              Create batch
            </Button>
          </div>
        }
      />

      {error && (
        <div
          role="alert"
          className="rounded-xl border border-risk/30 bg-risk-soft/40 p-4 text-sm text-risk-ink"
        >
          {error}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { icon: "business", label: "Suppliers", value: suppliers.length },
          { icon: "eco", label: "Feedstocks", value: feedstocks.length },
          { icon: "inventory_2", label: "Batches", value: batches.length },
        ].map((s) => (
          <Card key={s.label} className="flex items-center gap-4 p-5">
            <div className="grid size-10 place-items-center rounded-xl bg-surface-high text-brand-strong">
              <Icon name={s.icon} size={20} />
            </div>
            {loading ? (
              <Skeleton className="h-8 w-16" />
            ) : (
              <div>
                <p className="text-2xl font-bold text-on-surface">{s.value}</p>
                <p className="text-sm text-on-surface-variant">{s.label}</p>
              </div>
            )}
          </Card>
        ))}
      </div>

      <Tabs defaultValue="batches">
        <TabsList>
          <TabsTrigger value="batches">Batches ({batches.length})</TabsTrigger>
          <TabsTrigger value="suppliers">
            Suppliers ({suppliers.length})
          </TabsTrigger>
          <TabsTrigger value="feedstocks">
            Feedstocks ({feedstocks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="batches" className="mt-4">
          <BatchTable
            batches={batches}
            loading={loading}
            onDelete={async (id) => {
              await backendApi.batches.remove(id);
              toast.success("Batch deleted");
              refresh();
            }}
            onCreate={() => setBatchDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="suppliers" className="mt-4">
          <SupplierTable
            suppliers={suppliers}
            loading={loading}
            onDelete={async (id, name) => {
              if (!confirm(`Delete supplier "${name}"?`)) return;
              await backendApi.suppliers.remove(id);
              toast.success("Supplier deleted");
              refresh();
            }}
            onCreate={() => setSupplierDialogOpen(true)}
          />
        </TabsContent>

        <TabsContent value="feedstocks" className="mt-4">
          <FeedstockTable
            feedstocks={feedstocks}
            loading={loading}
            onDelete={async (id, name) => {
              if (
                !confirm(
                  `Delete feedstock "${name}"? This also removes its batches.`,
                )
              )
                return;
              await backendApi.feedstocks.remove(id);
              toast.success("Feedstock deleted");
              refresh();
            }}
            onCreate={() => setFeedstockDialogOpen(true)}
          />
        </TabsContent>
      </Tabs>

      <SupplierDialog
        open={supplierDialogOpen}
        onOpenChange={setSupplierDialogOpen}
        onCreated={refresh}
      />
      <FeedstockDialog
        open={feedstockDialogOpen}
        onOpenChange={setFeedstockDialogOpen}
        onCreated={refresh}
      />
      <BatchDialog
        open={batchDialogOpen}
        onOpenChange={setBatchDialogOpen}
        suppliers={suppliers}
        feedstocks={feedstocks}
        onCreated={refresh}
      />
    </div>
  );
}

// ── Tables ─────────────────────────────────────────────────────────────────

function BatchTable({
  batches,
  loading,
  onDelete,
  onCreate,
}: {
  batches: LiveBatch[];
  loading: boolean;
  onDelete: (id: number) => Promise<void>;
  onCreate: () => void;
}) {
  const [deleting, setDeleting] = useState<number | null>(null);

  if (loading) return <TableSkeleton />;
  if (batches.length === 0)
    return (
      <EmptyState
        icon="inventory_2"
        title="No batches yet"
        description="Record collection batches to build traceability from supplier to process."
        action={
          <Button onClick={onCreate}>
            <Icon name="add" size={18} />
            Create batch
          </Button>
        }
      />
    );

  return (
    <Panel padded={false}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch code</TableHead>
              <TableHead>Feedstock</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Collection date</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {batches.map((b) => (
              <TableRow key={b.id}>
                <TableCell className="font-medium">{b.batchCode}</TableCell>
                <TableCell>
                  {b.feedstock ? (
                    <Link
                      to="/feedstocks/$feedstockId"
                      params={{ feedstockId: String(b.feedstockId) }}
                      className="text-brand-strong hover:underline"
                    >
                      {b.feedstock.name}
                    </Link>
                  ) : (
                    `#${b.feedstockId}`
                  )}
                </TableCell>
                <TableCell>{b.supplier?.name ?? `#${b.supplierId}`}</TableCell>
                <TableCell className="type-data">
                  {b.quantity} {b.quantityUnit}
                </TableCell>
                <TableCell className="type-data text-xs text-muted-foreground">
                  {fmtDate(b.collectionDate)}
                </TableCell>
                <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                  {b.notes ?? "—"}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={deleting === b.id}
                    onClick={async () => {
                      setDeleting(b.id);
                      try {
                        await onDelete(b.id);
                      } finally {
                        setDeleting(null);
                      }
                    }}
                    aria-label={`Delete batch ${b.batchCode}`}
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
  );
}

function SupplierTable({
  suppliers,
  loading,
  onDelete,
  onCreate,
}: {
  suppliers: LiveSupplier[];
  loading: boolean;
  onDelete: (id: number, name: string) => Promise<void>;
  onCreate: () => void;
}) {
  if (loading) return <TableSkeleton />;
  if (suppliers.length === 0)
    return (
      <EmptyState
        icon="business"
        title="No suppliers registered"
        description="Add a supplier to link it with feedstocks and collection batches."
        action={
          <Button onClick={onCreate}>
            <Icon name="add" size={18} />
            Add supplier
          </Button>
        }
      />
    );

  return (
    <Panel padded={false}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Site</TableHead>
              <TableHead>County</TableHead>
              <TableHead>Town</TableHead>
              <TableHead>Batches</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {suppliers.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.name}</TableCell>
                <TableCell>{s.siteName}</TableCell>
                <TableCell>{s.county}</TableCell>
                <TableCell className="text-muted-foreground">
                  {s.town ?? "—"}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={
                      s.batches && s.batches.length > 0 ? "sage" : "neutral"
                    }
                  >
                    {s.batches?.length ?? 0}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(s.id, s.name)}
                    aria-label={`Delete supplier ${s.name}`}
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
  );
}

function FeedstockTable({
  feedstocks,
  loading,
  onDelete,
  onCreate,
}: {
  feedstocks: LiveFeedstock[];
  loading: boolean;
  onDelete: (id: number, name: string) => Promise<void>;
  onCreate: () => void;
}) {
  if (loading) return <TableSkeleton />;
  if (feedstocks.length === 0)
    return (
      <EmptyState
        icon="eco"
        title="No feedstocks registered"
        description="Register feedstocks to link them to suppliers and collection batches."
        action={
          <Button onClick={onCreate}>
            <Icon name="add" size={18} />
            Register feedstock
          </Button>
        }
      />
    );

  return (
    <Panel padded={false}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Batches</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedstocks.map((f) => (
              <TableRow key={f.id}>
                <TableCell>
                  <Link
                    to="/feedstocks/$feedstockId"
                    params={{ feedstockId: String(f.id) }}
                    className="font-medium text-brand-strong hover:underline"
                  >
                    {f.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{f.category}</Badge>
                </TableCell>
                <TableCell className="max-w-xs truncate text-xs text-muted-foreground">
                  {f.description ?? "—"}
                </TableCell>
                <TableCell>
                  <StatusPill
                    tone={
                      f.batches && f.batches.length > 0 ? "sage" : "neutral"
                    }
                  >
                    {f.batches?.length ?? 0}
                  </StatusPill>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(f.id, f.name)}
                    aria-label={`Delete feedstock ${f.name}`}
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
  );
}

// ── Dialogs ────────────────────────────────────────────────────────────────

function SupplierDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [siteName, setSiteName] = useState("");
  const [county, setCounty] = useState("");
  const [town, setTown] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !siteName.trim() || !county.trim())
      return setErr("Name, site name and county are required");
    setSubmitting(true);
    try {
      await backendApi.suppliers.create({
        name: name.trim(),
        siteName: siteName.trim(),
        county: county.trim(),
        town: town.trim() || undefined,
      });
      toast.success("Supplier registered");
      onCreated();
      onOpenChange(false);
      setName("");
      setSiteName("");
      setCounty("");
      setTown("");
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Register supplier</DialogTitle>
          <DialogDescription>
            Add a feedstock supplier. The site name identifies the specific
            collection location.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="sup-name">Organisation name *</Label>
              <Input
                id="sup-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Highland Coffee Co."
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="sup-site">Site / plant name *</Label>
              <Input
                id="sup-site"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g. Nyeri Wet Mill"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sup-county">County *</Label>
              <Input
                id="sup-county"
                value={county}
                onChange={(e) => setCounty(e.target.value)}
                placeholder="e.g. Nyeri"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="sup-town">Town</Label>
              <Input
                id="sup-town"
                value={town}
                onChange={(e) => setTown(e.target.value)}
                placeholder="e.g. Karatina"
              />
            </div>
          </div>
          {err && (
            <p role="alert" className="text-sm text-risk-ink">
              {err}
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
              {submitting ? "Saving…" : "Save supplier"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function FeedstockDialog({
  open,
  onOpenChange,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name.trim() || !category)
      return setErr("Name and category are required");
    setSubmitting(true);
    try {
      await backendApi.feedstocks.create({
        name: name.trim(),
        category,
        description: description.trim() || undefined,
      });
      toast.success("Feedstock registered");
      onCreated();
      onOpenChange(false);
      setName("");
      setCategory("");
      setDescription("");
    } catch (e) {
      setErr(String((e as Error).message ?? e));
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
            Add a feedstock to the workspace database.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="fsd-name">Name *</Label>
            <Input
              id="fsd-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Coffee pulp"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="fsd-cat">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="fsd-cat" className="w-full">
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
            <Label htmlFor="fsd-desc">Description</Label>
            <Textarea
              id="fsd-desc"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
            />
          </div>
          {err && (
            <p role="alert" className="text-sm text-risk-ink">
              {err}
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

function BatchDialog({
  open,
  onOpenChange,
  suppliers,
  feedstocks,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  suppliers: LiveSupplier[];
  feedstocks: LiveFeedstock[];
  onCreated: () => void;
}) {
  const today = new Date().toISOString().slice(0, 10);
  const [batchCode, setBatchCode] = useState("");
  const [supplierId, setSupplierId] = useState<string>("");
  const [feedstockId, setFeedstockId] = useState<string>("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("t");
  const [date, setDate] = useState(today);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!batchCode.trim()) return setErr("Batch code is required");
    if (!supplierId) return setErr("Select a supplier");
    if (!feedstockId) return setErr("Select a feedstock");
    if (!quantity || isNaN(parseFloat(quantity)) || parseFloat(quantity) <= 0)
      return setErr("Enter a positive quantity");
    setSubmitting(true);
    try {
      await backendApi.batches.create({
        batchCode: batchCode.trim(),
        supplierId: parseInt(supplierId),
        feedstockId: parseInt(feedstockId),
        quantity: parseFloat(quantity),
        quantityUnit: unit,
        collectionDate: date,
        notes: notes.trim() || undefined,
      });
      toast.success(`Batch ${batchCode} created`);
      onCreated();
      onOpenChange(false);
      setBatchCode("");
      setSupplierId("");
      setFeedstockId("");
      setQuantity("");
      setUnit("t");
      setDate(today);
      setNotes("");
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    } finally {
      setSubmitting(false);
    }
  }

  const noSuppliers = suppliers.length === 0;
  const noFeedstocks = feedstocks.length === 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create collection batch</DialogTitle>
          <DialogDescription>
            Record a collected batch. The batch code must be unique and links
            the supplier, feedstock and quantity for traceability.
          </DialogDescription>
        </DialogHeader>
        {(noSuppliers || noFeedstocks) && (
          <div className="rounded-lg border border-amber/40 bg-amber-soft px-4 py-3 text-sm text-amber-ink">
            {noSuppliers && noFeedstocks
              ? "Register at least one supplier and one feedstock first."
              : noSuppliers
                ? "Register a supplier before creating a batch."
                : "Register a feedstock before creating a batch."}
          </div>
        )}
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bc-code">Batch code *</Label>
              <Input
                id="bc-code"
                value={batchCode}
                onChange={(e) => setBatchCode(e.target.value)}
                placeholder="e.g. CP-205"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-sup">Supplier *</Label>
              <Select
                value={supplierId}
                onValueChange={setSupplierId}
                disabled={noSuppliers}
              >
                <SelectTrigger id="bc-sup" className="w-full">
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={String(s.id)}>
                      {s.name} — {s.siteName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-fs">Feedstock *</Label>
              <Select
                value={feedstockId}
                onValueChange={setFeedstockId}
                disabled={noFeedstocks}
              >
                <SelectTrigger id="bc-fs" className="w-full">
                  <SelectValue placeholder="Select feedstock" />
                </SelectTrigger>
                <SelectContent>
                  {feedstocks.map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-qty">Quantity *</Label>
              <Input
                id="bc-qty"
                type="number"
                min="0.001"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 12.5"
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bc-unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="bc-unit" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {["t", "kg", "m³", "L", "bags"].map((u) => (
                    <SelectItem key={u} value={u}>
                      {u}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bc-date">Collection date *</Label>
              <Input
                id="bc-date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="bc-notes">Notes</Label>
              <Textarea
                id="bc-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Storage conditions, moisture at collection, QC observations…"
              />
            </div>
          </div>
          {err && (
            <p role="alert" className="text-sm text-risk-ink">
              {err}
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
            <Button
              type="submit"
              disabled={submitting || noSuppliers || noFeedstocks}
            >
              {submitting ? "Saving…" : "Save batch"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function TableSkeleton() {
  return (
    <Panel className="space-y-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-10" />
      ))}
    </Panel>
  );
}
