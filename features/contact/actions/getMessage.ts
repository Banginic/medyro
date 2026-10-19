import { clientFetch } from "@/components/index";
import { MessageTypes } from "../types";

export async function getMessage(id: string) {
  return clientFetch<MessageTypes>({
    endpoint: `/messages/${id}`,
    method: "GET",
    title: "Message details",
  });
}
