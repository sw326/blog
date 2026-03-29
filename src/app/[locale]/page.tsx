import Link from 'next/link';
import { getAllTilMeta } from '@/lib/mdx';
import type { Metadata } from 'next';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'sw326',
    description: 'developer',
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllTilMeta().slice(0, 10);

  return (
    <div className="space-y-16 pt-12">
      {/* Identity */}
      <section className="space-y-1">
        <p className="text-sm font-medium text-[var(--foreground)]">sw326</p>
        <p className="text-sm text-[var(--muted)]">developer</p>
      </section>

      {/* TIL list */}
      {posts.length > 0 && (
        <section>
          <div className="space-y-5">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${locale}/til/${post.slug}`}
                className="block group"
              >
                <time className="text-xs text-[var(--subtle)] font-mono block mb-0.5">
                  {post.date}
                </time>
                <span className="text-sm text-[var(--muted)] group-hover:text-[var(--foreground)] transition-colors">
                  {post.title}
                </span>
                {post.tags.length > 0 && (
                  <span className="text-xs text-[var(--subtle)] block mt-0.5">
                    {post.tags.join(' · ')}
                  </span>
                )}
              </Link>
            ))}
          </div>
          {getAllTilMeta().length > 10 && (
            <div className="mt-8">
              <Link
                href={`/${locale}/til`}
                className="text-xs text-[var(--subtle)] hover:text-[var(--foreground)] transition-colors"
              >
                all posts →
              </Link>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
