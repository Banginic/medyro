
import { createContext } from "@/server/context";
import { createProjectProfile } from "@/features/settings/procedures/create-project-profile";
import { getProjectProfile } from "@/features/settings/procedures/get-project-profile";

export async function GET(req: Request) {
  const ctx = await createContext(req);
  return getProjectProfile(req, ctx);
}

export async function POST(req: Request) {
  const ctx = await createContext(req);
  return createProjectProfile(req, ctx);
}

