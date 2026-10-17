import { APIResponse, PaginationType } from "@/models/types";


export type UserRoleType = 'admin' | 'profile' | 'user'
export const UserRoleEnum = ['admin' , 'profile' , 'user'] as const
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
  role: UserRoleType;
  createdAt: Date;
  updatedAt: Date;
}
export interface UserTypes extends APIResponse {
  data: UserType[] | [];
  pagination?: PaginationType;
}
