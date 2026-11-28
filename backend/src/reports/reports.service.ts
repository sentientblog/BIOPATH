import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../prisma/db.js';

export type CreateReportInput = {
  title: string;
  type: string;
  summary?: string;
  feedstockId?: number;
  sections?: string[];
  content?: string;
  author?: string;
};

@Injectable()
export class ReportsService {
  async listReports() {
    const reports = await db.orm.public.Report
      .include('feedstock')
      .all();
    return reports.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }

  async getReport(id: number) {
    const report = await db.orm.public.Report
      .where({ id })
      .include('feedstock')
      .first();
    if (!report) throw new NotFoundException('Report not found');
    return report;
  }

  /**
   * Generate a report from live database data. Content is composed from
   * actual supplier / feedstock / batch records so every figure traces
   * back to a persisted record.
   */
  async generateReport(input: CreateReportInput) {
    if (!input.title?.trim() || !input.type?.trim()) {
      throw new BadRequestException('Title and type are required');
    }
    if (input.feedstockId !== undefined && !Number.isInteger(input.feedstockId)) {
      throw new BadRequestException('Invalid feedstockId');
    }

    const [suppliers, feedstocks, batches] = await Promise.all([
      db.orm.public.Supplier.all(),
      db.orm.public.Feedstock.all(),
      db.orm.public.Batch.all(),
    ]);

    const feedstock = input.feedstockId
      ? feedstocks.find((f) => f.id === input.feedstockId)
      : undefined;
    if (input.feedstockId && !feedstock) {
      throw new BadRequestException('Feedstock not found');
    }

    const relevantBatches = feedstock
      ? batches.filter((b) => b.feedstockId === feedstock.id)
      : batches;

    const totalQuantity = relevantBatches.reduce((a, b) => a + b.quantity, 0);
    const distinctSuppliers = new Set(relevantBatches.map((b) => b.supplierId));

    const sectionList =
      input.sections && input.sections.length > 0
        ? input.sections
        : this.defaultSections(input.type);

    const content = this.composeContent({
      type: input.type,
      feedstock,
      suppliers,
      feedstocks,
      batches: relevantBatches,
      totalQuantity,
      distinctSuppliers: distinctSuppliers.size,
      custom: input.content,
    });

    const summary =
      input.summary?.trim() ||
      this.composeSummary({
        feedstock,
        totalQuantity,
        batchCount: relevantBatches.length,
        supplierCount: distinctSuppliers.size,
      });

    return db.orm.public.Report.create({
      title: input.title.trim(),
      type: input.type.trim(),
      status: 'Draft',
      summary,
      feedstockId: feedstock?.id ?? null,
      sections: sectionList.join('|'),
      content,
      author: input.author?.trim() || 'Research team',
    });
  }

  async updateReport(
    id: number,
    input: Partial<CreateReportInput> & { status?: string },
  ) {
    const existing = await db.orm.public.Report.where({ id }).first();
    if (!existing) throw new NotFoundException('Report not found');
    const patch: Record<string, unknown> = {};
    if (input.title !== undefined) patch.title = input.title.trim();
    if (input.type !== undefined) patch.type = input.type.trim();
    if (input.status !== undefined) patch.status = input.status;
    if (input.summary !== undefined) patch.summary = input.summary;
    if (input.sections !== undefined)
      patch.sections = input.sections.join('|');
    if (input.author !== undefined) patch.author = input.author;
    if (Object.keys(patch).length === 0)
      throw new BadRequestException('No fields to update');
    return db.orm.public.Report.where({ id }).update(patch);
  }

  async deleteReport(id: number) {
    const existing = await db.orm.public.Report.where({ id }).first();
    if (!existing) throw new NotFoundException('Report not found');
    await db.orm.public.Report.where({ id }).delete();
  }

  private defaultSections(type: string): string[] {
    switch (type) {
      case 'Feedstock profile':
        return ['Source', 'Composition', 'Variability', 'Risk flags'];
      case 'Pathway comparison':
        return ['Executive summary', 'Pathway ranking', 'Assumptions'];
      case 'Batch QC summary':
        return ['QC pass rates', 'Out-of-control lots', 'Corrective actions'];
      default:
        return ['Overview', 'Data', 'Findings'];
    }
  }

  private composeSummary(x: {
    feedstock?: { name: string; category: string };
    totalQuantity: number;
    batchCount: number;
    supplierCount: number;
  }) {
    if (x.feedstock) {
      return `${x.feedstock.name}: ${x.batchCount} batch(es) totalling ${x.totalQuantity.toFixed(1)} units from ${x.supplierCount} supplier(s), drawn from live workspace records.`;
    }
    return `Workspace summary: ${x.batchCount} batch(es) across ${x.supplierCount} supplier(s) totalling ${x.totalQuantity.toFixed(1)} units, drawn from live workspace records.`;
  }

  private composeContent(x: {
    type: string;
    feedstock?: { id: number; name: string; category: string; description: string | null };
    suppliers: Array<{ id: number; name: string; siteName: string; county: string }>;
    feedstocks: Array<{ id: number; name: string; category: string }>;
    batches: Array<{
      id: number;
      batchCode: string;
      quantity: number;
      quantityUnit: string;
      collectionDate: Date;
      supplierId: number;
      notes: string | null;
    }>;
    totalQuantity: number;
    distinctSuppliers: number;
    custom?: string;
  }) {
    const lines: string[] = [];
    lines.push(`# ${x.type}`);
    lines.push('');
    lines.push(`Generated ${new Date().toISOString()} from live BIOPATH workspace records.`);
    lines.push('');
    lines.push('## Data sources');
    lines.push(
      `- Suppliers registered: ${x.suppliers.length}` +
        (x.suppliers.length
          ? ` (${x.suppliers.slice(0, 5).map((s) => `${s.name} — ${s.siteName}, ${s.county}`).join('; ')})`
          : ''),
    );
    lines.push(`- Feedstocks registered: ${x.feedstocks.length}`);
    if (x.feedstock) {
      lines.push(
        `- Report focus: ${x.feedstock.name} (${x.feedstock.category}) — ${x.feedstock.description ?? 'no description'}`,
      );
    }
    lines.push(`- Batches considered: ${x.batches.length}`);
    lines.push(`- Aggregate quantity: ${x.totalQuantity.toFixed(2)}`);
    lines.push('');
    if (x.batches.length > 0) {
      lines.push('## Batch register');
      for (const b of x.batches) {
        lines.push(
          `- ${b.batchCode}: ${b.quantity} ${b.quantityUnit}, collected ${new Date(b.collectionDate).toISOString().slice(0, 10)} (supplier #${b.supplierId})${b.notes ? ` — ${b.notes}` : ''}`,
        );
      }
      lines.push('');
    } else {
      lines.push('## Batch register');
      lines.push('- No batches recorded for the selected scope.');
      lines.push('');
    }
    if (x.custom) {
      lines.push('## Analysis');
      lines.push(x.custom);
      lines.push('');
    }
    lines.push('## Provenance');
    lines.push(
      'All counts, quantities and dates above are drawn directly from the workspace database (measured/operational records). Analytical commentary added in the application is heuristic and labelled as estimated.',
    );
    return lines.join('\n');
  }
}
