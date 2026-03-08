import { LoginUserUseCase } from './login-user.use-case';
import { InvalidCredentialsError } from '../errors/invalid-credentials.error';

describe('LoginUserUseCase', () => {
  const user = {
    id: 'user-1',
    email: 'john@test.com',
    password: 'stored-hash',
    role: 'USER',
    refreshToken: null,
    createdAt: new Date('2026-03-01T00:00:00.000Z'),
    updatedAt: new Date('2026-03-01T00:00:00.000Z'),
  };

  let userRepository: {
    findByEmail: jest.Mock;
    updateRefreshToken: jest.Mock;
  };
  let passwordHasher: { compare: jest.Mock; hash: jest.Mock };
  let tokenService: { signAccessToken: jest.Mock; signRefreshToken: jest.Mock };

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    passwordHasher = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    tokenService = {
      signAccessToken: jest.fn(),
      signRefreshToken: jest.fn(),
    };
  });

  it('returns access and refresh tokens and stores hashed refresh token', async () => {
    userRepository.findByEmail.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(true);
    tokenService.signAccessToken.mockReturnValue('access-token');
    tokenService.signRefreshToken.mockReturnValue('refresh-token');
    passwordHasher.hash.mockResolvedValue('hashed-refresh-token');
    userRepository.updateRefreshToken.mockResolvedValue({
      ...user,
      refreshToken: 'hashed-refresh-token',
    });

    const useCase = new LoginUserUseCase(
      userRepository as never,
      passwordHasher as never,
      tokenService as never,
    );

    await expect(
      useCase.execute({ email: user.email, password: 'secret123' }),
    ).resolves.toEqual({
      accessToken: 'access-token',
      refreshToken: 'refresh-token',
    });

    expect(tokenService.signAccessToken).toHaveBeenCalledWith({
      sub: user.id,
      email: user.email,
    });
    expect(tokenService.signRefreshToken).toHaveBeenCalledWith({
      sub: user.id,
      type: 'refresh',
    });
    expect(passwordHasher.hash).toHaveBeenCalledWith('refresh-token');
    expect(userRepository.updateRefreshToken).toHaveBeenCalledWith({
      userId: user.id,
      refreshToken: 'hashed-refresh-token',
    });
  });

  it('throws InvalidCredentialsError when credentials do not match', async () => {
    userRepository.findByEmail.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(false);

    const useCase = new LoginUserUseCase(
      userRepository as never,
      passwordHasher as never,
      tokenService as never,
    );

    await expect(
      useCase.execute({ email: user.email, password: 'bad-password' }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
