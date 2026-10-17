import { APIResponse } from "@/models/types";


export interface NewsType {
  id: string;
  subject: string;
  body: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface NewsTypes extends APIResponse {
  data: NewsType[] | [];
}


export interface NewsSearchParamsType {
  page?: number;
  limit?: number;
  status?: string;
}