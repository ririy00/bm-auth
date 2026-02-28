import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.use-case';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.use-case';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { TokenService } from '../../domain/services/token.service';
import { BcryptPasswordHasher } from '../../infrastructure/security/bcrypt-password.hasher';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt-strategy';
import { AuthController } from './auth.controller';

/**
 * Authentication module wiring:
 * - imports infra modules
 * - registers auth use-cases
 * - binds domain services to concrete implementations
 */
@Module({
  imports: [
    PrismaModule,
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'super-secret',
      signOptions: { expiresIn: '15m' },
    }),
  ],
  providers: [
    RegisterUserUseCase,
    LoginUserUseCase,
    JwtStrategy,
    { provide: PasswordHasher, useClass: BcryptPasswordHasher },
    { provide: TokenService, useClass: JwtTokenService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
