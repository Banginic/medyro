import { APIResponse, PaginationType } from "@/models/types";

export interface MessageType {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface MessageTypes extends APIResponse {
  data: MessageType[] | [];
  pagination?: PaginationType;
}

export interface MessageSearchParamsType {
  page?: number;
  limit?: number;
  search?: string;
}
