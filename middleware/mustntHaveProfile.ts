export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useUserStore());

  if (user.value && user.value.Profile) {
    return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
  }
})
