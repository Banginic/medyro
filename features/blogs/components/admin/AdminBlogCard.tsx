import { usePathname } from "next/navigation";
import { BlogType } from "../../types";
import ActionsPopover from "@/components/share/ActionsPopover";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import Link from "next/link";

function AdminBlogCard({ blog }: { blog: BlogType }) {
  const pathname = usePathname();
  return (
    <Card className="group flex items-center justify-between gap-4 p-3 transition-colors hover:bg-muted/50">
      <Link
        href={`${pathname}/${blog.slug}`}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <div className="relative size-11 shrink-0 overflow-hidden rounded-full ring-1 ring-border lg:size-14">
          <Image
            alt={blog.photo}
            fill
            sizes="(min-width: 1024px) 56px, 44px"
            className="object-cover"
            src={blog.photo}
          />
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <h2 className="truncate font-semibold leading-tight group-hover:underline line-clamp-1">
            {blog.title}
          </h2>
          <p className="truncate text-xs text-muted-foreground line-clamp-1">
            {blog.body}
          </p>
        </div>
      </Link>

      <div className="flex flex-col justify-end">
        <ActionsPopover
          view={`${pathname}/${blog.slug}`}
          remove={{
            endpoint: `/blogs/${blog.id}`,
            title: "Blog",
          }}
        />
      </div>
    </Card>
  );
}

export default AdminBlogCard;
