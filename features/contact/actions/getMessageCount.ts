import { clientFetch } from "@/components/index";
import { CountTypes } from "@/models/types";

export async function getMessageCount() {
  return clientFetch<CountTypes>({
    endpoint: `/messages/count`,
    method: "GET",
    title: "Message count",
  });
}
