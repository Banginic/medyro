"use client";

import { QUERY_KEYS } from "@/features/query-keys";
import { useQuery } from "@tanstack/react-query";
import { getPharmacyProfile } from "../../actions/getPharmacyProfile";
import { DataRenderer } from "@/components/index";
import PharmacyDashboardDetails from "./PharmacyDashboardDetails";
import RegisterCTA from "./RegisterCTA";
import PharmacyHeroSkeleton from "./PharmacyHeroSkeleton";
import { HeroSection } from "./HeroBackground";

function PharmacyAdminDashboard() {
  const { data, isError, isFetching } = useQuery({
    queryKey: [QUERY_KEYS.pharmacy],
    queryFn: getPharmacyProfile,
  });

  return (
    <div className="mt-12 rounded-2xl ">
      <DataRenderer
        title={"pharmacy info"}
        isError={isError}
        isLoading={isFetching}
        data={data?.data}
        cta={<RegisterCTA />}
        loader={
          <HeroSection>
            <PharmacyHeroSkeleton />
          </HeroSection>
        }
      >
        {(pharmacies) => (
          <HeroSection>
            <PharmacyDashboardDetails pharmacies={pharmacies} />
          </HeroSection>
        )}
      </DataRenderer>
    </div>
  );
}

export default PharmacyAdminDashboard;
