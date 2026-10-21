"use server";
import { env } from "@/constants/env";
import { PaginationType } from "@/models/types";
import { cookies } from "next/headers";

interface PropsTypes {
  endpoint: string;
  params?: string;
  method: string;
  title: string;
}
interface ReturnType {
  pagination?: PaginationType;
  success: boolean;
  message: string;
  status?: number;
  data: [];
}
export default async function serverFetch<T>(
  props: PropsTypes,
): Promise<T | ReturnType> {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.get("next-auth.session-token")?.value;

  const { endpoint, method, title, params } = props;
  try {
    const apiUrl = process.env.API_URL!;
    const response = await fetch(
      `${apiUrl}${endpoint}?lang=${env.lang}${params ?? ""}`,
      {
        method: method,
        credentials: "include",
        
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieHeader ? `next-auth.session-token=${cookieHeader}` : "",
        },
      },
    );
    const data = await response.json();
    return {...data, status: response.status};
    
  } catch (ex) {
    if (ex instanceof Error) {
      return { success: false, message: ex.message, data: [] };
    }
    return {
      success: false,
      message: `Error occoured fetching ${title}`,
      data: [],
    };
  }
}
