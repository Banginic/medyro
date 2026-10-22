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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogSchema, BlogSchemaType } from "../schemas/blogSchema";
import { BlogTypes } from "../types";
import { createBlog } from "../actions/createBlog";

function BlogForm({
  closeForm,
}: {
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  function handleSubmitSuccess() {
    reset();
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<BlogTypes, FormData>({
    mutationFn: createBlog,
    queriesToInvalidate: [["Blog"]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BlogSchemaType>({
    resolver: zodResolver(BlogSchema),
  });
  const photo = watch("photo");

  const onSubmit = async (data: BlogSchemaType) => {
    const formData = new FormData();
    formData.append("author", data.author);
    formData.append("title", data.title);
    formData.append("body", data.body);
    if (data.photo) {
      formData.append("photo", data.photo);
    }

    mutate(formData);
  };

  return (
    <Card className="p-2 lg:p-4 w-[98%] max-w-xl mx-auto relative">
      <Button
        onClick={() => closeForm(false)}
        variant={"ghost"}
        className="absolute top-4 right-4"
      >
        <X />
      </Button>
      <CardHeader className="p-1.5">
        <CardTitle>Add new blog</CardTitle>
        <CardDescription className="text-muted-foreground">
          Add new blog using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div
              title="Add Photo"
              className=" my-6 overflow-hidden trans rounded-sm grid place-items-center  mx-auto cursor-pointer "
            >
              <label
                htmlFor="photo"
                className="cursor-pointer aspect-video h-52 lg:h-72  w-full overflow-hidden"
              >
                <Image
                  width={100}
                  height={50}
                  src={photo ? URL.createObjectURL(photo) : "/placeholder.jpg"}
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
          <div className="flex flex-col lg:flex-row mb-4 justify-between gap-4">
            <div className="flex flex-col gap-1.5  w-full">
              <Label className="ml-1.5 text-muted-foreground">Author</Label>
              <Input
                placeholder="Mary Jones"
                {...register("author", { required: true })}
                maxLength={30}
              />
              {errors.author && (
                <p className="text-red-500 m-1">{errors.author.message}</p>
              )}
            </div>
          </div>

          <div className="flex justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1.5 w-full">
              <Label className="ml-1.5 text-muted-foreground">Title</Label>
              <Textarea
                {...register("title", { required: true })}
                placeholder="Enter blog title"
              ></Textarea>
              {errors.title && (
                <p className="text-red-500 m-1">{errors.title.message}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1.5 w-full">
            <Label className="ml-1.5 text-muted-foreground">
              Blog Body <span className="text-xs">( Up to 1000 chars )</span>
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

export default BlogForm;
