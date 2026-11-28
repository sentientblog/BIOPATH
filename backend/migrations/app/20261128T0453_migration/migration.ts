#!/usr/bin/env -S node
import type { Contract as Start } from '../../snapshots/418aa81839ec6b0000fad8284f99b0519ccebf0c34aff18f6450c41dd5183eee/contract';
import startContract from '../../snapshots/418aa81839ec6b0000fad8284f99b0519ccebf0c34aff18f6450c41dd5183eee/contract.json' with { type: 'json' };
import type { Contract as End } from '../../snapshots/472bb5be882adc85cb4125d7ef2c25ee1946fe6d3636bb045fe862daa4460b07/contract';
import endContract from '../../snapshots/472bb5be882adc85cb4125d7ef2c25ee1946fe6d3636bb045fe862daa4460b07/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createTable({
        schema: 'public',
        table: 'Report',
        columns: [
          col('author', 'text', {
            notNull: true,
            default: lit('Research team'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('content', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('createdAt', 'timestamptz(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
          col('feedstockId', 'int4', { codecRef: { codecId: 'pg/int4@1' } }),
          col('id', 'SERIAL', { notNull: true, codecRef: { codecId: 'pg/int4@1' } }),
          col('sections', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', 'text', {
            notNull: true,
            default: lit('Draft'),
            codecRef: { codecId: 'pg/text@1' },
          }),
          col('summary', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('title', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamptz(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamptz-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Report',
        index: 'Report_feedstockId_idx_4e9dfef4',
        columns: ['feedstockId'],
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'Report',
        foreignKey: {
          name: 'Report_feedstockId_fkey',
          columns: ['feedstockId'],
          references: { schema: 'public', table: 'Feedstock', columns: ['id'] },
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
