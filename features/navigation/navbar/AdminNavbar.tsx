import React from "react";

import { AlignLeft, ArrowLeft, Bell, MoveLeftIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/providers/ThemeToggle";
import {Logo} from "@/components/index";

function AdminNavbar({
  setSidebar,
  showSidebar,
}: {
  showSidebar: boolean;
  setSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function toggleSidebar() {
    setSidebar(!showSidebar);
  }
  return (
    <header>
      <nav className="h-[10dvh] lg:h-[12dvh] flex bg-muted text-secondary-foreground  justify-between overflow-hidden items-center px-4 lg:px-12 fixed top-0 right-0 left-0">
        <Button onClick={toggleSidebar}  variant={'ghost'} >
          {showSidebar ? <ArrowLeft size={25} /> : <AlignLeft size={35}  />}
        </Button>
        <div className="flex items-center gap-4">
          <Button variant={"ghost"} className="relative">
            <Bell />
            <p className="size-2 rounded-full absolute -top-1 -right-0.5 bg-red-400"></p>
          </Button>
         <div className="flex items-center gap-4">
          <Logo logoSize={120} textSize=""/>
          
        </div>
       
        </div>
      </nav>
    </header>
  );
}

export default AdminNavbar;
