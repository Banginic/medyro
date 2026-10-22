
import { createContext } from "@/server/context";
import { createAdmin } from "@/features/auth/procedures/create-admin";



export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createAdmin(req, ctx);
}
