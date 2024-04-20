<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

const { verifyEmail, fetchUser } = useAuthStore();
const route = useRoute();
const { token } = route.query;
const { user } = storeToRefs(useUserStore());

const snackbar = useSnackbar();
const runVerification = async () => {
  if (!token) return;

  const { data, error } = await verifyEmail(token as string);
  if (data && data.statusCode === 200) {
    snackbar.add({
      title: 'Success',
      text: data.message,
      type: 'success'
    });
    
    if (user.value) {
      await fetchUser(true);
      return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
    }
    return navigateTo({ name: 'login' });
  }
  if (error && error.data.statusCode === 400) {
    snackbar.add({
      title: 'Error',
      text: error.data.message,
      type: 'error'
    });

    return navigateTo({ name: 'verify' });
  }
}
onMounted(() => {
  runVerification();
});
</script>


<template>
  <section class="py-4">
    <LoadingSpinner loading-label="Working!" />
  </section>
</template>