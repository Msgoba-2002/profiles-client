<script setup lang="ts">
const { user } = storeToRefs(useUserStore());
const route = useRoute();

const showEditProfile = computed(() => {
  return route.name !== 'user-userId-profile-edit';
});
</script>


<template>
  <section class="my-8">
    <div class="w-[70%] mx-auto flex flex-row gap-4">
      <div class="w-[20%]">
        <img :src="user?.Profile.profile_picture" class="h-20 w-20 object-cover rounded-full" />
      </div>

      <div class="flex flex-col gap-2 justify-end items-start w-[80%]">
        <span>
          <h2 class="font-roboto text-oba-black text-xl">Welcome back,&nbsp;{{ user?.first_name }}!</h2>
        </span>
        <div v-if="user" class="w-full flex flex-row justify-between gap-12 items-center">
          <UiLinkAsBtn v-show="showEditProfile" :link-dest="{name: 'user-userId-profile-edit', params: { userId: user?.id } }"
            label-text="Edit My Profile" class="w-full bg-oba-blue rounded-md py-2"
            text-style="text-oba-white text-base font-roboto">
          </UiLinkAsBtn>
          
          <UiLinkAsBtn link-dest="#"
            label-text="View Excos" class="w-full bg-oba-blue rounded-md py-2"
            text-style="text-oba-white text-base font-roboto">
          </UiLinkAsBtn>
        </div>
      </div>

    </div>
  </section>
</template>