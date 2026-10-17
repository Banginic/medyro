import { Card } from "@/components/ui/card";
import { NewsType } from "../../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { ActionsPopover } from "@/components/index";
import { usePathname } from "next/navigation";

function AdminNewsCard({ news }: { news: NewsType }) {
  const pathname = usePathname();
  return (
    <Card className="p-4 lg:p-6 space-y-4">
    <div className="flex justify-between gap-2 items-end">
        <div>
        <span className="text-muted-foreground">Title</span>
        <p>{news.subject}</p>
      </div>
        <div>
        <span className="text-muted-foreground">Status</span>
        <p className={news.isActive ? 'success' : 'danger'}>{news.isActive ? 'Active' : "InActive"}</p>
      </div>
    </div>
      <div>
        <span className="text-muted-foreground">Body</span>
        <p className="line-clamp-3">{news.body}</p>
      </div>
      <div className="flex items-end justify-end gap-4 mt-12">
        <Button variant={"secondary"} className="">
          <Edit />
          Update
        </Button>
        <ActionsPopover
          view={`${pathname}/${news.id}`}
          remove={{ endpoint: `/news/${news.id}`, title: "News" }}
        />
      </div>
    </Card>
  );
}

export default AdminNewsCard;
