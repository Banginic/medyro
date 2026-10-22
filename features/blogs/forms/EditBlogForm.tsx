import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dispatch, SetStateAction } from "react";
import { LoadingBTN } from "@/components/index";
import { CircleOff, RotateCcw, Save, X } from "lucide-react";
import { useMutate } from "@/hooks/useMutate";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BlogType, BlogTypes } from "../types";
import { EditBlogSchema, EditBlogSchemaType } from "../schemas/editBlogSchema";
import { updateBlog } from "../actions/updateBlog";

function EditBlogForm({
  closeForm,
  blog,
}: {
  blog: BlogType;
  closeForm: Dispatch<SetStateAction<boolean>>;
}) {
  function handleSubmitSuccess() {
    reset();
    closeForm(false);
  }

  const { mutate, isPending } = useMutate<BlogTypes, EditBlogSchemaType>({
    mutationFn: updateBlog,
    queriesToInvalidate: [ [blog.id]],
    handleSubmitSuccess,
  });

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<EditBlogSchemaType>({
    resolver: zodResolver(EditBlogSchema),
    defaultValues: {
      blogId: blog.id,
      title: blog.title,
      author: blog.author,
      body: blog.body,
    },
  });

  const onSubmit = async (data: EditBlogSchemaType) => {
    mutate(data);
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
        <CardTitle>Edit blog</CardTitle>
        <CardDescription className="text-muted-foreground">
          Edit blog using the form below.
        </CardDescription>
      </CardHeader>
      <>
        <form className="mt-4 " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row mb-4 justify-between gap-4">
            <Input {...register("blogId", { required: true })} hidden />
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
              size={"sm"}
              type="button"
              onClick={() => reset()}
              title="Reset form"
              variant="secondary"
            >
              <RotateCcw />
              Reset
            </Button>
            <Button size={"sm"} disabled={isPending} type="submit">
              {isPending ? (
                <div>
                  <LoadingBTN message="Saving..." />
                </div>
              ) : (
                <>
                  <Save />
                  Update
                </>
              )}
            </Button>
          </div>
        </form>
      </>
    </Card>
  );
}

export default EditBlogForm;
