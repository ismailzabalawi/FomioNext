"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, PartyPopper, Home } from "lucide-react";

function PublishingContent() {
    const [status, setStatus] = useState<"publishing" | "success">("publishing");
    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "Your Byte";

    useEffect(() => {
        // In a real app, this would be an API call to publish the byte.
        // We'll simulate it with a timeout.
        const timer = setTimeout(() => {
            console.log("Publishing byte:", {
                title: searchParams.get("title"),
                content: searchParams.get("content"),
                teret: searchParams.get("teret"),
            });
            setStatus("success");
        }, 2500); // Simulate network delay

        return () => clearTimeout(timer);
    }, [searchParams]);

    if (status === "publishing") {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h1 className="font-headline text-3xl font-bold">Publishing...</h1>
                <p className="text-muted-foreground">Your byte is being published to the Fomio community.</p>
            </div>
        );
    }

    if (status === "success") {
        // In a real app, you'd get the new byte's ID from the API.
        const newByteId = "newly-created-byte";
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                 <div className="p-4 bg-primary/10 rounded-full">
                    <PartyPopper className="h-12 w-12 text-primary" />
                 </div>
                <h1 className="font-headline text-3xl font-bold">Byte Published!</h1>
                <p className="text-muted-foreground max-w-md">
                    Congratulations! Your post <span className="font-semibold text-foreground">"{title}"</span> is now live.
                </p>
                <div className="flex gap-4">
                    <Button asChild>
                        <Link href={`/byte/${newByteId}`}>View Byte</Link>
                    </Button>
                    <Button asChild variant="outline">
                        <Link href="/">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }

    return null;
}

export default function PublishingPage() {
    return (
        <div className="flex items-center justify-center h-full">
            <Suspense fallback={<div>Loading...</div>}>
                <PublishingContent />
            </Suspense>
        </div>
    );
}
