import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import MainNav from '@/components/layout/main-nav';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';

export const metadata: Metadata = {
  title: 'Fomio',
  description: 'A fast, elegant, and discussion-first forum app.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased', 'bg-background')}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex h-screen">
            <MainNav />
            <div id="main-scroll-container" className="flex flex-1 flex-col border-l overflow-y-auto">
              <Header />
              <main className="flex-1 p-4 pb-24 sm:p-6 sm:pb-6 lg:p-8 lg:pb-8">{children}</main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
