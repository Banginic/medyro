

import { createContext } from "@/server/context";
import { getMessages } from "@/features/contact/procedures/get-messages";
import { createMessage } from "@/features/contact/procedures/create-message";


export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getMessages(req, ctx);
}



export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createMessage(req, ctx);
}



