import { Injectable } from '@nestjs/common';
import { Report } from '../entities/report.entity';
import { ReportRepository } from '../repositories/report.repository';
import { CreateReportDto } from '../dtos/create-report.dto';
import { EmailService } from '../../email/services/email.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly reportRepository: ReportRepository,
    private readonly emailService: EmailService,
  ) {}

  async createReport(createReportDto: CreateReportDto): Promise<Report> {
    const report = await this.reportRepository.create({
      address: createReportDto.address,
      description: createReportDto.description,
      severity: createReportDto.severity,
      reporterPhone: createReportDto.reporterPhone,
      isResolved: false,
    });

    // Send email notification to maintenance crew
    await this.emailService.sendReportNotification(report);

    return report;
  }

  async getAllReports(): Promise<Report[]> {
    return this.reportRepository.findAll();
  }

  async getReportById(id: number): Promise<Report | null> {
    return this.reportRepository.findById(id);
  }

  async updateReport(id: number, updateData: Partial<Report>): Promise<Report> {
    return this.reportRepository.update(id, updateData);
  }

  async deleteReport(id: number): Promise<void> {
    return this.reportRepository.delete(id);
  }
}
