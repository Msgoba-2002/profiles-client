export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useUserStore());

  if (!user.value) return;

  const isAdmin = user.value.is_admin;
  if (!isAdmin) return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
});
