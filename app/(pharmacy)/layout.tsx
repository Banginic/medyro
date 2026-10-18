"use client";
import React, { useState } from "react";
import DeleteDialog from "@/components/share/DeleteDialog";
import { useUIStore } from "@/stores/useUIStore";
import PharmacyNavbar from "@/features/navigation/navbar/PharmacyNavbar";
import PharmacySidebar from "@/features/navigation/sidebar/PharmacySidebar";

function PharmacyLayout({ children }: { children: React.ReactNode }) {
  const [showSidebar, setSidebar] = useState(false);
  const deleteDialogueOpen = useUIStore((state) => state.deleteDialogueOpen);

  return (
    <div className="relative min-h-screen ">
      <>
        {/* DELETE DIALOGUE----------------------------------------------------------------------------- */}
        {deleteDialogueOpen && (
          <div className="inset-0 fixed bg-black/5 backdrop-blur-2xl z-100  overflow-y-scroll  grid place-items-center border">
            <DeleteDialog />
          </div>
        )}
      </>
      <PharmacyNavbar showSidebar={showSidebar} setSidebar={setSidebar} />
      <div className="">
        <PharmacySidebar showSidebar={showSidebar} setSidebar={setSidebar} />
        <div className="bg-background text-foreground  w-full lg:w-[94vw] h-[90dvh] lg:h-[88dvh] fixed top-[10dvh] lg:top-[12dvh] right-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export default PharmacyLayout;
