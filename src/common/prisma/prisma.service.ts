import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { getDatabaseUrl } from '../../config/database.config';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    /**
     * Initialize the PrismaClient with the database URL from environment variables if available.
     * This allows for flexible configuration of the database connection without hardcoding values.
     */
    const databaseUrl = getDatabaseUrl();
    super(
      databaseUrl
        ? {
            datasources: {
              db: {
                url: databaseUrl,
              },
            },
          }
        : undefined,
    );
  }

  /**
   * Connects to the database when the module is initialized.
   * This ensures that the PrismaClient is ready to handle database operations as soon as the application starts.
   */
  async onModuleInit() {
    await this.$connect();
  }
}
