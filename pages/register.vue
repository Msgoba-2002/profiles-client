<script setup lang="ts">
import type { UserRegistrationForm } from '@/types/user';
import { pwConfirmed } from '@/utils/validators';

definePageMeta({
  middleware: ['guest-only'],
  layout: 'auth-layout',
});

const submitRegisterForm = () => {
  submitForm('register-form');
}

const { googleLogin, registerUser } = useAuthStore();
const { isAuthenticated } = storeToRefs(useAuthStore());
const { user } = storeToRefs(useUserStore());
const snackbar = useSnackbar();

const isRegistering = ref(false);
const handleRegister = async (form: UserRegistrationForm) => {
  isRegistering.value = true;
  await registerUser(form);
  if (user.value) {
    snackbar.add({
      title: 'Registration Successful',
      text: `${user.value?.first_name}, your account has been created successfully. Please login to continue.`,
      type: 'success',
    });
    setTimeout(() => {
      return navigateTo({ name: 'login' });
    }, 3000);
  }
  isRegistering.value = false;
}

</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-gray rounded-t-md">
      <div class="px-6 py-4 flex flex-col gap-4">
        <h1 class="font-roboto text-lg">Register</h1>

        <UiBaseBtn @click="googleLogin" label-text="Continue with Google" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" />
        
          <span class="text-lg font-roboto capitalize text-oba-black font-light text-center">-OR-</span>
      </div>
      <div class="rounded-md bg-oba-red p-6">
        <FormKit type="form" id="register-form" @submit="handleRegister"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <FormKit type="email" name="email" label="Email" required placeholder="your email address"
            :classes="{
              label: 'text-oba-white text-base font-roboto font-light',
              input: 'w-full bg-oba-gray rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['email']]"/>
          <FormKit type="text" name="first_name" label="First Name" required placeholder="enter your first name"
            :classes="{
              label: 'text-oba-white text-base font-roboto font-light',
              input: 'w-full bg-oba-gray rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 3]]"/>
          <FormKit type="text" name="last_name" label="Last Name" required placeholder="enter your last name"
            :classes="{
              label: 'text-oba-white text-base font-roboto font-light',
              input: 'w-full bg-oba-gray rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 3]]"/>
          <FormKit type="password" name="password" label="Password" required placeholder="enter password"
            :classes="{
              label: 'text-oba-white text-base font-roboto font-light',
              input: 'w-full bg-oba-gray rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 8]]"
            :validation-messages="{
              length: 'Password must be at least 8 characters long',
              matches: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }" />
          <FormKit type="password" name="confirm_password" label="Confirm Password" required placeholder="confirm password"
            :classes="{
              label: 'text-oba-white text-base font-roboto font-light',
              input: 'w-full bg-oba-gray rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-gray text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['pwConfirmed']]"
            :validation-rules="{
              pwConfirmed
            }"
            :validation-messages="{
              pwConfirmed: 'Passwords do not match'
            }" />
        </FormKit>
        <div class="my-4 flex flex-col gap-4">
          <UiBaseBtn @click="submitRegisterForm" label-text="Register" button-type="button" text-style="text-oba-white text-base font-roboto"
            class="w-full bg-oba-blue rounded-md py-2" :is-disabled="isRegistering">
            <template #appendIcon>
              <Icon v-if="isRegistering" name="line-md:loading-alt-loop" size="16px" class="text-oba-white" />
            </template>
          </UiBaseBtn>

          <div class="flex flex-col items-center gap-2">
            <span class="text-oba-white text-sm font-roboto font-light">
              Already registered?
              <NuxtLink :to="{ name: 'login' }" class="text-oba-white text-sm font-roboto font-light">Login instead</NuxtLink>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>