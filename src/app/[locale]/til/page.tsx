import { getAllTilMeta, getAllTags } from '@/lib/mdx';
import { TilTagFilter } from '@/components/TilTagFilter';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'TIL',
    description: 'Today I Learned',
  };
}

export default async function TilPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllTilMeta();
  const tags = getAllTags();

  return (
    <div className="pt-12">
      <TilTagFilter posts={posts} tags={tags} locale={locale} />
    </div>
  );
}
