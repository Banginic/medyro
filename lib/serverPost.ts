
import { env } from "@/constants/env";
import { PaginationType } from "@/models/types";
interface PropsTypes {
  endpoint: string;
  title: string;
  method: string;
  body:  FormData | Record<string, any>;
}
interface ReturnType {
  success: boolean;
  message: string;
  data: [];
  pagination?: PaginationType
}
export async function serverPost<T>(
  props: PropsTypes
): Promise<T | ReturnType> {

  // handle both prod & dev keys



  const { endpoint, title, body, method } = props;
  const isFormData = body instanceof FormData;
  try {
    // const api_url = process.env.API_URL!;
    const response = await fetch(`${env.api_url}${endpoint}?lang=${env.lang}`, {
      method: method || "POST",
      body: isFormData ? body : JSON.stringify(body),
      headers: {
        ...(body instanceof FormData
          ? {}
          : { "Content-Type": "application/json" }),
        
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
