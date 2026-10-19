import { APIResponse } from "@/models/types";
import {OpeningHourType as OpeningHourType2 } from './schemas/OpeningHoursSchema'

export type OpeningHourType = {
  id: string;
  userId: string;
  schedule: OpeningHourType2[];
  createdAt: Date;
};

export interface OpeningHourTypes extends APIResponse {
  data: OpeningHourType[] | [];
}
