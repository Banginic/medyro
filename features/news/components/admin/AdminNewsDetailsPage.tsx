import { AppPagination, DataRenderer, Title } from "@/components/index";
import { useQuery } from "@tanstack/react-query";
import AdminNewsDetails from "./AdminNewsDetails";
import { getSingleNews } from "../../actions/getSingleNews";

function AdminNewsDetailsPage({ id }: { id: string }) {
  const { isError, isFetching, data } = useQuery({
    queryKey: ["Admin", "News", id],
    queryFn: () => getSingleNews(id),
  });
  return (
    <div className="w-[98%] max-w-4xl mx-auto py-16">
      <Title message="News Details" />
      <section className="mt-12">
        <DataRenderer
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          title="news details"
        >
          {(news) => <AdminNewsDetails news={news} />}
        </DataRenderer>
      </section>
    </div>
  );
}

export default AdminNewsDetailsPage;
