"use client";
import AdminNewsPage from "@/features/news/components/admin/AdminNewsPage";
import { NewsSearchParamsType } from "@/features/news/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<NewsSearchParamsType>;
}) {
  const queries = use(searchParams);
  const params = {
    page: queries.limit || 1,
    limit: queries.page || 10,
    status: queries.status || "",
  };
  return <AdminNewsPage params={params} />;
}

export default Page;
