import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let userRepository: { findById: jest.Mock };

  beforeEach(async () => {
    userRepository = { findById: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UserRepository, useValue: userRepository }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('returns current user view when user exists', async () => {
    const req = { user: { id: 'u1', email: 'john@test.com' } } as any;
    const user = {
      id: 'u1',
      email: 'john@test.com',
      password: 'hashed',
      role: 'USER',
      refreshToken: null,
      createdAt: new Date('2026-02-28T00:00:00.000Z'),
      updatedAt: new Date('2026-02-28T00:00:00.000Z'),
    };
    userRepository.findById.mockResolvedValue(user);

    await expect(controller.me(req)).resolves.toEqual({
      id: 'u1',
      email: 'john@test.com',
      role: 'USER',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    expect(userRepository.findById).toHaveBeenCalledWith('u1');
  });

  it('throws NotFoundException when user does not exist', async () => {
    const req = { user: { id: 'missing', email: 'missing@test.com' } } as any;
    userRepository.findById.mockResolvedValue(null);

    await expect(controller.me(req)).rejects.toBeInstanceOf(NotFoundException);
  });
});
