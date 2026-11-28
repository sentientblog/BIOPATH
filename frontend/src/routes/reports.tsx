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
  type LiveReport,
  type LiveFeedstock,
  type CreateReportPayload,
} from "@/data/backend-api";
import { REPORTS, REPORT_TEMPLATES } from "@/data/workspace";
import { fmtDate } from "@/lib/format";

export const Route = createFileRoute("/reports")({
  component: ReportsPage,
});

const REPORT_TYPES = [
  "Feedstock profile",
  "Pathway comparison",
  "Allocation scenario",
  "End-use assessment",
  "Batch QC summary",
];

const STATUS_TONE: Record<
  string,
  React.ComponentProps<typeof StatusPill>["tone"]
> = {
  Draft: "neutral",
  "In review": "amber",
  Published: "sage",
};

function ReportsPage() {
  const [liveReports, setLiveReports] = useState<LiveReport[]>([]);
  const [feedstocks, setFeedstocks] = useState<LiveFeedstock[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewReport, setViewReport] = useState<LiveReport | null>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let cancelled = false;
    Promise.all([backendApi.reports.list(), backendApi.feedstocks.list()])
      .then(([r, f]) => {
        if (cancelled) return;
        setLiveReports(r);
        setFeedstocks(f);
        setLoading(false);
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [reload]);

  async function handleDelete(id: number, title: string) {
    if (!confirm(`Delete report "${title}"?`)) return;
    await backendApi.reports.remove(id);
    toast.success("Report deleted");
    setReload((n) => n + 1);
  }

  async function handlePublish(id: number, current: string) {
    const next = current === "Published" ? "In review" : "Published";
    await backendApi.reports.update(id, { status: next });
    toast.success(`Report marked as ${next}`);
    setReload((n) => n + 1);
  }

  return (
    <div className="space-y-8 pt-6">
      <PageHeader
        eyebrow="Operations"
        title="Reports"
        description="Generate and manage workspace reports backed by live database records. Demo reports below are reference examples."
        actions={
          <Button onClick={() => setDialogOpen(true)}>
            <Icon name="add" size={18} />
            Generate report
          </Button>
        }
      />

      <Tabs defaultValue="live">
        <TabsList>
          <TabsTrigger value="live">
            Live reports ({loading ? "…" : liveReports.length})
          </TabsTrigger>
          <TabsTrigger value="demo">
            Demo examples ({REPORTS.length})
          </TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="live" className="mt-4">
          {loading ? (
            <Skeleton className="h-64 rounded-xl" />
          ) : liveReports.length === 0 ? (
            <EmptyState
              icon="assessment"
              title="No live reports yet"
              description="Generate a report to build a persistent record backed by workspace data."
              action={
                <Button onClick={() => setDialogOpen(true)}>
                  <Icon name="add" size={18} />
                  Generate report
                </Button>
              }
            />
          ) : (
            <div className="space-y-3">
              {liveReports.map((r) => (
                <Card key={r.id} className="p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-on-surface">
                          {r.title}
                        </p>
                        <StatusPill tone={STATUS_TONE[r.status] ?? "neutral"}>
                          {r.status}
                        </StatusPill>
                      </div>
                      <div className="mt-1 flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <span>{r.type}</span>
                        <span>·</span>
                        <span>{r.author}</span>
                        <span>·</span>
                        <span>{fmtDate(r.createdAt)}</span>
                        {r.feedstock && (
                          <>
                            <span>·</span>
                            <Link
                              to="/feedstocks/$feedstockId"
                              params={{ feedstockId: String(r.feedstockId) }}
                              className="text-brand-strong hover:underline"
                            >
                              {r.feedstock.name}
                            </Link>
                          </>
                        )}
                      </div>
                      <p className="mt-2 text-sm text-on-surface-variant">
                        {r.summary}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewReport(r)}
                      >
                        <Icon name="visibility" size={16} />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handlePublish(r.id, r.status)}
                        title={
                          r.status === "Published"
                            ? "Mark as In review"
                            : "Publish"
                        }
                      >
                        <Icon
                          name={
                            r.status === "Published" ? "unpublished" : "publish"
                          }
                          size={16}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(r.id, r.title)}
                        aria-label={`Delete ${r.title}`}
                      >
                        <Icon name="delete" size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="demo" className="mt-4">
          <Panel padded={false}>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Pages</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {REPORTS.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="type-data text-xs text-muted-foreground">
                        {r.id}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium text-on-surface">{r.title}</p>
                        <p className="mt-0.5 max-w-xs truncate text-xs text-muted-foreground">
                          {r.summary}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{r.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <StatusPill tone={STATUS_TONE[r.status] ?? "neutral"}>
                          {r.status}
                        </StatusPill>
                      </TableCell>
                      <TableCell className="text-sm">{r.author}</TableCell>
                      <TableCell className="type-data text-xs text-muted-foreground">
                        {r.createdOn}
                      </TableCell>
                      <TableCell className="type-data">{r.pages}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {REPORT_TEMPLATES.map((t) => (
              <Card key={t.type} className="p-4 space-y-3">
                <p className="font-semibold text-on-surface">{t.type}</p>
                <p className="text-sm text-on-surface-variant">
                  {t.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {t.sections.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs">
                      {s}
                    </Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDialogOpen(true)}
                >
                  Use template
                </Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <GenerateReportDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        feedstocks={feedstocks}
        onCreated={() => setReload((n) => n + 1)}
      />

      {viewReport && (
        <ReportViewDialog
          report={viewReport}
          onClose={() => setViewReport(null)}
        />
      )}
    </div>
  );
}

function GenerateReportDialog({
  open,
  onOpenChange,
  feedstocks,
  onCreated,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  feedstocks: LiveFeedstock[];
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("Feedstock profile");
  const [feedstockId, setFeedstockId] = useState<string>("none");
  const [author, setAuthor] = useState("Research team");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!title.trim()) return setErr("Title is required");
    setSubmitting(true);
    try {
      const payload: CreateReportPayload = {
        title: title.trim(),
        type,
        author: author.trim() || "Research team",
        content: notes.trim() || undefined,
      };
      if (feedstockId !== "none") payload.feedstockId = parseInt(feedstockId);
      await backendApi.reports.create(payload);
      toast.success("Report generated");
      onCreated();
      onOpenChange(false);
      setTitle("");
      setType("Feedstock profile");
      setFeedstockId("none");
      setNotes("");
      setAuthor("Research team");
    } catch (e) {
      setErr(String((e as Error).message ?? e));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Generate report</DialogTitle>
          <DialogDescription>
            Creates a report backed by live workspace records — suppliers,
            feedstocks, batches. All data cited traces to persisted database
            entries.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="rpt-title">Title *</Label>
            <Input
              id="rpt-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Coffee pulp — batch QC Q4 2026"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="rpt-type">Report type *</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="rpt-type" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {REPORT_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="rpt-fs">Focus feedstock</Label>
              <Select value={feedstockId} onValueChange={setFeedstockId}>
                <SelectTrigger id="rpt-fs" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">All feedstocks</SelectItem>
                  {feedstocks.map((f) => (
                    <SelectItem key={f.id} value={String(f.id)}>
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rpt-author">Author</Label>
            <Input
              id="rpt-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="rpt-notes">Analysis notes</Label>
            <Textarea
              id="rpt-notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Findings, pathway notes or recommendations to include in the report…"
              rows={4}
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
              {submitting ? "Generating…" : "Generate report"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function ReportViewDialog({
  report,
  onClose,
}: {
  report: LiveReport;
  onClose: () => void;
}) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{report.title}</DialogTitle>
          <DialogDescription>
            {report.type} · {report.author} · {fmtDate(report.createdAt)}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-semibold text-on-surface">Summary</p>
            <p className="mt-1 text-sm text-on-surface-variant">
              {report.summary}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-on-surface">Sections</p>
            <div className="mt-1 flex flex-wrap gap-1">
              {report.sections.split("|").map((s) => (
                <Badge key={s} variant="outline">
                  {s}
                </Badge>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-on-surface">
              Content
            </p>
            <pre className="whitespace-pre-wrap rounded-xl border border-hairline bg-surface-low px-4 py-3 text-xs text-on-surface-variant font-mono leading-relaxed">
              {report.content}
            </pre>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
