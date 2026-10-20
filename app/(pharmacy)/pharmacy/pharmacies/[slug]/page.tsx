"use client";

import PharmacyOwnerDetailsPage from "@/features/pharmacy/components/admin/PharmacyOwnerDetailsPage";
import { use } from "react";

function page({ params }: { params: Promise<{ slug: string }> }) {
  const paramsId = use(params);
  return (
    <div>
      <PharmacyOwnerDetailsPage slug={paramsId.slug} />
    </div>
  );
}

export default page;
