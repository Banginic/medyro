import { useQuery } from "@tanstack/react-query";
import { getPharmacyDetails } from "../../actions/getPharmacyDetails";
import { DataRenderer } from "@/components/index";
import PharmacyOwnerDetails from "./PharmacyOwnerDetails";
import PharmacyHeroSkeleton from "./PharmacyHeroSkeleton";

function PharmacyOwnerDetailsPage({ slug }: { slug: string }) {
  const { data, isFetching, isError } = useQuery({
    queryKey: [slug],
    queryFn: () => getPharmacyDetails(slug),
  });
  return (
    <div>
      <DataRenderer
        title="pharmacy details"
        data={data?.data}
        isError={isError}
        isLoading={isFetching}
        loader={<PharmacyHeroSkeleton />}
      >
        {(pharmacies) => <PharmacyOwnerDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default PharmacyOwnerDetailsPage;
