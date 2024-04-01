import { defineStore } from 'pinia';
import type { IFullProfile, IProfileDto, IProfileUpdateDto, IUploadUrl } from '../types/profile';
import { fetchKeys } from '../types/enums';

export const useProfileStore = defineStore('profiles', () => {
  const myProfile = ref<IFullProfile | null>(null);
  
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

  const deletePicture = async (imagePath: string) => {
    const { pathname: path } = new URL(imagePath);
    const { error } = await useApiFetch(`/storage/delete?path=${path}`, {
      method: 'DELETE',
      key: fetchKeys.DeleteImage,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
  }

  const updateProfile = async (dto: IProfileUpdateDto, profileId: string) => {
    const { user } = storeToRefs(useUserStore());
    const { fetchUser } = useAuthStore();
    if (user.value) {
      const { id: userId } = user.value;

      const { error } = await useApiFetch(`/profile/${userId}/${profileId}`, {
        method: 'PATCH',
        key: fetchKeys.UpdateProfile,
        body: JSON.stringify(dto),
      });

      if (error.value) {
        throw new Error(error.value.message);
      }

      await fetchUser(true);
    }
  }

  return {
    getUploadUrl,
    storeProfile,
    deletePicture,
    updateProfile,
  }
});