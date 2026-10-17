"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { NavlinkTypes } from "../types";
import { useUIStore } from "@/stores/useUIStore";

function Sidebar({ navlinks }: { navlinks: NavlinkTypes[] }) {
  const pathname = usePathname();
  const sidebarOpen = useUIStore((state) => state.sidebarOpen);
  const closeSidebar = useUIStore((state) => state.closeSidebar);

  return (
    <aside
      className={`${
        sidebarOpen ? "fixed" : "hidden"
      } lg:hidden inset-0 h-screen overflow-y-scrol z-100 bg-card  p-6 `}
      onClick={closeSidebar}
    >
      {/* Close Button */}
      <button
        aria-label="Close Menu"
        onClick={closeSidebar}
        className="lg:hidden cursor-pointer hover:bg-muted/10 trans absolute top-4 right-4  rounded p-1 "
      >
        <X size={32} />
      </button>

      {/* Links */}
      <div className="flex justify-center gap-4 flex-col my-12 text-center">
        {navlinks.map(({ href, label, Icon }) => {
          // Check if this link is active
          const isActive =
            pathname === href || pathname?.startsWith(href + "/");

          return (
            <Link
              href={href}
              key={href}
              onClick={closeSidebar}
              className={`w-[80%] mx-auto text-center text-[1rem] font-medium transition rounded-md ${
                isActive
                  ? "text-primary-foreground bg-primary font-semibold"
                  : "hover:bg-primary/10 text-foreground "
              }`}
            >
              <div className="flex items-center justify-start px-4 gap-5 py-2">
                <Icon />
                <p className="">{label}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Sidebar;
