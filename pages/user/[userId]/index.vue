<script setup lang="ts">
definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'is-eligible', 'has-profile'],
  layout: 'profile-layout',
});

const { getRandomProfiles } = useProfileStore();
const { profiles } = await getRandomProfiles(5);
</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Remember these guys?</h1>
      </div>
      
      <div class="rounded-md bg-oba-gray p-6">
        <Carousel :items-to-show="1" :wrap-around="true" :autoplay="5000" :transition="500" >
          <Slide v-for="userProfile in profiles" :key="userProfile.id">
            <ProfileCard :id-prop="userProfile.id" :profile-obj="userProfile" />
          </Slide>

          <template #addons>
            <Navigation />
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>