<script setup lang="ts">
import { useUserStore } from '@/stores/user';
const { googleLogin, emailLogin } = useUserStore()

const handleLogin = (body) => {
  console.log({ body });
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
            'wrapper-class': 'text-oba-white bg-oba-blue py-2 rounded-md flex justify-center mt-6',
            'label-class': 'text-oba-white text-base font-roboto',
          }">
          <FormKit type="email" name="email" label="Email" required placeholder="your email address"
            :classes="{
              label: 'text-oba-white text-base font-roboto',
              input: 'w-full bg-oba-gray rounded-md p-2',
              wrapper: 'flex flex-col gap-2',
            }" />
          <FormKit type="password" name="password" label="Password" required placeholder="enter password"
            :classes="{
              label: 'text-oba-white text-base font-roboto',
              input: 'w-full bg-oba-gray rounded-md p-2',
              wrapper: 'flex flex-col gap-2',
            }" />
        </FormKit>
        <div class="my-4 flex flex-col gap-4">
          <span class="text-lg font-roboto capitalize text-oba-white font-light text-center">-OR-</span>
            
          <UiBaseBtn @click="googleLogin" label-text="Continue with Google" button-type="submit" text-style="text-oba-black text-base font-roboto"
            class="w-full bg-oba-gray rounded-md py-2" />
        </div>
      </div>
    </div>
  </section>
</template>