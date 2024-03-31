import type { EmailVerificationResponse } from "./verification";

export interface PwResetDto {
  password: string;
  confirm_password: string;
  token: string;
}

export interface PwUpdateResponse extends EmailVerificationResponse { };