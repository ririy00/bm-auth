import { Module } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/prisma/prisma-user.repository';
import { UsersController } from './users.controller';

/**
 * Internal user persistence module.
 * Exposes UserRepository so other modules can depend on the abstraction.
 */
@Module({
  providers: [
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  controllers: [UsersController],
  exports: [UserRepository],
})
export class UsersModule {}
