"use client";
import Link from "next/link";
import { Logo } from "@/components/index";
import Navlinks from "../components/NavLinks";
import Hamburger from "../components/Hamburger";
import Sidebar from "../sidebar/Sidebar";
import { mainNavlinks, mainSidelinks } from "../contant";
import { Button } from "@/components/ui/button";
import LanguagesToggler from "../components/LanguagesToggler";

function MainNavbar() {
  return (
    <div className="max-w-7xl mx-auto h-[8dvh] lg:h-[12dvh] flex py-10 items-center relative  ">
      <nav
        className={`flex items-center justify-between lg:justify-around   px-4 lg:p-6 w-full`}
      >
        <Link href={"/"}>
          <Logo textSize="lg:text-xl" logoSize={45} />
        </Link>

        <Navlinks navlinks={mainNavlinks} />

        <div
          className={` px-4 py-1.5 lg:px-2  bg-card border rounded-full flex items-center gap-4 lg:gap-6`}
        >
          {" "}
          <LanguagesToggler />
          <Button size="sm" className=" lg:hidden" asChild>
            <Link href={"/auth/sign-in"}>Login</Link>
          </Button>
          <Button
            variant={"outline"}
            className="hidden lg:flex "
            size={"sm"}
            asChild
          >
            <Link href={"/auth/sign-in"}>Login</Link>
          </Button>
          <Button className="hidden lg:flex" size={"sm"} asChild>
            <Link href={"/auth/sign-up"}>Register Pharmacy</Link>
          </Button>
          <Hamburger />
        </div>
      </nav>
      <div>
        <Sidebar navlinks={mainSidelinks} />
      </div>
    </div>
  );
}

export default MainNavbar;
