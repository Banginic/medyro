
import { createContext } from "@/server/context";
import { createNews } from "@/features/news/procedures/create-news";
import { getAllNews } from "@/features/news/procedures/get-all-news";


export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getAllNews(req, ctx);
}

