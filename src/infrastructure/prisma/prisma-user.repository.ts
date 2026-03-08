import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import {
  CreateUserInput,
  FindUsersInput,
  UpdateRefreshTokenInput,
  UserRepository,
} from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

/**
 * Prisma implementation of the user repository contract.
 */
@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  create(data: CreateUserInput): Promise<User> {
    return this.prisma.user.create({ data });
  }

  updateRefreshToken(input: UpdateRefreshTokenInput): Promise<User> {
    return this.prisma.user.update({
      where: { id: input.userId },
      data: { refreshToken: input.refreshToken },
    });
  }

  findMany(input: FindUsersInput): Promise<User[]> {
    const skip = (input.page - 1) * input.limit;
    return this.prisma.user.findMany({
      skip,
      take: input.limit,
      orderBy: { createdAt: 'asc' },
    });
  }

  count(): Promise<number> {
    return this.prisma.user.count();
  }
}
