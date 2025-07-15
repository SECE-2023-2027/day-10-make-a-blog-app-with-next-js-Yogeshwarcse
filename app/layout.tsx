import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { BlogProvider } from '@/context/BlogContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BlogApp - Share Your Stories',
  description: 'A modern blog platform for sharing your thoughts and stories',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <BlogProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
        </BlogProvider>
      </body>
    </html>
  );
}