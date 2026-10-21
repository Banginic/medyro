import { Clock, LifeBuoy, Mail, Phone } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import Image from "next/image";

/* ---------- Config: replace with your real contact details ---------- */
const SUPPORT = {
  whatsapp: "237672640914", // international format, no "+"
  phone: "+237 6 72 64 09 14",
  email: "support@banginic.com",
  hours: "Mon to Sat, 8:00 to 18:00",
  responseTime: "Usually within 24 hours",
};

const FAQS = [
  {
    q: "How do I change my pharmacy's opening hours?",
    a: "Go to your pharmacy profile in the admin area, edit the opening hours and save. The change shows on the public listing right away.",
  },
  {
    q: "How do I mark my pharmacy as on duty (de garde)?",
    a: "Open the on-duty schedule, pick the dates and save. Patients searching for an open pharmacy will see your listing marked as on duty on those dates.",
  },
  {
    q: "My pharmacy appears in the wrong place on the map.",
    a: "Check that the address and city in your profile are correct, then send us a request with the right location and, if possible, a Google Maps link. We will fix the pin.",
  },
  {
    q: "I forgot my password. What should I do?",
    a: "Use the “Forgot password” link on the login page. If the email does not arrive, check your spam folder or contact support.",
  },
  {
    q: "Is listing my pharmacy free?",
    a: "Yes. Everything is free for now, and we will tell you well in advance before anything changes.",
  },
];

export default function ClientSupportPage() {
  const whatsappUrl = `https://wa.me/${SUPPORT.whatsapp}?text=${encodeURIComponent(
    "Hello, I need help with my pharmacy account.",
  )}`;

  return (
    <div className="mx-auto w-full max-w-5xl space-y-8 px-4 py-8 sm:px-6 2xl:py-32">
      {/* Header */}
      <div className="flex items-start gap-3">
       
        <div className="space-y-1">
          <h1 className="page-title">
            Support
          </h1>
          <p className="max-w-xl  text-muted-foreground">
            Need help with your pharmacy listing? Check the answers below or
            send us a message.
          </p>
        </div>
      </div>

      {/* Contact options */}
      <div className="grid gap-4 sm:grid-cols-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group rounded-xl bg-card border p-5 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src={"/icons/whatsApp.png"}
            alt=""
            width={18}
            height={18}
            className="mb-3 h-5 w-5 text-primary"
          />
          <p className="font-medium">WhatsApp</p>
          <p className=" text-muted-foreground">Fastest way to reach us</p>
        </a>
        <a
          href={`tel:${SUPPORT.phone.replace(/\s/g, "")}`}
          className="group rounded-xl bg-card border p-5 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Phone className="mb-3 h-5 w-5 text-primary" />
          <p className="font-medium">Call us</p>
          <p className=" text-muted-foreground">{SUPPORT.phone}</p>
        </a>
        <a
          href={`mailto:${SUPPORT.email}`}
          className="group rounded-xl bg-card border p-5 transition-colors hover:border-primary/40 hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Mail className="mb-3 h-5 w-5 text-primary" />
          <p className="font-medium">Email</p>
          <p className="break-all  text-muted-foreground">{SUPPORT.email}</p>
        </a>
      </div>

      <p className="flex flex-wrap items-center gap-x-2 gap-y-1  text-muted-foreground">
        <Clock className="h-4 w-4" />
        {SUPPORT.hours}. {SUPPORT.responseTime}.
      </p>

      {/* FAQ */}
      <section className="space-y-3">
        <h2 className="card-title font-semibold tracking-tight">
          Frequently asked questions
        </h2>
        <Accordion type="single" collapsible className="rounded-xl border px-4">
          {FAQS.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`faq-${i}`}
              className={i === FAQS.length - 1 ? "border-b-0" : undefined}
            >
              <AccordionTrigger className="text-left  ">{f.q}</AccordionTrigger>
              <AccordionContent className=" text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
