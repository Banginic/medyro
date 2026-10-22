"use client";
import AdminPharmacyPage from "@/features/pharmacy/components/super-admin/AdminPharmacyPage";
import { AdminPharmacySearchParams } from "@/features/pharmacy/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<AdminPharmacySearchParams>;
}) {
  const queries = use(searchParams);

  const params = {
    page: queries.page || 1,
    limit: queries.limit || 15,
    query: queries.query || '',
    isVerified: queries.verificationStatus  || ''
  };
  return <AdminPharmacyPage params={params} />;
}

export default Page;
