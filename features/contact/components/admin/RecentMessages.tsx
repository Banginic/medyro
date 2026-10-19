"use client";
import { useQuery } from "@tanstack/react-query";
import { getMessages } from "../../actions/getMessages";
import {
  DataRenderer,
  TableSkeleton,
} from "@/components/index";
import AdminMessageCard from "./AdminMessageCard";

function RecentMessages() {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Message", "Admin"],
    queryFn: () => getMessages({ page: 1, limit: 5 }),
  });
  return (
    <section className="w-[98%] max-w-3xl mt-12">
      <h2 className="text-lg font-semibold">Recent Messages</h2>
      <section className="mt-8">
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
      </section>
    </section>
  );
}

export default RecentMessages;
