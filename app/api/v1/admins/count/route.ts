import { createContext } from "@/server/context";
import { getTotalUsers } from "@/features/auth/procedures/get-total-users";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getTotalUsers(req, ctx);
}

