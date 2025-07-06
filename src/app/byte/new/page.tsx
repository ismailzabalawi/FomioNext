"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewBytePage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle the form submission here
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    console.log({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
       <div className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight">Create a new Byte</h1>
          <p className="text-muted-foreground">Share your thoughts with the community.</p>
       </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="Enter a catchy title" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Write your byte here..."
            className="min-h-[300px]"
          />
        </div>
      </div>
      
      <Button type="submit">Publish Byte</Button>
    </form>
  );
}
