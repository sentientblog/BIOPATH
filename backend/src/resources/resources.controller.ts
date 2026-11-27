import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import {
  ResourcesService,
  type CreateBatchInput,
  type CreateFeedstockInput,
  type CreateSupplierInput,
} from './resources.service.js';

@Controller('api')
export class ResourcesController {
  constructor(private readonly resources: ResourcesService) {}

  @Get('suppliers')
  listSuppliers() {
    return this.resources.listSuppliers();
  }

  @Post('suppliers')
  createSupplier(@Body() body: CreateSupplierInput) {
    return this.resources.createSupplier(body);
  }

  @Get('feedstocks')
  listFeedstocks() {
    return this.resources.listFeedstocks();
  }

  @Get('feedstocks/:id')
  getFeedstock(@Param('id', ParseIntPipe) id: number) {
    return this.resources.getFeedstock(id);
  }

  @Post('feedstocks')
  createFeedstock(@Body() body: CreateFeedstockInput) {
    return this.resources.createFeedstock(body);
  }

  @Get('batches')
  listBatches() {
    return this.resources.listBatches();
  }

  @Post('batches')
  createBatch(@Body() body: CreateBatchInput) {
    return this.resources.createBatch(body);
  }
}
