// lib/protectRoutes.ts
import { auth } from "./auth";

export async function protectRoutes(requireAdmin = false) {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      status: 401,
      message: "Unauthorized: Please log in.",
    };
  }

  if (requireAdmin && session.user.role !== "admin") {
    return {
      ok: false,
      status: 403,
      message: "Forbidden: Admin access required.",
    };
  }

  return { ok: true, session };
}