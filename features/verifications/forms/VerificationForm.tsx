import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction, useState } from "react";
import { LoadingBTN } from "@/components/index";
import { CircleOff, Save, X } from "lucide-react";
import Image from "next/image";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  VerificationSchema,
  VerificationSchemaType,
} from "../schemas/verificationSchema";
import { VerificationTypes } from "../types";
import { createVerification } from "../actions/createVerification";
import { useRouter } from "next/navigation";

function VerificationForm({pharmacyId}: {pharmacyId: string}) {
    const pathname = useRouter()
  function handleSubmitSuccess() {
    reset();
    pathname.push(`/pharmacy/verification/verify-email?pharmacyId=${pharmacyId}`)
    
  }

  const { mutate, isPending } = useMutate<VerificationTypes, FormData>({
    mutationFn: createVerification,
    queriesToInvalidate: [["Verification"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<VerificationSchemaType>({
    resolver: zodResolver(VerificationSchema),
  });
  const photo1 = watch("photo1");
  const photo2 = watch("photo2");
  const photo3 = watch("photo3");

  const onSubmit = async (data: VerificationSchemaType) => {
    const formData = new FormData();

    const photos = [data.photo1, data.photo2, data.photo3].filter(
      (photo): photo is File => Boolean(photo),
    );

    photos.forEach((photo) => {
      formData.append("photos", photo);
    });
    mutate(formData);
  };

  return (
    <Card className="p-4 lg:p-6 w-[98%] mt-6 max-w-xl mx-auto relative">
      
      <CardHeader>
        <CardTitle>Verification Form</CardTitle>
        <CardDescription className="text-muted-foreground">
          Upload photos of your pharmacy's inside, product shelf and outside environment with poster or logo.
        </CardDescription>
      </CardHeader>
      <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
        {/* Photos inputs=========================================================================== */}

        <div className="flex justify-between gap-2">
          <div
            title="Add Photo"
            className=" my-6 overflow-hidden trans rounded-sm grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo1"
              className="cursor-pointer h-18 rounded  overflow-hidden"
            >
              <Image
                width={100}
                height={50}
                src={photo1 ? URL.createObjectURL(photo1) : "/images/outside.png"}
                alt="Program photos"
                className="h-full w-full object-cover border-2 border-dashed border-muted-foreground rounded-sm"
              />
              <input
                type="file"
                hidden
                id="photo1"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("photo1", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </label>
            {errors.photo1 && (
              <p className="text-pink-400 ">{errors.photo1.message}</p>
            )}
          </div>
          <div
            title="Add Photo"
            className=" my-6 overflow-hidden trans rounded-sm grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo2"
              className="cursor-pointer h-18 rounded  overflow-hidden"
            >
              <Image
                width={100}
                height={50}
                src={photo2 ? URL.createObjectURL(photo2) : "/images/inside.png"}
                alt="Program photos"
                className="h-full w-full object-cover border-2 border-dashed border-muted-foreground rounded-sm"
              />
              <input
                type="file"
                hidden
                id="photo2"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("photo2", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </label>
            {errors.photo2 && (
              <p className="text-pink-400 ">{errors.photo2.message}</p>
            )}
          </div>
          <div
            title="Add Photo"
            className=" my-6 overflow-hidden trans rounded-sm grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo3"
              className="cursor-pointer h-18 rounded  overflow-hidden"
            >
              <Image
                width={100}
                height={50}
                src={photo3 ? URL.createObjectURL(photo3) : "/images/shelf.png"}
                alt="Program photos"
                className="h-full w-full object-cover border-2 border-dashed border-muted-foreground rounded-sm"
              />
              <input
                type="file"
                hidden
                id="photo3"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("photo3", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </label>
            {errors.photo3 && (
              <p className="text-pink-400 ">{errors.photo3.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row mb-5 justify-between  gap-4">
          <div className="flex flex-col gap-1.5  w-full">
            <Label className="ml-1.5 text-muted-foreground">
              Email Address
            </Label>
            <Input
              type="email"
              placeholder="example@email.com"
              {...register("email", { required: true })}
              maxLength={50}
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-500 m-1">{errors.email.message}</p>
            )}
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
                <LoadingBTN message="Verifying..." />
              </div>
            ) : (
              <>
                <Save />
                Verify now
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default VerificationForm;
