import { clientFetch } from "@/components/index";
import { CountTypes } from "@/models/types";

export async function getBlogCount() {
  return clientFetch<CountTypes>({
    endpoint: `/blogs/count`,
    method: "GET",
    title: "Blog count",
  });
}
