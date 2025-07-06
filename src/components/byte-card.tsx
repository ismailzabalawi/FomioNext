"use client"

import Link from "next/link";
import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Bookmark, Link2, MessageCircle, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, useMotionValue, useTransform } from "framer-motion";

type LinkPreview = {
    title: string;
    description?: string;
    image?: string;
    favicon?: string;
    siteName?: string;
};

type ByteCardProps = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
  };
  title: string;
  teret: string;
  imageUrl?: string;
  link?: string;
  linkPreview?: LinkPreview | null;
  className?: string;
  commentsCount?: number;
};

// Helper function to extract YouTube video ID from various URL formats
const getYouTubeId = (url: string) => {
    try {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = url.match(regExp);
      if (match && match[2].length === 11) {
          return match[2];
      }
    } catch (e) {
      return null;
    }
    return null;
};

export default function ByteCard({ id, author, title, teret, imageUrl, link, linkPreview, className, commentsCount }: ByteCardProps) {
  const youTubeId = link ? getYouTubeId(link) : null;
  const isGenericLink = link && !youTubeId;

  let displayUrl = '';
  if (link) {
    try {
        displayUrl = linkPreview?.siteName || new URL(link).hostname.replace(/^www\./, '');
    } catch (e) {
        displayUrl = link;
    }
  }

  const x = useMotionValue(0);

  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const likeScale = useTransform(x, [0, 100], [0.5, 1.2]);

  const bookmarkOpacity = useTransform(x, [0, -100], [0, 1]);
  const bookmarkScale = useTransform(x, [0, -100], [0.5, 1.2]);

  function handleDragEnd(event: any, info: any) {
    if (info.offset.x > 120) {
      console.log("Liked byte:", id);
      // Here you would typically trigger a toast or an API call
    } else if (info.offset.x < -120) {
      console.log("Bookmarked byte:", id);
      // Here you would typically trigger a toast or an API call
    }
  }

  return (
    <div className="relative">
      <motion.div
        style={{ opacity: likeOpacity, scale: likeScale }}
        className="absolute inset-y-0 left-0 flex items-center pl-6"
      >
        <Heart className="h-10 w-10 text-primary/80 fill-primary/80" />
      </motion.div>
      <motion.div
        style={{ opacity: bookmarkOpacity, scale: bookmarkScale }}
        className="absolute inset-y-0 right-0 flex items-center pr-6"
      >
        <Bookmark className="h-10 w-10 text-primary/80 fill-primary/80" />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        style={{ x }}
        onDragEnd={handleDragEnd}
        className="relative z-10"
      >
        <Card className={cn("flex flex-col overflow-hidden transition-all hover:shadow-xl rounded-2xl bg-card", className)}>
          {imageUrl && (
            <Link href={`/byte/${id}`} className="block relative aspect-video">
                <Image src={imageUrl} alt={title} fill className="object-cover" data-ai-hint="abstract illustration" />
            </Link>
          )}

          {!imageUrl && youTubeId && (
            <div className="relative aspect-video bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${youTubeId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              ></iframe>
            </div>
          )}

          {!imageUrl && isGenericLink && link && (
            <Link href={link} target="_blank" rel="noopener noreferrer" className="block relative aspect-video bg-muted transition-colors hover:bg-muted/80">
                {linkPreview && linkPreview.title ? (
                    <div className="relative h-full w-full text-left bg-slate-900">
                        {linkPreview.image && <img src={linkPreview.image} alt={linkPreview.title} className="w-full h-full object-cover opacity-50" data-ai-hint="website preview" />}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-4 text-white w-full">
                            {linkPreview.favicon && <img src={linkPreview.favicon} width={20} height={20} alt="" className="rounded mb-2 bg-white p-0.5" data-ai-hint="website favicon" />}
                            <h3 className="font-bold leading-tight line-clamp-2">{linkPreview.title}</h3>
                            {linkPreview.description && <p className="text-sm text-white/90 line-clamp-1 mt-1">{linkPreview.description}</p>}
                        </div>
                    </div>
                ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center">
                        <Link2 className="h-10 w-10 shrink-0 text-muted-foreground" />
                        <p className="mt-2 w-full truncate font-semibold text-foreground">{displayUrl}</p>
                        <p className="mt-1 text-xs text-muted-foreground">Click to visit external site</p>
                    </div>
                )}
            </Link>
          )}

          <CardHeader>
            <CardTitle className="font-headline text-xl">
              <Link href={isGenericLink ? (link ?? `/byte/${id}`) : `/byte/${id}`} className="hover:underline" target={isGenericLink ? '_blank' : '_self'} rel={isGenericLink ? 'noopener noreferrer' : ''}>
                {title}
              </Link>
            </CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src={author.avatarUrl} alt={author.name} data-ai-hint="profile picture" />
                  <AvatarFallback><User className="size-4" /></AvatarFallback>
                </Avatar>
                <span>By {author.name} in <span className="font-medium text-primary">{teret}</span></span>
            </div>
          </CardHeader>
          
          <div className="flex-1" />

          <CardFooter className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <Link href={`/byte/${id}`} className={cn(buttonVariants({ variant: 'ghost' }), "rounded-full h-10 px-3 text-muted-foreground transition-all hover:scale-110 hover:text-primary hover:drop-shadow-md flex items-center gap-1.5")}>
                    <MessageCircle className="h-6 w-6" strokeWidth={2.25} />
                    {commentsCount !== undefined && <span className="font-semibold text-sm">{commentsCount}</span>}
                </Link>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground transition-all hover:scale-110 hover:text-primary hover:drop-shadow-md">
                    <Heart className="h-6 w-6" strokeWidth={2.25} />
                </Button>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground transition-all hover:scale-110 hover:text-primary hover:drop-shadow-md">
                <Bookmark className="h-6 w-6" strokeWidth={2.25} />
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
