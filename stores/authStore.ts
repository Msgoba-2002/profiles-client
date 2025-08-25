import { fetchKeys } from "@/types/enums";
import type { UserRegistrationForm } from "../types/user";
import { ref } from "vue";
import { defineStore } from "pinia";
import { useUserStore } from './userStore';
import { useApiFetch } from "@/composables/useApiFetch";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  browserLocalPersistence,
  type User,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(false);

  const auth = useFirebaseAuth();
  const userStore = useUserStore();
  const questionsStore = useQuestionsStore();
  auth?.setPersistence(browserLocalPersistence);
  
  const fetchUser = async () => {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      const accessToken = await currentUser.getIdTokenResult();
      // Check if user has passed the questions
      const result = await checkQuestionsVerified(accessToken.token);
      const { success: questionsVerified } = result as { message: string; success: boolean; };

      userStore.setUser({
        ...currentUser,
        questionsVerified,
        isAdmin: accessToken.claims.admin || false,
        isSuperAdmin: accessToken.claims.superAdmin || false
      });
      userStore.setAccessToken(accessToken.token);
      // Fetch user profile and attach to user object
      // If no profile found, redirect to profile creation page
      // 
      updateAuthState(true);
    }
  }

  const updateAuthState = (state: boolean) => {
    isAuthenticated.value = state;
  }

  const emailRegistration = async (form: UserRegistrationForm) => {
    const displayName = `${form.first_name} ${form.last_name}`.trim();
    try {
      const result = await createUserWithEmailAndPassword(auth!, form.email, form.password);
      const user = result.user;
      await updateProfile(user, {
        displayName
      });
      const accessToken = await user.getIdTokenResult(true);
      userStore.setAccessToken(accessToken.token || '');
      await fetchUser();
      await sendVerificationEmail(user);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error during email registration:', error);
      return { success: false, error: 'Email registration failed' };
    }
  }

  const googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope('email');
    try {
      const result = await signInWithPopup(auth!, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      userStore.setAccessToken(token || '');
      await fetchUser();
      return { success: true, error: null };
    } catch (error) {
      console.error('Error during Google sign-in:', error);
      return { success: false, error: 'Google sign-in failed' };
    }
  }


  const emailLogin = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth!, email, password);
      const user = result.user;
      const accessToken = await user.getIdTokenResult(true);
      userStore.setAccessToken(accessToken.token || '');
      await fetchUser();
      return { success: true, error: null };
    } catch (error) {
      console.error('Error during email login:', error);
      return { success: false, error: 'Email login failed' };
    }
  }

  const logout = async () => {
    try {
      await signOut(auth!);
      updateAuthState(false);
      userStore.setUser(null);
  
      return navigateTo({ name: 'login' });
    } catch (error) {
      console.error('Error during logout:', error);
      return { success: false, error: 'Logout failed' };
    };
  }

  const requestPwReset = async ({ email }: { email: string; }) => {
    try {
      await sendPasswordResetEmail(auth!, email);
      return { success: true, error: null };
    } catch (error) {
      console.error('Error during password reset request:', error);
      return { success: false, error: 'Password reset request failed' };
    }
  }

  const sendVerificationEmail = async (user: User) => {
    return await sendEmailVerification(user);
  }

  const deleteAccount = async () => {
    const user = await getCurrentUser();
    if (user) {
      try {
        await deleteUser(user);
        return { success: true, error: null };
      } catch (error: any) {
        if (error.code === 'auth/requires-recent-login') {
          // User needs to reauthenticate before deleting account
          return { success: false, error: 'Please login again, then retry this action.' };
        }
        console.error('Error during account deletion:', error);
        return { success: false, error: 'Account deletion failed' };
      }
    }
  }

  const checkQuestionsVerified = async (token: string) => {
    const { data, error } = await useApiFetch('/question/verified', {
      method: 'GET',
      key: fetchKeys.GetQuestionsVerified,
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (error.value) {
      throw new Error(error.value.message);
    }

    return data.value;
  }

  return {
    fetchUser,
    updateAuthState,
    emailRegistration,
    emailLogin,
    googleLogin,
    isAuthenticated,
    logout,
    requestPwReset,
    sendVerificationEmail,
    deleteAccount,
  }
});