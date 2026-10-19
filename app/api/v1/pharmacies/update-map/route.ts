
import { updateMap } from "@/features/map/procedures/update-map";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(req: Request) {
  const ctx = await createContext(req);
  return updateMap(req, ctx);
}
