import { Controller, Post, Get, Body } from '@nestjs/common';
import { ReportService } from '../services/report.service';
import { CreateReportDto } from '../dtos/create-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  async createReport(@Body() createReportDto: CreateReportDto) {
    return this.reportService.createReport(createReportDto);
  }

  @Get()
  async getAllReports() {
    return this.reportService.getAllReports();
  }
}
