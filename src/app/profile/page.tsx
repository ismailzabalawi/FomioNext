import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ByteCard from "@/components/byte-card";
import TeretCard from "@/components/teret-card";

export default function ProfilePage() {
  const user = {
    name: "Alex Doe",
    username: "alexdoe",
    avatarUrl: "https://placehold.co/128x128.png",
    bio: "Frontend Developer & UI/UX enthusiast. Building the future of the web, one component at a time. Opinions are my own.",
  };

  const userBytes = [
    {
      id: "6",
      author: { name: "Alex", avatarUrl: "https://placehold.co/40x40.png" },
      title: "The Art of the Command Line",
      snippet: "Unlock the hidden power of your terminal with these essential commands and workflows...",
      imageUrl: "https://placehold.co/600x400.png",
      comments: 154,
      bookmarks: 72,
      teret: "Productivity"
    },
  ];

  const followedTerets = [
    { name: "Web Dev", description: "All things web development.", bytesCount: 128 },
    { name: "Design", description: "UI, UX, and product design.", bytesCount: 92 },
  ];

  return (
    <div className="space-y-8">
      <Card>
        <CardContent className="p-6 flex flex-col sm:flex-row items-center gap-6">
          <Avatar className="h-32 w-32 border-4 border-background shadow-md">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 text-center sm:text-left">
            <h1 className="font-headline text-3xl font-bold">{user.name}</h1>
            <p className="text-muted-foreground">@{user.username}</p>
            <p className="mt-2 max-w-xl">{user.bio}</p>
          </div>
          <Button asChild>
            <Link href="/settings">Edit Profile</Link>
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="bytes">
        <TabsList className="grid w-full grid-cols-2 sm:w-96">
          <TabsTrigger value="bytes">My Bytes</TabsTrigger>
          <TabsTrigger value="terets">Followed Terets</TabsTrigger>
        </TabsList>
        <TabsContent value="bytes" className="mt-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {userBytes.length > 0 ? (
              userBytes.map((byte) => <ByteCard key={byte.id} {...byte} />)
            ) : (
              <p className="text-muted-foreground col-span-2">You haven't posted any bytes yet.</p>
            )}
          </div>
        </TabsContent>
        <TabsContent value="terets" className="mt-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {followedTerets.length > 0 ? (
              followedTerets.map((teret) => <TeretCard key={teret.name} {...teret} />)
            ) : (
                <p className="text-muted-foreground col-span-3">You are not following any terets yet.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
