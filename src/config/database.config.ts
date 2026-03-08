/** * Database configuration module.
 * This module provides functions to retrieve database configuration values from environment variables.
 */

/**
 * Retrieves the database URL from environment variables.
 * @returns {string | undefined} The database URL if set, otherwise undefined.
 */
export const getDatabaseUrl = (): string | undefined =>
  process.env.DATABASE_URL;
