import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { HealthController } from './health.controller';

const DEFAULT_AUTH_TARGET = 'http://localhost:3000';
const DEFAULT_PAYMENT_TARGET = 'http://localhost:3002';

const resolveTarget = (value: string | undefined, fallback: string): string =>
  value && value.length > 0 ? value : fallback;

const resolveLogLevel = (): 'debug' | 'info' | 'warn' | 'error' | 'silent' => {
  const raw = process.env.PROXY_LOG_LEVEL;
  if (
    raw === 'debug' ||
    raw === 'info' ||
    raw === 'warn' ||
    raw === 'error' ||
    raw === 'silent'
  ) {
    return raw;
  }
  return 'warn';
};

const createLogger = (
  level: 'debug' | 'info' | 'warn' | 'error' | 'silent',
): {
  info: (message: string) => void;
  warn: (message: string) => void;
  error: (message: string) => void;
} => {
  if (level === 'silent') {
    return {
      info: () => undefined,
      warn: () => undefined,
      error: () => undefined,
    };
  }

  const ranks: Record<'debug' | 'info' | 'warn' | 'error', number> = {
    debug: 10,
    info: 20,
    warn: 30,
    error: 40,
  };
  const minRank = ranks[level === 'debug' ? 'info' : level];

  return {
    info: (message: string) => {
      if (ranks.info >= minRank) {
        console.info(message);
      }
    },
    warn: (message: string) => {
      if (ranks.warn >= minRank) {
        console.warn(message);
      }
    },
    error: (message: string) => {
      if (ranks.error >= minRank) {
        console.error(message);
      }
    },
  };
};

@Module({
  controllers: [HealthController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const logLevel = resolveLogLevel();
    const logger = createLogger(logLevel);

    consumer
      .apply(
        createProxyMiddleware({
          target: resolveTarget(
            process.env.AUTH_SERVICE_URL,
            DEFAULT_AUTH_TARGET,
          ),
          changeOrigin: true,
          logger,
        }),
      )
      .forRoutes(
        { path: 'auth', method: RequestMethod.ALL },
        { path: 'auth/(.*)', method: RequestMethod.ALL },
      );

    consumer
      .apply(
        createProxyMiddleware({
          target: resolveTarget(
            process.env.PAYMENT_SERVICE_URL,
            DEFAULT_PAYMENT_TARGET,
          ),
          changeOrigin: true,
          logger,
        }),
      )
      .forRoutes(
        { path: 'payment', method: RequestMethod.ALL },
        { path: 'payment/(.*)', method: RequestMethod.ALL },
      );
  }
}
