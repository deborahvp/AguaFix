import { Injectable } from '@nestjs/common';
import * as envVar from 'env-var';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EnvService {
  private env = envVar.from(process.env);

  get(key: string): any {
    return this.env.get(key).asString();
  }

  getNumber(key: string): number {
    return this.env.get(key).asInt();
  }

  getBoolean(key: string): boolean {
    return this.env.get(key).asBool();
  }
}
