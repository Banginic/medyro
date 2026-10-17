"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, []);
  if (!mounted) return null;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
     
      onClick={toggleTheme}
      className="p-1.5 rounded-full cursor-pointer hover:text-foreground "
    >
      {theme === "dark" ? (
        <Sun className="text-xl text-foreground hover:animate-spin"  />
      ) : (
        <Moon className="size-xl  hover:animate-pulse" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
