'use client'
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CountSkeleton from "./CountSkeleton";
import CountError from "./CountError";
import { getMessageCount } from "@/features/contact/actions/getMessageCount";
import { usePathname } from "next/navigation";
import Link from "next/link";

function MessageCount() {
  const pathname = usePathname()
  const { data, isPending, isError } = useQuery({
    queryKey: ["Message"],
    queryFn: getMessageCount,
  });
  if (isPending) return <CountSkeleton />;
  if (isError) return <CountError />;
  return (
   <Link title="Visit messages" href={`${pathname}/messages`}>
    <Card className="p-4 lg:p-6  bg-indigo-600/90 hover:bg-indigo-600 text-white trans w-full lg:w-68 ">
      <h2 className="text-center  text-4xl lg:text-5xl font-semibold">
        {data?.data}
      </h2>
      <p className=" text-center subtitle ">Messages
       
      </p>
    </Card>
   </Link>
  );
}

export default MessageCount;
