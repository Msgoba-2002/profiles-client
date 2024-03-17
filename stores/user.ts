import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
  const loginUser = (email: string, password: string) => {
    // ...
  }

  const googleLogin = () => {
    const config = useRuntimeConfig();
    const backendUrl = config.public.appBackendUrl;
    console.log({ backendUrl });
    return navigateTo(`${backendUrl}/auth/google`);
  }
  return{googleLogin}
});