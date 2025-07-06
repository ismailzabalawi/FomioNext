import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageSquare, UserPlus } from "lucide-react";

export default function NotificationsPage() {
  const notifications = [
    {
      id: 1,
      type: "reply",
      author: { name: "Leo", avatarUrl: "https://placehold.co/40x40.png" },
      postTitle: "A Deep Dive into Rust for Systems Programming",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "follow",
      author: { name: "Zoe", avatarUrl: "https://placehold.co/40x40.png" },
      time: "1 day ago",
    },
    {
      id: 3,
      type: "like",
      author: { name: "Mia", avatarUrl: "https://placehold.co/40x40.png" },
      postTitle: "Minimalist Design Principles for Modern UIs",
      time: "3 days ago",
    },
     {
      id: 4,
      type: "reply",
      author: { name: "Ava", avatarUrl: "https://placehold.co/40x40.png" },
      postTitle: "The Future of Frontend Development",
      time: "4 days ago",
    },
  ];

  const NotificationIcon = ({ type }: { type: string }) => {
    switch (type) {
      case "reply":
        return <MessageSquare className="size-5 text-primary" />;
      case "follow":
        return <UserPlus className="size-5 text-[hsl(var(--chart-2))]" />;
      case "like":
        return <Heart className="size-5 text-[hsl(var(--chart-1))]" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Notifications</h1>
        <p className="text-muted-foreground">Recent activity from across Fomio.</p>
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <Card key={notification.id} className="p-0 hover:bg-muted/50 transition-colors">
            <a href="#" className="block p-4">
            <CardContent className="p-0 flex items-start gap-4">
              <div className="relative">
                <Avatar>
                  <AvatarImage src={notification.author.avatarUrl} alt={notification.author.name} data-ai-hint="profile picture" />
                  <AvatarFallback>{notification.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 -right-1 bg-background p-0.5 rounded-full">
                    <NotificationIcon type={notification.type} />
                </div>
              </div>
              <div className="flex-1 text-sm">
                <p>
                  <span className="font-semibold">{notification.author.name}</span>
                  {notification.type === 'reply' && ` replied to your post: "${notification.postTitle}"`}
                  {notification.type === 'follow' && ` started following you.`}
                  {notification.type === 'like' && ` liked your post: "${notification.postTitle}"`}
                </p>
                <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
              </div>
            </CardContent>
            </a>
          </Card>
        ))}
        {notifications.length === 0 && (
            <div className="text-center py-12 text-muted-foreground border rounded-lg">
                <p>You have no new notifications.</p>
            </div>
        )}
      </div>
    </div>
  );
}
