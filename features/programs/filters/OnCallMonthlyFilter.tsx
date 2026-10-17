"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MONTHS } from "../contants";

function OnCallMonthlyFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [month, setMonth] = useState("");

  const currentMonth = searchParams.get("month");

  function handleRangeChange(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    setMonth(value);

    if (value === "all") {
      params.delete("month");
      return;
    }

    params.set("month", value);

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex flex-col gap-0.5 w-40">
      <div className="flex gap-2">
        <Label className="text-sm text-muted-foreground ml-1">{"Months"}</Label>
      </div>

      <Select value={month} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-full max-w-48 border-ring/20">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectLabel>Intervals</SelectLabel>

            {MONTHS.map((month) => (
              <SelectItem key={month.number} value={month.number.toString()}>
                {month.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default OnCallMonthlyFilter;
