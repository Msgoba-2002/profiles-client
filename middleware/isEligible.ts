export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useUserStore());

  if (user.value && !user.value.questions_verified) {
    return navigateTo({ name: 'eligibility' });
  }
});
