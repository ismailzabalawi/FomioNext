"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Compass, User, Settings, PenSquare, Bell } from "lucide-react";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

const bottomNavItems = [
    { href: "/settings", label: "Settings", icon: Settings },
];

const FomioIcon = () => (
  <svg role="img" viewBox="0 0 24 24" className="h-6 w-6 fill-current">
    <title>Fomio</title>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" />
  </svg>
)

export default function MainNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-16 flex-col items-center border-r bg-background py-6 sm:flex">
      <TooltipProvider>
        <Link href="/" className="mb-6">
          <FomioIcon />
        </Link>
        <nav className="flex flex-1 flex-col items-center gap-2">
          {navItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: pathname.startsWith(item.href) && item.href !== "/" || pathname === item.href ? "secondary" : "ghost",
                      size: "icon",
                    }),
                    "h-10 w-10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
           <Tooltip>
              <TooltipTrigger asChild>
                <Link 
                  href="/byte/new" 
                  className={cn(buttonVariants({ variant: 'default', size: 'icon' }), "mt-4")}>
                  <PenSquare className="h-5 w-5" />
                  <span className="sr-only">Create Byte</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Create Byte</TooltipContent>
            </Tooltip>
        </nav>
        <div className="mt-auto flex flex-col items-center gap-2">
            {bottomNavItems.map((item) => (
            <Tooltip key={item.href}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    buttonVariants({
                      variant: pathname.startsWith(item.href) ? "secondary" : "ghost",
                      size: "icon",
                    }),
                    "h-10 w-10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{item.label}</TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </aside>
  );
}
