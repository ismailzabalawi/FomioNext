"use client"

import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, MessageCircle } from "lucide-react";
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

export default function ByteCard({ id, author, title, snippet, imageUrl, comments, bookmarks, teret, className }: ByteCardProps) {
  return (
    <Card className={cn("flex flex-col overflow-hidden transition-all hover:shadow-md", className)}>
      {imageUrl && (
        <Link href={`/byte/${id}`} className="block">
          <div className="relative h-48 w-full">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
              data-ai-hint="abstract technology"
            />
          </div>
        </Link>
      )}
      <CardHeader>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint="profile picture" />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{author.name}</p>
            <Badge variant="secondary">{teret}</Badge>
          </div>
        </div>
        <CardTitle className="pt-4 font-headline text-xl">
          <Link href={`/byte/${id}`} className="hover:text-primary">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-muted-foreground">{snippet}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-4 text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <MessageCircle className="size-4" />
            <span className="text-sm">{comments}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Bookmark className="size-4" />
            <span className="text-sm">{bookmarks}</span>
          </div>
        </div>
        <Button asChild variant="secondary" size="sm">
          <Link href={`/byte/${id}`}>Read More</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
