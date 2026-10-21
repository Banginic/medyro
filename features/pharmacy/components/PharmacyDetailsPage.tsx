"use client";
import { DataRenderer } from "@/components/index";
import PharmacyDetails from "./PharmacyDetails";
import PharmacyHeroSkeleton from "./admin/PharmacyHeroSkeleton";
import { PharmacyTypes } from "../types";

function PharmacyDetailsPage({
  pharmacyData,
}: {
  pharmacyData: PharmacyTypes;
}) {
  return (
    <div>
      <DataRenderer
        title="pharmacy details"
        isError={!pharmacyData || !pharmacyData.data}
        data={pharmacyData?.data}
        loader={<PharmacyHeroSkeleton />}
      >
        {(pharmacies) => <PharmacyDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default PharmacyDetailsPage;
