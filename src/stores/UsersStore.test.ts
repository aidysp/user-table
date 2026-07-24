import { describe, it, expect, vi, beforeEach } from "vitest";
import { usersStore } from "./UsersStore";

vi.mock('@/api/users', () => ({
  getUsers: vi.fn(() =>
    Promise.resolve({
      users: [{ id: 1, lastName: 'Smith', age: 30 }],
      total: 1, skip: 0, limit: 20,
    })
  ),
  searchUsers: vi.fn(),
}));

describe('UsersStore', () => {
  beforeEach(() => {
    usersStore.sortBy = null;
    usersStore.order = null;
    usersStore.page = 1;
  });

  it('sortBy cycles through asc -> desc -> none', () => {
    usersStore.setSort('age');
    expect(usersStore.sortBy).toBe('age');
    expect(usersStore.order).toBe('asc');

    usersStore.setSort('age');
    expect(usersStore.order).toBe('desc');

    usersStore.setSort('age');
    expect(usersStore.sortBy).toBe(null);
    expect(usersStore.order).toBe(null);
  });

  it('fetchUsers loads users into store', async () => {
    await usersStore.fetchUsers();
    expect(usersStore.users.length).toBe(1);
    expect(usersStore.total).toBe(1);
  });
});
