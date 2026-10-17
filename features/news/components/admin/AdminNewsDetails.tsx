import { Card } from "@/components/ui/card";
import { NewsType } from "../../types";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";

function AdminNewsDetails({ news }: { news: NewsType[] }) {
  const openDeleteDialogue = useUIStore((state) => state.openDeleteDialogue);

  const singleNews = news[0];
  return (
    <Card className="p-4 lg:p-6 space-y-4 w-[98%] max-w-2xl mx-auto">
      <div>
        <span className="text-muted-foreground">Title</span>
        <p>{singleNews.subject}</p>
      </div>
      <div>
        <span className="text-muted-foreground">Body</span>
        <p>{singleNews.body}</p>
      </div>
      <div className="flex items-end justify-end gap-4 mt-12">
        <Button variant={"secondary"} className="">
          <Edit />
          Update
        </Button>
        <Button
          onClick={() =>
            openDeleteDialogue({
              endpoint: `/news/${singleNews.id}`,
              title: "News",
              method: "DELETE",
            })
          }
          variant={"destructive"}
          className=""
        >
          <Trash />
          Delete
        </Button>
      </div>
    </Card>
  );
}

export default AdminNewsDetails;
