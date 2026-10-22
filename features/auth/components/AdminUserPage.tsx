import { useQuery } from "@tanstack/react-query";
import { AdminSearchParamsType } from "../types";
import { getUsers } from "../actions/getUsers";
import { AppPagination, DataRenderer, TableSkeleton, Title } from "@/components/index";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import AdminUserCard from "./AdminUserCard";
import AdminForm from "../forms/AdminForm";

function AdminUserPage({ params }: { params: AdminSearchParamsType }) {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Admin", "User", params],
    queryFn: () => getUsers(params),
  });

  return (
    <div className="w-[98%] max-w-2xl mx-auto py-16 px-2">
      <Title message="Admins / Users" />
      <section className="mt-8 flex justify-end items-end gap-4 lg:gap-8">
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Add Admin
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
           {(users) => (
            <ul className="flex flex-col gap-2">
              {users.map((user, index) => (
                <li key={index}>
                  <AdminUserCard user={user}/>
                </li>
              ))}
            </ul>
          )}
        </DataRenderer>
      </section>
        <>
          {data?.pagination && (
            <AppPagination
              page={data.pagination.page}
              totalPages={data.pagination.totalPages}
            />
          )}
        </>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 grid place-items-center overflow-y-auto py-8">
            <AdminForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminUserPage;
