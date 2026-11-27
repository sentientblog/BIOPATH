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

export type CreateFeedstockInput = {
  name: string;
  category: string;
  description?: string;
};

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
  async listSuppliers() {
    return db.orm.public.Supplier.include('batches').all();
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

  async listFeedstocks() {
    return db.orm.public.Feedstock.include('batches').all();
  }

  async getFeedstock(id: number) {
    const feedstock = await db.orm.public.Feedstock
      .where({ id })
      .include('batches')
      .first();

    if (!feedstock) {
      throw new NotFoundException('Feedstock not found');
    }

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

  async listBatches() {
    return db.orm.public.Batch
      .include('supplier')
      .include('feedstock')
      .all();
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
}