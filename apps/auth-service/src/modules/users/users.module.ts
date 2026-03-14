import { Module } from '@nestjs/common';
import { GetCurrentUserUseCase } from '../../application/user/use-cases/get-current-user.use-case';
import { GetUsersUseCase } from '../../application/user/use-cases/get-users.use-case';
import { UserRepository } from '../../domain/repositories/user.repository';
import { UsersPersistenceModule } from './users-persistence.module';
import { UsersController } from './users.controller';

@Module({
  imports: [UsersPersistenceModule],
  providers: [
    {
      provide: GetCurrentUserUseCase,
      inject: [UserRepository],
      useFactory: (userRepository: UserRepository) =>
        new GetCurrentUserUseCase(userRepository),
    },
    {
      provide: GetUsersUseCase,
      inject: [UserRepository],
      useFactory: (userRepository: UserRepository) =>
        new GetUsersUseCase(userRepository),
    },
  ],
  controllers: [UsersController],
})
export class UsersModule {}
