import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "./ui/button";
import { Hash } from "lucide-react";

type TeretCardProps = {
  name: string;
  description: string;
  bytesCount: number;
};

export default function TeretCard({ name, description, bytesCount }: TeretCardProps) {
  const slug = name.toLowerCase().replace(/\s+/g, '-');
  return (
    <Card className="flex flex-col justify-between transition-all hover:shadow-md">
      <CardHeader>
        <CardTitle className="font-headline text-lg flex items-center gap-2">
          <Hash className="size-5 text-primary" />
          {name}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <div className="px-6 pb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{bytesCount} Bytes</p>
        <Button asChild variant="outline" size="sm">
          <Link href={`/teret/${slug}`}>Explore</Link>
        </Button>
      </div>
    </Card>
  );
}
