"use client";
import { DataRenderer } from "@/components/index";
import { BlogType } from "../types";
import BlogDetails from "./BlogDetails";

function BlogDetailsPage({ blogs }: { blogs: BlogType[] | undefined }) {
  return (
    <DataRenderer title="Blog details" data={blogs} isError={!blogs}>
      {(blogs) => <BlogDetails blog={blogs[0]} />}
    </DataRenderer>
  );
}

export default BlogDetailsPage;
