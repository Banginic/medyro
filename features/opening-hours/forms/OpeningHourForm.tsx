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

import {
  DAYS,
  DAY_LABELS,
  DEFAULT_SCHEDULE,
  DailySchema,
  DailySchemaType,
} from "../schemas/OpeningHoursSchema";
import { OpeningHourTypes } from "../types";
import { createOpeningHour } from "../actions/createOpeningHour";

function OpeningHourForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  function handleSubmitSuccess() {
    reset();
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<OpeningHourTypes, FormData>({
    mutationFn: createOpeningHour,
    queriesToInvalidate: [["Schedule"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<DailySchemaType>({
    resolver: zodResolver(DailySchema),
    defaultValues: { schedule: DEFAULT_SCHEDULE },
  });

  const schedule = watch("schedule");

  function applyFirstDayToAll() {
    const { isOpen, start, end } = getValues("schedule.0");
    DAYS.forEach((_, i) => {
      setValue(`schedule.${i}.isOpen`, isOpen);
      setValue(`schedule.${i}.start`, start);
      setValue(`schedule.${i}.end`, end);
    });
  }

  const onSubmit = async (data: DailySchemaType) => {
    const formData = new FormData();

    const schedule = data.schedule.map(({ day, isOpen, start, end }) => ({
      day,
      isOpen,
      start,
      end,
    }));
    formData.append("schedule", JSON.stringify(schedule));
    mutate(formData);
  };

  return (
    <Card className="p-4 lg:p-6 w-[98%] max-w-xl mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4"
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Add opening hour</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add opening time using the form below.
        </CardDescription>
      </CardHeader>

      <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2 mt-2">
          <div className="mb-3 flex items-center justify-between">
            <Label className="ml-1.5 text-muted-foreground">
              Weekly timetable
            </Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={applyFirstDayToAll}
              title="Copy Monday's hours to every day"
            >
              Apply Monday to all
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            {DAYS.map((day, i) => {
              const isOpen = schedule?.[i]?.isOpen;
              const dayErrors = errors.schedule?.[i];

              return (
                <div
                  key={day}
                  className="flex flex-col gap-2 rounded-xl border p-3 sm:flex-row sm:items-center sm:gap-4"
                >
                  <div className="flex items-center justify-between sm:w-40">
                    <span className="font-medium">{DAY_LABELS[day]}</span>
                    <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
                      <input
                        type="checkbox"
                        className="size-4 accent-primary"
                        {...register(`schedule.${i}.isOpen`)}
                      />
                      Open
                    </label>
                  </div>

                  <div className="flex-1">
                    {isOpen ? (
                      <>
                        <div className="flex items-center gap-2">
                          <Input
                            type="time"
                            aria-label={`${DAY_LABELS[day]} start time`}
                            {...register(`schedule.${i}.start`)}
                          />
                          <span className="text-muted-foreground">–</span>
                          <Input
                            type="time"
                            aria-label={`${DAY_LABELS[day]} closing time`}
                            {...register(`schedule.${i}.end`)}
                          />
                        </div>
                        {(dayErrors?.start || dayErrors?.end) && (
                          <p className="m-1 text-sm text-red-500">
                            {dayErrors.end?.message ?? dayErrors.start?.message}
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Day off
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
                <Save />
                Save
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default OpeningHourForm;
