import { createPharmacyRegistration } from "@/features/registrations/procedures/create-registration";
import { createContext } from "@/server/context";

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createPharmacyRegistration(req, ctx);
}

