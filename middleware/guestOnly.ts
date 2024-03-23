export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = storeToRefs(useAuthStore());
  const { user } = storeToRefs(useUserStore());

  if (isAuthenticated.value && user.value) {
    return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
  }
});
