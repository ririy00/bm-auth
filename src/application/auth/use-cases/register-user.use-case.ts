import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../../domain/repositories/user.repository';
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { toAuthUserView } from '../dto/auth-user.view';
import { EmailAlreadyExistsError } from '../errors/email-already-exists.error';

type RegisterUserCommand = {
  email: string;
  password: string;
};

/**
 * Registers a user after checking email uniqueness and hashing the password.
 */
@Injectable()
export class RegisterUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  /**
   * Creates and returns a safe user view (without password hash).
   */
  async execute(command: RegisterUserCommand) {
    const existing = await this.userRepository.findByEmail(command.email);
    if (existing) {
      throw new EmailAlreadyExistsError(command.email);
    }

    const hashed = await this.passwordHasher.hash(command.password);
    const user = await this.userRepository.create({
      email: command.email,
      password: hashed,
    });

    return toAuthUserView(user);
  }
}
