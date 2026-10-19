import { MessageType } from "../../types";
import { ActionsPopover } from "@/components/index";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { usePathname } from "next/navigation";

function AdminMessageCard({
  message,
  index,
}: {
  message: MessageType;
  index: number;
}) {
  const pathname = usePathname();
  return (
    <Card className="p-2 flex justify-between lg:items-center" key={index}>
      <Link
        title="Messages"
        href={`${pathname}/${message.id}`}
        className="group flex gap-4"
      >
        <div className="relative flex size-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="text-sm font-semibold">
            {message.name
              .split(" ")
              .map((n) => n[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </span>
        </div>
        <div className="flex flex-col">
          <h2 className="font-semibold group-hover:underline">
            {message.name}
          </h2>
          <p className="text-xs text-muted-foreground line-clamp-1">
            {message.body}
          </p>
        </div>
      </Link>
      <div>
        <p className="text-xs text-muted-foreground">
          {new Date(message.createdAt).toLocaleDateString("en-GB")}
        </p>
        <div className="font-medium hidden lg:flex justify-end gap-2">
          <ActionsPopover
            remove={{ endpoint: `/messages/${message.id}`, title: "Message" }}
            view={`${pathname}/${message.id}`}
          />
        </div>
      </div>
    </Card>
  );
}

export default AdminMessageCard;
