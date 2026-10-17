"use client";
import { Menu } from "lucide-react";
import { useUIStore } from "@/stores/useUIStore";

function Hamburger() {
  const openSidebar = useUIStore((state) => state.openSidebar);

  return (
    <button
      aria-label="Open Menu"
      onClick={openSidebar}
      className="lg:hidden cursor-pointer hover:bg-white/10 trans rounded p-1 "
    >
      <Menu size={32} className="" />
    </button>
  );
}

export default Hamburger;
