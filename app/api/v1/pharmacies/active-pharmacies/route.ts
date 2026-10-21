import { createContext } from "@/server/context";
import { getActivePharmacies } from "@/features/pharmacy/procedures/get-active-pharmacies";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getActivePharmacies(req, ctx);
}

