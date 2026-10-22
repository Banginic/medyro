import { serverPost } from "@/components/index";
import { BlogTypes } from "../types";

export async function createBlog(body: FormData) {
  return serverPost<BlogTypes>({
    endpoint: "/blogs",
    method: "POST",
    body,
    title: "Blog",
  });
}
