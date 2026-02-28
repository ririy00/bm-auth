import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { RegisterUserUseCase } from '../../application/auth/use-cases/register-user.use-case';
import { LoginUserUseCase } from '../../application/auth/use-cases/login-user.use-case';
import { EmailAlreadyExistsError } from '../../application/auth/errors/email-already-exists.error';
import { InvalidCredentialsError } from '../../application/auth/errors/invalid-credentials.error';
import { ConflictException, UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let registerUser: { execute: jest.Mock };
  let loginUser: { execute: jest.Mock };

  beforeEach(async () => {
    registerUser = { execute: jest.fn() };
    loginUser = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: RegisterUserUseCase, useValue: registerUser },
        { provide: LoginUserUseCase, useValue: loginUser },
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

  it('login returns access_token', async () => {
    const dto = { email: 'john@test.com', password: 'secret123' };
    loginUser.execute.mockResolvedValue({ accessToken: 'jwt-token' });

    await expect(controller.login(dto)).resolves.toEqual({
      access_token: 'jwt-token',
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
});
