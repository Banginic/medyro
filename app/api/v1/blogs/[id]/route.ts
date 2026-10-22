import { deleteBlog } from "@/features/blogs/procedures/delete-blog";
import { getBlog } from "@/features/blogs/procedures/get-blog";
import { updateBlog } from "@/features/blogs/procedures/update-blog";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getBlog(req, ctx, paramsId);
}

//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteBlog(req, ctx, paramsId);
}

//  ------------------------------------------------------
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return updateBlog(req, ctx, paramsId);
}
