import { APIResponse, PaginationType } from "@/models/types";

export interface AdminSearchParamsType {
  page?: number;
  limit?: number;
  role?: string;
}

export interface UserType {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserTypes extends APIResponse {
  data: UserType[] | [];
  pagination?: PaginationType;
}
