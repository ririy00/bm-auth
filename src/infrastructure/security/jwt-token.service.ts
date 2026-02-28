import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AccessTokenPayload,
  TokenService,
} from '../../domain/services/token.service';

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
}
