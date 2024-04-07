export const pwConfirmed = (node: any) => {
  const parent = node.at('$parent');

  if (parent.value) {
    return parent.value['password'] === node.value;
  }
  return true;
}

export const stringToArray = (node: any, count: number) => {
  const valuesArray = node.value.split(',').map((value: string) => value.trim());
  return valuesArray.filter(Boolean).length >= count;
}

export const acceptedImgFormat = (node: any) => {
  const imgFormats = ['jpg', 'jpeg', 'png'];
  const fileType = node.value[0].file.type;
  const imgFormat = fileType.split('/')[1];

  return imgFormats.includes(imgFormat);
}