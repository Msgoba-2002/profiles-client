import { defineStore } from 'pinia';
import type { AuthenticatedUser } from '@/types/user';

export const useUserStore = defineStore('user', () => {
  const user = ref<AuthenticatedUser | null>(null);

  const setUser = (newUser: AuthenticatedUser) => {
    user.value = newUser;
  }
  return {
    user,
    setUser,
  }
});