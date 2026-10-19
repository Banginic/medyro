import { eq } from "drizzle-orm";
import { createProcedure } from "@/server/procedure";
import { messages } from "@/drizzle/schema";
import { ContactSchema } from "../schemas/contactSchema";
import { isSpamText } from "@/lib/isSpamText";
import { sendAdminNotificationEmail } from "@/features/emails/actions/sendAdminNotificationEmail";
import { sendClientNotificationEmail } from "@/features/emails/actions/sendClientNotifcationEmail";

export const createMessage = createProcedure({
  schema: ContactSchema,
  handler: async ({ context, input }) => {
    const existData = await context.db
      .select()
      .from(messages)
      .where(eq(messages.email, input.email))
      .limit(1);

    // Honey pot validation
    if (input.website) {
      return "Spam";
    }

    if(isSpamText(input.name) || isSpamText(input.email)){
      return "Spam"
    }

    if (existData.length > 0) {
      return "Exist";
    }

        // Send alert message to Admin
    await sendAdminNotificationEmail({
      name: input.name,
      email: input.email,
      phone: input.phone,
      subject: input.subject,
      message: input.body,
    });

    // Send confirmatory message to client
    await sendClientNotificationEmail({
      name: input.name,
      email: input.email,
      subject: input.subject,
      message: input.body,
    });

    const data = await context.db
      .insert(messages)
      .values({
        name: input.name,
        email: input.email,
        phone: input.phone,
        subject: input.subject,
        body: input.body,
      })
      .returning();

    return {
      data,
      status: 201,
    };
  },
});
