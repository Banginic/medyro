'use client'
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import CountSkeleton from "./CountSkeleton";
import CountError from "./CountError";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getPharmacyCount } from "@/features/pharmacy/actions/getPharmacyCount";

function PharmacyCount() {
  const pathname = usePathname()
  const { data, isPending, isError } = useQuery({
    queryKey: ["Pharmacy"],
    queryFn: getPharmacyCount,
  });
  if (isPending) return <CountSkeleton />;
  if (isError) return <CountError />;
  return (
   <Link title="Visit Pharmacy" href={`${pathname}/pharmacies`}>
    <Card className="p-4 lg:p-6  bg-emerald-600/90 hover:bg-emerald-600 text-white trans w-full lg:w-68 ">
      <h2 className="text-center  text-4xl lg:text-5xl font-semibold">
        {data?.data}
      </h2>
      <p className=" text-center subtitle ">Pharmacies
       
      </p>
    </Card>
   </Link>
  );
}

export default PharmacyCount;
