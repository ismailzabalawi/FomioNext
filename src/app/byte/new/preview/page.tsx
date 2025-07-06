"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function PreviewContent() {
    const searchParams = useSearchParams();
    const title = searchParams.get("title") || "Untitled";
    const content = searchParams.get("content") || "No content provided.";
    const teret = searchParams.get("teret") || "No Teret";
    // Simple conversion of newlines to paragraphs for preview
    const contentAsHtml = content.split('\n').map(p => `<p>${p}</p>`).join('');

    const backHref = `/byte/new?${searchParams.toString()}`;
    const publishHref = `/byte/new/publishing?${searchParams.toString()}`;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">Preview your Byte</h1>
                <p className="text-muted-foreground">This is how your post will look to the community.</p>
            </div>

            <Card className="overflow-hidden rounded-2xl">
                <CardHeader>
                    <Badge variant="secondary" className="w-fit">{teret}</Badge>
                    <CardTitle className="font-headline text-2xl pt-2">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: contentAsHtml }} />
                </CardContent>
            </Card>

            <div className="flex justify-between items-center">
                <Button asChild variant="outline">
                    <Link href={backHref}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Editor
                    </Link>
                </Button>
                <Button asChild>
                    <Link href={publishHref}>Publish Byte</Link>
                </Button>
            </div>
        </div>
    );
}


export default function PreviewPage() {
    return (
        <Suspense fallback={<div>Loading preview...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
