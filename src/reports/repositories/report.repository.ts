import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from '../entities/report.entity';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(Report)
    private readonly repository: Repository<Report>,
  ) {}

  async create(report: Partial<Report>): Promise<Report> {
    return this.repository.save(report);
  }

  async findAll(): Promise<Report[]> {
    return this.repository.find({ order: { createdAt: 'DESC' } });
  }

  async findById(id: number): Promise<Report | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: number, report: Partial<Report>): Promise<Report | null> {
    await this.repository.update(id, report);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
