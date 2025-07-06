import ByteCard from "@/components/byte-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const bytes = [
    {
      id: "1",
      author: { name: "Ava", avatarUrl: "https://placehold.co/40x40.png" },
      title: "The Future of Frontend Development",
      teret: "Web Dev"
    },
    {
      id: "2",
      author: { name: "Leo", avatarUrl: "https://placehold.co/40x40.png" },
      title: "A Deep Dive into Rust for Systems Programming",
      teret: "Programming"
    },
    {
      id: "3",
      author: { name: "Mia", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Minimalist Design Principles for Modern UIs",
      teret: "Design"
    },
    {
      id: "4",
      author: { name: "Noah", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Getting Started with Quantum Computing",
      teret: "Science"
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Home Feed</h1>
        <p className="text-muted-foreground">The latest and greatest from the Fomio community.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {bytes.map((byte) => (
          <ByteCard key={byte.id} {...byte} />
        ))}
      </div>
    </div>
  );
}
