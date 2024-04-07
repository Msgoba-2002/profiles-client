<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'is-eligible', 'has-profile'],
  layout: 'profile-layout',
});
</script>


<template>
  <section class="py-4">
    <div class="w-[70%] mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Remember these guys?</h1>
      </div>
      
      <div class="rounded-md bg-oba-gray p-6">
        <Carousel :items-to-show="1" :wrap-around="true" :autoplay="5000" :transition="500" >
          <Slide v-for="num in 5" :key="'pic-' + num">
            <ProfileCard />
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>