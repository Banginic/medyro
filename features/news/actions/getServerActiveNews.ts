import { serverFetch } from "@/components/index";
import { NewsSearchParamsType, NewsTypes } from "../types";


export async function getServerActiveNews(searchParams: NewsSearchParamsType) {
  const params = new URLSearchParams();

  Object.entries(searchParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });

  return serverFetch<NewsTypes>({
    endpoint: "/news",
    params: `&${params.toString()}`,
    method: "GET",
    title: "News",
})}
