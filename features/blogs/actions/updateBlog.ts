import { serverPost } from "@/components/index";
import { BlogTypes } from "../types";
import { EditBlogSchemaType } from "../schemas/editBlogSchema";

export async function updateBlog(body: EditBlogSchemaType) {
  return serverPost<BlogTypes>({
    endpoint: `/blogs/${body.blogId}`,
    method: "PATCH",
    body,
    title: "Update Blog",
  });
}
