'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  const params = useParams();
  const locale = (params?.locale as string) ?? 'ko';

  return (
    <header className="w-full border-b border-[var(--border)]">
      <div className="max-w-2xl mx-auto px-6 h-12 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-sm font-medium text-[var(--foreground)] hover:text-[var(--muted)] transition-colors"
        >
          swk
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href={`/${locale}/til`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            TIL
          </Link>
          <Link
            href={`/${locale}/about`}
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            About
          </Link>
          <ThemeToggle />
          <LocaleSwitcher locale={locale} />
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
