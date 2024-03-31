<script setup lang="ts">
import { pwConfirmed } from '@/utils/validators';

definePageMeta({
  middleware: ['guest-only'],
  layout: 'auth-layout',
});

const route = useRoute();
const { token } = route.query;

const submitPwResetForm = () => {
  submitForm('pw-reset');
}

const { updatePassword } = useAuthStore();
const snackbar = useSnackbar();
const handlePwReset = async (form: { password: string; confirm_password: string; }) => {
  try {
    const data = await updatePassword({ password: form.password, confirm_password: form.confirm_password, token: token as string });
    if (data.statusCode = 200) {
      snackbar.add({
        title: 'Password Updated',
        text: 'Your password has been updated. Please login to continue.',
        type: 'success',
      });
      setTimeout(() => {
        return navigateTo({ name: 'login' });
      }, 3000);
    }
  } catch (error) {
    console.log(error);
  }
}
</script>


<template>
  <section class="py-4">
    <div class="w-[70%] mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Update Password</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <FormKit type="form" id="pw-reset" @submit="handlePwReset" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <FormKit type="password" name="password" label="Password" required placeholder="enter password"
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }"
            :validation="[['required'], ['length', 8]]"
            :validation-messages="{
              length: 'Password must be at least 8 characters long',
              matches: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            }" />

          <FormKit type="password" name="confirm_password" label="Confirm Password" required placeholder="confirm password"
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
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
        <UiBaseBtn @click="submitPwResetForm" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" />
      </div>
    </div>
  </section>
</template>