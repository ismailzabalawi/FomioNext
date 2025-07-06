"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

function CreateByteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    // Pre-fill from query params if coming back from preview
    const draftTitle = searchParams.get("title");
    const draftContent = searchParams.get("content");
    if (draftTitle) {
      setTitle(draftTitle);
    }
    if (draftContent) {
      setContent(draftContent);
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (title.trim() && content.trim()) {
      const params = new URLSearchParams();
      params.set("title", title);
      params.set("content", content);
      router.push(`/byte/new/preview?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="flex-1 flex flex-col gap-4 py-4">
        <Textarea
          placeholder="Add title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="text-4xl font-bold border-none focus-visible:ring-0 p-0 resize-none shadow-none font-headline bg-transparent"
          rows={1}
        />
        <Textarea
          placeholder="Start writing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-1 border-none focus-visible:ring-0 p-0 resize-none shadow-none text-lg bg-transparent"
        />
      </div>
      <div className="py-4 flex justify-end">
        <Button onClick={handleContinue} disabled={!title.trim() || !content.trim()}>
          Preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}


export default function NewBytePage() {
    return (
        <Suspense fallback={<div>Loading editor...</div>}>
            <CreateByteForm />
        </Suspense>
    );
}
