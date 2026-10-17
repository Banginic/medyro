import { AppPagination, DataRenderer, Title } from "@/components/index";
import { NewsSearchParamsType } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { getNews } from "../../actions/getNews";
import AdminNewsGrid from "./AdminNewsGrid";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import NewsForm from "../../forms/NewsForm";

function AdminNewsPage({ params }: { params: NewsSearchParamsType }) {
  const [showForm, setForm] = useState(false);

  const { isError, isFetching, data } = useQuery({
    queryKey: ["Admin", "News", params],
    queryFn: () => getNews(params),
  });
  return (
    <div className="w-[98%] max-w-4xl mx-auto py-16">
      <Title message="News" />
      <section className="mt-8 flex items-end justify-end">
        <Button onClick={() => setForm(true)}>
          <PlusCircle />
          Create News
        </Button>
      </section>
      <section className="mt-12">
        <DataRenderer
          isError={isError}
          isLoading={isFetching}
          data={data?.data}
          title="news"
        >
          {(news) => <AdminNewsGrid news={news} />}
        </DataRenderer>
      </section>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 grid place-items-center py-8">
            <NewsForm closeForm={setForm} />
          </div>
        )}
      </>
    </div>
  );
}

export default AdminNewsPage;
