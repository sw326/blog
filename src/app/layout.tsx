import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'sw326',
    template: '%s — sw326',
  },
  description: 'developer',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sw326.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ko"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className={GeistSans.className}>
        {children}
      </body>
    </html>
  );
}
