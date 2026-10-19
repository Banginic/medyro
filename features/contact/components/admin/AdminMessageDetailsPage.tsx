import { useQuery } from "@tanstack/react-query";
import { getMessage } from "../../actions/getMessage";
import { DataRenderer, Title } from "@/components/index";
import AdminMessageDetails from "./AdminMessageDetails";

function AdminMessageDetailsPage({ id }: { id: string }) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Message", id, "Admin"],
    queryFn: () => getMessage(id),
  });
  return (
    <div className=" max-w-4xl mx-auto py-16 px-2">
      <Title message="Message Details" />
      <section className="mt-12">
        <DataRenderer
          title="Message Details"
          data={data?.data}
          isError={isError}
          isLoading={isFetching}
        >
          {(messages) => <AdminMessageDetails messages={messages} />}
        </DataRenderer>
      </section>
    </div>
  );
}

export default AdminMessageDetailsPage;
