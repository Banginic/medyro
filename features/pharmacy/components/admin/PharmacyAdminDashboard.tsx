"use client";

import { QUERY_KEYS } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getPharmacyProfile } from "../../actions/getPharmacyProfile";
import { DataRenderer } from "@/components/index";
import { pharmacies } from "@/drizzle/schema";
import PharmacyDashboardDetails from "./PharmacyDashboardDetails";
import { Button } from "@/components/ui/button";
import Link from "next/link";

function CTAButton() {
  return (
    <Button asChild>
      <Link href={"/pharmacy/register-pharmacy"}>Register Pharmacy</Link>
    </Button>
  );
}
function PharmacyAdminDashboard() {
  const { data, isError, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pharmacy],
    queryFn: getPharmacyProfile,
  });

  return (
    <div className="mt-12 px-4">
      <DataRenderer
        title={'pharmacy info'}
        isError={isError}
        isLoading={isFetching}
        data={data?.data}
        cta={<CTAButton />}
      >
        {(pharmacies) => <PharmacyDashboardDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default PharmacyAdminDashboard;
