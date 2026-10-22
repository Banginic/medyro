
import { createContext } from "@/server/context";
import { getBlogs } from "@/features/blogs/procedures/get-blogs";
import { createBlog } from "@/features/blogs/procedures/create-blog";


export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getBlogs(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createBlog(req, ctx);
}
