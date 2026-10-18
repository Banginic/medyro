
import { updateAddress } from "@/features/account/procedures/update-address";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(req: Request) {
  const ctx = await createContext(req);
  return updateAddress(req, ctx);
}
