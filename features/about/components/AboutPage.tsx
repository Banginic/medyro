
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LocatorPulse from "./LocatorPulse";

const capabilities = [
  {
    title: "Search by name, city, or neighborhood",
    text: "Type what you know, and results appear as you type.",
  },
  {
    title: "Find the nearest pharmacies",
    text: "Share your location to see pharmacies around you.",
  },
  {
    title: "Everything on one page",
    text: "Find addresses, opening hours, and contact details in one place, without unnecessary phone calls.",
  },
  {
    title: "List a pharmacy",
    text: "Manage a pharmacy? Contact us to get it listed on Medyro.",
    href: "/support",
    cta: "Contact Support",
  },
];

const steps = [
  {
    title: "Search",
    text: "Enter a name, city, or neighborhood, or enable your location.",
  },
  {
    title: "Choose",
    text: "Browse nearby pharmacies and open the profile of the one that suits you.",
  },
  {
    title: "Contact",
    text: "Call the pharmacy or visit in person with the address at hand.",
  },
];

export default function AboutMedyroPage() {
  return (
    <main>
      {/* Hero */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Finding a pharmacy shouldn't take an hour.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Medyro helps you locate pharmacies across Cameroon. Search by name,
            city, or neighborhood, or share your location to find what you need
            without wasting time.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/find-pharmacies">Find a Pharmacy</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/support">Contact Us</Link>
            </Button>
          </div>
        </div>
        <LocatorPulse />
      </section>

      {/* Why Medyro */}
      <section className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 sm:px-6 sm:py-20 md:grid-cols-[1fr_1.4fr] md:gap-12">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Why We Created Medyro
          </h2>
          <div className="max-w-2xl space-y-4 text-muted-foreground">
            <p>
              When you need medication, you don't have time to make endless
              phone calls or ask around. Medyro brings pharmacies across the
              country together in one place, helping everyone find where to go
              and how to get in touch.
            </p>
            <p>
              For pharmacies, Medyro also provides a simple online presence,
              making it easier for patients in their neighborhoods to find
              them.
            </p>
          </div>
        </div>
      </section>

      {/* What you can do */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What You Can Do with Medyro
          </h2>
          <dl className="mt-10 divide-y border-y">
            {capabilities.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 py-6 sm:grid-cols-[1fr_1.4fr] sm:gap-12"
              >
                <dt className="text-lg font-medium">{item.title}</dt>
                <dd className="text-muted-foreground">
                  {item.text}
                  {item.href && (
                    <>
                      {" "}
                      <Link
                        href={item.href}
                        className="font-medium text-primary underline-offset-4 hover:underline"
                      >
                        {item.cta}
                      </Link>
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            How It Works
          </h2>
          <ol className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t-2 border-primary pt-4">
                <span className="text-3xl font-semibold tabular-nums text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-3 text-lg font-medium">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Banginic */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
        <div className="grid items-center gap-6 rounded-3xl border bg-muted/50 p-8 sm:p-12 md:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              A Banginic Product
            </h2>
            <p className="mt-4 text-muted-foreground">
              Medyro is designed and developed by Banginic, a web development
              agency based in Cameroon. We build custom websites, applications,
              and digital platforms for businesses and organizations.
            </p>
          </div>
          <Button asChild size="lg" variant="outline">
            <a
              href="https://www.banginic.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Discover Banginic
            </a>
          </Button>
        </div>
      </section>

      {/* Closing */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:flex-row sm:items-center sm:px-6">
          <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
            Need a pharmacy right now?
          </h2>
          <Button asChild size="lg">
            <Link href="/find-pharmacies">Start Searching</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
