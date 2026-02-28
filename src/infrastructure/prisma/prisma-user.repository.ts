import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import {
  CreateUserInput,
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
}
