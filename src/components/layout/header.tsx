"use client";

import { useState, useEffect } from "react";
import { Search, MessagesSquare, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollContainer = document.getElementById("main-scroll-container");
    if (!scrollContainer) return;

    const handleScroll = () => {
      const isScrolled = scrollContainer.scrollTop > 10;
      setScrolled(isScrolled);
      if (!isScrolled) {
        setSearchVisible(false);
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, []);
  
  const handleSearchClick = () => {
    setSearchVisible(true);
    setTimeout(() => {
        const searchInput = document.getElementById('header-search');
        if (searchInput) {
            searchInput.focus();
        }
    }, 0);
  }

  const showFeedbackButton = pathname === '/discover' && scrolled && !searchVisible;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <Link href="/" className="sm:hidden">
          <MessagesSquare className="h-6 w-6 text-primary" />
      </Link>
      
      <div className="flex flex-1 items-center justify-end sm:justify-center">
        <div className="relative h-10 w-full max-w-lg">
          <div 
              className={cn(
                "absolute inset-0 transition-opacity duration-300",
                (!scrolled || searchVisible) ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
              onBlur={(e) => {
                if (scrolled && !e.currentTarget.contains(e.relatedTarget)) {
                    setSearchVisible(false);
                }
              }}
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="header-search"
              placeholder="Search Fomio..."
              className="w-full rounded-full bg-muted pl-9"
              tabIndex={(!scrolled || searchVisible) ? 0 : -1}
            />
          </div>
          
          <div className={cn(
            "absolute right-0 top-0 flex items-center transition-opacity duration-300",
            (scrolled && !searchVisible) ? "opacity-100" : "opacity-0 pointer-events-none"
          )}>
            <AnimatePresence>
              {showFeedbackButton && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                >
                  <Button asChild variant="ghost" size="icon" className="rounded-full">
                    <Link href="/teret/feedback">
                      <Megaphone className="h-5 w-5 text-primary" />
                    </Link>
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={handleSearchClick}
              tabIndex={(scrolled && !searchVisible) ? 0 : -1}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
