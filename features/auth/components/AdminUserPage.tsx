import { useQuery } from "@tanstack/react-query";
import { AdminSearchParamsType } from "../types";
import { getUsers } from "../actions/getUsers";
import { DataRenderer, TableSkeleton, Title } from "@/components/index";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AdminUserGrid from "./AdminUserGrid";
import UserForm from "../forms/UserForm";

function AdminUserPage({ params }: { params: AdminSearchParamsType }) {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Admin", "User", params],
    queryFn: () => getUsers(params),
  });

  return (
    <div className="w-[98%] max-w-4xl mx-auto py-16">
      <Title message="Admins / Users" />
      <section className="mt-8 flex justify-end items-end gap-4 lg:gap-8">
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Add User
        </Button>
      </section>
      <section className="mt-12">
        <DataRenderer
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          title="Users"
          loader={<TableSkeleton />}
        >
          {(users) => <AdminUserGrid users={users} />}
        </DataRenderer>
      </section>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 grid place-items-center overflow-y-auto py-8">
            <UserForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminUserPage;
