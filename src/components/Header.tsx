'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { useParams } from 'next/navigation';

export function Header() {
  const t = useTranslations('nav');
  const params = useParams();
  const locale = params?.locale as string ?? 'ko';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-100/80 dark:border-slate-700/80
      bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="font-bold text-xl text-amber-600 dark:text-amber-400
            hover:text-amber-500 dark:hover:text-amber-300 transition-colors duration-200"
        >
          sw326
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href={`/${locale}`}
            className="px-3 py-1.5 text-sm font-medium rounded-lg
              text-slate-600 dark:text-slate-300
              hover:text-amber-600 dark:hover:text-amber-400
              hover:bg-amber-50 dark:hover:bg-slate-800
              transition-all duration-200"
          >
            {t('home')}
          </Link>
          <Link
            href={`/${locale}/til`}
            className="px-3 py-1.5 text-sm font-medium rounded-lg
              text-slate-600 dark:text-slate-300
              hover:text-amber-600 dark:hover:text-amber-400
              hover:bg-amber-50 dark:hover:bg-slate-800
              transition-all duration-200"
          >
            {t('til')}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="px-3 py-1.5 text-sm font-medium rounded-lg
              text-slate-600 dark:text-slate-300
              hover:text-amber-600 dark:hover:text-amber-400
              hover:bg-amber-50 dark:hover:bg-slate-800
              transition-all duration-200"
          >
            {t('about')}
          </Link>
          <div className="ml-1">
            <ThemeToggle />
          </div>
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
      className="px-2 py-1 text-xs font-mono rounded border
        border-amber-200 dark:border-slate-600
        text-amber-700 dark:text-amber-300
        hover:bg-amber-50 dark:hover:bg-slate-800
        transition-all duration-200"
    >
      {opposite.toUpperCase()}
    </Link>
  );
}
