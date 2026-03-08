import { User } from '../../../domain/entities/user.entity';

export type UserView = Pick<
  User,
  'id' | 'email' | 'role' | 'createdAt' | 'updatedAt'
>;

export const toUserView = (user: User): UserView => ({
  id: user.id,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
