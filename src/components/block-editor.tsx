"use client";

import { useTheme } from "next-themes";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
// The build error suggests BlockNoteView doesn't exist and suggests BlockNoteViewRaw instead.
// We will try using the suggested import, aliasing it to keep the component's code the same.
import { BlockNoteViewRaw as BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";

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
  // The editor is created asynchronously, so it will be null on the first render.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable,
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      onChange(editor);
    },
  });

  // Render a loading state while the editor is loading
  if (!editor) {
    return <div>Loading Editor...</div>;
  }

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
}
