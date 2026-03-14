import { defineConfig } from 'prisma/config';
import { existsSync } from 'fs';
import { config as loadEnv } from 'dotenv';
import { resolve } from 'path';

const loadEnvironment = () => {
  const cwd = process.cwd();
  const candidates = [
    resolve(cwd, '.env'),
    resolve(cwd, '..', '..', '.env'),
    resolve(cwd, '..', '..', 'apps', 'auth-service', '.env'),
  ];

  const envPath = candidates.find((path) => existsSync(path));
  if (envPath) {
    loadEnv({ path: envPath });
  }
};

loadEnvironment();

export default defineConfig({
  schema: './prisma/schema.prisma',
});
