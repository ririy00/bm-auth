import { User } from '../../../domain/entities/user.entity';

export type AuthUserView = Pick<
  User,
  'id' | 'email' | 'role' | 'createdAt' | 'updatedAt'
>;

export const toAuthUserView = (user: User): AuthUserView => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
