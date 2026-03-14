import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { existsSync } from 'fs';
import { config as loadEnv } from 'dotenv';
import { join, basename, dirname } from 'path';
import { AppModule } from './app.module';

const loadEnvironment = () => {
  const cwd = process.cwd();
  const candidates: string[] = [join(cwd, '.env')];

  if (basename(cwd) === 'auth-service' && basename(dirname(cwd)) === 'apps') {
    candidates.push(join(cwd, '..', '..', '.env'));
  } else {
    candidates.push(join(cwd, 'apps', 'auth-service', '.env'));
  }

  const envPath = candidates.find((path) => existsSync(path));
  if (envPath) {
    loadEnv({ path: envPath });
  }
};

async function bootstrap() {
  loadEnvironment();
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
