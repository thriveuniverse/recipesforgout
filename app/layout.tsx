import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: 'RecipesForGout.com - Delicious Gout-Friendly Recipes',
  description: 'Discover delicious, low-purine recipes designed for gout management. Browse 250+ recipes with detailed nutritional information, purine levels, and meal planning tools.',
  keywords: 'gout recipes, low purine recipes, gout diet, gout-friendly meals, purine levels, gout management',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  openGraph: {
    title: 'RecipesForGout.com - Delicious Gout-Friendly Recipes',
    description: 'Discover delicious, low-purine recipes designed for gout management.',
    images: ['/og-image.png'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
