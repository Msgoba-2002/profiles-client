<script setup lang="ts">
import type { CreateProfileRawForm, IUploadedFile } from '@/types/profile';

const { getUploadUrl, storeProfile } = useProfileStore();
const { fetchUser } = useAuthStore();
const { user } = storeToRefs(useUserStore());

const classLevelOptions = ['JSS', 'SSS'];
const classLevel = ref('JSS');

const classOptions = ['1', '2', '3'];
const classValue = ref('1');

const classArmOptions = ['A', 'B', 'C', 'D', 'E', 'F'];
const classArm = ref('A');

const uploadImg = async (file: File) => {
  const { url: uploadUrl } = await getUploadUrl(file.type);

  await $fetch(uploadUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
      'Content-Length': file.size.toString(),
    },
  }).catch((err) => {
    console.error(err);
    throw new Error('Failed to upload image');
  });
  const urlObject = new URL(uploadUrl);
  return urlObject.pathname;
}

const submitProfileCreate = () => {
  submitForm('profile-create');
}

const creatingProfile = ref(false);
const handleProfileCreate = async (form: CreateProfileRawForm) => {
  creatingProfile.value = true;
  try {
    const profilePic = form.profile_picture[0];
    const uploadedProfilePicUrl = await uploadImg(profilePic.file);

    const { hobbies, birthday, ...rest } = form;
    const hobbiesArray = hobbies.split(',').map((hobby) => hobby.trim()).filter(Boolean);
    const profileData = {
      ...rest,
      profile_picture: uploadedProfilePicUrl,
      final_class: `${classLevel.value} - ${classValue.value}${classArm.value}`,
      hobbies: hobbiesArray,
      birthday: new Date(birthday),
    };

    const response = await storeProfile(profileData);
    fetchUser(true);

    creatingProfile.value = false;

    if (user.value) {
      return navigateTo({ name: 'user-userId', params: { userId: user.value?.id } });
    }
  } catch (err) {
    console.error(err);
    creatingProfile.value = false;
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
        <h1 class="font-roboto text-lg text-oba-white">Create Your Profile</h1>
      </div>
      <div class="rounded-md bg-oba-gray p-6">
        <FormKit type="form" id="profile-create" @submit="handleProfileCreate" submit-label="Submit"
          :classes="{
            form: 'flex flex-col gap-6',
          }"
          :submit-attrs="{
            'wrapper-class': 'hidden',
          }"
          :config="{validationVisibility: 'dirty'}" class="flex flex-col gap-4">

          <div class="flex flex-row justify-between gap-2">
            <div class="w-full">
              <FormKit @change="fileSelected" type="file" name="profile_picture" label="Profile Picture" required
              help="upload a photo of yourself" file-remove-icon="close"
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
                
              }" 
              :validation="[['required']]"/>
            </div>
            <div class="w-[20%] self-center" v-if="photoPreview">
              <span class="block rounded-full w-12 h-12"
                :style="'background-size: cover; background-repeat: no-repeat; background-position: center center; background-image: url(\'' + photoPreview + '\');'">
              </span>
            </div>
          </div>

          <FormKit type="tel" name="phone_number" label="Phone Number" required
            placeholder="ex. 2348012345678" minlength="13"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 11]]"/>

          <FormKit type="text" name="nickname" label="Nickname"
            placeholder="what did we call you in school?"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['length', 3]]"/>

          <FormKit type="date" name="birthday" label="Birthday"
            help="choose your date of birth"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
              help: 'text-oba-blue text-xs font-roboto italic font-extralight',
            }" 
            :validation="[['required'], ['date_before', '1996-01-01']]"/>

          <FormKit type="select" name="marital_status" label="Marital Status"
            :options="[ 'Single', 'Married', 'Divorced', 'Widowed' ]"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required']]"/>

          <FormKit type="select" name="occupation_status" label="Occupation Status"
            :options="[ 'Unemployed', 'Employed', 'Self-Employed' ]"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" />

          <FormKit type="text" name="occupation" label="Occupation"
            placeholder="ex. Financial Advisor"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['length', 3]]" />

          <FormKit type="text" name="place_of_work" label="Place of Work"
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
            placeholder="ex. Yenagoa"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation="[['required'], ['length', 2]]" />

          <FormKit type="text" name="hobbies" label="Hobbies"
            placeholder="enter your hobbies, separated with commas"
            :classes="{
              label: 'text-oba-black text-base font-roboto font-light',
              input: 'w-full bg-oba-white rounded-md p-2 placeholder:text-sm font-roboto',
              wrapper: 'flex flex-col gap-2',
              message: 'text-oba-black text-xs font-roboto italic font-extralight',
              outer: 'flex flex-col gap-1',
            }" 
            :validation-rules="{ stringToArray }"
            :validation-messages="{ stringToArray: 'Please enter multiple hobbies separated by commas' }"
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

          <FormKit type="textarea" name="bio" label="Bio" rows="8"
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
        <UiBaseBtn @click="submitProfileCreate" label-text="Submit" button-type="button" text-style="text-oba-white text-base font-roboto"
          class="w-full bg-oba-blue rounded-md py-2" >
          <template #appendIcon>
            <Icon v-if="creatingProfile" name="line-md:loading-alt-loop" size="16px" class="text-oba-white" />
          </template>
        </UiBaseBtn>
      </div>
    </div>
  </section>
</template>