import { APIResponse } from "@/models/types";

export interface OnCallType {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  note: string;
  isActive: boolean;
  createdAt: Date;
}

export interface OnCallTypes extends APIResponse {
  data: OnCallType[] | [];
}

export interface OnCallSearchParamsType {
  month?: number;
  year?: number;
}
