import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getAllTilMeta } from '@/lib/mdx';
import { TilCard } from '@/components/TilCard';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: 'Home',
    description: t('hero_subtitle'),
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  const posts = getAllTilMeta().slice(0, 5);

  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-8 pb-4">
        <div className="inline-block mb-4 text-5xl">🦞</div>
        <h1 className="text-4xl sm:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
          {t('hero_subtitle')}
        </p>
        <div className="flex gap-3 mt-6">
          <Link
            href={`/${locale}/til`}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-white font-medium rounded-lg
              shadow-sm hover:shadow-md transition-all duration-200"
          >
            TIL 보기
          </Link>
          <Link
            href={`/${locale}/about`}
            className="px-5 py-2.5 border border-amber-200 dark:border-slate-600
              text-amber-700 dark:text-amber-300
              hover:bg-amber-50 dark:hover:bg-slate-800
              font-medium rounded-lg transition-all duration-200"
          >
            {locale === 'ko' ? '소개' : 'About'}
          </Link>
        </div>
      </section>

      {/* Recent TIL */}
      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            {t('recent_til')}
          </h2>
          <Link
            href={`/${locale}/til`}
            className="text-sm text-amber-600 dark:text-amber-400
              hover:text-amber-500 transition-colors duration-200"
          >
            {t('view_all')} →
          </Link>
        </div>
        <div className="space-y-4">
          {posts.map((post) => (
            <TilCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      </section>
    </div>
  );
}
