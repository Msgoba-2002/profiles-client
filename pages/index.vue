<script lang="ts" setup>
const router = useRouter();
const goToLogin = () => {
  router.push({ name: 'login' });
  }
</script>

<template>
  <section class="py-4">
    <div class="flex flex-col justify-center pb-8">
      <h1 class="font-roboto font-semibold text-3xl text-center">MSGOBA 2002</h1>
      <p class="text-center text-sm italic font-roboto">Mount Saint Gabriel's Secondary School Makurdi Old Boys Association, Set of 2002!</p>
    </div>
    <img src="/class_banner.jpeg" alt="">
    <div class="flex flex-col gap-4 items-center p-8">
      <div class="inline-flex items-center gap-4">
        <span class="text-oba-black font-roboto text-lg">Are you one of us?</span>
        <UiBaseBtn @click="goToLogin" label-text="Join Us" button-type="button" class="px-8 py-2 bg-oba-blue hover:bg-opacity-75 active:bg-opacity-75 rounded-full border-none"
          text-style="text-oba-white text-lg font-roboto" />
      </div>
      <div class="inline-flex gap-4">
        <span class="text-oba-black font-roboto text-lg">If you aren't, well...</span>
        <p class="text-oba-black font-roboto text-lg">Sayonara...</p>
      </div>
    </div>
  </section>
</template>
