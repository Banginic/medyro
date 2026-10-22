"use client";
import { BlogType } from "../types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ShareLink from "@/components/share/ShareLink";
import { usePathname } from "next/navigation";
import BlogLikes from "./BlogLikes";

function BlogDetails({ blog }: { blog: BlogType }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen relative py-16 max-w-xl mx-auto">
      <article className="max-w-3xl mx-auto px-1.5 py-12">
        <Card className="overflow-hidden rounded-2xl mx-auto hover:shadow-lg transition-shadow duration-300  ">
          <div className="relative p-2 rounded-xl h-52 lg:h-80 overflow-hidden">
            <img
              src={blog.photo}
              alt={blog.title}
              className="w-full h-full object-cover rounded-xl  transition-transform duration-300"
            />
          </div>

          <CardHeader className="px-6 pt-2">
            <CardTitle className="card-title mt-2 mb-0">
              <p> {blog.title}</p>
            </CardTitle>
            <div className="flex flex-wrap gap-4 mt-2 justify-between items-end">
              <div className="flex text-muted-foreground items-center gap-2">
                <span className="text-sm ">{blog.author}</span>
                <span className="text-xs  bg-muted px-2 py-1 rounded-full text-[11px]">
                  {new Date(blog.createdAt).toLocaleDateString("en-GB")}
                </span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-muted-foreground my-4 lg:my-4 space-y-2">
              {blog.body
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph, index) => (
                  <p className="leading-5" key={index}>
                    {paragraph.trim()}
                  </p>
                ))}
            </div>

            <CardFooter className="flex items-center p-0 justify-end">
              <ShareLink link={pathname} title="" />
            </CardFooter>
          </CardContent>
        </Card>
      </article>
    </div>
  );
}

export default BlogDetails;
