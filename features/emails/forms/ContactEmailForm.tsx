import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingBTN } from "@/components/index";
import { CircleOff, SendHorizonal, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RecieverType } from "../types";
import {
  ContactEmailSchema,
  ContactEmailSchemaType,
} from "../schemas/contactMessageSchema";
import { toast } from "react-toastify";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "../actions/sendContactEmail";

function ContactEmailForm({
  closeForm,
  reciever,
}: {
  reciever: RecieverType;
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  const [isPending, setPending] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactEmailSchemaType>({
    resolver: zodResolver(ContactEmailSchema),
    defaultValues: {
      name: reciever.name,
      email: reciever.email,
    },
  });

  const onSubmit = async (data: ContactEmailSchemaType) => {
    setPending(true);
    try {
      await sendContactEmail(data);
      toast.success("Email sent");
      reset();
      closeForm(false);
    } catch (ex: unknown) {
      const errMessage =
        ex instanceof Error ? ex.message : "Error sending message";
      toast.error(errMessage);
    }
  };
  return (
    <Card className="p-4 lg:p-8 w-[98%] max-w-xl mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4"
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Message {reciever.name}</CardTitle>
        <CardDescription className="text-muted-foreground">
          Send email using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-1.5 w-full mb-4">
            <Label className="ml-1.5 text-muted-foreground">Name</Label>
            <Input
              {...register("name", { required: true })}
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="text-red-500 m-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 w-full mb-4">
            <Label className="ml-1.5 text-muted-foreground">Email</Label>
            <Input
              type="email"
              {...register("email", { required: true })}
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 m-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 w-full mb-4">
            <Label className="ml-1.5 text-muted-foreground">Subject</Label>
            <Textarea
              {...register("subject", { required: true })}
              placeholder="ENTER SUBJECT"
            ></Textarea>
            {errors.subject && (
              <p className="text-red-500 m-1">{errors.subject.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 w-full mb-4">
            <Label className="ml-1.5 text-muted-foreground">Message</Label>
            <Textarea
              {...register("message", { required: true })}
              placeholder="Enter message body"
            ></Textarea>
            {errors.message && (
              <p className="text-red-500 m-1">{errors.message.message}</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
              size={"sm"}
              onClick={() => reset()}
              type="reset"
              title="Clear form"
              variant="secondary"
            >
              <CircleOff />
              Clear
            </Button>
            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <div>
                  <LoadingBTN message="Saving..." />
                </div>
              ) : (
                <>
                  <SendHorizonal />
                  Send
                </>
              )}
            </Button>
          </div>
        </form>
      </>
    </Card>
  );
}

export default ContactEmailForm;
