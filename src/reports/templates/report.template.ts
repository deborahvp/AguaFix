import { Report } from '../entities/report.entity';

export function generateReportTemplate(report: Report): string {
  const severityColors = {
    low: '#FFC107',
    medium: '#FF9800',
    high: '#F44336',
  };

  const color = severityColors[report.severity] || '#9E9E9E';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
          }
          .header {
            background-color: #1976D2;
            color: white;
            padding: 20px;
            border-radius: 5px;
            text-align: center;
            margin-bottom: 20px;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
          }
          .content {
            margin: 20px 0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #eee;
          }
          td.label {
            font-weight: bold;
            width: 30%;
            background-color: #f5f5f5;
          }
          td.value {
            width: 70%;
          }
          .severity-badge {
            display: inline-block;
            background-color: ${color};
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 12px;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            text-align: center;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚨 Reporte de Fuga de Agua</h1>
          </div>

          <div class="content">
            <p>Se ha registrado un nuevo reporte de fuga de agua en la vía pública.</p>

            <table>
              <tr>
                <td class="label">ID del Reporte</td>
                <td class="value">${report.id}</td>
              </tr>
              <tr>
                <td class="label">Ubicación</td>
                <td class="value">${report.address}</td>
              </tr>
              <tr>
                <td class="label">Descripción</td>
                <td class="value">${report.description}</td>
              </tr>
              <tr>
                <td class="label">Severidad</td>
                <td class="value">
                  <span class="severity-badge">${report.severity}</span>
                </td>
              </tr>
              <tr>
                <td class="label">Teléfono de Contacto</td>
                <td class="value">${report.reporterPhone}</td>
              </tr>
              <tr>
                <td class="label">Fecha de Reporte</td>
                <td class="value">${new Date(report.createdAt).toLocaleString('es-MX')}</td>
              </tr>
            </table>

            <p style="background-color: #fff3cd; padding: 12px; border-radius: 4px; border-left: 4px solid #ffc107; margin-top: 20px;">
              ⚠️ <strong>Acción Requerida:</strong> Por favor revisar y atender este reporte lo antes posible.
            </p>
          </div>

          <div class="footer">
            <p>Este es un correo automático del Sistema de Reportes de Fugas de Agua AguaFix.<br>
            Por favor no responda a este correo.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
