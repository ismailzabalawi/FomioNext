"use client";

import { useState } from "react";
import { BlockEditor } from "@/components/block-editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import type { PartialBlock } from "@blocknote/core";

export default function NewBytePage() {
  const [title, setTitle] = useState("");
  const [teret, setTeret] = useState("");
  const [content, setContent] = useState<PartialBlock[] | undefined>(undefined);
  const { toast } = useToast();

  const handlePublish = () => {
    // In a real app, you'd send this data to your backend.
    console.log({
      title,
      teret,
      content,
    });
    toast({
      title: "Byte Published!",
      description: "Your new byte is now live (check the browser console).",
    });
  };
  
  // This would come from your API
  const availableTerets = ["Web Dev", "Design", "AI & ML", "Productivity", "Rust", "Science"];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Create a New Byte</h1>
        <p className="text-muted-foreground">Share your thoughts with the Fomio community.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            placeholder="What's your byte about?"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-lg font-headline"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="teret">Teret (Topic)</Label>
           <Select onValueChange={setTeret} value={teret}>
            <SelectTrigger id="teret" className="w-[240px]">
              <SelectValue placeholder="Select a teret" />
            </SelectTrigger>
            <SelectContent>
              {availableTerets.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label>Content</Label>
        <div className="rounded-lg border bg-background">
           <BlockEditor onChange={(editor) => setContent(editor.topLevelBlocks)} />
        </div>
        <p className="text-sm text-muted-foreground">
          This is a block-based editor. Try typing <kbd className="px-1.5 py-0.5 border rounded bg-muted shadow-sm">/
          </kbd> for commands.
        </p>
      </div>

      <div className="flex justify-end">
        <Button onClick={handlePublish}>Publish Byte</Button>
      </div>
    </div>
  );
}
