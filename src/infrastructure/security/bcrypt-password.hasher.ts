import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PasswordHasher } from '../../domain/services/password-hasher';

/**
 * Bcrypt-backed implementation of password hashing.
 */
@Injectable()
export class BcryptPasswordHasher implements PasswordHasher {
  private readonly rounds = 10;

  hash(raw: string): Promise<string> {
    return bcrypt.hash(raw, this.rounds);
  }

  compare(raw: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(raw, hashed);
  }
}
