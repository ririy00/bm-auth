import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.use-case';
import { RefreshTokenUseCase } from '../../application/auth/use-cases/refresh-token.use-case';
import { EmailAlreadyExistsError } from '../../application/auth/errors/email-already-exists.error';
import { InvalidCredentialsError } from '../../application/auth/errors/invalid-credentials.error';
import { InvalidRefreshTokenError } from '../../application/auth/errors/invalid-refresh-token.error';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let registerUser: { execute: jest.Mock };
  let loginUser: { execute: jest.Mock };
  let refreshToken: { execute: jest.Mock };

  beforeEach(async () => {
    registerUser = { execute: jest.fn() };
    loginUser = { execute: jest.fn() };
    refreshToken = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: RegisterUserUseCase, useValue: registerUser },
        { provide: LoginUserUseCase, useValue: loginUser },
        { provide: RefreshTokenUseCase, useValue: refreshToken },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('register returns created user view', async () => {
    const dto = { email: 'john@test.com', password: 'secret123' };
    const createdUser = {
      id: 'u1',
      email: dto.email,
      role: 'USER',
      createdAt: new Date('2026-02-28T00:00:00.000Z'),
      updatedAt: new Date('2026-02-28T00:00:00.000Z'),
    };
    registerUser.execute.mockResolvedValue(createdUser);

    await expect(controller.register(dto)).resolves.toEqual(createdUser);
    expect(registerUser.execute).toHaveBeenCalledWith(dto);
  });

  it('register maps domain duplicate email error to ConflictException', async () => {
    const dto = { email: 'taken@test.com', password: 'secret123' };
    registerUser.execute.mockRejectedValue(
      new EmailAlreadyExistsError(dto.email),
    );

    await expect(controller.register(dto)).rejects.toBeInstanceOf(
      ConflictException,
    );
  });

  it('login returns access_token and refresh_token', async () => {
    const dto = { email: 'john@test.com', password: 'secret123' };
    loginUser.execute.mockResolvedValue({
      accessToken: 'jwt-token',
      refreshToken: 'refresh-token',
    });

    await expect(controller.login(dto)).resolves.toEqual({
      access_token: 'jwt-token',
      refresh_token: 'refresh-token',
    });
    expect(loginUser.execute).toHaveBeenCalledWith(dto);
  });

  it('login maps invalid credentials error to UnauthorizedException', async () => {
    const dto = { email: 'john@test.com', password: 'bad' };
    loginUser.execute.mockRejectedValue(new InvalidCredentialsError());

    await expect(controller.login(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('refresh returns rotated tokens', async () => {
    const dto = { refresh_token: 'refresh-token' };
    refreshToken.execute.mockResolvedValue({
      accessToken: 'next-access-token',
      refreshToken: 'next-refresh-token',
    });

    await expect(controller.refresh(dto)).resolves.toEqual({
      access_token: 'next-access-token',
      refresh_token: 'next-refresh-token',
    });
    expect(refreshToken.execute).toHaveBeenCalledWith({
      refreshToken: dto.refresh_token,
    });
  });

  it('refresh maps invalid refresh token error to UnauthorizedException', async () => {
    const dto = { refresh_token: 'bad-token' };
    refreshToken.execute.mockRejectedValue(new InvalidRefreshTokenError());

    await expect(controller.refresh(dto)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
