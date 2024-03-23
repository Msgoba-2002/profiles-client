export default defineNuxtPlugin(async (nuxtApp) => {
  const auth = useAuthStore();

  if (!auth.isAuthenticated) {
    await auth.fetchUser();
  }
});
