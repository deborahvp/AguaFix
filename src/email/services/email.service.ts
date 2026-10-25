import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateReportDto } from '../../reports/dtos/create-report.dto';
import { generateReportTemplate } from '../../reports/templates/report.template';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT ?? '587', 10) || 587,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  async sendEmail(to: string, subject: string, template: string): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: process.env.MAIL_FROM || 'noreply@aguafix.com',
        to,
        subject,
        html: template,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  async sendReportNotification(dto: CreateReportDto, photoUrl: string): Promise<void> {
    const template = generateReportTemplate(dto, photoUrl);
    const subject = `[AguaFix] Nuevo reporte de fuga - ${dto.address}`;
    const maintenanceEmail = process.env.MAINTENANCE_EMAIL || 'mantenimiento@municipio.gov.mx';

    await this.sendEmail(maintenanceEmail, subject, template);
  }
}