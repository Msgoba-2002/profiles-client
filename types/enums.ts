export const fetchKeys = {
  Login: 'Login',
  Logout: 'Logout',
  GetUser: 'GetUser',
} as const;

export type FetchKeys = keyof typeof fetchKeys;