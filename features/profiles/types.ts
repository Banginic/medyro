import { APIResponse } from "@/models/types";

export interface ProfileType {
  projectName: string;
  whatsApp: string;
  facebook: string;
  instagram: string;
  tiktok: string;
  email: string;
  phone: string;

  address: string;
  city: string;
  country: string;

  createdAt: string;
  updatedAt: string;
}

export interface ProfileTypes extends APIResponse {
  data: ProfileType[] | [];
}
