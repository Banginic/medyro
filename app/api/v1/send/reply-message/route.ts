
import MessageReply from "@/features/auth/mail/email-templates/MessageReply";
import { protectWithArcjet } from "@/lib/protectWithArcjet";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);
const adminEmail = process.env.EMAIL;

export async function POST(req: Request) {
  try {
    await protectWithArcjet(req);
    const body = await req.json();
    const { to, subject, message } = body;

    if (!to || !subject || !message) {
      return new Response(
        JSON.stringify({
          data: [],
          message: "All fields are required",
          success: false,
        }),
        { status: 400 }
      );
    }
  const details = { name: to, message}
    const { data, error } = await resend.emails.send({
      from: `Banginic <${adminEmail}>`,
      to: to ,
      subject: subject ,
      react: MessageReply({ details }),
    });

    if (error) {
      return new Response(
        JSON.stringify({ message: error.message, success: false, data: [] }),
        { status: 500 }
      );
    }

    return new Response(
      JSON.stringify({
        data,
        message: "Message sent successfully",
        success: true,
      }),
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log(error)
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ message: error.message, success: false, data: [] }),
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({
        message: "Error Replying Message",
        success: false,
        data: [],
      }),
      { status: 500 }
    );
  }
}
