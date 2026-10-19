import { createOpeningHours } from "@/features/opening-hours/procedures/create-opening-hours";
import { getOpeningHours } from "@/features/opening-hours/procedures/get-opening-hours";
import { createContext } from "@/server/context";

//  ------------------------------------------------------
export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createOpeningHours(req, ctx);
}
//  ------------------------------------------------------
export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getOpeningHours(req, ctx);
}
