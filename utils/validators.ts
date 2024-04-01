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