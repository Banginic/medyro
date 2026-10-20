"use client";

import React from "react";
import { News } from "@/components/index";
import MainNavbar from "@/features/navigation/navbar/MainNavbar";
import OnCallToday from "@/features/programs/components/OnCallToday";
import { useUIStore } from "@/stores/useUIStore";

function MainLayout({ children }: { children: React.ReactNode }) {
  const cartOpen = useUIStore((state) => state.cartOpen);

  return (
    <div
      className={`relative overflow-x-hidden  bg-background text-foreground `}
    >
      <header className="fixed top-0 left-0  right-0 z-100 ">
        <News />
        <div className=" rounded-b-2xl shadow backdrop-blur-2xl bg-[url('/images/geena-bg.png')] bg-cover bg-center ">
          <MainNavbar />
        </div>
      </header>
      <main className="mt-24 z-35">{children}</main>
    </div>
  );
}

export default MainLayout;
