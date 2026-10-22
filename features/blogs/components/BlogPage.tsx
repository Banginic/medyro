'use client'
import { DataRenderer } from "@/components/index";
import { BlogType } from "../types";
import BlogGrid from "./BlogGrid";

function BlogPage({ blogs }: { blogs: BlogType[] | undefined }) {
  return (
    <div>
      <DataRenderer title="Blogs" isError={!blogs} data={blogs}>
        {(blogs) => <BlogGrid blogs={blogs} />}
      </DataRenderer>
    </div>
  );
}

export default BlogPage;
