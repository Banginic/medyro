import { Card } from "@/components/ui/card";
import { BlogType } from "../../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";
import { useUIStore } from "@/stores/useUIStore";
import EditBlogForm from "../../forms/EditBlogForm";
import { useState } from "react";

function AdminBlogDetails({ blogs }: { blogs: BlogType[] }) {
  const [showForm, setForm] = useState(false);
  const blog = blogs[0];
  const openDeleteDialogue = useUIStore((state) => state.openDeleteDialogue);

  return (
    <Card className="p-2 lg:p-6 w-[98%] max-w-2xl space-y-4 mx-auto">
      <div className="w-full rounded-md overflow-hidden h-52 lg:h-72 relative">
        <Image
          src={blog.photo}
          alt={blog.title}
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-muted-foreground">Author</span>
          <p>{blog.author}</p>
        </div>
        <div>
          <span className="text-muted-foreground">Date</span>
          <p>{new Date(blog.createdAt).toLocaleDateString("en-GB")}</p>
        </div>
      </div>
      <div>
        <span className="text-muted-foreground">Title</span>
        <p>{blog.title}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Content</span>
        <div className="space-y-2">
          {blog.body
            .split(/\n\s*\n/)
            .filter(Boolean)
            .map((paragraph, index) => (
              <p className="leading-5" key={index}>
                {paragraph.trim()}
              </p>
            ))}
        </div>
      </div>
      <div className="mt-12 flex justify-end gap-4 items-end">
        <Button onClick={() => setForm(true)} size={"sm"} variant={"outline"}>
          <Edit />
          Edit
        </Button>
        <Button
          size={"sm"}
          onClick={() =>
            openDeleteDialogue({
              endpoint: `/blogs/${blog.id}`,
              method: "DELETE",
              title: "Blog",
            })
          }
          variant={"secondary"}
        >
          <Trash />
          Delete
        </Button>
      </div>
      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl overflow-y-auto bg-background/20 grid place-items-center py-8">
            <EditBlogForm blog={blog} closeForm={setForm} />
          </div>
        )}
      </>
    </Card>
  );
}

export default AdminBlogDetails;
