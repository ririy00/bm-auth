import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.use-case';
import { RefreshTokenUseCase } from '../../application/auth/use-cases/refresh-token.use-case';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.use-case';
import { jwtModuleOptions } from '../../config/jwt.config';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PasswordHasher } from '../../domain/services/password-hasher';
import { TokenService } from '../../domain/services/token.service';
import { BcryptPasswordHasher } from '../../infrastructure/security/bcrypt-password.hasher';
import { JwtTokenService } from '../../infrastructure/security/jwt-token.service';
import { UsersPersistenceModule } from '../users/users-persistence.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';

/**
 * Authentication module wiring:
 * - imports infra modules
 * - registers auth use-cases
 * - binds domain services to concrete implementations
 */
@Module({
  imports: [
    UsersPersistenceModule,
    PassportModule,
    JwtModule.register(jwtModuleOptions()),
  ],
  providers: [
    {
      provide: RegisterUserUseCase,
      inject: [UserRepository, PasswordHasher],
      useFactory: (
        userRepository: UserRepository,
        passwordHasher: PasswordHasher,
      ) => new RegisterUserUseCase(userRepository, passwordHasher),
    },
    {
      provide: LoginUserUseCase,
      inject: [UserRepository, PasswordHasher, TokenService],
      useFactory: (
        userRepository: UserRepository,
        passwordHasher: PasswordHasher,
        tokenService: TokenService,
      ) => new LoginUserUseCase(userRepository, passwordHasher, tokenService),
    },
    {
      provide: RefreshTokenUseCase,
      inject: [UserRepository, PasswordHasher, TokenService],
      useFactory: (
        userRepository: UserRepository,
        passwordHasher: PasswordHasher,
        tokenService: TokenService,
      ) =>
        new RefreshTokenUseCase(
          userRepository,
          passwordHasher,
          tokenService,
        ),
    },
    JwtStrategy,
    { provide: PasswordHasher, useClass: BcryptPasswordHasher },
    { provide: TokenService, useClass: JwtTokenService },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
