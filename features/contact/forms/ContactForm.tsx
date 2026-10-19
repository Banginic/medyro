"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ContactSchema, ContactSchemaType } from "../schemas/contactSchema";
import { useMutate } from "@/hooks/useMutate";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CircleOff, SendHorizonal } from "lucide-react";
import { LoadingBTN } from "@/components/index";
import { MessageTypes } from "../types";
import { createMessage } from "../actions/createMessage";
import { CONTACT_SUBJECTS } from "../constants";

function ContactForm() {
  function handleSubmitSuccess() {
    reset();
  }

  const { mutate, isPending } = useMutate<MessageTypes, ContactSchemaType>({
    mutationFn: createMessage,
    queriesToInvalidate: [["Job"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
  });

  const onSubmit = async (data: ContactSchemaType) => {
    mutate(data);
  };

  return (
    <Card className="p-2.5 lg:p-8 w-[99%] max-w-xl mx-aut max-h-160 relative">
      <CardHeader>
        <CardTitle>Send Message</CardTitle>
        <CardDescription className="text-muted-foreground">
          Send message using the form below.
        </CardDescription>
      </CardHeader>
      <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register("website")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
        />
        <div className="flex flex-col lg:flex-row mb-4 justify-between gap-4">
          <div className="flex flex-col gap-1.5  w-full">
            <Label className="ml-1.5 text-muted-foreground">Name</Label>
            <Input
              placeholder="Max Smith"
              {...register("name", { required: true })}
              maxLength={30}
            />
            {errors.name && (
              <p className="text-red-500 m-1">{errors.name.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-1 lg:flex-row">
          <div className="flex flex-col gap-1.5 mb-4 w-full">
            <Label className="ml-1.5 text-muted-foreground">Email</Label>
            <Input
              type="email"
              placeholder="example@email.com"
              {...register("email", {
                required: true,
              })}
              maxLength={30}
            />
            {errors.email && (
              <p className="text-red-500 m-1">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1.5 mb-4 w-full">
            <Label className="ml-1.5 text-muted-foreground">Phone</Label>
            <Input
              type="tell"
              placeholder="672640914"
              {...register("phone", {
                required: true,
              })}
            />
            {errors.phone && (
              <p className="text-red-500 m-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1 w-full mb-4">
          <Label className="text-sm text-muted-foreground ml-1">Subject</Label>

          <select
            {...register("subject", { required: true })}
            className="flex h-10 w-full items-center justify-between rounded-md border  bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          >
            <option disabled>Please select subject</option>
            {CONTACT_SUBJECTS.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.subject && (
            <p className="text-red-500 m-1">{errors.subject.message}</p>
          )}
        </div>

        <div className="flex justify-between gap-4 ">
          <div className="flex flex-col gap-1.5 w-full">
            <Label className="ml-1.5 text-muted-foreground">Message body</Label>
            <Textarea
              {...register("body", { required: true })}
              placeholder="Enter a brief message"
            ></Textarea>
            {errors.body && (
              <p className="text-red-500 m-1">{errors.body.message}</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
          <Button
            onClick={() => reset()}
            type="reset"
            title="Clear form"
            variant="outline"
            size={"sm"}
          >
            <CircleOff />
            Clear
          </Button>
          <Button disabled={isPending} type="submit" size={"sm"}>
            {isPending ? (
              <div>
                <LoadingBTN message="Sending..." />
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
    </Card>
  );
}

export default ContactForm;
