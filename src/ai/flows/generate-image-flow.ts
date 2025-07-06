'use server';
/**
 * @fileOverview An AI flow to generate a header image for a byte.
 *
 * - generateByteImage - A function that handles image generation.
 * - GenerateByteImageInput - The input type for the function.
 * - GenerateByteImageOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateByteImageInputSchema = z.object({
  title: z.string().describe('The title of the byte.'),
  content: z.string().describe('The content of the byte.'),
});
export type GenerateByteImageInput = z.infer<typeof GenerateByteImageInputSchema>;

const GenerateByteImageOutputSchema = z.object({
  imageUrl: z.string().describe('The generated image as a data URI.'),
});
export type GenerateByteImageOutput = z.infer<
  typeof GenerateByteImageOutputSchema
>;

export async function generateByteImage(
  input: GenerateByteImageInput
): Promise<GenerateByteImageOutput> {
  return generateByteImageFlow(input);
}

const generateByteImageFlow = ai.defineFlow(
  {
    name: 'generateByteImageFlow',
    inputSchema: GenerateByteImageInputSchema,
    outputSchema: GenerateByteImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a visually stunning and abstract header image that captures the essence of the following topic. The image should be suitable for a blog post header. Do not include any text, letters, or numbers in the image.

Topic Title: ${input.title}

Topic Content: ${input.content}`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed.');
    }

    return {imageUrl: media.url};
  }
);
