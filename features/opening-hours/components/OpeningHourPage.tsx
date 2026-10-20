"use client";
import { useQuery } from "@tanstack/react-query";
import { DataRenderer, TableSkeleton, Title } from "@/components/index";
import OpeningHourCard from "./OpeningHourCard";
import { getOpeningHour } from "../actions/getOpeningHour";

function OpeningHourPage({ pharmacyId }: { pharmacyId: string }) {
  const { isError, isFetching, data } = useQuery({
    queryKey: [pharmacyId],
    queryFn: () => getOpeningHour(pharmacyId),
  });


  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <Title message="Opening Hours" />

      <section className="mt-12 w-sm">
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
                  <OpeningHourCard openingHour={hour} />
                </li>
              ))}
            </ul>
          )}
        </DataRenderer>
      </section>
    </div>
  );
}

export default OpeningHourPage;
