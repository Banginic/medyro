import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { users } from "@/drizzle/schema";
import { SignUpSchema } from "../schemas/signUpSchema";
import { hashPassword } from "@/lib/bcrypt";

export const createUser = createProcedure({
  schema: SignUpSchema,
  protectAdmin: true,
  handler: async ({ context, input }) => {
    const existData = await context.db
      .select()
      .from(users)
      .where(eq(users.name, input.name))
      .limit(1);

    if (existData.length > 0) {
      return "Exist";
    }

    const hashedPassword = await hashPassword(input.password);

    const data = await context.db
      .insert(users)
      .values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        role: "admin",
        password: hashedPassword,
      })
      .returning();

    return {
      data,
      status: 201,
    };
  },
});
