import { updateCoverImage } from "@/features/account/procedures/update-cover-image";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(req: Request) {
  const ctx = await createContext(req);
  return updateCoverImage(req, ctx);
}
