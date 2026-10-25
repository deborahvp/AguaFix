import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Report } from './entities/report.entity';
import { ReportService } from './services/report.service';
import { ReportRepository } from './repositories/report.repository';
import { ReportController } from './controllers/report.controller';
import { EmailModule } from '../email/email.module';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [TypeOrmModule.forFeature([Report]), EmailModule, StorageModule],
  providers: [ReportService, ReportRepository],
  controllers: [ReportController],
  exports: [ReportService],
})
export class ReportsModule {}
