"use client";
import { useQuery } from "@tanstack/react-query";
import { DataRenderer, TableSkeleton, Title } from "@/components/index";
import { Button } from "@/components/ui/button";
import { PlusCircle, Timer } from "lucide-react";
import { useState } from "react";
import { getOpeningHours } from "../../actions/getOpeningHours";
import OpeningHourForm from "../../forms/OpeningHourForm";
import OpeningHourCard from "../OpeningHourCard";
import Link from "next/link";
import Image from "next/image";

function AdminOpeningHoursPage() {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Schedule"],
    queryFn: getOpeningHours,
  });

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-4 py-8 sm:px-6 lg:py-12">
      <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
        {/* Form (top on mobile, left on desktop) */}
        <div className="w-full min-w-0 rounded-2xl border bg-secondary/20 p-4 lg:w-1/2">
          <Title message="Opening Hours" />

          <section className="my-6 flex flex-wrap items-center justify-center gap-3 lg:justify-end">
            <Button size="sm" asChild variant="secondary">
              <Link href="/pharmacy/programs">
                <Timer />
                Oncall
              </Link>
            </Button>
            <Button size="sm" onClick={() => setForm(true)}>
              <PlusCircle />
              Update Opening Hours
            </Button>
          </section>

          <DataRenderer
            isError={isError}
            isLoading={isFetching}
            data={data?.data}
            title="opening hour"
            loader={<TableSkeleton />}
          >
            {(hours) => (
              <ul className="min-w-0">
                {hours.map((hour, index) => (
                  <li key={index} className="min-w-0">
                    <OpeningHourCard openingHour={hour} />
                  </li>
                ))}
              </ul>
            )}
          </DataRenderer>
        </div>

        {/* Image (bottom on mobile, right on desktop) */}
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl shadow-lg lg:aspect-auto lg:min-h-120 lg:w-2/5">
          <Image
            src="/images/pharmacy-image.avif"
            alt="Find a pharmacy near you"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-background/20 px-4 py-8 backdrop-blur-2xl">
          <OpeningHourForm closeForm={setForm} />
        </div>
      )}
    </div>
  );
}

export default AdminOpeningHoursPage;