"use client";

import AdminOnCallPage from "@/features/programs/components/admin/AdminOnCallPage";
import { OnCallSearchParamsType } from "@/features/programs/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<OnCallSearchParamsType>;
}) {
  const queries = use(searchParams);

  const now = new Date();
  const params = {
    month: queries.month || now.getMonth() + 1,
    year: queries.year || now.getFullYear(),
  };
  return <AdminOnCallPage params={params} />;
}

export default Page;
