<script setup lang="ts">
const userIsLoggedIn = ref(false)
const btnText = computed(() => {
  if (userIsLoggedIn.value) return 'Logout';
  return 'Login';
});

const router = useRouter();
const handleAuth = () => {
  // handle login/logout
  if (!userIsLoggedIn.value) {
    router.push({ name: 'login' });
  }
}
</script>


<template>
  <div class="border border-b-4 border-b-oba-blue p-4 flex flex-row justify-between items-center">
    <NuxtLink :to="{name: 'index'}">
      <img src="/msgoba_2k2_logo.png" class="h-16 " alt="set logo">
    </NuxtLink>
    <UiBaseBtn :label-text="btnText" button-type="button" class="px-8 py-2 bg-oba-red hover:bg-opacity-75 active:bg-opacity-75 rounded-full border-none"
      text-style="text-oba-white text-lg font-roboto" @click="handleAuth">
      <template #prependIcon>
        <Icon v-if="userIsLoggedIn" name="bytesize:sign-out" class="text-oba-white" size="16px" />
        <Icon v-else name="bytesize:sign-in" class="text-oba-white" size="16px" />
      </template>
    </UiBaseBtn>
  </div>
</template>