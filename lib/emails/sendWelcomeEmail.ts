
import { Resend } from "resend";


export async function sendWelcome(email: string, name: string){
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const html = `
  <div style="font-family: sans-serif; padding: 16px;">
    <h1 style="color: #333;">Welcome, ${name}!</h1>
    <p>Thanks for signing up. We're excited to have you onboard.</p>
    <p>If you have any questions, reach out anytime.</p>
    <hr />
    <small>&copy; ${new Date().getFullYear()} Banginic</small>
  </div>
`;

return await resend.emails.send({
    from: 'Banginic <noreply@banginic.com',
    to: email,
    subject: 'Welcome to Our App',
    html
})
}