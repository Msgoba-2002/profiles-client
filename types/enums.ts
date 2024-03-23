export const fetchKeys = {
  Login: 'Login',
  GetUser: 'GetUser',
} as const;

export type FetchKeys = keyof typeof fetchKeys;