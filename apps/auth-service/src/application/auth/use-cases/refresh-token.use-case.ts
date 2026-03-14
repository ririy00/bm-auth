import { UserRepository } from '../../../domain/repositories/user.repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { TokenService } from '../../../domain/services/token.service';
import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token.error';

type RefreshTokenCommand = {
  refreshToken: string;
};

export class RefreshTokenUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokenService: TokenService,
  ) {}

  async execute(command: RefreshTokenCommand) {
    let payload: { type: string; sub: string };

    try {
      payload = this.tokenService.verifyRefreshToken(command.refreshToken);
    } catch {
      throw new InvalidRefreshTokenError();
    }

    if (payload.type !== 'refresh') {
      throw new InvalidRefreshTokenError();
    }

    const user = await this.userRepository.findById(payload.sub);
    if (!user?.refreshToken) {
      throw new InvalidRefreshTokenError();
    }

    const isMatch = await this.passwordHasher.compare(
      command.refreshToken,
      user.refreshToken,
    );
    if (!isMatch) {
      throw new InvalidRefreshTokenError();
    }

    const accessToken = this.tokenService.signAccessToken({
      sub: user.id,
      email: user.email,
    });
    const refreshToken = this.tokenService.signRefreshToken({
      sub: user.id,
      type: 'refresh',
    });
    const hashedRefreshToken = await this.passwordHasher.hash(refreshToken);

    await this.userRepository.updateRefreshToken({
      userId: user.id,
      refreshToken: hashedRefreshToken,
    });

    return { accessToken, refreshToken };
  }
}
