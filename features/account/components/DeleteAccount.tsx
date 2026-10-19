"use client";
import { Button } from "@/components/ui/button";
import { QUERY_KEYS } from "@/features/query-keys";
import { useUIStore } from "@/stores/useUIStore";
import { Trash } from "lucide-react";

function DeleteAccount() {
  const openDeleteDialogue = useUIStore((state) => state.openDeleteDialogue);

  return (
    <section className="border  p-4 rounded-md   max-w-2xl mx-auto">
      <h2 className="card-title mb-4">Delete Account</h2>
      <div className="text-sm text-foreground/70">
        <p>
          Deleting this account will remove your visibility and erase your data
          from the database.
        </p>
      </div>

      <Button
        onClick={() =>
          openDeleteDialogue({
            endpoint: `/admins/delete-account`,
            method: "DELETE",
            title: QUERY_KEYS.pharmacy,
          })
        }
        size={"sm"}
        variant={"danger"}
        className="mt-8 "
      >
        <div className="flex gap-2 items-center">
          <Trash size={18} />
          <span>Delete Account</span>
        </div>
      </Button>
    </section>
  );
}

export default DeleteAccount;
