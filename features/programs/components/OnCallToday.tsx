"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { PhoneCall,} from "lucide-react";
import { getOnCalls } from "../actions/getOnCalls";
import { getTodayCall } from "../lib/getTodayCall";

function OnCallToday() {
  const now = new Date();

  const thisMonth = now.getMonth() + 1;
  const thisYear = now.getFullYear();

  const params = {
    month: thisMonth,
    year: thisYear,
  };
  const { data } = useQuery({
    queryKey: [params, "Schedule"],
    queryFn: () => getOnCalls(params),
  });

  if (!data || !data.data || data.data.length === 0) {
    return <span></span>;
  }
  const todayOnCall = getTodayCall(data?.data);
  return (
    <div>
      {todayOnCall && (
        <article className=" py-2 text-center text-sm p-2 group bg-primary  mx-auto text-primary-foreground flex justify-center gap-4 items-center ">
          <PhoneCall className="animate-accordion-up group-hover:animate-bounce size-4" />
          <Link
            href={"/programs"}
            className="cursor-pointer text-xs lg:text-sm font-semibold"
          >
            ON-CALL TODAY
          </Link>
        </article>
      )}
    </div>
  );
}

export default OnCallToday;
