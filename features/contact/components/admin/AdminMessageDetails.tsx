import { Card } from "@/components/ui/card";
import { MessageType } from "../../types";
import { Button } from "@/components/ui/button";
import { Reply, Trash } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";
import { useState } from "react";
import ContactEmailForm from "@/features/emails/forms/ContactEmailForm";

function AdminMessageDetails({ messages }: { messages: MessageType[] }) {
  const message = messages[0];
  const [showForm, setForm] = useState(false);
  const openDeleteDialogue = useUIStore((state) => state.openDeleteDialogue);

  return (
    <Card className="max-w-xl mx-auto p-4 lg:p-6">
      <div className="flex justify-between gap-2">
        <div className="flex flex-col mb-4">
          <p className="card-title">{message.name}</p>
        </div>
        <span className="bg-muted p-1 px-2 h-6 rounded-full text-[11px] text-muted-foreground grid place-items-center">
          {new Date(message.createdAt).toLocaleDateString("en-GB")}
        </span>
      </div>
      <div className="flex flex-col mb-4">
        <span className="text-muted-foreground">Subject</span>
        <p>{message.subject}</p>
      </div>
      <div className="flex justify-between gap-2 mb-5">
        <div className="flex flex-col">
          <span className="text-muted-foreground">Email</span>
          <p>{message.email}</p>
        </div>
        <div className="flex flex-col">
          <span className="text-muted-foreground">Phone</span>
          <p>{message.phone}</p>
        </div>
      </div>
      <div className="flex flex-col bg-muted p-2 rounded-xl">
        
        <p>{message.body}</p>
      </div>
      <div className="mt-8 flex gap-4 justify-end">
        <Button
        onClick={() => setForm(true)}
        size={"sm"} variant={"outline"}>
          <Reply />
          Reply
        </Button>
        <Button
          onClick={() =>
            openDeleteDialogue({
              endpoint: `/messages/${message.id}`,
              method: "DELETE",
              title: "Message",
            })
          }
          size={"sm"}
          variant={"secondary"}
        >
          <Trash />
          Delete
        </Button>
      </div>

      <>
        {showForm && (
          <div className="fixed inset-0 backdrop-blur-2xl bg-background/20 overflow-y-auto grid place-items-center py-8">
            <ContactEmailForm reciever={message} closeForm={setForm} />
          </div>
        )}
      </>
    </Card>
  );
}

export default AdminMessageDetails;
