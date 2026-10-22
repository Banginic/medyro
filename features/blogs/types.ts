import { APIResponse, PaginationType } from "@/models/types";

export interface BlogType {
  id: string;
  title: string;
  author: string;
  body: string;
  slug: string;
  photo: string;
  avatar: string;
  likes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogTypes extends APIResponse {
  data: BlogType[] | [];
  pagination?: PaginationType
}

export interface BlogsSearchParamsType {
    limit?: number;
    page?: number;
    category?: string;
    search?: string;
}