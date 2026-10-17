"use client";

import { useQuery } from "@tanstack/react-query";
import { getOnCalls } from "../actions/getOnCalls";
import { DataRenderer } from "@/components/index";
import OnCallDetails from "./OnCallDetails";

function OnCallPage() {
  const now = new Date();

  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();

  const params = {
    month: thisMonth,
    year: thisYear,
  };
  const { data, isFetching, isError } = useQuery({
    queryKey: [params, "Schedule"],
    queryFn: () => getOnCalls(params),
  });
  return (
    <div className="mt-12">
      <DataRenderer
        title="on-call"
        data={data?.data}
        isLoading={isFetching}
        isError={isError}
      >
        {(onCalls) => <OnCallDetails onCalls={onCalls} />}
      </DataRenderer>
    </div>
  );
}

export default OnCallPage;
