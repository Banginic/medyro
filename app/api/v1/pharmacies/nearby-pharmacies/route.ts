import { createContext } from "@/server/context";
import { getNearbyPharmacies } from "@/features/pharmacy/procedures/get-nearby-pharmacies";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getNearbyPharmacies(req, ctx);
}

