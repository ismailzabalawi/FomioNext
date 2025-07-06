"use client";

import { useTheme } from "next-themes";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React from "react";

interface EditorProps {
  onChange: (editor: BlockNoteEditor) => void;
  initialContent?: PartialBlock[];
  editable?: boolean;
}

// This inner component contains the client-only hooks and will be rendered dynamically.
const ClientSideEditor = ({
  onChange,
  initialContent,
  editable,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  // The hook that was causing the error is now safely called only on the client.
  const editor: BlockNoteEditor | null = useBlockNote({
    editable,
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      onChange(editor);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === "dark" ? "dark" : "light"}
    />
  );
};

// This wrapper component ensures that the ClientSideEditor is only rendered
// after the component has mounted on the client.
export default function BlockEditor(props: EditorProps) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // On the server, or before the initial client render, we return null.
  // The parent component's `dynamic` import will show a loading skeleton instead.
  if (!mounted) {
    return null;
  }

  return <ClientSideEditor {...props} />;
}
