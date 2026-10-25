import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config();

export function databaseConfig(): TypeOrmModuleOptions {
  const isProduction = process.env.NODE_ENV === 'production';

  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT ?? '5432', 10),    
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'aguafix_db',
    entities: isProduction
      ? [path.join(__dirname, '../**/*.entity.js')]
      : [path.join(__dirname, '../**/*.entity.ts')],
    migrations: isProduction
      ? [path.join(__dirname, '../database/migrations/*.js')]
      : [path.join(__dirname, '../database/migrations/*.ts')],
    synchronize: !isProduction,
    logging: process.env.NODE_ENV === 'development',
    migrationsRun: isProduction,
  };
}
