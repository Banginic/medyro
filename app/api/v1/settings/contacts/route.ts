
import { createContext } from "@/server/context";
import { createContactInfo } from "@/features/settings/procedures/create-contact-info";
import { getContactInfo } from "@/features/settings/procedures/get-contact-info";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getContactInfo(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createContactInfo(req, ctx);
}

