import PageHeading from "@/components/share/PageHeading";
import { WEEKLY_HOURS } from "../contants";
import OnCallPage from "./OnCallPage";

export default async function ProgramsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 2xl:py-24">
      <PageHeading
        title="Opening Hours & On-Call Schedule"
        subtitle="View our regular pharmacy opening hours and check the days we’re available on call for your healthcare needs."
      />

      <section className="mt-12">
        <ul className="divide-y divide-border rounded-lg border">
          {WEEKLY_HOURS.map(({ day, hours }) => (
            <li key={day} className="flex justify-between px-4 py-3">
              <span className="font-medium">{day}</span>
              <span className="text-muted-foreground">{hours}</span>
            </li>
          ))}
        </ul>
      </section>
      <OnCallPage />
    </div>
  );
}
