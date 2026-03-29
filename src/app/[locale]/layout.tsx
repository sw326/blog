import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    description: 'developer',
  };
}

export function generateStaticParams() {
  return [{ locale: 'ko' }, { locale: 'en' }];
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider>
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <Header />
          <main className="max-w-xl mx-auto px-6 pb-16">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
