"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { PiLampFill } from "react-icons/pi";

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setTheme("light")}>
        <PiLampFill style={{ color: theme === "light" ? "yellow" : "gray" }} />{" "}
        {/* Light Mode */}
      </button>
      <button onClick={() => setTheme("dark")}>
        <PiLampFill style={{ color: theme === "dark" ? "yellow" : "gray" }} />{" "}
        {/* Dark Mode */}
      </button>
    </div>
  );
}
