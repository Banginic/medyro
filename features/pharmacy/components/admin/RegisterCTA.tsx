import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RegisterCTA() {
  return (
    <Button asChild>
      <Link href={"/pharmacy/register-pharmacy"}>Register Pharmacy</Link>
    </Button>
  );
}