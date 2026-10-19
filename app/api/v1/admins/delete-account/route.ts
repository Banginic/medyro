import { deleteAccount } from "@/features/account/procedures/delete-account";
import { createContext } from "@/server/context";


//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteAccount(req, ctx, paramsId);
}
