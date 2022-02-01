import { config } from 'dotenv';
export function getEnv(name: string) {
  config();
  return process.env[name] ?? '';
}