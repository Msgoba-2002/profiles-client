import { fetchKeys } from "../types/enums";
import type { AuthenticatedUser, FetchedAuthenticatedUser } from "../types/user";

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
    userStore.setUser((data.value as FetchedAuthenticatedUser).user);
    updateAuthState(true);
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

  const logout = async () => {
    const { error } = await useApiFetch('/auth/logout', {
      method: 'POST',
      key: fetchKeys.Logout,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    const userStore = useUserStore();
    updateAuthState(false);
    userStore.setUser(null);
    return navigateTo({ name: 'login' });
  }

  return {
    fetchUser,
    updateAuthState,
    emailLogin,
    googleLogin,
    isAuthenticated,
    logout,
  }
});