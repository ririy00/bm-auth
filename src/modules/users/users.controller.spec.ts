import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { InvalidPageError } from '../../application/user/errors/invalid-page.error';
import { UserNotFoundError } from '../../application/user/errors/user-not-found.error';
import { GetCurrentUserUseCase } from '../../application/user/use-cases/get-current-user.use-case';
import { GetUsersUseCase } from '../../application/user/use-cases/get-users.use-case';
import { UsersController } from './users.controller';

describe('UsersController', () => {
  let controller: UsersController;
  let getCurrentUser: { execute: jest.Mock };
  let getUsers: { execute: jest.Mock };

  beforeEach(async () => {
    getCurrentUser = { execute: jest.fn() };
    getUsers = { execute: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: GetCurrentUserUseCase, useValue: getCurrentUser },
        { provide: GetUsersUseCase, useValue: getUsers },
      ],
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
      role: 'USER',
      createdAt: new Date('2026-02-28T00:00:00.000Z'),
      updatedAt: new Date('2026-02-28T00:00:00.000Z'),
    };
    getCurrentUser.execute.mockResolvedValue(user);

    await expect(controller.me(req)).resolves.toEqual({
      id: 'u1',
      email: 'john@test.com',
      role: 'USER',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
    expect(getCurrentUser.execute).toHaveBeenCalledWith('u1');
  });

  it('throws NotFoundException when user does not exist', async () => {
    const req = { user: { id: 'missing', email: 'missing@test.com' } } as any;
    getCurrentUser.execute.mockRejectedValue(new UserNotFoundError('missing'));

    await expect(controller.me(req)).rejects.toBeInstanceOf(NotFoundException);
  });

  it('returns paginated users for a valid page', async () => {
    const result = {
      currentPage: 2,
      maxPage: 5,
      limit: 10,
      users: [
        {
          id: 'u11',
          email: 'u11@test.com',
          role: 'USER',
          createdAt: new Date('2026-02-28T00:00:00.000Z'),
          updatedAt: new Date('2026-02-28T00:00:00.000Z'),
        },
      ],
    };
    getUsers.execute.mockResolvedValue(result);

    await expect(controller.list(2)).resolves.toEqual(result);
    expect(getUsers.execute).toHaveBeenCalledWith(2);
  });

  it('throws BadRequestException when page is invalid', async () => {
    getUsers.execute.mockRejectedValue(new InvalidPageError(0));

    await expect(controller.list(0)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
