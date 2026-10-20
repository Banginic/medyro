"use query";
import { useQuery } from "@tanstack/react-query";
import { getNearbyPharmacies } from "../../actions/getNearbyPharmacies";
import { DataRenderer } from "@/components/index";
import PharmacyCard from "./PharmacyCard";
import { NearbyPharmacySearchParams } from "../../types";
import PharmacyCardSkeleton from "./PharmacyCardSkeleton";
import SectionHeading from "@/components/share/SectionHeading";

function NearbyPharmacies({ params }: { params: NearbyPharmacySearchParams }) {
  const { data, isError, isFetching } = useQuery({
    queryKey: [params],
    queryFn: () => getNearbyPharmacies(params),
  });
  return (
    <div>
      <div className="mt-32 mb-8">
        <SectionHeading
          title="Nearby Pharmacies"
          subtitle="Discover other pharmacies in your area and explore their details."
        />
      </div>
      <DataRenderer
        title="nearby pharmacy"
        isError={isError}
        isLoading={isFetching}
        data={data?.data}
        loader={<PharmacyCardSkeleton />}
      >
        {(pharmacies) => (
          <ul className="grid gap-3 sm:grid-cols-2">
            {pharmacies.map((pharmacy) => (
              <li key={pharmacy.id}>
                <PharmacyCard
                  pharmacy={pharmacy}
                  href={`/pharmacy/pharmacies/${pharmacy.slug}`}
                />
              </li>
            ))}
          </ul>
        )}
      </DataRenderer>
    </div>
  );
}

export default NearbyPharmacies;
