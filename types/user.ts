import type { AuthProfile } from "./profile";

export interface AuthenticatedUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  questions_verified: boolean;
  Profile: AuthProfile;
}

export interface FetchedAuthenticatedUser {
  user: AuthenticatedUser;
}

export type NewlyRegisteredUser = AuthenticatedUser & { created_at: string };

export interface UserRegistrationForm {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  confirm_password: string;
}