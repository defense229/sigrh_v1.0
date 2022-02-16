import { config } from 'dotenv';
export function getEnv(name: string) {
  config();
  return process.env[name] ?? '';
}

export interface DF_DATA_PAGINATION {
  page?: number;
  limit?: number;
}