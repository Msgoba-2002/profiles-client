export const fetchKeys = {
  Register: 'Register',
  Login: 'Login',
  Logout: 'Logout',
  GetUser: 'GetUser',
  ForgotPassword: 'ForgotPassword',
  ResendVerification: 'ResendVerification',
  VerifyEmail: 'VerifyEmail',
  UpdatePassword: 'UpdatePassword',
  UploadUrl: 'UploadUrl',
  StoreProfile: 'StoreProfile',
  GetMyProfile: 'GetMyProfile',
  UpdateProfile: 'UpdateProfile',
  DeleteImage: 'DeleteImage',
  GetQuestions: 'GetQuestions',
  AddQuestion: 'AddQuestion',
  UpdateQuestion: 'UpdateQuestion',
  DeleteQuestion: 'DeleteQuestion',
  CheckEligibility: 'CheckEligibility',
  GetProtoProfile: 'GetProtoProfile',
} as const;

export type FetchKeys = keyof typeof fetchKeys;