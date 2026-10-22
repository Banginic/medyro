"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { LoadingBTN } from "@/components/index";
import { useMutate } from "@/hooks/useMutate";
import { zodResolver } from "@hookform/resolvers/zod";
import { getAddressInfo } from "../actions/getAddressInfo";
import { AddressTypes } from "../types";
import { createAddressInfo } from "../actions/createAddressInfo";
import { updateAddressInfo } from "../actions/updateAddressInfo";
import { AddressSchema, AddressSchemaType } from "../schemas/addressSchema";
import { useForm } from "react-hook-form";
import SettingSkeleton from "./SettingSkeleton";
import { Label } from "@/components/ui/label";

function AddressSettings({ projectId }: { projectId: string }) {

  const { data, isPending } = useQuery({
    queryKey: ["admin-address-info", projectId],
    queryFn: getAddressInfo,
    enabled: !!projectId,
  });

  const project = data?.data[0];

  const { mutate, isPending: pendingMutate } = useMutate<
    AddressTypes,
    AddressSchemaType
  >({
    mutationFn: createAddressInfo,
    queriesToInvalidate: [["admin-address-info"]],
  });

  const { mutate: updateMutate, isPending: pendingUpdate } = useMutate<
    AddressTypes,
    AddressSchemaType
  >({
    mutationFn: updateAddressInfo,
    queriesToInvalidate: [["admin-address-info"]],
  });

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<AddressSchemaType>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      projectId,
      country: "",
      state: "",
      city: "",
      currency: "",
      language: "",
      address: "",
    },
  });

  useEffect(() => {
    if (project) {
      reset({
        projectId,
        country: project.country,
        state: project.state,
        city: project.city,
        currency: project.currency,
        language: project.language,
        address: project.address,
      });
    }
  }, [project, reset]);

  if (isPending) return <SettingSkeleton />;

  const country = watch("country");
  const state = watch("state");
  const city = watch("city");
  const address = watch("address");
  const currency = watch("currency");
  const language = watch("language");

  const disable_save_btn =
    country === project?.country &&
    state === project?.state &&
    city === project?.city &&
    currency === project?.currency &&
    language === project?.language &&
    address === project?.address;

  const onSubmit = async (data: AddressSchemaType) => {
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
      <h2 className="font-semibold text-lg lg:text-xl mb-4">
        Address and Location
      </h2>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70">
        <Input hidden {...register("projectId", { required: true })} />
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Country</Label>
          <Input
            {...register("country", { required: true })}
            placeholder="US"
          />
          <>
            {errors.country && (
              <p className="mt-1 danger">{errors.country.message}</p>
            )}
          </>
        </div>

        <div className="flex flex-col  gap-1 text-sm w-full lg:w-1/2">
          <Label>State / Region</Label>
          <Input
            {...register("state", { required: true })}
            placeholder="New York"
          />
          <>
            {errors.state && (
              <p className="mt-1 danger">{errors.state.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70 mt-4">
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Town / City</Label>
          <Input
            {...register("city", { required: true })}
            placeholder="Gracelos"
          />
          <>
            {errors.city && (
              <p className="mt-1 danger">{errors.city.message}</p>
            )}
          </>
        </div>
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Address</Label>
          <Input
            {...register("address", { required: true })}
            placeholder="124 Baklin Bay"
          />
          <>
            {errors.address && (
              <p className="mt-1 danger">{errors.address.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-4 text-foreground/70 mt-4">
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Currency</Label>
          <Input
            {...register("currency", { required: true })}
            placeholder="USD"
          />
          <>
            {errors.currency && (
              <p className="mt-1 danger">{errors.currency.message}</p>
            )}
          </>
        </div>
        <div className="flex flex-col gap-1 text-sm w-full lg:w-1/2">
          <Label>Language</Label>
          <Input
            {...register("language", { required: true })}
            placeholder="English US"
          />
          <>
            {errors.language && (
              <p className="mt-1 danger">{errors.language.message}</p>
            )}
          </>
        </div>
      </div>
      <Link
        href={"/admin/map"}
        className="mt-4 w-full text-sm cursor-pointer border hover:bg-secondary text-secondary-foreground/70 py-2 rounded-md px-4 text-start flex gap-2 items-center"
      >
        <MapPin size={16} />
        <span>Set / Update map</span>
      </Link>
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

export default AddressSettings;
