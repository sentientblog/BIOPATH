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
} from '@nestjs/common';

import { ReportsService, type CreateReportInput } from './reports.service.js';

@Controller('api/reports')
export class ReportsController {
  constructor(private readonly reports: ReportsService) {}

  @Get()
  listReports() {
    return this.reports.listReports();
  }

  @Post()
  createReport(@Body() body: CreateReportInput) {
    return this.reports.generateReport(body);
  }

  @Get(':id')
  getReport(@Param('id', ParseIntPipe) id: number) {
    return this.reports.getReport(id);
  }

  @Patch(':id')
  updateReport(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<CreateReportInput> & { status?: string },
  ) {
    return this.reports.updateReport(id, body);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteReport(@Param('id', ParseIntPipe) id: number) {
    return this.reports.deleteReport(id);
  }
}
