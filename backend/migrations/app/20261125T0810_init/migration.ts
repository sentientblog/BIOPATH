#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/418aa81839ec6b0000fad8284f99b0519ccebf0c34aff18f6450c41dd5183eee/contract';
import endContract from '../../snapshots/418aa81839ec6b0000fad8284f99b0519ccebf0c34aff18f6450c41dd5183eee/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, col, fn, primaryKey, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createTable({
        schema: 'public',
        table: 'Batch',
        columns: [
          col('batchCode', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('collectionDate', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('feedstockId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('notes', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('quantity', 'float8', { notNull: true, codecRef: { codecId: 'pg/float8@1' } }),
          col('quantityUnit', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('supplierId', 'int4', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Feedstock',
        columns: [
          col('category', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('description', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Supplier',
        columns: [
          col('county', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('siteName', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('town', 'text', { codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Batch',
        constraint: 'Batch_batchCode_key',
        columns: ['batchCode'],
      }),
      this.addUnique({
        schema: 'public',
        table: 'Feedstock',
        constraint: 'Feedstock_name_key',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Batch',
        index: 'Batch_feedstockId_idx_4e9dfef4',
        columns: ['feedstockId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Batch',
        index: 'Batch_supplierId_idx_c4d9a8b9',
        columns: ['supplierId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Batch',
        foreignKey: {
          name: 'Batch_supplierId_fkey',
          columns: ['supplierId'],
          references: { schema: 'public', table: 'Supplier', columns: ['id'] },
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Batch',
        foreignKey: {
          name: 'Batch_feedstockId_fkey',
          columns: ['feedstockId'],
          references: { schema: 'public', table: 'Feedstock', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
