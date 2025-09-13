<script setup lang="ts">
import type { IRandomProfile } from '~/types/profile';

type ProfileCardProps = {
  idProp: string;
  profileObj: IRandomProfile;
}
const props = defineProps<ProfileCardProps>();

const userStore = useUserStore();
const { user } = userStore;

const hasNickname = computed(() => {
  return !!props.profileObj.nickname
    && props.profileObj.nickname.toLowerCase() !== 'nil'
    && props.profileObj.nickname.toLowerCase() !== 'none'
    && props.profileObj.nickname.toLowerCase() !== 'n/a';
});
</script>


<template>
  <NuxtLink :to="{ name: 'user-userId-profile-profileId', params: { userId: user?.id as string, profileId: props.profileObj.id } }"
    class="w-56 rounded-md flex flex-col gap-0 bg-oba-blue justify-between hover:opacity-85" :key="idProp">
    <div class="w-full h-80 bg-oba-white">
      <img :src="profileObj.profilePictureUrl" alt="profile-pic" class="w-full h-full object-cover rounded-t-md" />
    </div>
    <div class="w-full bg-oba-red rounded-b-md p-2 flex flex-col gap-1 items-center">
      <span class="font-roboto text-lg text-oba-white">{{ profileObj.fullName }}</span>
      <div v-if="hasNickname">
        <span class="font-roboto text-sm text-oba-white font-light italic ">We used to call him {{ profileObj.nickname }}</span>
      </div>
    </div>
  </NuxtLink>
</template>