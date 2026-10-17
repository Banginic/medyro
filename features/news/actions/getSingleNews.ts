import { clientFetch } from "@/components/index";
import { NewsTypes } from "../types";

export async function getSingleNews(id: string) {
  return clientFetch<NewsTypes>({
    endpoint: `/news/${id}`,
    method: "GET",
    title: "New details",
  });
}
