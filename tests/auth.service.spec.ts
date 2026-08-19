import { vi, describe, it, expect, beforeEach } from 'vitest';

// bcrypt and jwt mocks
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(() => Promise.resolve('hashed')),
    compare: vi.fn(() => Promise.resolve(true))
  }
}));

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(() => 'token')
  }
}));

import * as repo from '../../src/modules/auth/auth.repository';
import * as service from '../../src/modules/auth/auth.service';

describe('auth.service', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('registers a new user', async () => {
    vi.spyOn(repo as any, 'findUserByEmail').mockResolvedValue(null);
    vi.spyOn(repo as any, 'createUser').mockResolvedValue({ _id: 'id', email: 'a@b.c', role: 'USER' });

    const result = await service.register({ email: 'a@b.c', password: 'pw' });
    expect(result).toHaveProperty('email', 'a@b.c');
  });

  it('throws on duplicate email', async () => {
    vi.spyOn(repo as any, 'findUserByEmail').mockResolvedValue({ _id: 'existing' });
    await expect(service.register({ email: 'a@b.c', password: 'pw' })).rejects.toBeTruthy();
  });
});
