/**
 * Claims we include in auth access tokens.
 */
export type AccessTokenPayload = {
  sub: string;
  email: string;
};

/**
 * Domain contract for token generation.
 */
export abstract class TokenService {
  /**
   * Create a signed access token for a user payload.
   */
  abstract signAccessToken(payload: AccessTokenPayload): string;
}
