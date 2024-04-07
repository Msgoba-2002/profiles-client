<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated'],
  layout: 'auth-layout',
});

const { resendVerificationEmail } = useAuthStore();
const snackbar = useSnackbar();
const resendVerifyEmail = async () => {
  try {
    const data = await resendVerificationEmail();
    if (data.statusCode === 200) {
      snackbar.add({
        title: 'Email sent',
        text: 'We\'ve resent the email with instructions to verify your email address.',
        type: 'success',
      });
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
        <h1 class="font-roboto text-lg text-oba-white">Verify Email</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <div class="mb-4 font-roboto text-base font-light flex flex-col gap-4 text-center">
          <p>We've sent you an email, please click the included link to verify your email address.</p>
          <p>Didn't receive the email?</p>
          <p>Please click below to resend.</p>
        </div>
        <UiBaseBtn @click="resendVerifyEmail" label-text="Resend" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" />
      </div>
    </div>
  </section>
</template>