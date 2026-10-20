"use client";

import { useQuery } from "@tanstack/react-query";
import { getOnCall } from "../actions/getOnCall";
import { DataRenderer, TableSkeleton, Title } from "@/components/index";
import OnCallGrid from "./OnCallGrid";

function OnCallPage({ pharmacyId }: { pharmacyId: string }) {
  const now = new Date();

  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();

  const params = {
    month: thisMonth,
    year: thisYear,
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: [params, "Schedule"],
    queryFn: () => getOnCall(params, pharmacyId),
  });
  return (
    <div className="max-w-3xl mx-auto py-16 w-sm">
      <Title message="Call Days" />
      <div className="mt-12">
        <DataRenderer
          title="on-call"
          data={data?.data}
          isLoading={isFetching}
          isError={isError}
          loader={<TableSkeleton />}
        >
          {(onCalls) => <OnCallGrid onCalls={onCalls} />}
        </DataRenderer>
      </div>
    </div>
  );
}

export default OnCallPage;
