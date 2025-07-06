"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Heart, Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

type ByteCardProps = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  teret: string;
  className?: string;
};

export default function ByteCard({ id, author, title, teret, className }: ByteCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all hover:shadow-xl rounded-2xl", className)}>
      <CardHeader>
        <CardTitle className="font-headline text-xl">
          <Link href={`/byte/${id}`} className="hover:underline">
            {title}
          </Link>
        </CardTitle>
         <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <User className="h-4 w-4" />
            <span>By {author.name} in <span className="font-medium text-primary">{teret}</span></span>
        </div>
      </CardHeader>
      
      <div className="flex-1" />

      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-1">
            <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/80 font-semibold lowercase px-4">
              <Link href={`/byte/${id}`}>reply</Link>
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
                <Heart className="h-5 w-5" />
            </Button>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-primary">
            <Bookmark className="h-5 w-5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
