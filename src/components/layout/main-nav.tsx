"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Home, Compass, User, Settings, PenSquare, Bell, MessagesSquare } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/discover", label: "Discover", icon: Compass },
  { href: "/byte/new", label: "Create", icon: PenSquare },
  { href: "/notifications", label: "Notifications", icon: Bell },
  { href: "/profile", label: "Profile", icon: User },
];

const settingsLink = { href: "/settings", label: "Settings", icon: Settings };

export default function MainNav() {
  const pathname = usePathname();
  const desktopNavLinks = navLinks.filter(link => link.href !== '/byte/new');
  const createLink = navLinks.find(link => link.href === '/byte/new')!;

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-16 flex-col items-center border-r bg-background py-6 sm:flex">
        <TooltipProvider>
          <Link href="/" className="mb-6">
            <MessagesSquare className="h-6 w-6 text-primary" />
          </Link>
          <nav className="flex flex-1 flex-col items-center gap-2">
            {desktopNavLinks.map((item) => (
              <Tooltip key={item.href}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: (pathname.startsWith(item.href) && item.href !== "/") || pathname === item.href ? "secondary" : "ghost",
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
                    href={createLink.href} 
                    className={cn(buttonVariants({ variant: 'default', size: 'icon' }), "mt-4")}>
                    <createLink.icon className="h-5 w-5" />
                    <span className="sr-only">{createLink.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{createLink.label}</TooltipContent>
              </Tooltip>
          </nav>
          <div className="mt-auto flex flex-col items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={settingsLink.href}
                    className={cn(
                      buttonVariants({
                        variant: pathname.startsWith(settingsLink.href) ? "secondary" : "ghost",
                        size: "icon",
                      }),
                      "h-10 w-10"
                    )}
                  >
                    <settingsLink.icon className="h-5 w-5" />
                    <span className="sr-only">{settingsLink.label}</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">{settingsLink.label}</TooltipContent>
              </Tooltip>
          </div>
        </TooltipProvider>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm sm:hidden">
        <div className="grid h-16 grid-cols-5 items-center">
            {navLinks.map((link) => {
                const isActive = (pathname.startsWith(link.href) && link.href !== "/") || pathname === link.href;
                const Icon = link.icon;

                if (link.href === createLink.href) {
                    return (
                        <Link key={link.href} href={link.href} className="flex justify-center">
                            <div className={cn(
                                buttonVariants({ variant: 'default', size: 'icon' }),
                                "h-12 w-12 rounded-2xl shadow-lg"
                            )}>
                                <Icon className="h-6 w-6" />
                                <span className="sr-only">{link.label}</span>
                            </div>
                        </Link>
                    );
                }

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                            "flex h-full w-full flex-col items-center justify-center gap-1 rounded-md p-1 transition-colors",
                            isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <Icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{link.label}</span>
                    </Link>
                );
            })}
        </div>
      </nav>
    </>
  );
}
