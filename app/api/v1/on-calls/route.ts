import { createContext } from "@/server/context";
import { createOnCall } from "@/features/programs/procedures/create-on-call";
import { getOnCalls } from "@/features/programs/procedures/get-on-calls";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getOnCalls(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createOnCall(req, ctx);
}
