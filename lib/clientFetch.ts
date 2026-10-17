"use client";
import { getSession } from "next-auth/react";
import { env } from "@/constants/env";
import { PaginationType } from "@/models/types";

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
  data: [];
}

export default async function clientFetch<T>(
  props: PropsTypes,
): Promise<T | ReturnType> {
  const { endpoint, method, title, params } = props;
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || env.api_url;
    const session = await getSession();
    const token = (session as any)?.accessToken; // type assertion if accessToken exists
    // const api_url = process.env.NEXT_PUBLIC_API_URL!;

    const res = await fetch(
      `${apiUrl}${endpoint}?lang=${env.lang}${params ?? ""}`,
      {
        method,
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      },
    );

    if (!res.ok) {
      const errorData = await res.json();

      throw new Error(errorData.message || `Failed fetching ${title}`);
    }
    const data = await res.json();
   
    return data;
  } catch (err) {
    return {
      success: false,
      message: err instanceof Error ? err.message : `Error fetching ${title}`,
      pagination: {
        page: 1,
        limit: 15,
        total: 0,
        totalPages: 0,
      },
      data: [],
    };
  }
}
