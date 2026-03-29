import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllTilSlugs, getTilPost } from '@/lib/mdx';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { TOC } from '@/components/TOC';
import { ViewCounter } from '@/components/ViewCounter';
import { GiscusComments } from '@/components/GiscusComments';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
  const slugs = getAllTilSlugs();
  const locales = ['ko', 'en'];
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getTilPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

function addIdsToHeadings(content: string): string {
  return content.replace(/^(#{2,3})\s+(.+)$/gm, (_, hashes, text) => {
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    return `${hashes} ${text} {#${id}}`;
  });
}

export default async function TilDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getTilPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'post' });

  return (
    <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-12">
      {/* Main content */}
      <div className="min-w-0">
        <Link
          href={`/${locale}/til`}
          className="inline-flex items-center text-sm text-amber-600 dark:text-amber-400
            hover:text-amber-500 mb-8 transition-colors duration-200"
        >
          {t('back')}
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 dark:text-slate-100 leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-400 dark:text-slate-500">
            <time>{post.date}</time>
            <span>·</span>
            <ViewCounter slug={slug} />
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full
                  bg-amber-50 dark:bg-slate-700
                  text-amber-700 dark:text-amber-300
                  border border-amber-200 dark:border-slate-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        </header>

        <article className="prose-custom">
          <MDXRemote source={post.content} />
        </article>

        <GiscusComments />
      </div>

      {/* TOC sidebar */}
      <aside className="hidden lg:block">
        <TOC />
      </aside>
    </div>
  );
}
