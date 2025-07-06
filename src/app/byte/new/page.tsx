"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { cn } from "@/lib/utils";

const teretOptions = [
  { value: "web-dev", label: "Web Dev" },
  { value: "design", label: "Design" },
  { value: "ai-ml", label: "AI & ML" },
  { value: "productivity", label: "Productivity" },
  { value: "programming", label: "Programming" },
  { value: "science", label: "Science" },
  { value: "web3", label: "Web3" },
];

function CreateByteForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [teret, setTeret] = useState("");
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Pre-fill from query params if coming back from preview
    const draftTitle = searchParams.get("title");
    const draftContent = searchParams.get("content");
    const draftTeret = searchParams.get("teret");
    if (draftTitle) {
      setTitle(draftTitle);
    }
    if (draftContent) {
      setContent(draftContent);
    }
    if (draftTeret) {
      setTeret(draftTeret);
    }
  }, [searchParams]);

  const handleContinue = () => {
    if (title.trim() && content.trim() && teret.trim()) {
      const params = new URLSearchParams();
      params.set("title", title);
      params.set("content", content);
      params.set("teret", teret);
      router.push(`/byte/new/preview?${params.toString()}`);
    }
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <div className="py-4 flex justify-between items-center gap-4">
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[280px] justify-between font-semibold"
                >
                    {teret || "Add a teret (e.g., WebDev)"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0">
                <Command value={searchValue} onValueChange={setSearchValue}>
                    <CommandInput placeholder="Search or create a teret..."/>
                    <CommandList>
                        <CommandEmpty>
                             <button
                                className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
                                onClick={() => {
                                    setTeret(searchValue);
                                    setOpen(false);
                                }}
                            >
                                Create "{searchValue}"
                            </button>
                        </CommandEmpty>
                        <CommandGroup>
                            {teretOptions.map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.label}
                                    onSelect={(currentValue) => {
                                        setTeret(currentValue.toLowerCase() === teret.toLowerCase() ? "" : option.label);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            teret.toLowerCase() === option.label.toLowerCase() ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {option.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        <Button onClick={handleContinue} disabled={!title.trim() || !content.trim() || !teret.trim()}>
          Preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-4 pb-4">
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
