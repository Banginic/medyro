import { clientFetch } from "@/components/index";
import { BlogTypes } from "../types";

export async function getBlog(id: string) {
  return clientFetch<BlogTypes>({
    endpoint: `/blogs/${id}`,
    method: "GET",
    title: "Blog details",
  });
}
