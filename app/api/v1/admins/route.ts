
import { createContext } from "@/server/context";
import { createUser } from "@/features/auth/procedures/create-user";
import { getUsers } from "@/features/auth/procedures/get-users";


export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getUsers(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createUser(req, ctx);
}
