"use client";
import { signOut } from "next-auth/react";
import React from "react";

function AdminLogOutButton({ children }: { children?: React.ReactNode }) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      
    >
      {children || "Log Out"}
    </button>
  );
}

export default AdminLogOutButton;
