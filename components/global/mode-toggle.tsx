"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <Button
      size="sm"
      variant="ghost"
      className="hover:cursor-pointer"
      onClick={toggleTheme}
    >
      <SunIcon className="hidden size-4 text-orange-300 dark:inline" />
      <MoonIcon className="inline size-4 text-sky-950 dark:hidden" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
