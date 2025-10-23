import React from 'react';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import ResponsiveLayout from '@/components/layout/ResponsiveLayout';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/lib/providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Watheta Dashboard',
  description: 'Modern dashboard application with responsive layout',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <ResponsiveLayout>{children}</ResponsiveLayout>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
