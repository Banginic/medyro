import { useQuery } from "@tanstack/react-query";

import {
  AppPagination,
  DataRenderer,
  TableSkeleton,
  Title,
} from "@/components/index";
import { getBlogs } from "../../actions/getBlogs";
import { BlogsSearchParamsType } from "../../types";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import BlogForm from "../../forms/BlogForm";
import AdminBlogCard from "./AdminBlogCard";

function AdminBlogPage({ params }: { params: BlogsSearchParamsType }) {
  const [showForm, setForm] = useState(false);
  const { data, isFetching, isError } = useQuery({
    queryKey: ["Blog"],
    queryFn: () => getBlogs(params),
  });
  return (
    <div className="py-16 w-[98%] max-w-3xl mx-auto">
      <Title message="Blogs" />
      <section className="mt-8 flex justify-end items-end">
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Add Blog
        </Button>
      </section>
      <section className="mt-12">
        <DataRenderer
          title="blogs"
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          loader={<TableSkeleton />}
        >
          {(blogs) => (
            <ul className="flex flex-col gap-2">
              {blogs.map((blog, index) => (
                <li key={index}>
                  <AdminBlogCard blog={blog} />
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
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl overflow-y-auto bg-background/20 grid place-items-center py-8">
            <BlogForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminBlogPage;
