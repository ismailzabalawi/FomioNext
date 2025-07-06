"use client";

import { useTheme } from "next-themes";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import dynamic from "next/dynamic";

// The BlockNoteView component is dynamically imported to prevent server-side rendering issues.
const BlockNoteView = dynamic(
  () => import("@blocknote/react").then((mod) => mod.BlockNoteView),
  { ssr: false }
);

interface EditorProps {
  onChange: (editor: BlockNoteEditor) => void;
  initialContent?: PartialBlock[];
  editable?: boolean;
}

export default function BlockEditor({
  onChange,
  initialContent,
  editable = true,
}: EditorProps) {
  const { resolvedTheme } = useTheme();

  // Creates a new editor instance.
  const editor: BlockNoteEditor = useBlockNote({
    editable,
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      onChange(editor);
    },
  });

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
