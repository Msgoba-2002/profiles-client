import { fetchKeys } from "../types/enums";
import type { AuthenticatedUser } from "../types/user";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);

  const fetchUser = async () => {
    const { data, error } = await useApiFetch('/auth/user', {
      method: 'GET',
      key: fetchKeys.GetUser,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    const userStore = useUserStore();
    userStore.setUser(data.value as AuthenticatedUser);
  }

  const updateAuthState = (state: boolean) => {
    isAuthenticated.value = state;
  }

  const emailLogin = async (email: string, password: string) => {
    const { data, pending, error } = await useApiFetch('/auth/login', {
      method: 'POST',
      key: fetchKeys.Login,
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      }
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    const userStore = useUserStore();
    userStore.setUser(data.value as AuthenticatedUser);
    updateAuthState(true);
  }
  
  const googleLogin = () => {
    const { backendUrl } = useRuntimeConfig().public;
    return navigateTo(`${backendUrl}/auth/google`, { external: true });
  }

  return {
    fetchUser,
    updateAuthState,
    emailLogin,
    googleLogin,
    isAuthenticated,
  }
});