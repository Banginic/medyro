import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { LoadingBTN } from "@/components/index";
import { CircleOff, Save, X } from "lucide-react";
import Image from "next/image";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NewsTypes } from "../types";
import { NewsSchema, NewsSchemaType } from "../schemas/newsSchema";
import { createNews } from "../actions/createNews";

function NewsForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  function handleSubmitSuccess() {
    reset();
  }

  const { mutate, isPending } = useMutate<NewsTypes, NewsSchemaType>({
    mutationFn: createNews,
    queriesToInvalidate: [["News"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewsSchemaType>({
    resolver: zodResolver(NewsSchema),
  });

  const onSubmit = async (data: NewsSchemaType) => {
    mutate(data);
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
        <CardTitle>Create news</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add news update using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">Subject</Label>
              <Textarea
                {...register("subject", { required: true })}
                placeholder="Enter Subject"
              ></Textarea>
              {errors.subject && (
                <p className="text-red-500 m-1">{errors.subject.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <Label className="ml-1.5 text-muted-foreground">
              News Body <span className="text-xs">( Up to 1000 chars )</span>
            </Label>
            <Textarea
              {...register("body", { required: true })}
              placeholder="Enter blog body "
            ></Textarea>
            {errors.body && (
              <p className="text-red-500 m-1">{errors.body.message}</p>
            )}
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
              onClick={() => reset()}
              type="reset"
              title="Clear form"
              variant="secondary"
            >
              <CircleOff />
              Clear
            </Button>
            <Button disabled={isPending} type="submit">
              {isPending ? (
                <div>
                  <LoadingBTN message="Saving..." />
                </div>
              ) : (
                <>
                  <Save />
                  Save
                </>
              )}
            </Button>
          </div>
        </form>
      </>
    </Card>
  );
}

export default NewsForm;
