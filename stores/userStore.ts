import { defineStore } from 'pinia';
import type { AuthenticatedUser, FirebaseAuthenticatedUser } from '@/types/user';
import { ref } from 'vue';
import { fetchKeys } from '../types/enums';
import type { IFullProfile } from '../types/profile';

export const useUserStore = defineStore('user', () => {
  const user = ref<AuthenticatedUser | null>(null);
  const accessToken = ref<String>('');
  
  const userRefresh = () => {
    refreshNuxtData(fetchKeys.GetUser);
  }

  const setUser = (newUser: FirebaseAuthenticatedUser | null) => {
    const splitName = newUser?.displayName?.split(' ') || [];

    user.value = {
      id: newUser?.uid || '',
      email: newUser?.email || '',
      email_verified: newUser?.emailVerified || false,
      first_name: splitName.shift() || '',
      last_name: splitName.pop() || '',
      questions_verified: newUser?.questionsVerified || false,
      is_admin: newUser?.isAdmin || false,
      is_super_admin: newUser?.isSuperAdmin || false,
      Profile: newUser?.Profile || null,
    };
  }

  const setAccessToken = (token: string) => {
    accessToken.value = token;
  }

  const setProfile = (profile: IFullProfile) => {
    if (!user.value) return;
    user.value.Profile = profile;
  }

  return {
    user,
    setUser,
    userRefresh,
    setAccessToken,
    accessToken,
    setProfile,
  }
});