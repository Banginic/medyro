import { getOpeningHour } from "@/features/opening-hours/procedures/get-opening-hour";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const paramsId = await params;
  const ctx = await createContext(req);
  return getOpeningHour(req, ctx, paramsId);
}
