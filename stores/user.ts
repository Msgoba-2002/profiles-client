import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const emailLogin = (email: string, password: string) => {
    // ...
  }
  
  const googleLogin = () => {
    const config = useRuntimeConfig();
    const { backendUrl } = config.public;
    return navigateTo(`${backendUrl}/auth/google`, { external: true });
  }
  return {
    googleLogin,
    emailLogin,
  }
});