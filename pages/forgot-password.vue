<script setup lang="ts">
definePageMeta({
  middleware: ['guest-only'],
  layout: 'auth-layout',
});

const submitPwReqForm = () => {
  submitForm('pw-reset-request');
}

const { requestPwReset } = useAuthStore();
const snackbar = useSnackbar();
const handlePwResetReq = async (form: { email: string; }) => {
  try {
    const data = await requestPwReset({ email: form.email });
    if (data.statusCode = 200) {
      snackbar.add({
        title: 'Email sent',
        text: 'Check your email for instructions to reset your password',
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
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Reset Password</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <div class="mb-4 font-roboto text-base font-light ">
          <span>Enter your password below.</span>
          <span>If we recognise it, we'll send you an email with instructions to reset your password.</span>
        </div>
        <FormKit type="form" id="pw-reset-request" @submit="handlePwResetReq" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}">
          <FormKit type="email" name="email" label="Email" required placeholder="your email address"
            :classes="{
              label: 'text-oba-black text-base font-roboto',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-light',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['email']]"/>
        </FormKit>
        <UiBaseBtn @click="submitPwReqForm" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" />
      </div>
    </div>
  </section>
</template>