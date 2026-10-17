import { serverPost } from "@/components/index";
import { NewsSchemaType } from "../schemas/newsSchema";
import { NewsTypes } from "../types";

export async function createNews(body: NewsSchemaType) {
  return serverPost<NewsTypes>({
    endpoint: "/news",
    method: "POST",
    body,
    title: "News",
  });
}
