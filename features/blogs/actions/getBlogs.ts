import { clientFetch } from "@/components/index";
import { BlogsSearchParamsType, BlogTypes } from "../types";

export async function getBlogs(searchParams: BlogsSearchParamsType) {
const params = new URLSearchParams();

Object.entries(searchParams).forEach(([key, value]) => {
    if(value !== undefined && value !== null && value !== ""){
        params.set(key, String(value))
    }
})

  return clientFetch<BlogTypes>({
    endpoint: "/blogs",
    params: `&${params.toString()}`,
    method: "GET",
    title: "Blogs",
  });
}
