import { InvalidRefreshTokenError } from '../errors/invalid-refresh-token.error';
import { RefreshTokenUseCase } from './refresh-token.use-case';

describe('RefreshTokenUseCase', () => {
  const user = {
    id: 'user-1',
    email: 'john@test.com',
    password: 'stored-hash',
    role: 'USER',
    refreshToken: 'stored-refresh-hash',
    createdAt: new Date('2026-03-01T00:00:00.000Z'),
    updatedAt: new Date('2026-03-01T00:00:00.000Z'),
  };

  let userRepository: {
    findById: jest.Mock;
    updateRefreshToken: jest.Mock;
  };
  let passwordHasher: { compare: jest.Mock; hash: jest.Mock };
  let tokenService: {
    verifyRefreshToken: jest.Mock;
    signAccessToken: jest.Mock;
    signRefreshToken: jest.Mock;
  };

  beforeEach(() => {
    userRepository = {
      findById: jest.fn(),
      updateRefreshToken: jest.fn(),
    };
    passwordHasher = {
      compare: jest.fn(),
      hash: jest.fn(),
    };
    tokenService = {
      verifyRefreshToken: jest.fn(),
      signAccessToken: jest.fn(),
      signRefreshToken: jest.fn(),
    };
  });

  it('rotates the refresh token and returns a new token pair', async () => {
    tokenService.verifyRefreshToken.mockReturnValue({
      sub: user.id,
      type: 'refresh',
    });
    userRepository.findById.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(true);
    tokenService.signAccessToken.mockReturnValue('next-access-token');
    tokenService.signRefreshToken.mockReturnValue('next-refresh-token');
    passwordHasher.hash.mockResolvedValue('next-refresh-hash');
    userRepository.updateRefreshToken.mockResolvedValue({
      ...user,
      refreshToken: 'next-refresh-hash',
    });

    const useCase = new RefreshTokenUseCase(
      userRepository as never,
      passwordHasher as never,
      tokenService as never,
    );

    await expect(
      useCase.execute({ refreshToken: 'current-refresh-token' }),
    ).resolves.toEqual({
      accessToken: 'next-access-token',
      refreshToken: 'next-refresh-token',
    });

    expect(tokenService.verifyRefreshToken).toHaveBeenCalledWith(
      'current-refresh-token',
    );
    expect(passwordHasher.compare).toHaveBeenCalledWith(
      'current-refresh-token',
      user.refreshToken,
    );
    expect(userRepository.updateRefreshToken).toHaveBeenCalledWith({
      userId: user.id,
      refreshToken: 'next-refresh-hash',
    });
  });

  it('throws InvalidRefreshTokenError when token verification fails', async () => {
    tokenService.verifyRefreshToken.mockImplementation(() => {
      throw new Error('jwt malformed');
    });

    const useCase = new RefreshTokenUseCase(
      userRepository as never,
      passwordHasher as never,
      tokenService as never,
    );

    await expect(
      useCase.execute({ refreshToken: 'bad-token' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError);
  });

  it('throws InvalidRefreshTokenError when stored hash does not match', async () => {
    tokenService.verifyRefreshToken.mockReturnValue({
      sub: user.id,
      type: 'refresh',
    });
    userRepository.findById.mockResolvedValue(user);
    passwordHasher.compare.mockResolvedValue(false);

    const useCase = new RefreshTokenUseCase(
      userRepository as never,
      passwordHasher as never,
      tokenService as never,
    );

    await expect(
      useCase.execute({ refreshToken: 'stolen-token' }),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError);
  });
});
