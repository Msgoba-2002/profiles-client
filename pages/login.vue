<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
});
const { isAuthenticated } = storeToRefs(useAuthStore());
const { googleLogin, emailLogin } = useAuthStore();
const { user } = storeToRefs(useUserStore());

const submitLoginForm = () => {
  submitForm('login-form');
}
const handleLogin = async (body: { email: string; password: string; }) => {
  const { email, password } = body;
  await emailLogin(email, password);

  if (isAuthenticated.value && user.value) {
    const { id } = user.value;
    return navigateTo({ name: 'user-userId', params: { userId: id } });
  }
}
</script>


<template>
  <section class="py-4">
    <div class="w-[70%] mx-auto bg-oba-gray rounded-t-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg">Login</h1>
      </div>
      <div class="rounded-md bg-oba-red p-6">
        <FormKit type="form" id="login-form" @submit="handleLogin" submit-label="Login"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <FormKit type="email" name="email" label="Email" required placeholder="your email address"
            :classes="{
              label: 'text-oba-white text-base font-roboto',
              input: 'w-full bg-oba-gray rounded-md p-2',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['email']]"/>
          <FormKit type="password" name="password" label="Password" required placeholder="enter password"
            :classes="{
              label: 'text-oba-white text-base font-roboto',
              input: 'w-full bg-oba-gray rounded-md p-2',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 8]]"
            :validation-messages="{
              length: 'Password must be at least 8 characters long',
              matches: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }" />
        </FormKit>
        <div class="my-4 flex flex-col gap-4">
          <UiBaseBtn @click="submitLoginForm" label-text="Login" button-type="button" text-style="text-oba-white text-base font-roboto"
            class="w-full bg-oba-blue rounded-md py-2" />

          <span class="text-lg font-roboto capitalize text-oba-white font-light text-center">-OR-</span>
            
          <UiBaseBtn @click="googleLogin" label-text="Continue with Google" button-type="button" text-style="text-oba-black text-base font-roboto"
            class="w-full bg-oba-gray rounded-md py-2" />
          
          <div class="flex flex-col items-center gap-2">
            <span class="text-oba-white text-sm font-roboto font-light">
              Not yet registered?
              <NuxtLink :to="{ name: 'register' }" class="text-oba-white text-sm font-roboto font-light">Register instead</NuxtLink>
            </span>
            <NuxtLink :to="{ name: 'forgot-password' }" class="text-oba-white text-sm font-roboto font-light">Forgot your password?</NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>~/stores/useUserStore