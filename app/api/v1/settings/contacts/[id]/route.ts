import { updateContactInfo } from "@/features/settings/procedures/update-contact-info";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return updateContactInfo(req, ctx, paramsId);
}
