import { JwtModuleOptions } from '@nestjs/jwt';
import { SignOptions } from 'jsonwebtoken';

/**
 * JWT configuration module.
 * This module provides functions to retrieve JWT configuration values from environment variables.
 */
const DEFAULT_JWT_SECRET = 'super-secret';
const DEFAULT_ACCESS_TOKEN_TTL = '15m';
const DEFAULT_REFRESH_TOKEN_SECRET = 'super-refresh-secret';
const DEFAULT_REFRESH_TOKEN_TTL = '7d';

/**
 * Retrieves the JWT secret from environment variables.
 * @returns {string} The JWT secret if set, otherwise a default value.
 */
export const getJwtSecret = (): string =>
  process.env.JWT_SECRET || DEFAULT_JWT_SECRET;

/**
 * Retrieves the access token TTL from environment variables.
 * @returns {string} The access token TTL if set, otherwise a default value.
 */
export const getAccessTokenTtl = (): SignOptions['expiresIn'] =>
  (process.env.JWT_ACCESS_TOKEN_TTL ||
    DEFAULT_ACCESS_TOKEN_TTL) as SignOptions['expiresIn'];

/**
 * Retrieves the refresh token secret from environment variables.
 * @returns {string} The refresh token secret if set, otherwise a default value.
 */
export const getRefreshTokenSecret = (): string =>
  process.env.JWT_REFRESH_TOKEN_SECRET || DEFAULT_REFRESH_TOKEN_SECRET;

/**
 * Retrieves the refresh token TTL from environment variables.
 * @returns {string} The refresh token TTL if set, otherwise a default value.
 */
export const getRefreshTokenTtl = (): SignOptions['expiresIn'] =>
  (process.env.JWT_REFRESH_TOKEN_TTL ||
    DEFAULT_REFRESH_TOKEN_TTL) as SignOptions['expiresIn'];

/**
 * Retrieves the JWT module options for NestJS.
 * @returns {JwtModuleOptions} The JWT module options including secret and sign options.
 */
export const jwtModuleOptions = (): JwtModuleOptions => ({
  secret: getJwtSecret(),
  signOptions: { expiresIn: getAccessTokenTtl() },
});
