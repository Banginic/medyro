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
import Image from "next/image";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PharmacyTypes } from "@/features/pharmacy/types";
import { PhotoSchema, PhotoSchemaType } from "../schemas/photoSchema";
import { QUERY_KEYS } from "@/features/query-keys";
import { createLogo } from "../actions/createLogo";

function LogoForm({
  closeForm,
  photoUrl
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
  photoUrl: string | undefined
}) {
  function handleSubmitSuccess() {
    reset();
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<PharmacyTypes, FormData>({
    mutationFn: createLogo,
    queriesToInvalidate: [[QUERY_KEYS.pharmacy]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PhotoSchemaType>({
    resolver: zodResolver(PhotoSchema),
  });
  const photo = watch("photo");

  const onSubmit = async (data: PhotoSchemaType) => {
    const formData = new FormData();
    if (data.photo) {
      formData.append("photo", data.photo);
    }
    mutate(formData);
  };

  return (
    <Card className="p-4 lg:p-6 w-[98%] max-w-lg mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4"
      >
        <X />
      </Button>
      <CardHeader>
        <CardTitle>Update Logo</CardTitle>
        <CardDescription className="text-muted-foreground">
          Update your logo using the form below.
        </CardDescription>
      </CardHeader>

      <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div
            title="Add Photo"
            className=" my-6 overflow-hidden trans rounded-sm grid place-items-center  mx-auto cursor-pointer "
          >
            <label
              htmlFor="photo"
              className="cursor-pointer size-32 lg:size-42 rounded-full  border border-dashed  overflow-hidden"
            >
              <Image
                width={100}
                height={50}
                src={photo ? URL.createObjectURL(photo) : photoUrl ?? "/placeholder.jpg"}
                alt="Program photos"
                className="h-full w-full object-cover  "
              />
              <input
                type="file"
                hidden
                id="photo"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];

                  if (file) {
                    setValue("photo", file, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </label>
            {errors.photo && (
              <p className="text-pink-400 ">{errors.photo.message}</p>
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

export default LogoForm;
