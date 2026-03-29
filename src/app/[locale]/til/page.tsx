import { getTranslations } from 'next-intl/server';
import { getAllTilMeta, getAllTags } from '@/lib/mdx';
import { TagFilter } from '@/components/TagFilter';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'til' });
  return {
    title: t('title'),
    description: t('subtitle'),
  };
}

export default async function TilPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'til' });
  const posts = getAllTilMeta();
  const tags = getAllTags();

  return (
    <div>
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-100 mb-3">
          {t('title')}
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">{t('subtitle')}</p>
      </div>

      <TagFilter posts={posts} tags={tags} locale={locale} />
    </div>
  );
}
