import { User } from '../entities/user.entity';

/**
 * Data needed to create a new user record.
 */
export type CreateUserInput = {
  email: string;
  password: string;
  role?: string;
};

export type FindUsersInput = {
  page: number;
  limit: number;
};

export type UpdateRefreshTokenInput = {
  userId: string;
  refreshToken: string | null;
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

  /**
   * Updates the stored refresh token hash for a user.
   */
  abstract updateRefreshToken(input: UpdateRefreshTokenInput): Promise<User>;

  /**
   * Returns users for a page (1-based) with a fixed page size.
   */
  abstract findMany(input: FindUsersInput): Promise<User[]>;

  /**
   * Returns total count of users.
   */
  abstract count(): Promise<number>;
}
