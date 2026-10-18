import { createContext } from "@/server/context";
import { getPharmacyProfile } from "@/features/pharmacy/procedures/get-pharmacy-profile";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getPharmacyProfile(req, ctx);
}

