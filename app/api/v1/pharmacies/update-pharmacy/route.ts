import { updatePharmacy } from "@/features/account/procedures/update-pharmacy";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(req: Request) {
  const ctx = await createContext(req);
  return updatePharmacy(req, ctx);
}
