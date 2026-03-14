/**
 * Domain contract for password hashing.
 */
export abstract class PasswordHasher {
  /**
   * Hash a raw password before storage.
   */
  abstract hash(raw: string): Promise<string>;

  /**
   * Compare a raw password to a stored hash.
   */
  abstract compare(raw: string, hashed: string): Promise<boolean>;
}
