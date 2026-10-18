import { updateLogo } from "@/features/account/procedures/update-logo";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(req: Request) {
  const ctx = await createContext(req);
  return updateLogo(req, ctx);
}
