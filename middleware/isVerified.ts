export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useUserStore());

  if (user.value && !user.value.email_verified) {
    return navigateTo({ name: 'verify' });
  }
});
