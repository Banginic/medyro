import { getPharmacy } from "@/features/pharmacy/procedures/get-pharmacy";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getPharmacy(req, ctx, paramsId);
}
