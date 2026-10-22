import { useQuery } from "@tanstack/react-query";
import {
  AppPagination,
  DataRenderer,
  TableSkeleton,
  Title,
} from "@/components/index";
import { AdminPharmacySearchParams } from "../../types";
import { getPharmacies } from "../../actions/getPharmacies";
import { usePathname } from "next/navigation";
import SuperAdminPharmacyCard from "./SuperAdminPharmacyCard";

function AdminPharmacyPage({ params }: { params: AdminPharmacySearchParams }) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Pharmacy", params],
    queryFn: () => getPharmacies(params),
  });
  const pathname = usePathname();
  return (
    <div className="py-16 w-[98%] max-w-3xl mx-auto">
      <Title message="Pharmacies" />
      <section className="mt-12">
        <DataRenderer
          title="pharmacies"
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          loader={<TableSkeleton />}
        >
          {(pharmacys) => (
            <ul className="grid gap-2 relative">
              {pharmacys.map((pharmacy, index) => (
                <li key={index}>
                  <SuperAdminPharmacyCard
                    key={pharmacy.id}
                    pharmacy={pharmacy}
                    href={`${pathname}/${pharmacy.slug}`}
                  />
                </li>
              ))}
            </ul>
          )}
        </DataRenderer>
        <>
          {data?.pagination && (
            <AppPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
            />
          )}
        </>
      </section>
    </div>
  );
}

export default AdminPharmacyPage;
