import { Button } from "@/components/ui/button";
import {
  BookCheck,
  Briefcase,
  ChevronDown,
  Church,
  Hospital,
  Info,
  Mail,
  NewspaperIcon,
} from "lucide-react";
import Link from "next/link";

function CompanyDropDown() {
  return (
    <li className="group relative flex cursor-pointer gap-1.5 items-center trans">
      <button
        aria-haspopup="true"
        aria-expanded="false"
        className=" text-muted-foreground group-hover:text-muted-foreground focus:outline-none flex items-center gap-1.5"
      >
        Pharmacy
        <ChevronDown className=" text-foreground  group-hover:rotate-180 group-hover:mt-2 trans  size-4" />
      </button>

      <div className="p-3 hidden border space-y-2 group-hover:block group-focus-within:block font-normal w-32 text-left px-3 absolute top-6 rounded bg-card backdrop-blur-sm z-100">
        <Button
          asChild
          variant={"secondary"}
          className="w-full justify-between"
        >
          <Link href={"/about-us"} className="pt-1 ">
            <Hospital />
            About
          </Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="w-full justify-between"
        >
          <Link href={"/contact-us"} className="pt-1  ">
            <Mail />
            Contact
          </Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="w-full justify-between"
        >
          <Link href={"/blogs"} className="pt-1  ">
            <BookCheck />
            Blogs
          </Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="w-full justify-between"
        >
          <Link href={"/news"} className="pt-1  ">
            <NewspaperIcon />
            News
          </Link>
        </Button>
        <Button
          asChild
          variant={"secondary"}
          className="w-full justify-between"
        >
          <Link href={"/career"} className="pt-1  ">
            <Briefcase />
            Career
          </Link>
        </Button>
      </div>
    </li>
  );
}

export default CompanyDropDown;
