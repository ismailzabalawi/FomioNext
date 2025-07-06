import ByteCard from "@/components/byte-card";
import TeretCard from "@/components/teret-card";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Megaphone, ArrowRight } from "lucide-react";

export default function DiscoverPage() {
  const terets = [
    { name: "Web Dev", description: "All things web development.", bytesCount: 128 },
    { name: "Design", description: "UI, UX, and product design.", bytesCount: 92 },
    { name: "AI & ML", description: "The cutting edge of AI.", bytesCount: 256 },
    { name: "Productivity", description: "Hacks, tools, and systems.", bytesCount: 74 },
  ];

  const bytes = [
    {
      id: "5",
      author: { name: "Zoe", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Is Web3 still relevant in 2024?",
      teret: "Web3",
      imageUrl: "https://placehold.co/600x400.png",
      commentsCount: 3,
    },
    {
      id: "6",
      author: { name: "Alex", avatarUrl: "https://placehold.co/40x40.png" },
      title: "The Art of the Command Line",
      teret: "Productivity",
      link: "https://www.youtube.com/watch?v=zF34dRivLOw",
      commentsCount: 9,
    },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Discover</h1>
        <p className="text-muted-foreground">Explore popular topics and discussions across Fomio.</p>
      </div>

      <Card className="sticky top-20 z-10 bg-card border-primary/20 shadow-lg hover:shadow-primary/20 transition-shadow">
          <Link href="/teret/feedback" className="block p-4 group">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                          <Megaphone className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                          <h3 className="font-headline font-semibold text-card-foreground">Have Feedback?</h3>
                          <p className="text-sm text-muted-foreground">Help us improve Fomio. View posts or share your thoughts.</p>
                      </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
          </Link>
      </Card>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">Trending Terets</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {terets.map((teret) => (
            <TeretCard key={teret.name} {...teret} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-headline text-2xl font-semibold mb-4">Hot Bytes</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {bytes.map((byte) => (
            <ByteCard key={byte.id} {...byte} />
          ))}
        </div>
      </section>
    </div>
  );
}
