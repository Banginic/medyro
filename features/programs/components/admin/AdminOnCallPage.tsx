import { useQuery } from "@tanstack/react-query";
import { OnCallSearchParamsType } from "../../types";
import { DataRenderer, TableSkeleton, Title } from "@/components/index";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AdminOnCallGrid from "./AdminOnCallGrid";
import { getOnCalls } from "../../actions/getOnCalls";
import OnCallForm from "../../forms/OnCallForm";
import OnCallMonthlyFilter from "../../filters/OnCallMonthlyFilter";

function AdminOnCallPage({ params }: { params: OnCallSearchParamsType }) {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Schedule", params],
    queryFn: () => getOnCalls(params),
  });
  return (
    <div className="w-[98%] max-w-3xl mx-auto py-16">
      <Title message="Call Days" />
      <section className="mt-8 flex justify-end items-end gap-4 lg:gap-8">
        <OnCallMonthlyFilter />
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Add Call Day
        </Button>
      </section>
      <section className="mt-12">
        <DataRenderer
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          title="leader"
          loader={<TableSkeleton />}
        >
          {(onCalls) => <AdminOnCallGrid onCalls={onCalls} />}
        </DataRenderer>
      </section>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20  overflow-y-auto grid place-items-center py-8">
            <OnCallForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminOnCallPage;
