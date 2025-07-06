import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ByteCard from "@/components/byte-card";
import { Button } from "@/components/ui/button";

export default function TeretPage({ params }: { params: { id: string } }) {
  const teret = {
    id: params.id,
    name: "Web Dev",
    description: "All things related to web development, from frontend frameworks to backend architecture.",
  };

  const bytes = [
    {
      id: "1",
      author: { name: "Ava", avatarUrl: "https://placehold.co/40x40.png" },
      title: "The Future of Frontend Development",
      teret: "Web Dev"
    },
    {
      id: "7",
      author: { name: "Chris", avatarUrl: "https://placehold.co/40x40.png" },
      title: "Server-Side Rendering vs. Client-Side Rendering",
      teret: "Web Dev"
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" className="mb-4 -ml-4">
          <Link href="/discover">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Discover
          </Link>
        </Button>
        <h1 className="font-headline text-4xl font-bold"># {teret.name}</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">{teret.description}</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {bytes.map((byte) => (
          <ByteCard key={byte.id} {...byte} />
        ))}
      </div>
    </div>
  );
}
