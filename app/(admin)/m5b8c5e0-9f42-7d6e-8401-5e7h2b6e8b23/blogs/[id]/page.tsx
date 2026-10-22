'use client'
import AdminBlogDetailsPage from "@/features/blogs/components/admin/AdminBlogDetailsPage";
import { use } from "react";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const paramsId = use(params);
  return <AdminBlogDetailsPage id={paramsId.id} />;
}

export default Page;
