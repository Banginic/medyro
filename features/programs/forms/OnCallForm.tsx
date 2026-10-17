import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { LoadingBTN } from "@/components/index";
import { CircleOff, Save, X } from "lucide-react";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createOnCall } from "../actions/createOnCall";
import { OnCallTypes } from "../types";
import {
  OnCallSchemaType,
  OnCallSchema,
} from "@/features/programs/schemas/onCallSchema";

function OnCallForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  function handleSubmitSuccess() {
    reset();
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<OnCallTypes, OnCallSchemaType>({
    mutationFn: createOnCall,
    queriesToInvalidate: [["Schedule"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<OnCallSchemaType>({
    resolver: zodResolver(OnCallSchema),
  });

  const onSubmit = async (data: OnCallSchemaType) => {
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
        <CardTitle>Add call day</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add new day using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <Label className="ml-1.5 text-muted-foreground">Date</Label>
              <Input
                type="date"
                {...register("date", { required: "Date is required" })}
              />
              {errors.date && (
                <p className="text-red-500 text-sm m-1">
                  {errors.date.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="ml-1.5 text-muted-foreground">Start Time</Label>
              <Input
                type="time"
                defaultValue="06:00"
                {...register("startTime", {
                  required: "Start time is required",
                })}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm m-1">
                  {errors.startTime.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="ml-1.5 text-muted-foreground">
                End Time <span className="text-xs">(optional)</span>
              </Label>
              <Input
              defaultValue="07:30"
              type="time" {...register("endTime")} />
              {errors.endTime && (
                <p className="text-red-500 text-sm m-1">
                  {errors.endTime.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-4 items-center">
            <Button
            size={'sm'}
              onClick={() => reset()}
              type="reset"
              title="Clear form"
              variant="secondary"
            >
              <CircleOff />
              Clear
            </Button>
            <Button size={'sm'} disabled={isPending} type="submit">
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

export default OnCallForm;
