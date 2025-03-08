"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ThemeToggler() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-hover ml-4 h-7 w-1/4 animate-pulse rounded-sm"></div>
    );
  }

  return (
    <>
      {theme === "dark" && (
        <button
          onClick={() => setTheme("light")}
          className="hover:bg-hover flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground transition-colors"
        >
          <Moon className="size-5 stroke-muted-foreground" />
          Dark
        </button>
      )}
      {theme === "light" && (
        <button
          onClick={() => setTheme("dark")}
          className="hover:bg-hover flex w-full items-center gap-3 px-4 py-2 text-sm text-muted-foreground transition-colors"
        >
          <Sun className="size-5 stroke-muted-foreground" />
          Light
        </button>
      )}
    </>
  );
}
