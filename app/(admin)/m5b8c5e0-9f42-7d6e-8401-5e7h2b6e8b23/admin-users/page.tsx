"use client";
import AdminUserPage from "@/features/auth/components/AdminUserPage";
import { AdminSearchParamsType } from "@/features/auth/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParamsType>;
}) {
  const queries = use(searchParams);
  const params = {
    page: queries.page || 1,
    limit: queries.limit || 10,
    role: queries.role || "",
  };
  return <AdminUserPage params={params} />;
}

export default Page;
