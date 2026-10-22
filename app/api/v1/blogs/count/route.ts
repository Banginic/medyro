import { createContext } from "@/server/context";
import { getTotalblogs } from "@/features/blogs/procedures/get-total-blogs";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getTotalblogs(req, ctx);
}

