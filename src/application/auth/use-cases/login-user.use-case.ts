import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { TokenService } from '../../../domain/services/token.service';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

type LoginUserCommand = {
  email: string;
  password: string;
};

/**
 * Verifies credentials and returns a signed access token.
 */
@Injectable()
export class LoginUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Throws InvalidCredentialsError when email/password is incorrect.
   */
  async execute(command: LoginUserCommand) {
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) throw new InvalidCredentialsError();

    const isMatch = await this.passwordHasher.compare(
      command.password,
      user.password,
    );
    if (!isMatch) throw new InvalidCredentialsError();

    const accessToken = this.tokenService.signAccessToken({
      sub: user.id,
      email: user.email,
    });

    return { accessToken };
  }
}
