export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());

  if (!isAuthenticated.value) {
    return navigateTo({ name: 'login' });
  }
});
