import { createContext } from "@/server/context";
import { createAddressInfo } from "@/features/settings/procedures/create-address-info";
import { getAddressInfo } from "@/features/settings/procedures/get-address-info";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getAddressInfo(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createAddressInfo(req, ctx);
}
