export const pwConfirmed = (node: any) => {
  const parent = node.at('$parent');

  if (parent.value) {
    return parent.value['password'] === node.value;
  }
  return true;
}