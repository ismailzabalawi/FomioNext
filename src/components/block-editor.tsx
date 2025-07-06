"use client";

import { useTheme } from "next-themes";
import type { BlockNoteEditor, PartialBlock } from "@blocknote/core";
import { BlockNoteViewRaw as BlockNoteView, useBlockNote } from "@blocknote/react";
import "@blocknote/core/style.css";
import React from "react";

interface EditorProps {
  onChange: (editor: BlockNoteEditor) => void;
  initialContent?: PartialBlock[];
  editable?: boolean;
}

// This inner component contains the client-only hooks.
// It will only ever be rendered on the client, after the parent has mounted.
const InnerEditor = ({
  onChange,
  initialContent,
  editable,
}: EditorProps) => {
  const { resolvedTheme } = useTheme();

  // useBlockNote is a client-side hook and must not run on the server.
  // Its execution is guarded by the parent's isMounted check.
  const editor = useBlockNote({
    editable,
    initialContent: initialContent,
    onEditorContentChange: (editor) => {
      onChange(editor);
    },
  });

  // This can happen briefly on the client while the editor initializes.
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

// This is the main export. It's a wrapper component that ensures
// InnerEditor (and its hooks) are only rendered on the client side.
export default function BlockEditor(props: EditorProps) {
  const [isMounted, setIsMounted] = React.useState(false);

  // This effect runs only on the client, after the component mounts.
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // On the server, and on the initial client render before the effect runs,
  // we return null. The parent page's dynamic import will show a loading skeleton.
  if (!isMounted) {
    return null;
  }

  return <InnerEditor {...props} />;
}
