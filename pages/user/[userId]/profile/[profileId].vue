<script setup lang="ts">
import { fetchKeys } from '~/types/enums';
import { type ILimitedProfile } from '~/types/profile';

const route = useRoute();
const profileId = (route.params as { userId: string, profileId: string }).profileId;

const snackbar = useSnackbar();
const { error } = await useApiFetch(`/profile/user/${profileId}`, {
      method: 'GET',
      key: fetchKeys.GetUserProfile,
});

if (error.value) {
  snackbar.add({
    title: "Error fetching user profile",
    message: error.value.message,
    type: "error"
  });
}

const { data: userProfile } = useNuxtData<ILimitedProfile>(fetchKeys.GetUserProfile);

const hasNickname = computed(() => !!userProfile.value?.nickname
  && userProfile.value?.nickname.toLowerCase() !== 'nil'
  && userProfile.value?.nickname.toLowerCase() !== 'none'
  && userProfile.value?.nickname.toLowerCase() !== 'n/a'
);

const profileInfo = computed(() => {
  const info = {
    Nickname: userProfile.value?.nickname,
    'Left From': userProfile.value?.finalClass,
    Birthday: new Date((userProfile.value?.birthday)!).toLocaleDateString('en-NG', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    }).split(' ').slice(0, 2).join('/'),
    'Marital Status': userProfile.value?.maritalStatus,
    'Based In': userProfile.value?.placeOfResidence,
    'Employment Status': userProfile.value?.occupationStatus,
    Occupation: userProfile.value?.occupation,
    Employer: userProfile.value?.placeOfWork,
    Hobbies: (userProfile.value?.hobbies)!.join(', '),
    Bio: userProfile.value?.bio,
  };

  Object.keys(info).forEach((key) => {
    if (!(info[key as keyof typeof info])) {
      delete info[key as keyof typeof info];
    }
    if (!hasNickname.value) {
      delete info.Nickname;
    }
  });

  return info;
})
</script>


<template>
  <section class="py-4">
    <div class="sm:w-[70%] w-full mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto font-light text-lg text-oba-white capitalize">{{ userProfile?.fullName }}</h1>
      </div>
      
      <div class="rounded-b-md bg-oba-gray">
        <img :src="userProfile?.profilePictureUrl" alt="profile image" class="w-full aspect-square">

        <ul class="w-full list-none">
          <li class="px-4 py-2 text-oba-black h-fit" v-for="(info, key, index) in profileInfo" :key="key"
            :class="index % 2 > 0 ? 'bg-oba-blue text-oba-white': ''">
            <div class="h-full">
              <span class="font-roboto text-base font-semibold">{{ key }}:</span>
              <p class="font-roboto text-base ml-2">{{ info }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>