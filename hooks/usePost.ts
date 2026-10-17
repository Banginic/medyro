"use server";

import { cookies } from "next/headers";

interface PropsTypes {
  endpoint: string;
  title?: string;
  method: string;
  body: Object | FormData;
}
interface ReturnType {
  success: boolean;
  message: string;
  data: [];
}

function detectFormType(body: any) {
  if (body instanceof FormData) {
    return body;
  }
  return JSON.stringify(body);
}

export async function usePost<T>(props: PropsTypes): Promise<T | ReturnType> {
  const cookieStore = cookies(); // no need for `await` here
  const cookieHeader = (await cookieStore).get(
    "next-auth.session-token"
  )?.value;
  const { endpoint, title, body, method } = props;
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
    const response = await fetch(`${baseUrl}/api/v1${endpoint}`, {
      method: "POST",
      credentials: "include",
      cache: "no-store", // `force-cache` not good for POST
      body: detectFormType(body),
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        ...(cookieHeader
          ? { Cookie: `next-auth.session-token=${cookieHeader}` }
          : {}),
      },
    });
    const data = await response.json();
    return data;
  } catch (ex) {
    if (ex instanceof Error) {
      return { success: false, message: ex.message, data: [] };
    }
    return {
      success: false,
      message: `Error occoured ${title}`,
      data: [],
    };
  }
}
