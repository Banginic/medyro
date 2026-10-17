
import PageHeading from "@/components/share/PageHeading";
import { getServerActiveNews } from "@/features/news/actions/getServerActiveNews";
import NewsPage from "@/features/news/components/NewsPage";
import { NewsMetadata } from "@/features/news/metadata/newsMetadata";
import { Metadata } from "next";

export const metadata: Metadata = NewsMetadata;

async function page() {
  const news = await getServerActiveNews({ status: "active" });

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 2xl:py-32">
      <div className="max-w-3xl mx-auto">
        <PageHeading
          title="Latest Pharmacy News & Health Updates"
          subtitle="Stay informed with the latest news, health tips, pharmacy updates, and important information from Geena Pharmacy."
        />

        <NewsPage news={news} />
      </div>
    </div>
  );
}

export default page;
