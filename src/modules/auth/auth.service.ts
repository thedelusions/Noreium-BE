import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserById } from './auth.repository';
import { RegisterInput, LoginInput } from './auth.types';
import { JWT_SECRET } from '../../config/env';
import { ApiError } from '../../utils/ApiError';

const SALT_ROUNDS = 10;

export async function register(input: RegisterInput) {
  const existing = await findUserByEmail(input.email);
  if (existing) throw new ApiError(409, 'Email already in use');

  const passwordHash = await bcrypt.hash(input.password, SALT_ROUNDS);
  const user = await createUser({ email: input.email, passwordHash });
  return { id: user._id, email: user.email, role: user.role };
}

export async function login(input: LoginInput) {
  const user = await findUserByEmail(input.email);
  if (!user) throw new ApiError(401, 'Invalid credentials');

  const ok = await bcrypt.compare(input.password, user.passwordHash as string);
  if (!ok) throw new ApiError(401, 'Invalid credentials');

  const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return { token };
}

export async function getCurrentUser(userId: string) {
  const user = await findUserById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return { id: user._id, email: user.email, role: user.role };
}
