import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Bookmark, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function BytePage({ params }: { params: { id: string } }) {
  const byte = {
    id: params.id,
    author: { name: "Ava", avatarUrl: "https://placehold.co/40x40.png" },
    title: "The Future of Frontend Development",
    imageUrl: "https://placehold.co/1200x600.png",
    teret: "Web Dev",
    createdAt: "2 days ago",
    content: `
      <p>The world of frontend development is in a constant state of flux. New frameworks, libraries, and tools emerge at a breathtaking pace, promising to solve old problems in new ways. In this post, we'll explore some of the key trends that are shaping the future of how we build for the web.</p>
      <p><strong>The Rise of Meta-Frameworks:</strong> Frameworks like Next.js, Nuxt, and SvelteKit are no longer just view libraries; they are full-stack solutions that handle everything from routing and data fetching to server-side rendering and static site generation. This consolidation simplifies the developer experience and leads to more performant and robust applications.</p>
      <p><strong>Utility-First CSS and Design Systems:</strong> The popularity of Tailwind CSS has signaled a shift towards utility-first approaches. This, combined with component-based design systems (e.g., Shadcn/ui, Radix), allows for rapid UI development while maintaining consistency and scalability. The focus is moving from writing custom CSS to composing UIs from a predefined set of primitives.</p>
      <p><strong>Edge Computing:</strong> Pushing logic to the edge, closer to users, is a game-changer for performance. Services like Vercel Edge Functions, Cloudflare Workers, and Deno Deploy allow developers to run server-side code with minimal latency, unlocking new possibilities for dynamic, personalized experiences without compromising on speed.</p>
      <p>What are your thoughts on these trends? Are there any other major shifts you see on the horizon? Let's discuss in the comments below.</p>
    `,
  };

  const comments = [
    { id: 1, author: { name: "Leo", avatarUrl: "https://placehold.co/40x40.png" }, content: "Great overview! The move towards meta-frameworks has been a huge productivity booster for my team." },
    { id: 2, author: { name: "Mia", avatarUrl: "https://placehold.co/40x40.png" }, content: "I'm particularly excited about edge computing. The performance gains are incredible for global applications." },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <Button asChild variant="ghost" className="mb-4 -ml-4">
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
      </Button>

      <article className="space-y-6">
        <header className="space-y-3">
          <Badge variant="secondary">{byte.teret}</Badge>
          <h1 className="font-headline text-4xl font-bold tracking-tight">{byte.title}</h1>
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Avatar className="h-8 w-8">
              <AvatarImage src={byte.author.avatarUrl} alt={byte.author.name} />
              <AvatarFallback />
            </Avatar>
            <span>{byte.author.name}</span>
            <span>&middot;</span>
            <span>{byte.createdAt}</span>
          </div>
        </header>

        {byte.imageUrl && (
          <div className="relative h-96 w-full overflow-hidden rounded-lg">
            <Image src={byte.imageUrl} alt={byte.title} fill className="object-cover" data-ai-hint="futuristic city" />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert" dangerouslySetInnerHTML={{ __html: byte.content }} />

        <div className="flex items-center gap-4 pt-4">
          <Button variant="outline"><MessageCircle className="mr-2 h-4 w-4" /> Reply</Button>
          <Button variant="ghost"><Bookmark className="mr-2 h-4 w-4" /> Bookmark</Button>
        </div>
      </article>

      <Separator className="my-12" />

      <section className="space-y-8">
        <h2 className="font-headline text-2xl font-semibold">Comments ({comments.length})</h2>

        <div className="space-y-6">
          <Card className="rounded-2xl">
            <CardHeader>
              <div className="flex items-center gap-3">
                 <Avatar>
                    <AvatarImage src="https://placehold.co/40x40.png" alt="Your avatar" />
                    <AvatarFallback />
                  </Avatar>
                  <p className="font-semibold">Your Name</p>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add to the discussion..." />
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button>Post Comment</Button>
            </CardFooter>
          </Card>


          {comments.map(comment => (
            <Card key={comment.id} className="rounded-2xl">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={comment.author.avatarUrl} alt={comment.author.name} />
                    <AvatarFallback />
                  </Avatar>
                  <p className="font-semibold">{comment.author.name}</p>
                </div>
              </CardHeader>
              <CardContent>
                <p>{comment.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
