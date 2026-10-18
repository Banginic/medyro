"use client";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/features/query-keys";
import { getPharmacyProfile } from "@/features/pharmacy/actions/getPharmacyProfile";
import { DataRenderer } from "@/components/index";
import AccountDetails from "./AccountDetails";

function AccountPage() {
  const { data, isError, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pharmacy],
    queryFn: getPharmacyProfile,
  });

  return (
    <div className="min-h-screen py-16 px-4 max-w-2xl mx-auto border">
      <DataRenderer
        title="pharmacy details"
        isError={isError}
        isLoading={isFetching}
        data={data?.data}
      >
        {(pharmacies) => <AccountDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default AccountPage;
