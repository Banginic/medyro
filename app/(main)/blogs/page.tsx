import { serverFetch } from "@/components/index";
import PageHeading from "@/components/share/PageHeading";
import BlogPage from "@/features/blogs/components/BlogPage";
import { BlogMetadata } from "@/features/blogs/metadata/blogMetadata";
import { BlogTypes } from "@/features/blogs/types";

import { Metadata } from "next";

export const metadata: Metadata = BlogMetadata;

async function page() {
  const data = await serverFetch<BlogTypes>({
    endpoint: "/blogs",
    method: "GET",
    title: "blogs",
  });

  return (
    <div className="min-h-screen max-w-7xl mx-auto py-16 2xl:py-32 px-1.5 lg:px-6">
      <PageHeading
        title="Health & Wellness Blog"
        subtitle="Stay informed with practical health tips, medication guides, and trusted insights to help you make better decisions about your health."
      />

      <BlogPage blogs={data?.data} />
    </div>
  );
}

export default page;
