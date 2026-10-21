"use client";

import PharmacyDetailsPage from "@/features/pharmacy/components/PharmacyDetailsPage";
import { use } from "react";

function page({ params }: { params: Promise<{ slug: string }> }) {
  const paramsId = use(params);
  return (
    <div>
      <PharmacyDetailsPage slug={paramsId.slug} />
    </div>
  );
}

export default page;
