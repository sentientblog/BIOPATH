import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ResourcesModule } from './resources/resources.module.js';
import { ReportsModule } from './reports/reports.module.js';

@Module({
  imports: [ResourcesModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}