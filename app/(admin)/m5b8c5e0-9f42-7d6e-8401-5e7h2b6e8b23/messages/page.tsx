"use client";

import AdminMessagePage from "@/features/contact/components/admin/AdminMessagePage";
import { MessageSearchParamsType } from "@/features/contact/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<MessageSearchParamsType>;
}) {
  const queries = use(searchParams);
  const params = {
    page: queries.page || 1,
    limit: queries.limit || 10,
  };
  return <AdminMessagePage params={params} />;
}

export default Page;
