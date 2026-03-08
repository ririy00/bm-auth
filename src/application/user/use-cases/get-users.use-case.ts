import { UserRepository } from '../../../domain/repositories/user.repository';
import { toUserView } from '../../shared/dto/user.view';
import { InvalidPageError } from '../errors/invalid-page.error';

const USERS_PAGE_LIMIT = 10;

export class GetUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(page: number) {
    if (!Number.isInteger(page) || page < 1) {
      throw new InvalidPageError(page);
    }

    const [users, totalUsers] = await Promise.all([
      this.userRepository.findMany({
        page,
        limit: USERS_PAGE_LIMIT,
      }),
      this.userRepository.count(),
    ]);
    const maxPage = Math.max(1, Math.ceil(totalUsers / USERS_PAGE_LIMIT));

    return {
      currentPage: page,
      maxPage,
      limit: USERS_PAGE_LIMIT,
      users: users.map(toUserView),
    };
  }
}
