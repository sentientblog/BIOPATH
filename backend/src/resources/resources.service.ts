import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { db } from '../prisma/db.js';

export type CreateSupplierInput = {
  name: string;
  siteName: string;
  county: string;
  town?: string;
};

export type UpdateSupplierInput = Partial<CreateSupplierInput>;

export type CreateFeedstockInput = {
  name: string;
  category: string;
  description?: string;
};

export type UpdateFeedstockInput = Partial<CreateFeedstockInput>;

export type CreateBatchInput = {
  batchCode: string;
  supplierId: number;
  feedstockId: number;
  quantity: number;
  quantityUnit: string;
  collectionDate: string;
  notes?: string;
};

@Injectable()
export class ResourcesService {
  // ── Suppliers ──────────────────────────────────────────────────────────────

  async listSuppliers() {
    return db.orm.public.Supplier.include('batches').all();
  }

  async getSupplier(id: number) {
    const supplier = await db.orm.public.Supplier
      .where({ id })
      .include('batches')
      .first();
    if (!supplier) throw new NotFoundException('Supplier not found');
    return supplier;
  }

  async createSupplier(input: CreateSupplierInput) {
    if (!input.name?.trim() || !input.siteName?.trim() || !input.county?.trim()) {
      throw new BadRequestException('Name, site name and county are required');
    }
    return db.orm.public.Supplier.create({
      name: input.name.trim(),
      siteName: input.siteName.trim(),
      county: input.county.trim(),
      town: input.town?.trim() || null,
    });
  }

  async updateSupplier(id: number, input: UpdateSupplierInput) {
    const existing = await db.orm.public.Supplier.where({ id }).first();
    if (!existing) throw new NotFoundException('Supplier not found');
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name.trim();
    if (input.siteName !== undefined) patch.siteName = input.siteName.trim();
    if (input.county !== undefined) patch.county = input.county.trim();
    if (input.town !== undefined) patch.town = input.town?.trim() || null;
    if (Object.keys(patch).length === 0)
      throw new BadRequestException('No fields to update');
    return db.orm.public.Supplier.where({ id }).update(patch);
  }

  async deleteSupplier(id: number) {
    const existing = await db.orm.public.Supplier.where({ id }).first();
    if (!existing) throw new NotFoundException('Supplier not found');
    await db.orm.public.Supplier.where({ id }).delete();
  }

  // ── Feedstocks ─────────────────────────────────────────────────────────────

  async listFeedstocks(category?: string) {
    const q = db.orm.public.Feedstock.include('batches');
    if (category) return q.where({ category }).all();
    return q.all();
  }

  async getFeedstock(id: number) {
    const feedstock = await db.orm.public.Feedstock
      .where({ id })
      .include('batches')
      .first();
    if (!feedstock) throw new NotFoundException('Feedstock not found');
    return feedstock;
  }

  async createFeedstock(input: CreateFeedstockInput) {
    if (!input.name?.trim() || !input.category?.trim()) {
      throw new BadRequestException('Name and category are required');
    }
    return db.orm.public.Feedstock.create({
      name: input.name.trim(),
      category: input.category.trim(),
      description: input.description?.trim() || null,
    });
  }

  async updateFeedstock(id: number, input: UpdateFeedstockInput) {
    const existing = await db.orm.public.Feedstock.where({ id }).first();
    if (!existing) throw new NotFoundException('Feedstock not found');
    const patch: Record<string, unknown> = {};
    if (input.name !== undefined) patch.name = input.name.trim();
    if (input.category !== undefined) patch.category = input.category.trim();
    if (input.description !== undefined)
      patch.description = input.description?.trim() || null;
    if (Object.keys(patch).length === 0)
      throw new BadRequestException('No fields to update');
    return db.orm.public.Feedstock.where({ id }).update(patch);
  }

  async deleteFeedstock(id: number) {
    const existing = await db.orm.public.Feedstock.where({ id }).first();
    if (!existing) throw new NotFoundException('Feedstock not found');
    await db.orm.public.Feedstock.where({ id }).delete();
  }

  // ── Batches ────────────────────────────────────────────────────────────────

  async listBatches(supplierId?: number, feedstockId?: number) {
    let q = db.orm.public.Batch.include('supplier').include('feedstock');
    if (supplierId) q = q.where({ supplierId });
    if (feedstockId) q = q.where({ feedstockId });
    return q.all();
  }

  async getBatch(id: number) {
    const batch = await db.orm.public.Batch
      .where({ id })
      .include('supplier')
      .include('feedstock')
      .first();
    if (!batch) throw new NotFoundException('Batch not found');
    return batch;
  }

  async createBatch(input: CreateBatchInput) {
    const date = new Date(input.collectionDate);
    if (
      !input.batchCode?.trim() ||
      !Number.isInteger(input.supplierId) ||
      !Number.isInteger(input.feedstockId) ||
      !Number.isFinite(input.quantity) ||
      input.quantity <= 0 ||
      !input.quantityUnit?.trim() ||
      !input.collectionDate ||
      Number.isNaN(date.getTime())
    ) {
      throw new BadRequestException('Invalid batch details');
    }
    // Verify FK existence
    const [supplier, feedstock] = await Promise.all([
      db.orm.public.Supplier.where({ id: input.supplierId }).first(),
      db.orm.public.Feedstock.where({ id: input.feedstockId }).first(),
    ]);
    if (!supplier) throw new BadRequestException('Supplier not found');
    if (!feedstock) throw new BadRequestException('Feedstock not found');

    return db.orm.public.Batch.create({
      batchCode: input.batchCode.trim(),
      supplierId: input.supplierId,
      feedstockId: input.feedstockId,
      quantity: input.quantity,
      quantityUnit: input.quantityUnit.trim(),
      collectionDate: date,
      notes: input.notes?.trim() || null,
    });
  }

  async updateBatch(id: number, input: Partial<CreateBatchInput>) {
    const existing = await db.orm.public.Batch.where({ id }).first();
    if (!existing) throw new NotFoundException('Batch not found');
    const patch: Record<string, unknown> = {};
    if (input.batchCode !== undefined) patch.batchCode = input.batchCode.trim();
    if (input.supplierId !== undefined) patch.supplierId = input.supplierId;
    if (input.feedstockId !== undefined) patch.feedstockId = input.feedstockId;
    if (input.quantity !== undefined) patch.quantity = input.quantity;
    if (input.quantityUnit !== undefined)
      patch.quantityUnit = input.quantityUnit.trim();
    if (input.collectionDate !== undefined) {
      const d = new Date(input.collectionDate);
      if (Number.isNaN(d.getTime()))
        throw new BadRequestException('Invalid collectionDate');
      patch.collectionDate = d;
    }
    if (input.notes !== undefined) patch.notes = input.notes?.trim() || null;
    if (Object.keys(patch).length === 0)
      throw new BadRequestException('No fields to update');
    return db.orm.public.Batch.where({ id }).update(patch);
  }

  async deleteBatch(id: number) {
    const existing = await db.orm.public.Batch.where({ id }).first();
    if (!existing) throw new NotFoundException('Batch not found');
    await db.orm.public.Batch.where({ id }).delete();
  }

  // ── Dashboard stats ────────────────────────────────────────────────────────

  async getStats() {
    const [suppliers, feedstocks, batches] = await Promise.all([
      db.orm.public.Supplier.all(),
      db.orm.public.Feedstock.all(),
      db.orm.public.Batch.all(),
    ]);
    const recentBatches = [...batches]
      .sort(
        (a, b) =>
          new Date(b.collectionDate).getTime() -
          new Date(a.collectionDate).getTime(),
      )
      .slice(0, 5);
    return {
      supplierCount: suppliers.length,
      feedstockCount: feedstocks.length,
      batchCount: batches.length,
      recentBatches,
    };
  }
}
