<script setup lang="ts">
import { classOptions, classLevelOptions, classArmOptions } from '@/constants/classes';
import type { CreateProfileRawForm, IProfileUpdateDto } from '@/types/profile';
import { stringToArray } from '@/utils/validators';

definePageMeta({
  middleware: ['is-authenticated', 'is-verified', 'is-eligible', 'has-profile'],
  layout: 'profile-layout',
});

const submitProfileEdit = () => {
  submitForm('profile-edit');
}
const { user } = storeToRefs(useUserStore());

const profile = computed(() => {
  if (!user.value) return null;
  return user.value?.Profile;
});

const classValue = ref(user.value?.Profile.final_class.split('-')[1].trim()[0]);
const classLevel = ref(user.value?.Profile.final_class.split('-')[0].trim());
const classArm = ref(user.value?.Profile.final_class.split('-')[1].trim()[1]);

const editingProfile = ref(false);
const { deletePicture, updateProfile } = useProfileStore();
const uploadImg = useImgUpload();

const handleProfileEdit = async (form: CreateProfileRawForm) => {
  editingProfile.value = true;
  let uploadedProfilePicUrl = '';
  try {
    const profilePic = form.profile_picture[0];
    if (profilePic && profile.value?.profile_picture) {
      // delete old picture from s3
      await deletePicture(profile.value?.profile_picture);
      uploadedProfilePicUrl = await uploadImg(profilePic.file);
    }
    const profileData: IProfileUpdateDto = {};
    if (!profile.value) return; 
    if (!user.value) return; 
    Object.keys(form).forEach((key) => {
      if (key === 'profile_picture') {
        !!profilePic && uploadedProfilePicUrl && (profileData[key] = uploadedProfilePicUrl);
      } else if (key === 'hobbies') {
        const hobbiesArray = form[key].split(',').map((hobby: string) => hobby.trim()).filter(Boolean);
        const allIncluded = profile.value && hobbiesArray.every((hobby: string) => profile.value && profile.value[key].includes(hobby));
        const hasMore = profile.value && profile.value[key].filter((hobby: string) => !hobbiesArray.includes(hobby)).length > 0;
        if (!allIncluded || hasMore) {
          profileData[key] = hobbiesArray;
        }
      } else if (key === 'birthday') {
        const isEqual = profile.value && profile.value[key] === new Date(form[key]).toISOString();
        if (!isEqual) {
          profileData[key] = new Date(form[key]).toISOString();
        }
      } else {
        if (profile.value && profile.value[(key as keyof IProfileUpdateDto)] && (form[(key as keyof CreateProfileRawForm)] !== profile.value[(key as keyof IProfileUpdateDto)])) {
          profileData[(key as keyof IProfileUpdateDto)] = form[(key as keyof CreateProfileRawForm)] as (string & string[]) | undefined;
        }
      }
    });
    const finalClass = `${classLevel.value} - ${classValue.value}${classArm.value}`;
    if(profile.value.final_class !== finalClass) {
      profileData.final_class = finalClass;
    }
    await updateProfile(profileData, profile.value.id);
    editingProfile.value = false;

    return navigateTo({name: 'user-userId', params: {userId: user.value.id}})
  } catch (err) {
    console.error(err);
    editingProfile.value = false;
  }
}

const photoPreview = ref<string | null | ArrayBuffer>('');
const fileSelected = (event: any) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    photoPreview.value = e.target && e.target?.result;
  }
  reader.readAsDataURL(event.target.files[0]);
}

</script>


<template>
  <section class="py-4">
    <div class="w-[70%] mx-auto bg-oba-red rounded-md">
      <div class="px-6 py-4">
        <h1 class="font-roboto text-lg text-oba-white">Edit Your Profile</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <FormKit type="form" id="profile-edit" @submit="handleProfileEdit" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}" class="flex flex-col gap-4">

          <div class="flex flex-row justify-between gap-2">
            <div class="w-full">
              <FormKit @change="fileSelected" type="file" name="profile_picture" label="Profile Picture"
              help="only upload photo to change your profile picture" file-remove-icon="close"
              accept=".jpg,.jpeg,.png"
              :classes="{
                label: 'text-oba-black text-base font-roboto font-light',
                wrapper: 'flex flex-col gap-2',
                message: 'text-oba-black text-xs font-roboto italic font-extralight',
                inner: 'bg-oba-white rounded-md p-2 h-11 overflow-hidden',
                outer: 'flex flex-col gap-1',
                help: 'text-oba-blue text-xs font-roboto italic font-extralight',
                fileRemove: 'w-3 h-auto',
                fileItem: 'hidden',
                noFiles: 'hidden'
                
              }" />
            </div>
            <div class="w-[20%] self-center" v-if="photoPreview">
              <span class="block rounded-full w-12 h-12"
                :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + photoPreview + '\');'">
              </span>
            </div>
          </div>

          <FormKit type="tel" name="phone_number" label="Phone Number" required
            placeholder="ex. 2348012345678" minlength="13" :value="profile?.phone_number"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 11]]"/>

          <FormKit type="text" name="nickname" label="Nickname"
            placeholder="what did we call you in school?" :value="profile?.nickname"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['length', 3]]"/>

          <FormKit type="date" name="birthday" label="Birthday"
            help="choose your date of birth" :value="profile?.birthday.split('T')[0]"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
              help: 'text-oba-blue text-xs font-roboto italic font-extralight',
            }" 
            :validation="[['required'], ['date_before', '1996-01-01']]"/>

          <FormKit type="select" name="marital_status" label="Marital Status" :value="profile?.marital_status"
            :options="[ 'Single', 'Married', 'Divorced', 'Widowed' ]"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required']]"/>

          <FormKit type="select" name="occupation_status" label="Occupation Status" :value="profile?.occupation_status"
            :options="[ 'Unemployed', 'Employed', 'Self-Employed' ]"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" />

          <FormKit type="text" name="occupation" label="Occupation" :value="profile?.occupation"
            placeholder="ex. Financial Advisor"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['length', 3]]" />

          <FormKit type="text" name="place_of_work" label="Place of Work" :value="profile?.place_of_work"
            placeholder="ex. Niger Delta Power Holding Co."
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['length', 5]]" />

          <FormKit type="text" name="place_of_residence" label="Place of Residence"
            placeholder="ex. Yenagoa" :value="profile?.place_of_residence"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 2]]" />

          <FormKit type="text" name="hobbies" label="Hobbies" :value="profile?.hobbies.join(', ')"
            placeholder="enter your hobbies, separated with commas"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation-rules="{ stringToArray }"
            :validation-messages="{ stringToArray: 'Please enter at least 3 hobbies separated by commas' }"
            :validation="[['required'], ['stringToArray', 3]]" />

          <div class="flex flex-col gap-1">
            <label for="" class="text-oba-black text-base font-roboto font-light">Final Class</label>
            <div class="w-full bg-oba-red rounded-md p-4 flex flex-col gap-2">
              <span class="text-sm text-oba-white font-roboto font-light">In what class did you leave?</span>
              <div class="grid grid-cols-3 gap-2 items-center">
                <FormKit v-model="classLevel" type="radio"
                  :options="classLevelOptions"
                  :classes="{
                    options: 'flex flex-col gap-2',
                    wrapper: 'flex flex-row gap-1',
                    outer: 'col-span-1',
                    label: 'text-oba-white text-base font-roboto'
                  }"/>
              
                <FormKit v-model="classValue" type="radio"
                  :options="classOptions"
                  :classes="{
                    options: 'flex flex-row gap-2',
                    wrapper: 'flex flex-row gap-1',
                    outer: 'col-span-1',
                    label: 'text-oba-white text-base font-roboto'
                  }"/>
              
                <div class="">
                  <FormKit v-model="classArm" type="radio"
                    :options="classArmOptions"
                    :classes="{
                      options: 'grid grid-cols-3 gap-2',
                      wrapper: 'flex flex-row gap-1 justify-end',
                      outer: 'col-span-1',
                      label: 'text-oba-white text-base font-roboto'
                    }"/>
                </div>
              </div>
              <div class="mx-auto py-2 px-8 bg-oba-gray rounded-md">
                <span class="font-roboto text-oba-black text-base">{{ classLevel + ' - ' + classValue + classArm }}</span>
              </div>
            </div>
          </div>

          <FormKit type="textarea" name="bio" label="Bio" rows="8" :value="profile?.bio"
            placeholder="tell us a little something about yourself"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 30, 200]]" />
        </FormKit>
        <UiBaseBtn @click="submitProfileEdit" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          :isDisabled="editingProfile" class="w-full bg-oba-blue rounded-md py-2" >
          <template #appendIcon>
            <Icon v-if="editingProfile" name="line-md:loading-alt-loop" size="16px" class="text-oba-white" />
          </template>
        </UiBaseBtn>
      </div>
    </div>
  </section>
</template>