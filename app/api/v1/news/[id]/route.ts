
import { deleteNews } from "@/features/news/procedures/delete-news";
import { getNews } from "@/features/news/procedures/get-news";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getNews(req, ctx, paramsId);
}

//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteNews(req, ctx, paramsId);
}

//  ------------------------------------------------------
// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const paramsId = await params;
//   const ctx = await createContext(req);
//   return updateCustomer(req, ctx, paramsId);
// }
