import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  healthCheck() {
    return {
      status: 'ok',
      service: 'aguafix-api',
      version: '1.0.1',
      timestamp: new Date().toISOString(),
    };
  }
}
