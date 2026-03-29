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

export default async function TilDetailPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = getTilPost(slug);
  if (!post) notFound();

  const t = await getTranslations({ locale, namespace: 'post' });

  return (
    <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-12 pt-12">
      {/* Main content */}
      <div className="min-w-0">
        <Link
          href={`/${locale}/til`}
          className="text-xs text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors mb-10 inline-block"
        >
          {t('back')}
        </Link>

        <header className="mb-10">
          <h1 className="text-xl font-semibold text-[var(--foreground)] leading-tight mb-3">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--subtle)]">
            <time className="font-mono">{post.date}</time>
            <span>·</span>
            <ViewCounter slug={slug} />
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-3">
              {post.tags.map((tag) => (
                <span key={tag} className="text-xs text-[var(--subtle)]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <article>
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
