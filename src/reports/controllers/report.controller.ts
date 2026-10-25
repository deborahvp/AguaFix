import {
  Controller,
  Post,
  Get,
  Body,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ReportService } from '../services/report.service';
import { CreateReportDto } from '../dtos/create-report.dto';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo', { storage: memoryStorage() }))
  async createReport(
    @Body() createReportDto: CreateReportDto,
    @UploadedFile() photo: Express.Multer.File,
  ) {
    if (!photo) {
      throw new BadRequestException('La foto de la fuga es obligatoria');
    }

    return this.reportService.createReport(createReportDto, photo);
  }

  @Get()
  async getAllReports() {
    return this.reportService.getAllReports();
  }
}