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

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-4">
      <button onClick={toggleTheme}>
        <PiLampFill
          style={{
            color: theme === "light" ? "black" : "yellow",
            fontSize: "1.5rem",
          }}
        />
      </button>
    </div>
  );
}
