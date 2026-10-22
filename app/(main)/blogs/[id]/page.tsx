import { serverFetch } from "@/components/index";
import { Metadata } from "next";
import { BlogTypes } from "@/features/blogs/types";
import BlogDetailsPage from "@/features/blogs/components/BlogDetailsPage";
import { notFound } from "next/navigation";
import { projectDetails } from "@/constants/project-details";

async function getBlog(id: string) {
  const data = await serverFetch<BlogTypes>({
    endpoint: `/blogs/${id}`,
    method: "GET",
    title: "Blog",
  });
  if (!data.data) {
    return null;
  }
  return {
    title: data?.data[0].title,
    photo: data?.data[0].photo,
    author: data?.data[0].author,
    post: data?.data[0].body,
    data: data,
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const id = (await params).id;
  const data = await getBlog(id);
  const baseUrl = process.env.BASE_URL!;
  const author = "Dr. Akwa John Cham";

  if (!data) {
    return {
      title: "Blog Not Found - St. Sylester Medical Foundation",
      description: "This blog data could not be found.",
    };
  }

  return {
    title: `${data.title} - ${projectDetails.projectName}`,
    description: `${data.post.slice(0, 150)}`,
    authors: [{ name: author, url: baseUrl }],
    creator: author,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/blogs/${id}`,
    },

    openGraph: {
      title: `${data.title} - ${projectDetails.projectName}`,
      description: data.post.slice(0, 150),
      images: [
        {
          url: data.photo,
          width: 1200,
          height: 630,
          alt: `${data.title} - ${projectDetails.projectName}`,
        },
      ],
      type: "website",
    },
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const data = await serverFetch<BlogTypes>({
    endpoint: `/blogs/${id}`,
    method: "GET",
    title: "Blog",
  });

  if ("status" in data && data.status === 404) {
    notFound();
  }

  return (
    <>
      <h1 className="sr-only">{data?.data[0].title}</h1>
      <BlogDetailsPage blogs={data?.data} />
    </>
  );
}
