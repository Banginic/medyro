"use client";
import AuthjsSessionProvider from "@/providers/AuthjsSessionProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ThemeProvider } from "next-themes";
import React from "react";
import { ToastContainer } from "react-toastify";

export default function ProviderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <ToastContainer />
      {/* <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      > */}
        <QueryProvider>
          <AuthjsSessionProvider>{children}</AuthjsSessionProvider>
        </QueryProvider>
      {/* </ThemeProvider> */}
    </>
  );
}
