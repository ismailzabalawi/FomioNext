"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, BookOpen, Smartphone } from "lucide-react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme()

  const isDark = resolvedTheme === "dark" || resolvedTheme === "dark-amoled";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
           <Sun className={cn("h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all", isDark ? "-rotate-90 scale-0" : "")} />
           <Moon className={cn("absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all", isDark ? "rotate-0 scale-100" : "")} />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
         <DropdownMenuItem onClick={() => setTheme("dark-amoled")}>
          <Smartphone className="mr-2 h-4 w-4" />
          <span>Dark AMOLED</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("reader")}>
           <BookOpen className="mr-2 h-4 w-4" />
           <span>Reader</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
