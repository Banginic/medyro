import { useQuery } from "@tanstack/react-query";
import { getPharmacyDetails } from "../../actions/getPharmacyDetails";
import { DataRenderer } from "@/components/index";
import PharmacyHeroSkeleton from "../admin/PharmacyHeroSkeleton";
import AdminPharmacyDetails from "./AdminPharmacyDetails";

function AdminPharmacyDetailsPage({ slug }: { slug: string }) {
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
        {(pharmacies) => <AdminPharmacyDetails pharmacies={pharmacies} />}
      </DataRenderer>
    </div>
  );
}

export default AdminPharmacyDetailsPage;
