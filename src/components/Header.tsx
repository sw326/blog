'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'en';

  return (
    <header className="w-full">
      <div className="max-w-xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          swk
        </Link>

        <nav className="flex items-center gap-5">
          <Link
            href={`/${locale}/til`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            til
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            about
          </Link>
          <LocaleSwitcher locale={locale} />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

function LocaleSwitcher({ locale }: { locale: string }) {
  const opposite = locale === 'ko' ? 'en' : 'ko';
  return (
    <Link
      href={`/${opposite}`}
      className="text-xs text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors font-mono"
    >
      {opposite}
    </Link>
  );
}
