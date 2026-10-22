"use client";

import AdminPharmacyDetailsPage from "@/features/pharmacy/components/super-admin/AdminPharmacyDetailsPage";
import { use } from "react";

function page({ params }: { params: Promise<{ slug: string }> }) {
  const paramsId = use(params);
  return (
    <div>
      <AdminPharmacyDetailsPage slug={paramsId.slug} />
    </div>
  );
}

export default page;
