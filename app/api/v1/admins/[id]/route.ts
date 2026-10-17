import { deleteUser } from "@/features/auth/procedures/delete-user";
import { getUser } from "@/features/auth/procedures/get-user";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getUser(req, ctx, paramsId);
}

//  ------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return deleteUser(req, ctx, paramsId);
}

//  ------------------------------------------------------
// export async function PATCH(
//   req: Request,
//   { params }: { params: Promise<{ id: string }> },
// ) {
//   const paramsId = await params;
//   const ctx = await createContext(req);
//   return updateCustomer(req, ctx, paramsId);
// }
