"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  link: string;
  name: string;
}

function Back({ link, name }: Props) {
  const router = useRouter();

  return (
    <Button
      onClick={() => router.back()}
      variant={"ghost"}
      className="fixed text-sm gap-1 mx-2 px-5 py-4  z-50 top-[23.5dvh] left-0 lg:left-[6vw]
         rounded-md h-6 lg:gap-1 items-center cursor-pointer"
    >
      <ChevronLeft />
      <span className=" hidden lg:inline">Back</span>
    </Button>
  );
}

export default Back;
