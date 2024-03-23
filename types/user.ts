
export interface AuthenticatedUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  email_verified: boolean;
  questions_verified: boolean;
}