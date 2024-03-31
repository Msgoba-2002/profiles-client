export const fetchKeys = {
  Register: 'Register',
  Login: 'Login',
  Logout: 'Logout',
  GetUser: 'GetUser',
  ForgotPassword: 'ForgotPassword',
  ResendVerification: 'ResendVerification',
  VerifyEmail: 'VerifyEmail',
  UpdatePassword: 'UpdatePassword',
} as const;

export type FetchKeys = keyof typeof fetchKeys;