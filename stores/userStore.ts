import { defineStore } from 'pinia';
import type { AuthenticatedUser } from '@/types/user';
import { ref } from 'vue';
import { fetchKeys } from '../types/enums';

export const useUserStore = defineStore('user', () => {
  const user = ref<AuthenticatedUser | null>(null);
  
  const userRefresh = () => {
    refreshNuxtData(fetchKeys.GetUser);
  }

  const setUser = (newUser: AuthenticatedUser | null) => {
    user.value = newUser;
  }
  return {
    user,
    setUser,
    userRefresh,
  }
});