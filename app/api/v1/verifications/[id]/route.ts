
import { getVerification } from "@/features/verifications/procedures/get-verification";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getVerification(req, ctx, paramsId);
}

