import { fetchKeys } from "@/types/enums";
import type { AuthenticatedUser, FetchedAuthenticatedUser, NewlyRegisteredUser, UserRegistrationForm } from "../types/user";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from './userStore';
import { useApiFetch } from "@/composables/useApiFetch";
import type { EmailVerificationResponse } from "../types/verification";
import type { PwResetDto, PwUpdateResponse } from "../types/password";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);

  const fetchUser = async (refresh = false) => {
    const userStore = useUserStore();
    refresh && userStore.userRefresh();
    const { data, error } = await useApiFetch('/auth/user', {
      method: 'GET',
      key: fetchKeys.GetUser,
    });
    if (error.value) {
      console.log(error.value.message);
      return;
    }
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
    await fetchUser();
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
  }

  const registerUser = async (credentials: UserRegistrationForm) => {
    const { data, error } = await useApiFetch('/auth/register', {
      method: 'POST',
      key: fetchKeys.Register,
      body: JSON.stringify(credentials)
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
    const userStore = useUserStore();
    const {created_at, ...user} = data.value as NewlyRegisteredUser;
    userStore.setUser(user);
  }

  const requestPwReset = async ({ email }: { email: string; }) => {
    const { data, error } = await useApiFetch('/auth/forgot-password', {
      method: 'POST',
      key: fetchKeys.ForgotPassword,
      body: JSON.stringify({ email }),
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value as EmailVerificationResponse;
  }

  const resendVerificationEmail = async () => {
    const { data, error } = await useApiFetch('/auth/send-verification', {
      method: 'GET',
      key: fetchKeys.ResendVerification,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value as EmailVerificationResponse;
  }

  const verifyEmail = async (token: string) => {
    const { data, error } = await useApiFetch('/auth/verify-email', {
      method: 'PATCH',
      key: fetchKeys.VerifyEmail,
      body: JSON.stringify({ token }),
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value as EmailVerificationResponse;
  }

  const updatePassword = async (payload: PwResetDto) => {
    const { data, error } = await useApiFetch('/auth/update-password', {
      method: 'PATCH',
      key: fetchKeys.UpdatePassword,
      body: JSON.stringify(payload),
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value as PwUpdateResponse;
  }

  return {
    fetchUser,
    updateAuthState,
    emailLogin,
    googleLogin,
    isAuthenticated,
    logout,
    registerUser,
    requestPwReset,
    resendVerificationEmail,
    verifyEmail,
    updatePassword,
  }
});