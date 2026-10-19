'use client'
import {
  House,
  LogOut,
  Settings,
  Timer,
  Wallet,
  User,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import AdminLogOutButton from "@/auth/AdminLogOutButton";
import { usePathname } from "next/navigation";

function PharmacySidebar({
  showSidebar,
  setSidebar,
}: {
  showSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
const pathname = usePathname()

  const SIDELINKS = [
    { name: "Dashboard", Icon: House, href: `/pharmacy` },
    { name: "Account", Icon: User, href: `/pharmacy/account`  },
    { name: "Programs", Icon: Timer, href: `/pharmacy/programs` },
    { name: "Billing", Icon: Wallet, href: `/pharmacy/billing` },
  ] as const;

  function closeSidebar() {
    setSidebar(false);
  }

  return (
    <section
      className={`bg-muted text-secondary-foreground  ${
        showSidebar ? "w-[45vw]" : "w-0 hidden lg:block"
      } ${
        showSidebar ? "lg:w-[17vw] 2xl:w-[14vw] block" : "lg:w-[6vw] block"
      }  h-[90dvh] z-50 lg:h-[88dvh] fixed top-[10dvh] lg:top-[12dvh]  py-4 overflow-y-scroll`}
    >
      <div className="flex flex-col justify-between  h-full w-full">
        <div className="flex flex-col gap-1">
          {SIDELINKS.map(({ name, Icon, href }) => (
            <Link
              title={name}
              href={href}
              key={name}
              onClick={closeSidebar}
              className={`flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 ${
                pathname === href
                  ? " bg-primary text-primary-foreground font-semibold "
                  : ""
              } ${
                showSidebar && pathname === href
                  ? "bg-accent shadow w-[95%] rounded mx-0 "
                  : " hover:bg-accent-foreground/20 w-[95%] rounded mx-0"
              } `}
            >
              <Icon size={22} className="" />
              <span
                className={`${
                  !showSidebar && "lg:hidden"
                } text-[14px] 2xl:text-sm`}
              >
                {name}
              </span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col  gap-1 ">
          <Link
            href={`/pharmacy/settings`}
             onClick={closeSidebar}
            className="flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 "
          >
            <Settings size={22} />
            <span
              className={`${
                !showSidebar && "lg:hidden"
              } text-[14px] 2xl:text-sm`}
            >
              Settings
            </span>
          </Link>
           <AdminLogOutButton>
            <Link
              href={""}
              onClick={closeSidebar}
              className="flex items-center gap-4 flex-nowrap px-4 2xl:px-9 py-2 "
            >
              <LogOut size={22} />
              <span
                className={`${
                  !showSidebar && "lg:hidden"
                } text-[14px] 2xl:text-sm`}
              >
                Log out
              </span>
            </Link>
          </AdminLogOutButton>
        </div>
      </div>
    </section>
  );
}

export default PharmacySidebar;
