import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Report } from '../../reports/entities/report.entity';
import { generateReportTemplate } from '../../reports/templates/report.template';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT) || 587,
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

  async sendReportNotification(report: Report): Promise<void> {
    const template = generateReportTemplate(report);
    const subject = `[AguaFix] Nuevo reporte de fuga - ID: ${report.id}`;
    const maintenanceEmail = process.env.MAINTENANCE_EMAIL || 'mantenimiento@municipio.gov.mx';

    await this.sendEmail(maintenanceEmail, subject, template);
  }
}
