import { createContext } from "@/server/context";
import { getPharmacies } from "@/features/pharmacy/procedures/get-pharmacies";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getPharmacies(req, ctx);
}

