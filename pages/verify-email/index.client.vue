<script setup lang="ts">
definePageMeta({
  layout: 'auth-layout',
});

const { verifyEmail, fetchUser } = useAuthStore();
const route = useRoute();
const { token } = route.query;
const { user } = storeToRefs(useUserStore());

const runVerification = async () => {
  if (!token) return;
  try {
    const data = await verifyEmail(token as string);
    if (data.statusCode === 200 && user.value) {
      await fetchUser(true);
      return navigateTo({ name: 'user-userId', params: { userId: user.value.id } });
    }
  } catch (err) {
    console.error(err);
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