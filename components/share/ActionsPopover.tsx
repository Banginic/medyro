'use client'
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useUIStore } from "@/stores/useUIStore";
import { MoreHorizontal, Edit, Trash, Eye } from "lucide-react";
import Link from "next/link";


interface PropsType {
  view?: string;
  edit?: string;
  remove?: { endpoint: string; title: string };
}

export default function ActionsPopover({ view, edit, remove }: PropsType) {
  const openDeleteDialogue = useUIStore((state) => state.openDeleteDialogue);


  function handleDeleteData() {
    if (remove) {
      openDeleteDialogue({
        endpoint: remove.endpoint,
        title: remove.title,
        method: "DELETE",
      });
    }
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost"  className="shadow-xs">
          <MoreHorizontal className="size-3" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-32 lg:w-38 2xl:w-48 p-2 bg-card z-49 shadow-xs">
        <div className="flex flex-col gap-2">
          <>
            {view && (
              <Button
                variant="secondary"
                size={"sm"}
                asChild
                className="justify-start shadow-xs"
              >
                <Link href={view}>
                  <Eye className="mr-2 h-4 w-4" />
              View
                </Link>
              </Button>
            )}
          </>

          <>
            {edit && (
              <Button
                variant="secondary"
                size={"sm"}
                asChild
                className="justify-start shadow-xs"
              >
                <Link href={edit}>
                  <Edit className="mr-2 h-4 w-4" />
                 Edit
                </Link>
              </Button>
            )}
          </>

          <>
            {remove && (
              <Button
                variant="secondary"
                size={"sm"}
                onClick={handleDeleteData}
                className="justify-start hover:bg-red-600 hover:text-red-100 shadow-xs"
              >
                <Trash className="mr-2 h-4 w-4" />
             Delete
              </Button>
            )}
          </>
        </div>
      </PopoverContent>
    </Popover>
  );
}
