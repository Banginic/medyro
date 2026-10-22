"use client";
import AdminBlogPage from "@/features/blogs/components/admin/AdminBlogPage";
import { BlogsSearchParamsType } from "@/features/blogs/types";
import { use } from "react";

function Page({
  searchParams,
}: {
  searchParams: Promise<BlogsSearchParamsType>;
}) {
  const queries = use(searchParams);

  const params = {
    page: queries.page || 1,
    limit: queries.limit || 10,
  };
  return <AdminBlogPage params={params} />;
}

export default Page;
