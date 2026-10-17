import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type APIResponse = { success: boolean; message: string, status?: number };

export type PaginationType = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface PlatformType {
  name: string;
  iconst: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  label: string;
}


export interface CountTypes extends APIResponse {
  data: number;
}