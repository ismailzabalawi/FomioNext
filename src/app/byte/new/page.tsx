"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { Label } from "@/components/ui/label";
import type { BlockNoteEditor } from "@blocknote/core";

const BlockEditor = dynamic(() => import("@/components/block-editor"), {
  ssr: false,
  loading: () => (
    <div className="space-y-2 p-4 border rounded-lg">
      <Skeleton className="h-8 w-1/3" />
      <Skeleton className="h-20 w-full" />
    </div>
  ),
});

export default function NewBytePage() {
  const handleEditorChange = (editor: BlockNoteEditor) => {
    // In a real app, you would save this content to state or a database
    console.log(editor.topLevelBlocks);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <Label>Content</Label>
        <div className="rounded-lg border bg-background min-h-[200px]">
           <BlockEditor onChange={handleEditorChange} />
        </div>
        <p className="text-sm text-muted-foreground">
          This is a block-based editor. Try typing <kbd className="px-1.5 py-0.5 border rounded bg-muted shadow-sm">/
          </kbd> for commands.
        </p>
      </div>
    </div>
  );
}
