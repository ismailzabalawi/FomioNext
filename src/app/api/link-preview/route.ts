import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'FomioBot/1.0 (+https://fomio.app/bot)', // Be a good internet citizen
            'Accept': 'text/html'
        }
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);

    const getMetaTag = (name: string) => {
      return $(`meta[name="${name}"]`).attr('content') || $(`meta[property="${name}"]`).attr('content');
    };

    const preview = {
      title: getMetaTag('og:title') || $('title').text() || 'No title found',
      description: getMetaTag('og:description'),
      image: getMetaTag('og:image'),
      siteName: getMetaTag('og:site_name'),
      favicon: $('link[rel="shortcut icon"]').attr('href') || $('link[rel="icon"]').attr('href'),
    };

    // Make image and favicon URLs absolute
    const urlObject = new URL(url);
    if (preview.image && !preview.image.startsWith('http')) {
        preview.image = new URL(preview.image, urlObject).toString();
    }
     if (preview.favicon && !preview.favicon.startsWith('http')) {
        preview.favicon = new URL(preview.favicon, urlObject).toString();
    }

    return NextResponse.json(preview);
  } catch (error) {
    let errorMessage = 'Failed to fetch link preview';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    console.error('Error fetching link preview for:', url, error);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
