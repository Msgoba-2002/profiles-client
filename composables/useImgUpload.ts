import { fetchKeys } from "../types/enums";

export const useImgUpload = () => {
  const uploadImg = async (file: File) => {
    const contentType = file.type;
    const fileKey = 'dev/' + crypto.randomUUID();
    const { data, error } = await useApiFetch('/storage/upload-url', {
      method: 'POST',
      body: JSON.stringify({ contentType: contentType, key: fileKey }),
      key: fetchKeys.UploadUrl,
    });
    if (error.value) {
      throw new Error(error.value.message);
    }
  
    await $fetch(data.value as string, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': contentType,
        'Content-Length': file.size.toString(),
      },
    }).catch((err) => {
      console.error(err);
      throw new Error('Failed to upload image');
    });
    return fileKey;
  }
  return uploadImg;
}
