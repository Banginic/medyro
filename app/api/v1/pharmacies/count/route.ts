import { createContext } from "@/server/context";
import { getTotalPharmacies } from "@/features/pharmacy/procedures/get-total-pharmacies";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getTotalPharmacies(req, ctx);
}

