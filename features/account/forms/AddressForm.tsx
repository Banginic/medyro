"use client";
import LoadingBTN from "@/components/share/LoadingBTN";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddressSchema, AddressSchemaType } from "../schemas/addressSchema";
import { useMutate } from "@/hooks/useMutate";
import { useEffect } from "react";
import { QUERY_KEYS } from "@/features/query-keys";
import { PharmacyType, PharmacyTypes } from "@/features/pharmacy/types";
import { updateAddress } from "../actions/updateAddress";
import { CAMEROON_REGIONS } from "@/features/registrations/contants";

function AddressForm({ pharmacy }: { pharmacy: PharmacyType }) {
  const { mutate, isPending } = useMutate<PharmacyTypes, AddressSchemaType>({
    mutationFn: updateAddress,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
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
      region: pharmacy.region,
      city: pharmacy.city,
      address: pharmacy.address,
      email: pharmacy.email,
      website: pharmacy.website,
      phone: Number(pharmacy.phone),
      whatsApp: Number(pharmacy.whatsApp),
    },
  });

  useEffect(() => {
    if (!pharmacy) return;

    reset({
      region: pharmacy.region,
      city: pharmacy.city,
      address: pharmacy.address,
      email: pharmacy.email,
      phone: Number(pharmacy.phone),
      whatsApp: Number(pharmacy.whatsApp),
      website: pharmacy.website,
    });
  }, [pharmacy, reset]);

  //   useEffect(() => {
  //     if (pharmacy) {
  //       reset({
  //         region: pharmacy.region,
  //         city: pharmacy.city,
  //         address: pharmacy.address,
  //         email: pharmacy.email,
  //         phone: pharmacy.phone,
  //         whatsApp: pharmacy.whatsApp,
  //       });
  //     }
  //   }, [pharmacy, reset]);

  const region = watch("region");
  const city = watch("city");
  const address = watch("address");
  const phone = watch("phone");
  const email = watch("email");
  const whatsApp = watch("whatsApp");
  const website = watch("website");

  let selectedCities = undefined;

  if (region) {
    selectedCities = CAMEROON_REGIONS.find((item) => item.name === region);
  }

  const disable_save_btn =
    region === pharmacy?.region &&
    city === pharmacy?.city &&
    address === pharmacy?.address &&
    phone === Number(pharmacy?.phone) &&
    email === pharmacy?.email &&
    whatsApp === Number(pharmacy?.whatsApp) &&
    website === pharmacy?.website;

  const onSubmit = async (data: AddressSchemaType) => {
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
      <h2 className="font-semibold card-title mb-4">Address Info</h2>

      <div className="flex gap-4 flex-col lg:flex-row ">
        <div className="flex flex-col gap-1.5  w-full">
          <Label className="text-muted-foreground">Pharmacy Name</Label>
          <select
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-xs lg:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            {...register("region")}
          >
            <option value="">Select your region</option>
            {CAMEROON_REGIONS.map((item) => (
              <option key={item.capital} value={item.name}>
                {item.name}
              </option>
            ))}{" "}
          </select>
          <>
            {errors.region && (
              <p className="danger text-[11px ]">{errors.region.message}</p>
            )}
          </>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label className="text-muted-foreground">City / Town</Label>
          <select
            disabled={!region}
            className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-card px-3 py-2 text-xs lg:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            {...register("city")}
          >
            <option value="">Select your city</option>
            {selectedCities &&
              selectedCities.towns.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}{" "}
          </select>
          <>
            {errors.city && (
              <p className="danger text-[11px ]">{errors.city.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row ">
        <div className="flex flex-col gap-1.5  w-full">
          <Label className="text-muted-foreground">Address</Label>
          <Input {...register("address")} placeholder="Enter address" />
          <>
            {errors.address && (
              <p className="danger text-[11px ]">{errors.address.message}</p>
            )}
          </>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label className="text-muted-foreground">Email</Label>
          <Input
            type="email"
            {...register("email")}
            placeholder="example@email.com"
          />
          <>
            {errors.email && (
              <p className="danger text-[11px ]">{errors.email.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex gap-4 flex-col lg:flex-row ">
        <div className="flex flex-col gap-1.5  w-full">
          <Label className="text-muted-foreground">Phone Number</Label>
          <Input
            type="tel"
            {...register("phone", { valueAsNumber: true })}
            placeholder="672640914"
          />
          <>
            {errors.phone && (
              <p className="danger text-[11px ]">{errors.phone.message}</p>
            )}
          </>
        </div>

        <div className="flex flex-col gap-1.5 w-full mb-4">
          <Label className="text-muted-foreground">WhatsApp Number</Label>
          <Input
            type="tel"
            {...register("whatsApp", { valueAsNumber: true })}
            placeholder="672640914"
          />
          <>
            {errors.whatsApp && (
              <p className="danger text-[11px ]">{errors.whatsApp.message}</p>
            )}
          </>
        </div>
      </div>
      <div className="flex flex-col gap-1.5 w-full mb-4">
        <Label className="text-muted-foreground">Website Link</Label>
        <Input {...register("website")} placeholder="www.pharmacyname.com" />
        <>
          {errors.website && (
            <p className="danger text-[11px ]">{errors.website.message}</p>
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

export default AddressForm;
