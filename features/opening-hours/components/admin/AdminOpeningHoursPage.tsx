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

function AdminOpeningHoursPage() {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Schedule"],
    queryFn: getOpeningHours,
  });
  return (
    <div className="w-[98%] max-w-3xl mx-auto py-16 px-4">
      <Title message="Opening Hours" />
      <section className="mt-8 flex justify-center lg:justify-end items-end gap-4 lg:gap-8 flex-wrap ">
        <Button asChild variant={"outline"}>
          <Link href={"/pharmacy/programs"}>
            <Timer />
            Oncall
          </Link>
        </Button>
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Update Opening Hours
        </Button>
      </section>
      <section className="mt-12">
        <DataRenderer
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          title="opening hour"
          loader={<TableSkeleton />}
        >
          {(hours) => (
            <ul>
              {hours.map((hour, index) => (
                <li key={index}>
                  <OpeningHourCard openingHour={hour}/>
                </li>
              ))}
            </ul>
          )}
        </DataRenderer>
      </section>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 px-4 overflow-y-auto grid place-items-center py-8">
            <OpeningHourForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminOpeningHoursPage;
