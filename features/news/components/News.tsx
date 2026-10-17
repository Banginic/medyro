"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Mail } from "lucide-react";
import { getActiveNews } from "../actions/getActiveNews";

function News() {
  const { data} = useQuery({
    queryKey: ['News'],
    queryFn:() => getActiveNews({status: 'active'})
  });
  if (!data || !data.data || data.data.length === 0) {
    return;
  }
  return (
    <div>
      {data.data[0].body && (
        <article className=" py-2 text-center text-sm p-2 group bg-linear-to-r from-background via-primary to-background text-primary-foreground backdrop-blur-2xl max-w-[97rem] mx-auto text-foreground flex justify-center gap-4 items-center ">
         <Mail className="animate-accordion-up group-hover:animate-bounce size-4" />
          <Link href={"/news"} className="cursor-pointer text-xs lg:text-sm">
            {data.data[0].subject}
          </Link>
        </article>
      )}
    </div>
  );
}

export default News;
