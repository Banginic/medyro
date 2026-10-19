"use client";

import { QUERY_KEYS } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getPharmacyProfile } from "../../actions/getPharmacyProfile";
import { DataRenderer } from "@/components/index";
import PharmacyDashboardDetails from "./PharmacyDashboardDetails";
import RegisterCTA from "./RegisterCTA";

function PharmacyAdminDashboard() {
  const { data, isError, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pharmacy],
    queryFn: getPharmacyProfile,
  });

  return (
    <div className="mt-12 px-4">
      <DataRenderer
        title={"pharmacy info"}
        isError={isError}
        isLoading={isFetching}
        data={data?.data}
        cta={<RegisterCTA />}
      >
        {(pharmacies) => <PharmacyDashboardDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default PharmacyAdminDashboard;
