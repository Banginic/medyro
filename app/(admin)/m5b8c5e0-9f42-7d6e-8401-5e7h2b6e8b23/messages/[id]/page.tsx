"use client";
import AdminMessageDetailsPage from "@/features/contact/components/admin/AdminMessageDetailsPage";
import { use } from "react";

function Page({ params }: { params: Promise<{ id: string }> }) {
  const paramsId = use(params);
  return <AdminMessageDetailsPage id={paramsId.id} />;
}

export default Page;
