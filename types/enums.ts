export const fetchKeys = {
  Register: 'Register',
  Login: 'Login',
  Logout: 'Logout',
  GetUser: 'GetUser',
} as const;

export type FetchKeys = keyof typeof fetchKeys;