<script setup lang="ts">
const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();
const route = useRoute();
const showButton = computed(() => {
  return route.name !== 'login' && route.name !== 'register';
});
const btnText = computed(() => {
  if (isAuthenticated.value) return 'Logout';
  return 'Login';
});

const handleLogout = async () => {
  await logout();
  return navigateTo({ name: 'login' });
}
</script>


<template>
  <div class="border border-b-4 border-b-oba-blue p-4 flex flex-row justify-between items-center">
    <NuxtLink :to="{name: 'index'}">
      <img src="/msgoba_2k2_logo.png" class="h-16 " alt="set logo">
    </NuxtLink>
    <UiLinkAsBtn v-if="showButton && !isAuthenticated" :link-dest="{name: 'login'}" :label-text="btnText" class="px-8 py-2 bg-oba-red hover:bg-opacity-75 active:bg-opacity-75 rounded-full border-none"
      text-style="text-oba-white text-lg font-roboto">
      <template #prependIcon>
        <Icon v-if="isAuthenticated" name="bytesize:sign-out" class="text-oba-white" size="16px" />
        <Icon v-else name="bytesize:sign-in" class="text-oba-white" size="16px" />
      </template>
    </UiLinkAsBtn>
    <UiBaseBtn v-if="showButton && isAuthenticated" button-type="button" :label-text="btnText" class="px-8 py-2 bg-oba-red hover:bg-opacity-75 active:bg-opacity-75 rounded-full border-none"
      text-style="text-oba-white text-lg font-roboto" @click="handleLogout">
      <template #prependIcon>
        <Icon v-if="isAuthenticated" name="bytesize:sign-out" class="text-oba-white" size="16px" />
        <Icon v-else name="bytesize:sign-in" class="text-oba-white" size="16px" />
      </template>
    </UiBaseBtn>
  </div>
</template>