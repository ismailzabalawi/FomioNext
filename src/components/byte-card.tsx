"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "lucide-react";
import { cn } from "@/lib/utils";

type ByteCardProps = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  snippet: string;
  imageUrl?: string;
  comments: number;
  bookmarks: number;
  teret: string;
  className?: string;
};


const AvatarStack = () => {
    // Using placeholders for the avatar stack to represent engagement
    const participants = [
        { name: "User 1", avatarUrl: "https://placehold.co/40x40.png" },
        { name: "User 2", avatarUrl: "https://placehold.co/40x40.png" },
        { name: "User 3", avatarUrl: "https://placehold.co/40x40.png" },
    ];

    return (
        <div className="flex -space-x-3 overflow-hidden">
            {participants.map((p, index) => (
                 <Avatar key={index} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={p.avatarUrl} alt={p.name} data-ai-hint="profile picture" />
                    <AvatarFallback>{p.name.charAt(0)}</AvatarFallback>
                </Avatar>
            ))}
        </div>
    )
}


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
        <Button asChild size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/80 font-semibold lowercase px-5">
          <Link href={`/byte/${id}`}>view</Link>
        </Button>
        <AvatarStack />
      </CardFooter>
    </Card>
  );
}
