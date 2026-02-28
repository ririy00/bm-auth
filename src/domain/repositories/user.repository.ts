import { User } from '../entities/user.entity';

/**
 * Data needed to create a new user record.
 */
export type CreateUserInput = {
  email: string;
  password: string;
  role?: string;
};

/**
 * Domain contract for user persistence.
 * Implementations can use Prisma, another ORM, or an external service.
 */
export abstract class UserRepository {
  /**
   * Returns a user by id or null when not found.
   */
  abstract findById(id: string): Promise<User | null>;

  /**
   * Returns a user by email or null when not found.
   */
  abstract findByEmail(email: string): Promise<User | null>;

  /**
   * Persists and returns the newly created user.
   */
  abstract create(data: CreateUserInput): Promise<User>;
}
