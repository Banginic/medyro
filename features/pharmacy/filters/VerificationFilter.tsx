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
import { VerificationStatusEnum } from "../types";
import { capitalize } from "@/lib/capitalize";

function VerificationFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const verification = searchParams.get("verificationStatus") || "";

  function updateVerification(verificationStatus: string) {
   const params = new URLSearchParams(searchParams.toString());

    params.delete("query");
    params.delete("page");

    if (verificationStatus !== 'all') {
      params.set("verificationStatus", verificationStatus);
    } else {
      params.delete("verificationStatus");
    }

    router.replace(`${pathname}?${params.toString()}`);

  }

  return (
    <div className="flex gap-2 flex-wrap">
      <div className="flex flex-col gap-0.5 w-40">
        <Label className="text-sm text-muted-foreground ml-1">
          Verification
        </Label>

        <Select value={verification} onValueChange={updateVerification}>
          <SelectTrigger className="w-full max-w-48 border-ring/20">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="all">All</SelectItem>
              {VerificationStatusEnum.map((r) => (
                <SelectItem key={r} value={r}>
                  {capitalize(r)}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default VerificationFilter;
