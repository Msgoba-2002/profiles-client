export const useImgUpload = () => {
  const uploadImg = async (file: File) => {
    const { getUploadUrl } = useProfileStore();
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
  return uploadImg;
}
