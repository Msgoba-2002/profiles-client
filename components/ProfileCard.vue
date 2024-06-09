<script setup lang="ts">
import type { IRandomProfile } from '~/types/profile';

type ProfileCardProps = {
  idProp: string;
  profileObj: IRandomProfile;
}
const props = defineProps<ProfileCardProps>();

const userStore = useUserStore();
const { user } = userStore;

const fullName = computed(() => {
  return `${props.profileObj.first_name} ${props.profileObj.last_name}`;
});

const hasNickname = computed(() => {
  return !!props.profileObj.Profile.nickname;
});
</script>


<template>
  <NuxtLink :to="{ name: 'user-userId-profile-profileId', params: { userId: user?.id as string, profileId: props.profileObj.Profile.id } }"
    class="w-56 h-96 rounded-md flex flex-col gap-0 bg-oba-blue justify-between hover:opacity-85" :key="idProp">
    <div class="w-full h-full bg-oba-white">
      <img :src="profileObj.Profile.profile_picture" alt="profile-pic" class="w-full h-full object-cover rounded-t-md" />
    </div>
    <div class="w-full h-16 bg-oba-red rounded-b-md p-2">
      <span class="font-roboto text-lg text-oba-white">{{ fullName }}</span>
      <div v-if="hasNickname">
        <span class="font-roboto text-sm text-oba-white font-light italic">We used to call him {{ profileObj.Profile.nickname }}</span>
      </div>
    </div>
  </NuxtLink>
</template>