import { clientFetch } from "@/components/index";
import { CountTypes } from "@/models/types";

export async function getUserCount() {
  return clientFetch<CountTypes>({
    endpoint: `/admins/count`,
    method: "GET",
    title: "users count",
  });
}
