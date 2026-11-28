import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import {
  ResourcesService,
  type CreateBatchInput,
  type CreateFeedstockInput,
  type CreateSupplierInput,
  type UpdateFeedstockInput,
  type UpdateSupplierInput,
} from './resources.service.js';

@Controller('api')
export class ResourcesController {
  constructor(private readonly resources: ResourcesService) {}

  // ── Suppliers ──────────────────────────────────────────────────────────────

  @Get('suppliers')
  listSuppliers() {
    return this.resources.listSuppliers();
  }

  @Post('suppliers')
  createSupplier(@Body() body: CreateSupplierInput) {
    return this.resources.createSupplier(body);
  }

  @Get('suppliers/:id')
  getSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.resources.getSupplier(id);
  }

  @Patch('suppliers/:id')
  updateSupplier(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSupplierInput,
  ) {
    return this.resources.updateSupplier(id, body);
  }

  @Delete('suppliers/:id')
  @HttpCode(204)
  deleteSupplier(@Param('id', ParseIntPipe) id: number) {
    return this.resources.deleteSupplier(id);
  }

  // ── Feedstocks ─────────────────────────────────────────────────────────────

  @Get('feedstocks')
  listFeedstocks(@Query('category') category?: string) {
    return this.resources.listFeedstocks(category);
  }

  @Get('feedstocks/:id')
  getFeedstock(@Param('id', ParseIntPipe) id: number) {
    return this.resources.getFeedstock(id);
  }

  @Post('feedstocks')
  createFeedstock(@Body() body: CreateFeedstockInput) {
    return this.resources.createFeedstock(body);
  }

  @Patch('feedstocks/:id')
  updateFeedstock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateFeedstockInput,
  ) {
    return this.resources.updateFeedstock(id, body);
  }

  @Delete('feedstocks/:id')
  @HttpCode(204)
  deleteFeedstock(@Param('id', ParseIntPipe) id: number) {
    return this.resources.deleteFeedstock(id);
  }

  // ── Batches ────────────────────────────────────────────────────────────────

  @Get('batches')
  listBatches(
    @Query('supplierId') supplierId?: string,
    @Query('feedstockId') feedstockId?: string,
  ) {
    return this.resources.listBatches(
      supplierId ? parseInt(supplierId, 10) : undefined,
      feedstockId ? parseInt(feedstockId, 10) : undefined,
    );
  }

  @Get('batches/:id')
  getBatch(@Param('id', ParseIntPipe) id: number) {
    return this.resources.getBatch(id);
  }

  @Post('batches')
  createBatch(@Body() body: CreateBatchInput) {
    return this.resources.createBatch(body);
  }

  @Patch('batches/:id')
  updateBatch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateBatchInput>,
  ) {
    return this.resources.updateBatch(id, body);
  }

  @Delete('batches/:id')
  @HttpCode(204)
  deleteBatch(@Param('id', ParseIntPipe) id: number) {
    return this.resources.deleteBatch(id);
  }

  // ── Dashboard stats ────────────────────────────────────────────────────────

  @Get('stats')
  getStats() {
    return this.resources.getStats();
  }
}
