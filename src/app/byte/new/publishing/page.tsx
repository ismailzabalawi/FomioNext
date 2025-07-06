"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, PartyPopper, Home, Sparkles } from "lucide-react";
import { generateByteImage, GenerateByteImageInput } from "@/ai/flows/generate-image-flow";
import { Card, CardContent } from "@/components/ui/card";

function PublishingContent() {
    const [publishStatus, setPublishStatus] = useState<"publishing" | "success">("publishing");
    const [imageStatus, setImageStatus] = useState<"idle" | "generating" | "success" | "error">("idle");
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "Your Byte";
    const content = searchParams.get("content") || "";
    const teret = searchParams.get("teret") || "";

    useEffect(() => {
        // In a real app, this would be an API call to publish the byte.
        // We'll simulate it with a timeout.
        const publishTimer = setTimeout(() => {
            console.log("Publishing byte:", { title, content, teret });
            setPublishStatus("success");
            setImageStatus("generating"); // Start image generation after "publishing"

            const generationInput: GenerateByteImageInput = { title, content };

            generateByteImage(generationInput)
                .then(output => {
                    setImageUrl(output.imageUrl);
                    setImageStatus("success");
                })
                .catch(error => {
                    console.error("Image generation failed:", error);
                    setImageStatus("error");
                });

        }, 2500); // Simulate network delay

        return () => clearTimeout(publishTimer);
    }, [searchParams, title, content, teret]);


    if (publishStatus === "publishing") {
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <h1 className="font-headline text-3xl font-bold">Publishing...</h1>
                <p className="text-muted-foreground">Your byte is being published to the Fomio community.</p>
            </div>
        );
    }

    if (publishStatus === "success") {
        // In a real app, you'd get the new byte's ID from the API.
        const newByteId = "newly-created-byte";
        return (
            <div className="flex flex-col items-center justify-center text-center space-y-6 max-w-2xl mx-auto">
                 <div className="p-4 bg-primary/10 rounded-full">
                    <PartyPopper className="h-12 w-12 text-primary" />
                 </div>
                <h1 className="font-headline text-3xl font-bold">Byte Published!</h1>
                <p className="text-muted-foreground max-w-md">
                    Congratulations! Your post <span className="font-semibold text-foreground">"{title}"</span> is now live.
                </p>

                <Card className="w-full rounded-2xl overflow-hidden">
                    <CardContent className="p-4">
                        <div className="aspect-video w-full relative">
                             {imageStatus === "generating" && (
                                <div className="absolute inset-0 bg-muted/50 flex flex-col items-center justify-center gap-2 text-muted-foreground rounded-lg">
                                    <Sparkles className="h-8 w-8 animate-pulse" />
                                    <span>Generating a unique header image...</span>
                                </div>
                            )}
                             {imageStatus === "success" && imageUrl && (
                                <Image src={imageUrl} alt="Generated header image" fill className="object-cover rounded-lg" data-ai-hint="abstract illustration" />
                            )}
                             {imageStatus === "error" && (
                                <div className="absolute inset-0 bg-destructive/10 flex items-center justify-center text-destructive-foreground rounded-lg">
                                    <p>Could not generate an image.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

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
