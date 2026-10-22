"use client";
import AdminNewsDetailsPage from "@/features/news/components/admin/AdminNewsDetailsPage";
import { use } from "react";

function NewsDetails({ params }: { params: Promise<{ id: string }> }) {
  const paramsId = use(params);
  return <AdminNewsDetailsPage id={paramsId.id} />;
}

export default NewsDetails;
