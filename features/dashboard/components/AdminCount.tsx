"use client";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CountSkeleton from "./CountSkeleton";
import CountError from "./CountError";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getUserCount } from "@/features/auth/actions/getUserCount";

function AdminCount() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["User"],
    queryFn: getUserCount,
  });
  const pathname = usePathname();
  if (isPending) return <CountSkeleton />;
  if (isError) return <CountError />;
  return (
    <Link href={`${pathname}/admin-users`}>
      <Card
        title="Visit admins"
        className="p-4 bg-gray-600/90 hover:bg-gray-600 text-white lg:p-6 w-full lg:w-68 "
      >
        <h2 className="text-center text-4xl lg:text-5xl font-semibold">
          {data?.data}
        </h2>
        <p className=" text-center subtitle ">Users</p>
      </Card>
    </Link>
  );
}

export default AdminCount;
