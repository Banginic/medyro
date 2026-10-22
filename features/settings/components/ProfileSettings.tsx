"use client";
import LoadingBTN from "@/components/share/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileInfoType, ProfileInfoTypes } from "../types";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "../schemas/profileSchema";
import { useMutate } from "@/hooks/useMutate";
import { createProfileInfo } from "../actions/createProfileInfo";
import { useEffect } from "react";
import { updateProfileInfo } from "../actions/updateProfileInfo";

function ProfileSettings({
  project,
}: {
  project: ProfileInfoType | undefined;
}) {
  const { mutate, isPending: pendingMutate } = useMutate<
    ProfileInfoTypes,
    ProfileSchemaType
  >({
    mutationFn: createProfileInfo,
    queriesToInvalidate: [["admin-profile-info"]],
  });

  const { mutate: updateMutate, isPending: pendingUpdate } = useMutate<
    ProfileInfoTypes,
    ProfileSchemaType
  >({
    mutationFn: updateProfileInfo,
    queriesToInvalidate: [["admin-profile-info"]],
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      projectId: "",
      projectName: "",
      tagLine: "",
    },
  });

  useEffect(() => {
    if (!project) return;

    reset({
      projectId: project.id,
      projectName: project.projectName,
      tagLine: project.tagLine,
    });
  }, [project, reset]);

  useEffect(() => {
    if (project) {
      reset({
        projectId: project.id,
        projectName: project.projectName,
        tagLine: project.tagLine,
      });
    }
  }, [project, reset]);
  const projectName = watch("projectName");
  const tagline = watch("tagLine");

  const disable_save_btn =
    projectName === project?.projectName && tagline === project?.tagLine;

  const onSubmit = async (data: ProfileSchemaType) => {
    if (!project) {
      mutate(data);
      return;
    }
    updateMutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 rounded-md w-[95%] lg:w-2xl max-w-3xl mx-auto"
    >
      <h2 className="font-semibold card-title mb-4">Project Information</h2>

      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <div className="flex flex-col gap-1.5  w-full">
          <Label>Project Name</Label>
          <Input
            placeholder="Enter project name"
            {...register("projectName", { required: true })}
          />
          <>
            {errors.projectName && (
              <p className="danger text-[11px ]">
                {errors.projectName.message}
              </p>
            )}
          </>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label>Project ID</Label>
          <Input {...register("projectId", { required: true })} readOnly />
        </div>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Label>Tagline</Label>
        <Textarea
          placeholder="Enter a tagline"
          {...register("tagLine", { required: true })}
        />
        <>
          {errors.tagLine && (
            <p className="danger text-[11px ]">{errors.tagLine.message}</p>
          )}
        </>
      </div>
      <div className="flex justify-end gap-2 mt-8 ">
        {!disable_save_btn && project && (
          <div className="flex gap-4">
            <Button
              type="button"
              onClick={() => reset()}
              size={"sm"}
              variant={"outline"}
            >
              Reset
            </Button>
            <Button type="submit" size={"sm"}>
              {pendingUpdate ? (
                <LoadingBTN message="Saving..." />
              ) : (
                "Update Changes"
              )}
            </Button>
          </div>
        )}
        {!project && (
          <Button type="submit" size={"sm"}>
            {pendingMutate ? <LoadingBTN message="Saving..." /> : "Save"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProfileSettings;
