import { db } from "@/drizzle/index";
import { auth } from "@/lib/auth";

export async function createContext(req: Request ) {

  const session = await auth();
  return { db, session };
}

export type ContextType = Awaited<ReturnType<typeof createContext>>;
