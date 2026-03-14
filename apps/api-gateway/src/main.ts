import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const resolvePort = (value: string | undefined, fallback: number): number => {
  if (!value) {
    return fallback;
  }
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = resolvePort(process.env.GATEWAY_PORT, 3001);

  await app.listen(port);
}

bootstrap();
