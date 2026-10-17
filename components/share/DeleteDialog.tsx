'use client'
import { CircleOff, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { useUIStore } from "@/stores/useUIStore";
import { useMutate } from "@/hooks/useMutate";
import clientFetch from "@/lib/clientFetch";
import LoadingBTN from "./LoadingBTN";
import { useRouter } from "next/navigation";


interface DeleteResponse {
  message: string;
  success: boolean;
  data: [];
}

function DeleteDialog() {
  const router = useRouter();
  const deleteDetails = useUIStore((state) => state.deleteDetails);
  const closeDeleteDialogue = useUIStore((state) => state.closeDeleteDialogue);


  const { mutate, isPending } = useMutate<DeleteResponse, void>({
    mutationFn: () => clientFetch<DeleteResponse>(deleteDetails!),
    queriesToInvalidate: [[deleteDetails?.title ?? ""]],
    handleSubmitSuccess: () => {
      closeDeleteDialogue();
      if (deleteDetails?.redirect) {
        router.back();
      }
    },
  });

  return (
    <Card className="p-6 py-8 lg:p-12 w-[98%] max-w-lg">
      <h2 className="text-lg lg:text-2xl font-semibold ">
      Delete {" "}
        {deleteDetails?.title.toLocaleLowerCase()}
      </h2>

      <p className="text-muted-foreground mt-2">
        This process is not reversible once initiated.
      </p>

      <div className="mt-8 flex items-center justify-end gap-4">
        <Button
          onClick={closeDeleteDialogue}
          disabled={isPending}
          variant="outline"
          size="sm"
        >
          <CircleOff className=" h-4 w-4" />
         Cancel
        </Button>

        <Button
          onClick={() => mutate()}
          disabled={isPending}
          variant="destructive"
          size="sm"
        >
          {isPending ? (
            <LoadingBTN message="Deleting..." />
          ) : (
            <>
              <Trash className=" h-4 w-4" />
              {isPending ? "Deleting..." : `
             Delete
           
              `}
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}

export default DeleteDialog;
