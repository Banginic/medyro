import { useQuery } from "@tanstack/react-query";
import { MessageSearchParamsType } from "../../types";
import { getMessages } from "../../actions/getMessages";
import {
  AppPagination,
  DataRenderer,
  TableSkeleton,
  Title,
} from "@/components/index";
import AdminMessageCard from "./AdminMessageCard";

function AdminMessagePage({ params }: { params: MessageSearchParamsType }) {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Message", "Admin"],
    queryFn: () => getMessages(params),
  });
  return (
    <div className="w-[98%] py-16 max-w-2xl mx-auto">
      <Title message="Messages" />
      <section className="mt-12">
        <DataRenderer
          title="Messages"
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          loader={<TableSkeleton />}
        >
         {(messages) => <ul className="flex flex-col gap-2">
            {
              messages.map((message, index) => (
                <li key={index}>
                  <AdminMessageCard message={message} index={index}/>
                </li>
              ))
            }
            </ul>}
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

export default AdminMessagePage;
