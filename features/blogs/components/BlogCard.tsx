"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { BlogType } from "../types";
import { Heart } from "lucide-react";
import Image from "next/image";


function BlogCard({ blog }: { blog: BlogType }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
    >
      <Card className="group overflow-hidden w-[98%] px-0 rounded-2xl mx-auto hover:shadow-lg bg-card transition-shadow duration-300 ">
        <div className="relative   rounded-xl overflow-hidden group-hover:scale-105  h-62  trans">
          <Image
            src={blog.photo}
            alt={blog.title}
            fill
            className="w-full h-full rounded-md object-cover hover:scale-105 transition-transform duration-300"
          />

        </div>

        <CardHeader className=" mt-4 mb-2">
          <h3 className="card-title font-display font-medium">{blog.title}</h3>
          <CardDescription className="flex items-center justify-between gap-2 text-muted-foreground">
            <h3 className="text-sm text-primary">{blog.author}</h3>
            <span className="text-[11px]  py-1 bg-muted rounded-full">
               {new Date(blog.createdAt).toLocaleDateString("en-GB")}
            </span>
          </CardDescription>
        </CardHeader>

        <CardContent className="">
          <p className="text-muted-foreground mb-4 line-clamp-3">{blog.body}</p>

          <div className="flex items-center justify-between">
          
            <Link href={`/blogs/${blog.slug}`}>
              <Button size="sm" variant={"outline"} className="text-xs ">
                Read More
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.article>
  );
}

export default BlogCard;
