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
    Birthday: new Date(userProfile.birthday).toLocaleDateString('en-NG', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
    }).split(' ').slice(0, 2).join('/'),
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
        <h1 class="font-roboto font-light text-lg text-oba-white capitalize">{{ fullName }}</h1>
      </div>
      
      <div class="rounded-md bg-oba-gray">
        <div class="w-full rounded-t-md">
          <img :src="userProfile.profile_picture" alt="profile image" class="w-full object-cover rounded-t-md">
        </div>

        <ul class="w-full list-none pb-8">
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