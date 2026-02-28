import {
  Body,
  Controller,
  Post,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.use-case';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { EmailAlreadyExistsError } from '../../application/auth/errors/email-already-exists.error';
import { InvalidCredentialsError } from '../../application/auth/errors/invalid-credentials.error';

/**
 * HTTP entry points for authentication actions.
 */
@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUser: RegisterUserUseCase,
    private readonly loginUser: LoginUserUseCase,
  ) {}

  /**
   * Creates a new user account.
   */
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    try {
      return await this.registerUser.execute({
        email: dto.email,
        password: dto.password,
      });
    } catch (error) {
      if (error instanceof EmailAlreadyExistsError) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  /**
   * Validates credentials and returns an access token.
   */
  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const result = await this.loginUser.execute({
        email: dto.email,
        password: dto.password,
      });
      return { access_token: result.accessToken };
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        throw new UnauthorizedException(error.message);
      }
      throw error;
    }
  }
}
