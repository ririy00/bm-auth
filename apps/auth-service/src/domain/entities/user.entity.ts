export interface User {
  id: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}
