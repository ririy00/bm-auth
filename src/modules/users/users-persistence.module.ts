import { Module } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { PrismaUserRepository } from '../../infrastructure/prisma/prisma-user.repository';

@Module({
  providers: [{ provide: UserRepository, useClass: PrismaUserRepository }],
  exports: [UserRepository],
})
export class UsersPersistenceModule {}
