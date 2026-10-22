"use client";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CountSkeleton from "./CountSkeleton";
import CountError from "./CountError";
import { getBlogCount } from "@/features/blogs/actions/getBlogCount";
import { usePathname } from "next/navigation";
import Link from "next/link";

function BlogCount() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["Blog"],
    queryFn: getBlogCount,
  });
  const pathname = usePathname();
  if (isPending) return <CountSkeleton />;
  if (isError) return <CountError />;
  return (
    <Link href={`${pathname}/blogs`}>
      <Card title="Visit blogs" className="p-4 lg:p-6 bg-blue-600/90 hover:bg-blue-600 text-white w-full lg:w-68  ">
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          {data?.data}
        </h2>
        <p className=" text-center subtitle ">Blogs</p>
      </Card>
    </Link>
  );
}

export default BlogCount;
