<script setup lang="ts">
const { user } = storeToRefs(useUserStore());
const route = useRoute();

const showEditProfile = computed(() => {
  return route.name !== 'user-userId-profile-edit';
});
</script>


<template>
  <section class="my-8">
    <div class="sm:w-[70%] w-full mx-auto flex flex-row gap-4 px-6">
      <div class="w-[20%]">
        <img :src="user?.Profile.profile_picture" class="w-20 object-cover aspect-square rounded-full" />
      </div>

      <div class="flex flex-col gap-2 justify-end items-start w-[80%]">
        <span>
          <h2 class="font-roboto text-oba-black text-xl">Welcome back,&nbsp;{{ user?.first_name }}!</h2>
        </span>
        <div v-if="user" class="w-full flex flex-row justify-between sm:gap-12 gap-4 items-center">
          <UiLinkAsBtn v-show="showEditProfile" :link-dest="{name: 'user-userId-profile-edit', params: { userId: user?.id } }"
            label-text="Edit Profile" class="w-full bg-oba-blue rounded-md py-2"
            text-style="text-oba-white sm:text-base text-sm font-roboto">
          </UiLinkAsBtn>
          
          <UiLinkAsBtn link-dest="#"
            label-text="View Excos" class="w-full bg-oba-blue rounded-md py-2"
            text-style="text-oba-white sm:text-base text-sm font-roboto">
          </UiLinkAsBtn>
        </div>
      </div>

    </div>
  </section>
</template>