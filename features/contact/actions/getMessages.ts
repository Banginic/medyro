import { clientFetch } from "@/components/index";
import { MessageSearchParamsType, MessageTypes } from "../types";

export async function getMessages(searchParams: MessageSearchParamsType) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<MessageTypes>({
    endpoint: "/messages",
    params: `&${params.toString()}`,
    method: "GET",
    title: "Messages",
  });
}
