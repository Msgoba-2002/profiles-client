export default defineNuxtRouteMiddleware((to, from) => {
  const { user } = storeToRefs(useUserStore());

  if (!user.value) return;

  const { Profile: profile } = user.value;
  const isExco = profile.current_position.includes('president') || profile.current_position.includes('admin');
  if (!isExco) return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
});
