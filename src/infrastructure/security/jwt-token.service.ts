import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  RefreshTokenPayload,
  TokenService,
} from '../../domain/services/token.service';
import {
  getRefreshTokenSecret,
  getRefreshTokenTtl,
} from '../../config/jwt.config';

/**
 * Service for JWT token operations.
 *
 * @remarks
 * This service handles JWT token generation and management by delegating
 * to the underlying JwtService from the `@nestjs/jwt` package.
 */
@Injectable()
export class JwtTokenService implements TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccessToken(payload: AccessTokenPayload): string {
    return this.jwtService.sign(payload);
  }

  signRefreshToken(payload: RefreshTokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: getRefreshTokenSecret(),
      expiresIn: getRefreshTokenTtl(),
    });
  }

  verifyRefreshToken(token: string): RefreshTokenPayload {
    return this.jwtService.verify<RefreshTokenPayload>(token, {
      secret: getRefreshTokenSecret(),
    });
  }
}
