"use client";
import LoadingBTN from "@/components/share/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema, ProfileSchemaType } from "../schemas/profileSchema";
import { useMutate } from "@/hooks/useMutate";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/features/query-keys";
import { PharmacyType, PharmacyTypes } from "@/features/pharmacy/types";
import { updateProfile } from "../actions/updateProfile";

function ProfileForm({ pharmacy }: { pharmacy: PharmacyType }) {
  const { mutate, isPending } = useMutate<PharmacyTypes, ProfileSchemaType>({
    mutationFn: updateProfile,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
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
      name: pharmacy.name,
      description: pharmacy.description,
      pharmacistName: pharmacy.pharmacistName,
    },
  });

  useEffect(() => {
    if (!pharmacy) return;

    reset({
      name: pharmacy.name,
      description: pharmacy.description,
      pharmacistName: pharmacy.pharmacistName,
    });
  }, [pharmacy, reset]);

  useEffect(() => {
    if (pharmacy) {
      reset({
        name: pharmacy.name,
        description: pharmacy.description,
        pharmacistName: pharmacy.pharmacistName,
      });
    }
  }, [pharmacy, reset]);

  const name = watch("name");
  const description = watch("description");
  const pharmacistName = watch("pharmacistName");

  const disable_save_btn =
    name === pharmacy?.name &&
    description === pharmacy?.description &&
    pharmacistName === pharmacy?.pharmacistName;

  const onSubmit = async (data: ProfileSchemaType) => {
    if (!pharmacy) {
      mutate(data);
      return;
    }
    mutate(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="border p-4 rounded-md   mx-auto"
    >
      <h2 className="font-semibold card-title mb-4">Pharmacy Info</h2>

      <div className="flex gap-4 flex-col lg:flex-row text-foreground/70">
        <div className="flex flex-col gap-1.5  w-full">
          <Label>Pharmacy Name</Label>
          <Input
            placeholder="Acoxyl Pharmacy"
            {...register("name", { required: true })}
          />
          <>
            {errors.name && (
              <p className="danger text-[11px ]">{errors.name.message}</p>
            )}
          </>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label>Pharmacist Name</Label>
          <Input {...register("pharmacistName", { required: true })} placeholder="Dr. Grace K." />
        </div>
        <>
          {errors.pharmacistName && (
            <p className="danger text-[11px ]">
              {errors.pharmacistName.message}
            </p>
          )}
        </>
      </div>

      <div className="flex flex-col gap-1.5 w-full">
        <Label>Description</Label>
        <Textarea
          placeholder="Enter a description"
          {...register("description", { required: true })}
        />
        <>
          {errors.description && (
            <p className="danger text-[11px ]">{errors.description.message}</p>
          )}
        </>
      </div>
      <div className="flex justify-end gap-2 mt-8 ">
        {!disable_save_btn && pharmacy && (
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
              {isPending ? (
                <LoadingBTN message="Saving..." />
              ) : (
                "Update Changes"
              )}
            </Button>
          </div>
        )}
        {!pharmacy && (
          <Button type="submit" size={"sm"}>
            {isPending ? <LoadingBTN message="Saving..." /> : "Save"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
