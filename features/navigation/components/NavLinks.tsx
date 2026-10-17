"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import CompanyDropDown from "./CompanyDropDown";


interface Props {
  label: string;
  href: string;
}

function Navlinks({ navlinks }: { navlinks: Props[] }) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex items-center  px-4 py-2  justify-between space-x-2">
      {navlinks?.map((item) => {
        const isActive =
          pathname === item.href || pathname?.startsWith(item.href + "/");

        return (
          <Link
            href={item.href}
            key={item.label}
            className={`px-3 py-1 rounded-md font-medium  transition-colors ${
              isActive
                ? "text-primary bg-green-500/10 font-semibold  backdrop-blur-2xl"
                : "text-muted-foreground hover:text-foreground page-text"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
      <CompanyDropDown />
    </div>
  );
}

export default Navlinks;