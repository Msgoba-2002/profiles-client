<script setup lang="ts">
const route = useRoute();
const profileId = route.params.profileId as string;

const profileStore = useProfileStore();
const { getUserProfile } = profileStore;
const userProfile = await getUserProfile(profileId);

const fullName = computed(() => `${userProfile.user.first_name} ${userProfile.user.last_name}`);
const hasNickname = computed(() => !!userProfile.nickname
  && userProfile.nickname.toLowerCase() !== 'nil'
  && userProfile.nickname.toLowerCase() !== 'none'
  && userProfile.nickname.toLowerCase() !== 'n/a'
);

const profileInfo = computed(() => {
  const info = {
    Nickname: userProfile.nickname,
    'Left From': userProfile.final_class,
    Email: userProfile.user.email,
    Birthday: userProfile.birthday,
    'Marital Status': userProfile.marital_status,
    'Based In': userProfile.place_of_residence,
    'Employment Status': userProfile.occupation_status,
    Occupation: userProfile.occupation,
    Employer: userProfile.place_of_work,
    Hobbies: userProfile.hobbies.join(', '),
    Bio: userProfile.bio,
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
        <h1 class="font-roboto font-light text-lg text-oba-white">{{ fullName }}</h1>
      </div>
      
      <div class="rounded-b-md bg-oba-gray">
        <img :src="userProfile.profile_picture" alt="profile image" class="w-full aspect-square">

        <ul class="w-full list-none">
          <li class="px-4 py-2 text-oba-black" v-for="(info, key, index) in profileInfo" :key="key"
            :class="index % 2 > 0 ? 'bg-oba-blue text-oba-white': ''">
            <div class="inline-flex items-center">
              <span class="font-roboto text-base font-semibold">{{ key }}:</span>
              <span class="font-roboto text-base ml-2 truncate">{{ info }}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>