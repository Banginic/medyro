import { BlogType } from "../types";
import BlogCard from "./BlogCard";

function BlogGrid({ blogs }: { blogs: BlogType[] }) {
  return (
    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12 px-2">
      {blogs.map((blog) => (
        <li key={blog.id}>
          <BlogCard blog={blog} />
        </li>
      ))}
    </ul>
  );
}

export default BlogGrid;
