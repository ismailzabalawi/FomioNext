import ByteCard from "@/components/byte-card";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Home() {
  const bytes = [
    {
      id: "1",
      author: { name: "Ava", avatarUrl: "https://placehold.co/40x40.png" },
      title: "The Future of Frontend Development",
      snippet: "Exploring the latest trends in frameworks, tooling, and developer experience that are shaping the future of web development...",
      imageUrl: "https://placehold.co/600x400.png",
      comments: 42,
      bookmarks: 18,
      teret: "Web Dev"
    },
    {
      id: "2",
      author: { name: "Leo", avatarUrl: "https://placehold.co/40x40.png" },
      title: "A Deep Dive into Rust for Systems Programming",
      snippet: "Why Rust's performance and safety guarantees make it a compelling choice for building robust and efficient systems...",
      imageUrl: "https://placehold.co/600x400.png",
      comments: 112,
      bookmarks: 56,
      teret: "Programming"
    },
    {
      id: "3",
      author: { name: "Mia", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Minimalist Design Principles for Modern UIs",
      snippet: "How to create clean, intuitive, and beautiful user interfaces by embracing minimalism and focusing on what matters...",
      imageUrl: "https://placehold.co/600x400.png",
      comments: 23,
      bookmarks: 9,
      teret: "Design"
    },
    {
      id: "4",
      author: { name: "Noah", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Getting Started with Quantum Computing",
      snippet: "A beginner-friendly introduction to the mind-bending world of quantum computing, qubits, and superposition...",
      imageUrl: "https://placehold.co/600x400.png",
      comments: 78,
      bookmarks: 34,
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
