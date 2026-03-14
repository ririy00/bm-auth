/**
 * Claims we include in auth access tokens.
 */
export type AccessTokenPayload = {
  sub: string;
  email: string;
};

/**
 * Claims we include in refresh tokens.
 */
export type RefreshTokenPayload = {
  sub: string;
  type: 'refresh';
};

/**
 * Domain contract for token generation.
 */
export abstract class TokenService {
  /**
   * Create a signed access token for a user payload.
   */
  abstract signAccessToken(payload: AccessTokenPayload): string;

  /**
   * Create a signed refresh token for a user payload.
   */
  abstract signRefreshToken(payload: RefreshTokenPayload): string;

  /**
   * Validate and decode a refresh token.
   */
  abstract verifyRefreshToken(token: string): RefreshTokenPayload;
}
