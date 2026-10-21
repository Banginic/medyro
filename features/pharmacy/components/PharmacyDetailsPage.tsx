import { useQuery } from "@tanstack/react-query";
import { DataRenderer } from "@/components/index";
import PharmacyDetails from "./PharmacyDetails";
import { getPharmacyDetails } from "../actions/getPharmacyDetails";
import PharmacyHeroSkeleton from "./admin/PharmacyHeroSkeleton";

function PharmacyDetailsPage({ slug }: { slug: string }) {
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
        {(pharmacies) => <PharmacyDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default PharmacyDetailsPage;
