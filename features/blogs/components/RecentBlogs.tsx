"use client";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { getBlogs } from "../actions/getBlogs";
import DataRenderer from "@/components/share/DataRenderer";
import BlogGrid from "./BlogGrid";
import BlogSkeleton from "./BlogSkeleton";
import SectionHeading from "@/components/share/SectionHeading";

function RecentBlogs() {
  const { data, isError, isFetching } = useQuery({
    queryKey: ["Blog", "Client"],
    queryFn: () => getBlogs({ limit: 6 }),
  });
  return (
    <section className="py-24 pt-32 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ amount: 0.2, once: true }}
      >
        <SectionHeading
          title="Health Tips & News"
          subtitle="Practical advice, health updates, and news from the St. Sylvester team, to help you and your family make informed decisions about your well-being."
        />
      </motion.div>

      <div className="mt-12 lg:px-4">
        <DataRenderer
          title="blog"
          data={data?.data}
          isLoading={isFetching}
          loader={<BlogSkeleton />}
          isError={isError}
        >
          {(blogs) => <BlogGrid blogs={blogs} />}
        </DataRenderer>
      </div>
    </section>
  );
}

export default RecentBlogs;
