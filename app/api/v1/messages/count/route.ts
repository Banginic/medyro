import { createContext } from "@/server/context";
import { getTotalMessages } from "@/features/contact/procedures/get-total-messages";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getTotalMessages(req, ctx);
}

