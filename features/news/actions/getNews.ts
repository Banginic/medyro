import { clientFetch } from "@/components/index";
import { NewsSearchParamsType, NewsTypes } from "../types";

export async function getNews(searchParams: NewsSearchParamsType) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return clientFetch<NewsTypes>({
    endpoint: "/news",
    params: `&${params.toString()}`,
    method: "GET",
    title: "News",
  });
}
