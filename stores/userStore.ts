import { defineStore } from 'pinia';
import type { AuthenticatedUser } from '@/types/user';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const user = ref<AuthenticatedUser | null>(null);

  const setUser = (newUser: AuthenticatedUser | null) => {
    user.value = newUser;
  }
  return {
    user,
    setUser,
  }
});