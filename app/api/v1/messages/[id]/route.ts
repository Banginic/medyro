import { deleteMessage } from "@/features/contact/procedures/delete-message";
import { getMessage } from "@/features/contact/procedures/get-message";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getMessage(req, ctx, paramsId);
}

//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteMessage(req, ctx, paramsId);
}
