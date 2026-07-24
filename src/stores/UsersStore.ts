import { makeAutoObservable } from "mobx";
import { getUsers, searchUsers } from "@/api/users";
import type { User } from "@/types/user";

class UsersStore {
  users: User[] = [];
  isLoading = false;
  error: string | null = null;
  sortBy: string | null = null;
  order: 'asc' | 'desc' | null = null;
  page = 1;
  limit = 15;
  total = 0; 
  searchQuery = '';
  selectedUser: User | null = null;
  columnFilters: Record<string,string> = {};

  constructor() {
    makeAutoObservable(this);
  }

  async fetchUsers() {
    this.isLoading = true;
    this.error = null;

    try {
      const data = this.searchQuery 
        ? await searchUsers(this.searchQuery)
        : await getUsers({
           limit: this.limit,
           skip: (this.page - 1) * this.limit,
           sortBy: this.sortBy ?? undefined,
           order: this.order ?? undefined,
          });
      this.users = data?.users ?? [];
      this.total = data?.total ?? 0;
    } catch (err) {
      this.error = 'Loading error'
    } finally {
      this.isLoading = false;
    }
  }


  setSort(field: string) {
    if (this.sortBy !== field) {
      this.sortBy = field;
      this.order = 'asc';
    } else if (this.order === 'asc') {
      this.order = 'desc';
    } else if (this.order === 'desc') {
      this.sortBy = null;
      this.order = null;
    }
    this.page = 1;
    this.fetchUsers();
  }

  setPage(page: number) {
    this.page = page;
    this.fetchUsers();
  }

  get totalPages() {
    return Math.ceil(this.total / this.limit);
  }


  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.page = 1;
    this.fetchUsers();
  }

  selectUser(user: User) {
    this.selectedUser = user;
  }

  closeModal() {
    this.selectedUser = null;
  }

  setColumnFilter(field: string, value: string) {
    this.columnFilters = { ...this.columnFilters, [field]: value };
  }

  clearColumnFilter(field: string) {
    const next = { ...this.columnFilters };
    delete next[field];
    this.columnFilters = next;
  }

  get filteredUsers() {
    return this.users.filter((user) => {
      return Object.entries(this.columnFilters).every(([field, value]) => {
        if (!value) return true;
        const userValue = String(user[field as keyof User]).toLowerCase();
        return userValue.includes(value.toLowerCase());
      });
    });
  }

 }

export const usersStore = new UsersStore();
