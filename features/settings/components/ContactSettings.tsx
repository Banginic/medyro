"use client";
import LoadingBTN from "@/components/share/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutate } from "@/hooks/useMutate";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ContactTypes } from "../types";
import { ContactSchema, ContactSchemaType } from "../schemas/contactSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { createContactInfo } from "../actions/createContactInfo";
import { updateContactInfo } from "../actions/updateContactInfo";
import { useQuery } from "@tanstack/react-query";
import { getContactInfo } from "../actions/getContactInfo";
import SettingSkeleton from "./SettingSkeleton";

function ContactSettings({ projectId }: { projectId: string }) {
  const { data, isPending } = useQuery({
    queryKey: ["admin-contact-info", projectId],
    queryFn: getContactInfo,
    enabled: !!projectId
  });



  const project = data?.data[0];

  const { mutate, isPending: pendingMutate } = useMutate<
    ContactTypes,
    ContactSchemaType
  >({
    mutationFn: createContactInfo,
    queriesToInvalidate: [["admin-contact-info"]],
  });

  const { mutate: updateMutate, isPending: pendingUpdate } = useMutate<
    ContactTypes,
    ContactSchemaType
  >({
    mutationFn: updateContactInfo,
    queriesToInvalidate: [["admin-contact-info"]],
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactSchemaType>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      projectId,
      phone: "",
      email: "",
      facebook: "",
      instagram: "",
      whatsApp: "",
      tiktok: "",
    },
  });



  useEffect(() => {
    if (project) {
      reset({
        phone: project.phone,
        email: project.email,
        facebook: project.facebook,
        instagram: project.instagram,
        whatsApp: project.whatsApp,
        tiktok: project.tiktok,
      });
    }
  }, [project, reset]);

   if (isPending) return <SettingSkeleton />;

  const phone = watch("phone");
  const email = watch("email");
  const facebook = watch("facebook");
  const instagram = watch("instagram");
  const whatsApp = watch("whatsApp");
  const tiktok = watch("tiktok");

  const disable_save_btn =
    phone === project?.phone &&
    email === project?.email &&
    facebook === project?.facebook &&
    whatsApp === project?.whatsApp &&
    tiktok === project?.tiktok &&
    instagram === project?.instagram;

  const onSubmit = async (data: ContactSchemaType) => {
    if (!project) {
      mutate(data);
      return;
    }
    updateMutate(data);
  };

    

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 rounded-md  w-[95%] max-w-2xl mx-auto"
    >
      <h2 className="font-semibold card-title mb-4">Contact Details</h2>
      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <Input hidden {...register("projectId", { required: true })} />
        <div className="flex flex-col   gap-1 text-sm w-full lg:w-1/2">
          <Label>
            Phone number{" "}
            <span className="text-xs  text-muted-foreground">(No spaces)</span>
          </Label>
          <Input
            type="tel"
            placeholder="+ 237 672 640 914"
            {...register("phone", { required: true })}
          />
          <>
            {errors.phone && (
              <p className="text-[11px] danger">{errors.phone.message}</p>
            )}
          </>
        </div>
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="example@email.com"
            {...register("email", { required: true })}
          />
          <>
            {errors.email && (
              <p className="text-[11px] danger">{errors.email.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex gap-4 text-foreground/70 flex-col lg:flex-row mt-4">
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>
            WhatsApp{" "}
            <span className="text-xs  text-muted-foreground">(No spaces)</span>
          </Label>
          <Input
            placeholder="237672640914"
            {...register("whatsApp", { required: true })}
          />
          <>
            {errors.whatsApp && (
              <p className="text-[11px] danger">{errors.whatsApp.message}</p>
            )}
          </>
        </div>
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Facebook</Label>
          <Input
            type="url"
            placeholder="https://facebook.com/username"
            {...register("facebook", { required: true })}
          />
          <>
            {errors.facebook && (
              <p className="text-[11px] danger">{errors.facebook.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70 mt-4">
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Instagram</Label>
          <Input
            type="url"
            placeholder="https://instagram.com/username"
            {...register("instagram", { required: true })}
          />
          <>
            {errors.instagram && (
              <p className="text-[11px] danger">{errors.instagram.message}</p>
            )}
          </>
        </div>
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Tiktok</Label>
          <Input
            type="url"
            placeholder="https://tiktok.com/username"
            {...register("tiktok", { required: true })}
          />
          <>
            {errors.tiktok && (
              <p className="text-[11px] danger">{errors.tiktok.message}</p>
            )}
          </>
        </div>
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

export default ContactSettings;
