import { defineStore } from 'pinia';
import type { IFullProfile, IProfile, IProfileDto, IUploadUrl } from '../types/profile';
import { fetchKeys } from '../types/enums';

export const useProfileStore = defineStore('profiles', () => {
  const myProfile = ref<IProfile | null>(null);
  
  const getUploadUrl = async (contentType: string) => {
    const { data, error } = await useApiFetch('/storage/upload-url', {
      method: 'POST',
      body: JSON.stringify({ contentType }),
      key: fetchKeys.UploadUrl,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
    return data.value as IUploadUrl;
  }

  const storeProfile = async (dto: IProfileDto) => {
    const { data, error } = await useApiFetch('/profile', {
      method: 'POST',
      body: JSON.stringify(dto),
      key: fetchKeys.StoreProfile,
    });

    if (error.value) {
      throw new Error(error.value.message);
    }
    return data.value as IFullProfile;
  }

  return {
    getUploadUrl,
    storeProfile,
  }
});