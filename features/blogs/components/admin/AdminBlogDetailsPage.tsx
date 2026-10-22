import { useQuery } from "@tanstack/react-query";
import { DataRenderer, Title } from "@/components/index";
import AdminBlogDetails from "./AdminBlogDetails";
import { getBlog } from "../../actions/getBlog";


function AdminBlogDetailsPage({ id }: { id: string }) {
  const { data, isFetching, isError } = useQuery({
    queryKey: [id, ],
    queryFn: () => getBlog(id),
  });
  return (
    <div className="w-[98%] max-w-4xl mx-auto py-16">
      <Title message="Blog Details" />
      <section className="mt-12">
        <DataRenderer
          title="Blog Details"
          data={data?.data}
          isError={isError}
          isLoading={isFetching}
        >
          {(blogs) => <AdminBlogDetails blogs={blogs} />}
        </DataRenderer>
      </section>
    </div>
  );
}

export default AdminBlogDetailsPage;
