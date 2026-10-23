import { APIResponse, PaginationType } from "@/models/types";
import { VerificationStatusType } from "../pharmacy/types";

export interface VerificationType {
  id: string;
  pharmacyId: string;
  verificationStatus: VerificationStatusType;
  otp: number;
  isEmailVerified: boolean;
  existOtp: boolean;
  otpConfirmation: number;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface VerificationTypes extends APIResponse {
  data: VerificationType[] | [];
  pagination?: PaginationType;
}
