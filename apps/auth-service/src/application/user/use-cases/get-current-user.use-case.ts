import { UserRepository } from '../../../domain/repositories/user.repository';
import { toUserView } from '../../shared/dto/user.view';
import { UserNotFoundError } from '../errors/user-not-found.error';

export class GetCurrentUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return toUserView(user);
  }
}
