
import { deleteOnCall } from "@/features/programs/procedures/delete-on-call";
import { getOnCall } from "@/features/programs/procedures/get-on-call";
import { createContext } from "@/server/context";


//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteOnCall(req, ctx, paramsId);
}


//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getOnCall(req, ctx, paramsId);
}
